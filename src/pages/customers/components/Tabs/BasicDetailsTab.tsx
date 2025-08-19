import AdreesComponet from "../Basic_Details/AdreesComponet";
import EmployeeComponet from "../Basic_Details/Employee";
import PersonalInfo from "../Basic_Details/PersonalInfo";
import Risk from "../Basic_Details/Risk";

const BasicDetailsTab = ({ userDetails }: any) => {
  return (
    <div className="flex flex-col ">
      <div className="flex  justify-between gap-3">
        <PersonalInfo userDetails={userDetails.Current_Applicant_Details} />
        <Risk userDetails={userDetails} />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <AdreesComponet
          userDetail={userDetails.Current_Applicant_Address_Details}
        />
        <EmployeeComponet userDetails={userDetails.Current_Other_Details} />
      </div>
    </div>
  );
};
export default BasicDetailsTab;
