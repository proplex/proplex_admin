import { FormFieldConfig } from "@/components/UseForm/ControllerMap";
import {
  ASSET_STYLE,
  CURRENCY_OPTIONS,
  INSTRUMENT_TYPE,
} from "@/constants/global";
import { useFormContext } from "react-hook-form";

interface Asset {
  country?: string;
  state?: string;
  city?: string;
  metadata?: {
    places?: Record<string, string>;
  };
}

interface LocationHooks {
  getCountries: () => Promise<Array<{ label: string; value: string }> | undefined>;
  getStates: (countryCode: string) => Promise<Array<{ label: string; value: string }> | undefined>;
  getCities: (params: { countryCode: string; stateCode: string }) => Promise<Array<{ label: string; value: string }> | undefined>;
  countries: Array<{ label: string; value: string }>;
  states: Array<{ label: string; value: string }>;
  cities: Array<{ label: string; value: string }>;
}

/**
 * Asset information form configuration
 * 
 * IMPORTANT: This function previously violated React Rules of Hooks by calling
 * useLocations() inside a function that could be called conditionally during render.
 * 
 * To fix this, hooks are now called at the component level and passed as parameters.
 * This ensures hooks are always called in the same order and at the top level.
 * 
 * @param asset - Asset data object
 * @param locationHooks - Location-related hooks and data from useLocations()
 * @returns Form field configuration array
 */
export const assetInfoConfig = ({
  asset,
  locationHooks,
}: {
  asset: Asset;
  locationHooks?: LocationHooks;
}): FormFieldConfig[] => {
  const { watch, control, setValue } = useFormContext();

  // Use provided location hooks or default empty values
  const {
    getCountries = async () => undefined,
    getStates = async () => undefined,
    getCities = async () => undefined,
    countries = [],
    states = [],
    cities = []
  } = locationHooks || {};

  const country = asset?.country ?? "";
  const state = asset?.state ?? "";
  const city = asset?.city ?? "";
  const places = asset?.metadata?.places ?? {};

  const defaultState = {
    value: state,
    label: places?.[state] ?? state,
  };

  const defaultCountry = {
    value: country,
    label: places?.[country] ?? country,
  };

  return [
    {
      type: "text",
      name: "name",
      control,
      label: "Asset Name",
      rules: { required: "Asset name is required" },
    },
    {
      type: "select",
      name: "style",
      control,
      label: "Asset Style",
      options: ASSET_STYLE,
      rules: { required: "Asset style is required" },
    },
    {
      type: "select",
      name: "currency",
      control,
      label: "Currency",
      options: CURRENCY_OPTIONS,
      disabled: true,
      defaultValue: "INR",
    },
    {
      type: "select",
      name: "instrumentType",
      control,
      label: "Instrument Type",
      options: INSTRUMENT_TYPE,
      rules: { required: "Instrument type is required" },
    },
    {
      type: "select",
      name: "country",
      control,
      label: "Country",
      options:
        countries.length > 0 ? countries : country ? [defaultCountry] : [],
      rules: { required: "Country is required" },
      onChange: async (value) => {
        await getStates(value);
        setValue("state", "");
        setValue("city", "");
      },
      onBlur: async () => {
        await getCountries();
      },
    },
    {
      type: "select",
      name: "state",
      control,
      label: "State",
      options: states.length > 0 ? states : state ? [defaultState] : [],
      disabled: !watch("country"),
      rules: { required: "State is required" },
      onChange: async (value) => {
        setValue("city", "");
      },
      onBlur: async () => {
        const selectedCountry = watch("country");
        await getStates(selectedCountry);
      },
    },
    {
      type: "select",
      name: "city",
      control,
      label: "City",
      disabled: !watch("state"),
      options:
        cities.length > 0 ? cities : city ? [{ label: city, value: city }] : [],
      rules: { required: "City is required" },
      onBlur: async () => {
        const selectedCountry = watch("country");
        const selectedState = watch("state");
        await getCities({
          countryCode: selectedCountry,
          stateCode: selectedState,
        });
      },
    },
    {
      type: "text",
      name: "landmark",
      control,
      label: "Landmark",
      rules: { required: "Landmark is required" },
    },
    {
      type: "textarea",
      name: "about",
      control,
      label: "Asset Description",
      className: "w-full col-span-1",
      fullWidth: true,
      rules: { required: "Asset description is required" },
    },
  ];
};
