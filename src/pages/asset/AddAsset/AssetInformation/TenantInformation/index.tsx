import TenantManagement from "./Tenat";
import Expenses from "./Expenses";
function TenantInformation({ asset }: any) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex justify-center items-center w-full">
        <TenantManagement />
      </div>
      <div className="flex justify-between items-center w-full">
        <Expenses />
      </div>
    </div>
  );
}
export default TenantInformation;
