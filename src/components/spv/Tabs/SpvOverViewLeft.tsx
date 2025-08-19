import { Calendar, Dot, Home, Layers } from "lucide-react";
import React from "react";

const spvData = {
  image: "https://images.pexels.com/photos/30247684/pexels-photo-30247684.jpeg",
  type: "Commercial",
  size: "125,000",
  occupancy: "92%",
  capRate: "8.4%",
  noi: "$80,000",
  roi: "12.5%",
  floors: 15,
  suities: 25,
  lastRenovated: 2021,
  keyFeatures: [
    "24/7 Security",
    "Rooftop Garden",
    "Fitness Center",
    "Conference Facilities",
    "Underground Parking",
    "LEED Gold Certified",
  ],
};

const SpvOverViewLeft = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-4">
      <div className="w-full flex items-center justify-center h-80">
        <img
          src={spvData.image}
          className="w-full h-full object-cover rounded-lg"
          alt="property"
        />
      </div>

      <div className="w-full grid grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 flex flex-col gap-2 rounded-md">
          <h1 className="text-lg font-semibold">Quick Stats</h1>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-sm text-gray-500">
              <span>Type:</span>
              <span className="font-semibold text-black">{spvData.type}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Size:</span>
              <span className="font-semibold text-black">{spvData.size} sq ft</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Occupancy:</span>
              <span className="font-semibold text-black">
                {spvData.occupancy}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 flex flex-col gap-2 rounded-md">
          <h1 className="text-lg font-semibold">Financial</h1>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-sm text-gray-500">
              <span>Cap Rate:</span>
              <span className="font-semibold text-green-500">
                {spvData.capRate}
              </span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>NOI:</span>
              <span className="font-semibold">{spvData.noi}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>ROI:</span>
              <span className="font-semibold text-green-500">
                {spvData.roi}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col justify-center gap-4 p-4 bg-gray-50 rounded-md">
        <h1 className="text-xl font-semibold">Property Details</h1>
        <p>
          Premium commercial property in the heart of Manhattan. Class A office
          space with modern amenities and excellent transportation access.
        </p>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white flex items-center gap-4 p-4 rounded-lg text-violet-500 shadow-xs">
            <Layers size={20} />
            <div className="text-black">
              <h1 className="text-sm text-gray-500">Floors</h1>
              <p className="font-semibold">{spvData.floors}</p>
            </div>
          </div>
          <div className="bg-white flex items-center gap-4 p-4 rounded-lg text-violet-500 shadow-xs">
            <Home size={20} />
            <div className="text-black">
              <h1 className="text-sm text-gray-500">Suites</h1>
              <p className="font-semibold">{spvData.suities}</p>
            </div>
          </div>
          <div className="bg-white flex items-center gap-4 p-4 rounded-lg text-violet-500 shadow-xs">
            <Calendar size={20} />
            <div className="text-black">
              <h1 className="text-sm text-gray-500">Last Renovated</h1>
              <p className="font-semibold">{spvData.lastRenovated}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full p-4 bg-gray-50 rounded-md flex flex-col gap-4">
        <h1 className="text-xl font-semibold">Key Features</h1>
        <div className="grid grid-cols-2 gap-4">
          {spvData.keyFeatures.map((feature, index) => (
            <span
              key={index}
              className="text-violet-500 bg-white rounded-lg flex items-center shadow-xs"
            >
              <Dot size={48} strokeWidth={3} />
              <span className="text-black font-semibold">{feature}</span>
            </span>
          ))}
        </div>
        <p className="border border-[#EDE9FE] p-3 text-violet-500 font-semibold rounded-lg">
          Premium property with modern amenities and excellent location value.
        </p>
      </div>
    </div>
  );
};

export default SpvOverViewLeft;
