import api from "@/lib/httpClient";
import { useState, useRef } from "react";
import toast from "react-hot-toast";

interface Location {
  label: string;
  value: string;
}

const useLocations = () => {
  const [countries, setCountries] = useState<Location[]>([]);
  const [states, setStates] = useState<Location[]>([]);
  const [cities, setCities] = useState<Location[]>([]);

  // Use useRef for cache persistence
  const cache = useRef(new Map<string, Location[]>()).current;

  const handleError = (error: any, defaultMessage: string) => {
    console.error(defaultMessage, error);
    toast.error(
      error.response?.data?.message || error.message || defaultMessage
    );
  };

  const getCountries = async (): Promise<Location[] | undefined> => {
    if (cache.has("countries")) {
      setCountries(cache.get("countries")!);
      return cache.get("countries");
    }
    try {
      const response = await api.get("/locations");
      const data: Location[] = response.data.data;
      cache.set("countries", data);
      setCountries(data);
      return data;
    } catch (error) {
      handleError(error, "Failed to fetch countries");
      return undefined;
    }
  };

  const getStates = async (countryCode: string): Promise<Location[] | undefined> => {
    const cacheKey = `states-${countryCode}`;
    if (cache.has(cacheKey)) {
      setStates(cache.get(cacheKey)!);
      return cache.get(cacheKey);
    }
    try {
      const response = await api.get(`/locations?country=${countryCode}`);
      const data: Location[] = response.data.data;
      console.log("data", data);
      cache.set(cacheKey, data);
      setStates(data);
      return data;
    } catch (error) {
      handleError(error, "Failed to fetch states");
      return undefined;
    }
  };

  const getCities = async ({
    countryCode,
    stateCode,
  }: {
    countryCode: string;
    stateCode: string;
  }): Promise<Location[] | undefined> => {
    const cacheKey = `cities-${countryCode}-${stateCode}`;
    if (cache.has(cacheKey)) {
      setCities(cache.get(cacheKey)!);
      return cache.get(cacheKey);
    }
    try {
      // Remove extra slash for consistency
      const response = await api.get(
        `/locations?country=${countryCode}&state=${stateCode}`
      );
      const data: Location[] = response.data.data;
      cache.set(cacheKey, data);
      setCities(data);
      return data;
    } catch (error) {
      handleError(error, "Failed to fetch cities");
      return undefined;
    }
  };

  return {
    countries,
    states,
    cities,
    getCountries,
    getStates,
    getCities,
  };
};

export default useLocations;
