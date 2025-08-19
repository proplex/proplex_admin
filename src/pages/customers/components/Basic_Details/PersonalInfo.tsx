import InfoItem, { ProgressBar } from "@/pages/customer/components/helper";
// import { formatDate } from "@/utils/role.utils";
// import { format, parse } from "date-fns";
import {formatDOB} from '../../../../helpers/formatBirthdate'

import { Calendar, IdCardIcon, Mail, Phone, Shield, User } from "lucide-react";
import React from "react";

type PersonalInfoProps = {
  userDetails: any;
};

const PersonalInfo: React.FC<PersonalInfoProps> = ({ userDetails }) => {
  return (
    <>
      <div className="bg-white w-8/12  shadow-sm border border-gray-200 rounded-lg p-5">
        <h1 className="font-bold text-xl text-black ">Personal Information</h1>
        <div className="flex gap-5 border-b border-gray-200 items-center ">
          <div className="flex flex-col items-center text-center gap-2">
            <img
              src="https://picsum.photos/200"
              alt="Profile"
              className="rounded-full h-24 w-24 object-cover border-2 border-gray-300"
            />
            <h2 className="text-xl font-semibold text-gray-800">
              {userDetails?.First_Name + " " + userDetails?.Last_Name ||
                "Full Name"}
            </h2>
            <p className="text-sm text-gray-500">
              {userDetails?.EMailId || "email@example.com"}
            </p>

            <span className="mt-1 px-3 py-1 text-xs bg-gray-100 text-gray-600 rounded-full border border-gray-300">
              Customer since 2023
            </span>
          </div>
          <div className="grid grid-cols-2 gap-y-5   gap-x-50">
            <InfoItem
              icon={<User />}
              iconBg="blue"
              title="Full Name"
              value={
                userDetails?.First_Name + " " + userDetails?.Last_Name || "NA"
              }
            />
            <InfoItem
              icon={<Calendar />}
              iconBg="violet"
              title="Date Of Birth"
              value={
                userDetails?.Date_Of_Birth_Applicant ?
                formatDOB(userDetails?.Date_Of_Birth_Applicant):"hello"

              }
            />
            <InfoItem
              icon={<Mail />}
              iconBg="green"
              title="Email Address"
              value={userDetails?.EMailId || "NA"}
            />
            <InfoItem
              icon={<Phone />}
              iconBg="amber"
              title="Phone"
              value={userDetails?.MobilePhoneNumber || "NA"}
            />
            <InfoItem
              icon={<IdCardIcon />}
              iconBg="red"
              title="Pan"
              value={userDetails?.IncomeTaxPan || "NA"}
            />
            <InfoItem
              icon={<Shield />}
              iconBg="indigo"
              title="Aadhar"
              value={userDetails?.aadhar || "NA"}
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-5">
          <ProgressBar
            progress={userDetails?.name_match_score || 0}
            title="Name Match"
          />
          <ProgressBar
            progress={userDetails?.dob_match_score || 0}
            title="DOB Match"
          />
          <ProgressBar
            progress={userDetails?.mobile_number_match_score || 0}
            title="Mobile Number Match"
          />
        </div>
      </div>
    </>
  );
};

export default PersonalInfo;
