import { useNavigate } from 'react-router-dom';
import React from 'react';
import { CheckCircle, AlertCircle, XCircle, MapPin } from 'lucide-react';

export const getStatusClasses = (status: string) => {
  switch (status) {
    case "Booked":
      return {
        textClass: "text-green-800", // Darker green for better readability
        bgClass: "bg-green-100", // Light green background
      };
    case "Document_Signature_Pending":
      return {
        textClass: "text-blue-800", // Dark blue for pending actions
        bgClass: "bg-blue-100", // Light blue background
      };
    case "Full_Payment_Pending":
      return {
        textClass: "text-yellow-800", // Dark yellow for pending payments
        bgClass: "bg-yellow-100", // Light yellow background
      };
    case "Full_Payment_Done":
      return {
        textClass: "text-green-800", // Dark green for completed payments
        bgClass: "bg-green-100", // Light green background
      };
    case "Token_Transfer":
      return {
        textClass: "text-purple-800", // Dark purple for token-related actions
        bgClass: "bg-purple-100", // Light purple background
      };
    case "Cancelled":
      return {
        textClass: "text-red-800", // Dark red for cancelled status
        bgClass: "bg-red-100", // Light red background
      };
    case "Refunded":
      return {
        textClass: "text-gray-800", // Dark gray for refunded status
        bgClass: "bg-gray-100", // Light gray background
      };
    default:
      return {
        textClass: "text-gray-800", // Default dark gray text
        bgClass: "bg-gray-100", // Default light gray background
      };
  }
};



import { Button } from '@/components/ui/button';

import { ArrowRightIcon, Bell,  Clock, LucideProps, Send,  } from 'lucide-react';
import { JSX } from 'react/jsx-runtime';
import { title } from 'process';

export const ekycStatusConfig: Record<string, { label: string; icon: JSX.Element; className: string }> = {
  verified: {
    label: 'Verified',
    icon: <CheckCircle className="h-4 w-4 mr-1" />,
    className: 'text-green-700 bg-green-400/10',
  },
  pending: {
    label: 'Pending',
    icon: <Clock className="h-4 w-4 mr-1" />,
    className: 'text-amber-700 bg-amber-400/10',
  },
  null: {
    label: 'Null',
    icon: <XCircle className="h-4 w-4 mr-1" />,
    className: 'text-gray-500 bg-gray-400/10',
  },
};




export const approvalStatusConfig: Record<string, { label: string; icon: JSX.Element; className: string }> = {
  approved: {
    label: 'Approved',
    icon: <CheckCircle className="h-4 w-4 mr-1" />,
    className: 'text-green-500',
  },
  pending: {
    label: 'Pending',
    icon: <Clock className="h-4 w-4 mr-1" />,
    className: 'text-gray-500',
  },
  rejected: {
    label: 'Rejected',
    icon: <XCircle className="h-4 w-4 mr-1" />,
    className: 'text-red-700',
  },
  null: {
    label: 'Null',
    icon: <XCircle className="h-4 w-4 mr-1" />,
    className: 'text-gray-500',
  },
};


type ActionType = "reminder" | "notification" | "null";

type ActionConfig = {
  element: JSX.Element;
  onClick?: () => void;
};

export const actionButtonConfig = (navigate: ReturnType<typeof useNavigate>): Record<ActionType, ActionConfig> => ({
  reminder: {
    element: (
      <Button
        variant="ghost"
        size="sm"
        className="text-amber-500 border-1 border-amber-200"
        onClick={() => actionButtonConfig(navigate).reminder.onClick?.()}
      >
        <Send className="h-4 w-4 mr-1" />
        Send Reminder
      </Button>
    ),
    onClick: () => {
      console.log("Reminder button clicked");
    },
  },
  notification: {
    element: (
      <Button
        variant="ghost"
        size="sm"
        className="text-blue-500 border-1 border-blue-200"
        onClick={() => actionButtonConfig(navigate).notification.onClick?.()}
      >
        <Bell className="h-4 w-4 mr-1" />
        Send Notification
      </Button>
    ),
    onClick: () => {
      console.log("Notification button clicked");
    },
  },
  null: {
    element: (
      <div
        className="w-6 h-6 mx-auto cursor-pointer"
        onClick={() => actionButtonConfig(navigate).null.onClick?.()}
      >
        <ArrowRightIcon className="h-4 w-4 text-black" />
      </div>
    ),
    onClick: () => {
      console.log("Null action clicked");
      navigate("customers-profile/111");
    },
  },
});


type InfoItemProps = {
  icon: React.ReactElement<LucideProps & { className?: string }>;
  iconBg?: string;
  title: string;
  value: string;
};

const InfoItem: React.FC<InfoItemProps> = ({ icon, iconBg = 'bg-blue-100', title, value }) => {
  return (
    <div className="flex items-center gap-4 p-3 rounded-lg  bg-white">
      {/* Icon Section */}
      <div className={`p-2 rounded-full ${iconBg} text-blue-600 flex items-center justify-center`}>
        {React.isValidElement(icon) && React.cloneElement(icon, { className: 'h-5 w-5' })}
      </div>

      {/* Content Section */}
      <div className="flex flex-col">
        <span className="text-xs text-gray-500">{title}</span>
        <span className="text-sm font-medium text-gray-800">{value}</span>
      </div>
    </div>
  );
};

export default InfoItem;


export const ProgressBar = ({ progress, title }: { progress: number; title: string }) => {
  return (
    <div className="bg-gray-400/10 p-2 border border-gray-200 rounded-lg flex flex-col justify-center items-center gap-2">
      <span className="text-xs text-black">{title}</span>

      <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
        <div
          className="bg-blue-500 h-1.5 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <span className="text-xs text-gray-600 font-medium">{progress}%</span>
    </div>
  );
};






type HorizontalDataProps = {
  value: string;
  title: string;
};

export const HorizontalData: React.FC<HorizontalDataProps> = ({ value, title }) => {
  let icon = null;
  let iconColor = '';

  switch (value.toLowerCase()) {
    case 'approved':
    case 'verified':
      icon = <CheckCircle className="h-5 w-5" />;
      iconColor = 'bg-green-100 text-green-600';
      break;
    case 'pending':
      icon = <AlertCircle className="h-5 w-5" />;
      iconColor = 'bg-yellow-100 text-yellow-600';
      break;
    case 'rejected':
      icon = <XCircle className="h-5 w-5" />;
      iconColor = 'bg-red-100 text-red-600';
      break;
    default:
      icon = <AlertCircle className="h-5 w-5" />;
      iconColor = 'bg-gray-100 text-gray-600';
  }

  return (
    <div className="flex items-center gap-3 p-3 rounded-md border border-gray-200 bg-white shadow-sm">
      <div className={`p-2 rounded-full flex items-center justify-center ${iconColor}`}>
        {icon}
      </div>
      <div className="flex justify-between w-full">
        <span className="text-base font-medium text-black capitalize">{title}</span>
        <span className="text-base font-medium text-black capitalize">{value}</span>
      </div>
    </div>
  );
};

type AddressTypeProps = {
  value: string;
  title: string;
};

export const AddressTypeConfig: React.FC<AddressTypeProps> = ({ title, value }) => {
  return (
    <div className="flex items-start gap-3 p-3">
      <div className="bg-green-400/20 rounded-full p-2">
       <MapPin className="h-5 w-5" />
      </div>
      <div className="flex flex-col">
        <span className="text--xl font-medium text-black">{title}</span>
        <span className="text-base font-medium  text-black bg-gray-200 rounded-xl p-2 ">{value}</span>
      </div>
    </div>
  );
};

type EmployeeProps = {
  icon: React.ReactElement<LucideProps & { className?: string }>;
  value: string;
  title: string;
};

