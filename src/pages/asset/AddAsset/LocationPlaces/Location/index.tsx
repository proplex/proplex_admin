

import React, { act, useEffect, useState } from 'react';
import {
  AdvancedMarker,
  APIProvider,
  ControlPosition,
  Map,
  MapControl,
  useAdvancedMarkerRef,
  useMap,
  useMapsLibrary,
} from '@vis.gl/react-google-maps';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useFormContext } from 'react-hook-form';
import { LocationCard } from '@/components/LocationCard';

interface MapHandlerProps {
  place: google.maps.places.PlaceResult | null;
  marker: google.maps.marker.AdvancedMarkerElement | null;
}

interface PlaceAutocompleteProps {
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
}

const Index: React.FC = () => {
  const { setValue, watch } = useFormContext();
  const latitude = watch('latitude') || 17.24892336147322;
  const longitude = watch('longitude') || 78.03867816925049;
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);
  const [activeTab, setActiveTab] = useState<string>('all');

  const MapHandler = ({ place, marker }: MapHandlerProps) => {
    const map = useMap();

    useEffect(() => {
      if (!map || !place || !marker) return;
      if (place.geometry?.viewport) {
        map.fitBounds(place.geometry?.viewport);
      }
      marker.position = place.geometry?.location;
    }, [map, place, marker]);

    return null;
  };

  const PlaceAutocomplete = ({ onPlaceSelect }: PlaceAutocompleteProps) => {
    const [placeAutocomplete, setPlaceAutocomplete] =
      useState<google.maps.places.Autocomplete | null>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const placesLib = useMapsLibrary('places');

    useEffect(() => {
      if (!placesLib || !inputRef.current) return;
      const options = {
        fields: ['geometry', 'name', 'formatted_address'],
      };

      setPlaceAutocomplete(
        new placesLib.Autocomplete(inputRef.current, options)
      );
    }, [placesLib]);

    useEffect(() => {
      if (!placeAutocomplete) return;
      placeAutocomplete.addListener('place_changed', () => {
        onPlaceSelect(placeAutocomplete.getPlace());
      });
    }, [onPlaceSelect, placeAutocomplete]);

    return (
      <div className='w-full h-full'>
        <input
          ref={inputRef}
          className='h-10 w-64 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
          placeholder='Search for a place...'
        />
      </div>
    );
  };

  const rawLocations = watch('nearByLocations') || {
    school: [],
    gym: [],
    hospital: [],
    cinema: [],
    cafe: [],
    garden: [],
    'medical-post': [],
    office: [],
    'police-station': [],
  };

  const locationTypes = Object.keys(rawLocations || {});
  locationTypes.unshift('all');

  const getPlacesByType = (type: string) => {
    if (type === 'all') {
      return Object.values(rawLocations).flat();
    }
    return rawLocations[type] || [];
  };
  const locationPlaces = getPlacesByType(activeTab);

  return (
    <div className='container mx-auto'>
      <Card className='mb-6'>
        <CardHeader className='pb-3'>
          {/* <CardTitle>Location Map</CardTitle> */}
        </CardHeader>
        <CardContent>
          <APIProvider
            apiKey={'AIzaSyBV9asAWan9O_qAT8kzx-wtaqm0XZStDsg'}
            solutionChannel='GMP_devsite_samples_v3_rgmautocomplete'
          >
            <div className='w-full h-96 rounded-lg overflow-hidden'>
              <Map
                style={{ width: '100%', height: '100%' }}
                defaultCenter={{ lat: latitude, lng: longitude }}
                defaultZoom={5}
                gestureHandling={'greedy'}
                disableDefaultUI={false}
                mapId={'fe235e0bea87fda6'}
              >
                <AdvancedMarker
                  ref={markerRef}
                  onClick={() => {
                    console.log('Marker clicked');
                  }}
                  onDrag={(e) => {
                    setValue('latitude', e.latLng?.lat() || 0);
                    setValue('longitude', e.latLng?.lng() || 0);
                  }}
                  draggable={true}
                  position={{
                    lat: latitude,
                    lng: longitude,
                  }}
                />
                <MapControl position={ControlPosition.TOP}>
                  <div className='absolute top-4 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-md'>
                    <PlaceAutocomplete onPlaceSelect={setSelectedPlace} />
                  </div>
                </MapControl>
                <MapHandler place={selectedPlace} marker={marker} />
              </Map>
            </div>
          </APIProvider>
        </CardContent>
      </Card>

      <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4'>
        <h1 className='text-2xl font-bold'>Nearby Places</h1>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className='mb-6 w-full h-full'
      >
        <TabsList className='mb-4 flex flex-wrap justify-start h-full'>
          {locationTypes.map((type) => (
            <TabsTrigger key={type} value={type} className='flex gap-1'>
              <span className='capitalize'>{type.replace(/-/g, ' ')}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <div className='grid gap-4'>
        {locationPlaces.map(
          (location: {
            _id: string;
            assetId: string;
            locationType: string;
            latitude: string;
            longitude: string;
            name: string;
            address: string;
            distanceInKm: number;
            isActive: boolean;
          }) => (
            <LocationCard location={location} />
          )
        )}
      </div>
    </div>
  );
};

export default Index;
