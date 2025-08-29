

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
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Search, 
  Navigation, 
  Layers, 
  Target,
  Info,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Settings,
  Filter
} from 'lucide-react';

interface MapHandlerProps {
  place: google.maps.places.PlaceResult | null;
  marker: google.maps.marker.AdvancedMarkerElement | null;
}

interface PlaceAutocompleteProps {
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
}

// Animation variants
const containerVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1
    }
  }
};

const mapVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5 }
  }
};

const tabsVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4 }
  }
};

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3 }
  }
};

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
      <div className='relative'>
        <motion.div
          className='bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-2'
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className='flex items-center gap-3'>
            <Search className='w-5 h-5 text-gray-400' />
            <input
              ref={inputRef}
              className='flex-1 bg-transparent border-0 focus:outline-none text-gray-700 placeholder-gray-400 font-medium'
              placeholder='Search for a location...'
            />
            <motion.button
              className='p-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Target className='w-4 h-4' />
            </motion.button>
          </div>
        </motion.div>
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
    <motion.div 
      className='container mx-auto space-y-6 p-6'
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {/* Enhanced Map Card */}
      <motion.div variants={mapVariants}>
        <Card className='overflow-hidden shadow-lg border-0 '>
          <CardHeader className='pb-4  border-b '>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <motion.div
                  className='p-2 bg-gradient-to-br from-blue-500 to-purple-600  rounded-lg shadow-md'
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <MapPin className='w-5 h-5 text-white' />
                </motion.div>
                <div>
                  <CardTitle className='text-lg font-bold text-gray-800'>Interactive Location Map</CardTitle>
                  <p className='text-sm text-gray-600 mt-1'>Drag the marker to set precise location coordinates</p>
                </div>
              </div>
              
              {/* Map Controls Info */}
              <div className='flex items-center gap-2 text-sm text-gray-500'>
                <Info className='w-4 h-4' />
                <span>Drag to position</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className='p-0'>
            <APIProvider
              apiKey={'AIzaSyBV9asAWan9O_qAT8kzx-wtaqm0XZStDsg'}
              solutionChannel='GMP_devsite_samples_v3_rgmautocomplete'
            >
              <div className='relative w-full h-96 lg:h-[32rem] rounded-b-lg overflow-hidden'>
                <Map
                  style={{ width: '100%', height: '100%' }}
                  defaultCenter={{ lat: latitude, lng: longitude }}
                  defaultZoom={5}
                  gestureHandling={'greedy'}
                  disableDefaultUI={false}
                  mapId={'fe235e0bea87fda6'}
                  className='rounded-b-lg'
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
                  >
                    <motion.div
                      className='relative'
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    >
                      <div className='w-8 h-8 bg-red-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center'>
                        <MapPin className='w-4 h-4 text-white' />
                      </div>
                      <div className='absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-red-500/30 rounded-full blur-sm' />
                    </motion.div>
                  </AdvancedMarker>
                  
                  {/* Enhanced Search Control */}
                  <MapControl position={ControlPosition.TOP}>
                    <div className='absolute top-4 left-1/2 transform -translate-x-1/2 z-10'>
                      <PlaceAutocomplete onPlaceSelect={setSelectedPlace} />
                    </div>
                  </MapControl>
                  
                  {/* Map Layer Controls */}
                  <MapControl position={ControlPosition.TOP_RIGHT}>
                    <motion.div
                      className='absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-white/20 p-2'
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <div className='flex flex-col gap-2'>
                        <motion.button
                          className='p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors'
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          title='Zoom In'
                        >
                          <ZoomIn className='w-4 h-4' />
                        </motion.button>
                        <motion.button
                          className='p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors'
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          title='Zoom Out'
                        >
                          <ZoomOut className='w-4 h-4' />
                        </motion.button>
                        <motion.button
                          className='p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors'
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          title='Reset View'
                        >
                          <RotateCcw className='w-4 h-4' />
                        </motion.button>
                      </div>
                    </motion.div>
                  </MapControl>
                  
                  <MapHandler place={selectedPlace} marker={marker} />
                </Map>
                
                {/* Coordinates Display */}
                <motion.div
                  className='absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-white/20 p-3'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <div className='text-xs text-gray-600 font-medium'>
                    <div className='flex items-center gap-2'>
                      <Navigation className='w-3 h-3' />
                      <span>Coordinates</span>
                    </div>
                    <div className='mt-1 space-y-1'>
                      <div>Lat: {latitude.toFixed(6)}</div>
                      <div>Lng: {longitude.toFixed(6)}</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </APIProvider>
          </CardContent>
        </Card>
      </motion.div>

      {/* Enhanced Nearby Places Section */}
      <motion.div
        variants={tabsVariants}
        className='space-y-6'
      >
        {/* Section Header */}
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
          <div className='flex items-center gap-3'>
            <motion.div
              className='p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-md'
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <Layers className='w-5 h-5 text-white' />
            </motion.div>
            <div>
              <h2 className='text-2xl font-bold text-gray-800'>Nearby Places</h2>
              <p className='text-gray-600 text-sm'>Explore amenities and services around this location</p>
            </div>
          </div>
          
          {/* Quick Stats */}
          <motion.div
            className='flex items-center gap-4'
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className='text-center'>
              <div className='text-lg font-bold text-indigo-600'>{locationPlaces.length}</div>
              <div className='text-xs text-gray-500'>Places Found</div>
            </div>
            <div className='text-center'>
              <div className='text-lg font-bold text-purple-600'>{locationTypes.length - 1}</div>
              <div className='text-xs text-gray-500'>Categories</div>
            </div>
          </motion.div>
        </div>

        {/* Enhanced Tabs */}
        <motion.div
          className='bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className='w-full'
          >
            <div className=' p-4 border-b'>
              <div className='flex items-center gap-3 mb-3'>
                <Filter className='w-4 h-4 text-gray-600' />
                <span className='text-sm font-medium text-gray-700'>Filter by Category</span>
              </div>
              <TabsList className='bg-white/80 backdrop-blur-sm p-1 rounded-lg shadow-sm border border-gray-200 flex-wrap h-auto gap-1'>
                {locationTypes.map((type) => (
                  <TabsTrigger 
                    key={type} 
                    value={type} 
                    className='flex-shrink-0 px-4 py-2 text-sm font-medium transition-all duration-200 data-[state=active]:bg-gray-50  data-[state=active]:text-gray-900 data-[state=active]:shadow-md hover:bg-blue-50'
                  >
                    <span className='capitalize'>{type.replace(/-/g, ' ')}</span>
                    {type !== 'all' && (
                      <motion.span
                        className='ml-2 bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-xs font-semibold'
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        {rawLocations[type]?.length || 0}
                      </motion.span>
                    )}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            {/* Places Grid */}
            <div className='p-6'>
              <AnimatePresence mode='wait'>
                {locationPlaces.length > 0 ? (
                  <motion.div
                    key={activeTab}
                    className='grid gap-4'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, staggerChildren: 0.1 }}
                  >
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
                      }, index: number) => (
                        <motion.div
                          key={location._id}
                          variants={cardVariants}
                          className='transform transition-all duration-300 hover:scale-[1.02]'
                        >
                          <LocationCard location={location} />
                        </motion.div>
                      )
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className='text-center py-16'
                  >
                    <motion.div
                      className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4'
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <Target className='w-8 h-8 text-gray-400' />
                    </motion.div>
                    <h3 className='text-lg font-semibold text-gray-700 mb-2'>
                      No places found in this category
                    </h3>
                    <p className='text-gray-500 max-w-md mx-auto'>
                      Try selecting a different category or search for a different location to discover nearby places and amenities.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Tabs>
        </motion.div>
      </motion.div>
      
    </motion.div>
  );
};

export default Index;
