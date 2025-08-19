

import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';

export interface LocationCard {
  _id: string;
  assetId: string;
  locationType: string;
  latitude: string;
  longitude: string;
  name: string;
  address: string;
  distanceInKm: number;
  isActive: boolean;
}

interface LocationCardProps {
  location: LocationCard;
}

export function LocationCard({ location }: LocationCardProps) {
  const handleToggleChange = (checked: boolean) => {};

  return (
    <Card className='w-full border-0 shadow-sm'>
      <CardContent className='p-4 flex justify-between items-center'>
        <div className='flex-1'>
          <h2 className='text-lg text-black'>{location.name}</h2>
          <p className='text-gray-900 mt-1 text-sm'>{location.address}</p>
        </div>
        <div className='flex flex-col items-end'>
          <span>{location.distanceInKm.toFixed(2)} km</span>
          <Switch
            checked={location.isActive}
            onCheckedChange={handleToggleChange}
            className='mt-2'
          />
        </div>
      </CardContent>
    </Card>
  );
}
