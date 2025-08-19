import React from "react";
import { Bell, Calendar, Download, MoveLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { log } from "console";

type HeaderProps = {
  userDetails: any;
  customer : number;
};

const Header: React.FC<HeaderProps> = ({ userDetails , customer }) => {
  const navigate = useNavigate();
  
  
  return (
    <div className="flex justify-between items-center mb-6 mt-5">
      {/* Left section: Back + Info */}
      <div className="flex items-center gap-4">
        {/* Go Back */}
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-600 hover:text-black"
          onClick={() => navigate(-1)}
        >
          <MoveLeft className="h-5 w-5" />
        </Button>

        {/* User Info */}
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold">
            {userDetails?.First_Name + " " + userDetails?.Last_Name ||
              "Default"}
          </h1>
          <span className="text-gray-500 text-sm">Customer ID: {customer}</span>
        </div>
      </div>

      {/* Right section: Action Buttons */}
      <div className="flex gap-2">
        <Button variant="assetButton">
          <Calendar />
          <span> Schedule Call</span>
        </Button>
        <Button variant="assetButton">
          <Download />
          <span> Export Data</span>
        </Button>
        <Button variant="assetButton">
          <Bell />
        </Button>
      </div>
    </div>
  );
};

export default Header;
