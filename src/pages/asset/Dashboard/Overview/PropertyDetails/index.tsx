import { Building, DollarSign, PercentCircle, MapPin } from "lucide-react";

export function PropertyDetails({ assetOverview }: { assetOverview: any }) {
  const name = assetOverview?.name ?? "Unnamed";
  const netMonthlyRent = assetOverview?.rentalInformation?.netMonthlyRent ?? 0;
  const vacancyRate = assetOverview?.rentalInformation?.vacancyRate ?? 0;
  const totalNumberOfSfts = assetOverview?.totalNumberOfSfts ?? 0;
  const city = assetOverview?.city ?? "Unknown City";
  const state = assetOverview?.state ?? "Unknown State";
  const country = assetOverview?.country ?? "Unknown Country";
  const landmark = assetOverview?.landmark ?? "Unknown landmark";
  const category = assetOverview?.category ?? "Unknown category";
  const latitude = assetOverview?.latitude ?? 0;
  const longitude = assetOverview?.longitude ?? 0;
  const currency = assetOverview?.currency ?? "USD";

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="flex items-center mb-6">
        <div className="bg-purple-100 p-3 rounded-lg">
          <Building className="h-6 w-6 text-purple-500" />
        </div>
        <div className="ml-4">
          <h4 className="font-medium">{name}</h4>
          <div className="flex items-center mt-1">
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded">
              {category}
            </span>
            <span className="text-sm text-gray-500 ml-2">
              {totalNumberOfSfts} sq ft
            </span>
          </div>
        </div>
        <button className="ml-auto flex items-center text-blue-600 text-sm">
          <MapPin className="h-4 w-4 mr-1" />
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            view on map
          </a>
        </button>
      </div>
      <div className="flex items-center mb-4">
        <MapPin className="h-5 w-5 text-gray-500" />
        <div className="ml-2">
          <div className="text-sm text-gray-500">Location</div>
          <div className="text-sm font-medium">
            {landmark}, {city}, {state}, {country}
          </div>
        </div>
      </div>

      <div className="flex gap-6">
        <div className="flex items-start">
          <div className="bg-blue-100 w-10 h-10 flex items-center justify-center rounded-full text-2xl text-amber-600">
            {currency === "USD" ? "$" : "₹"}
          </div>{" "}
          <div className="ml-2">
            <div className="text-sm text-gray-500">Monthly Income</div>
            <div className="text-xl font-bold">{netMonthlyRent}</div>
          </div>
        </div>

        <div className="flex items-start col-span-2">
          <PercentCircle className="h-5 w-5 text-green-500 mt-0.5" />
          <div className="ml-2 flex-1">
            <div className="text-sm text-gray-500">Occupancy Rate</div>
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold">{100 - vacancyRate} %</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
