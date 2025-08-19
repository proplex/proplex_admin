import { CreditCard } from "lucide-react";
import { PieChart } from "../Charts_Graphs/PieChart";
import { de } from "date-fns/locale";

const AccountSummary = ({ accounts }: any) => {
  const {
    CreditAccountActive: activeAccounts,
    CreditAccountClosed: closedAccounts,
  } = accounts;
  return (
    <div className="space-y-4 border border-gray-200 p-5 mt-4 rounded-md bg-white shadow-sm">
      <h1 className="flex text-2xl font-bold items-center gap-2">
        {" "}
        <span>
          <CreditCard size={20} />
        </span>
        Account Summary
      </h1>

      <PieChart
        data={[
          { name: "Active", value: activeAccounts, color: "#3B82F6" }, // blue
          { name: "Closed", value: closedAccounts, color: "#EF4444" }, // red
        ]}
      />

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-blue-50 flex flex-col items-center rounded-xl py-4">
          <p className="text-sm text-gray-500">Total</p>
          <h1 className="text-blue-500 font-bold text-2xl  ">
            {activeAccounts + closedAccounts}
          </h1>
        </div>
        <div className="bg-green-50 flex flex-col items-center rounded-xl py-4">
          <p className="text-sm text-gray-500">Active</p>
          <h1 className="text-green-500 font-bold text-2xl  ">
            {activeAccounts}
          </h1>
        </div>
        <div className="bg-red-50 flex flex-col items-center rounded-xl py-4">
          <p className="text-sm text-gray-500">Closed</p>
          <h1 className="text-red-500 font-bold text-2xl  ">
            {closedAccounts}
          </h1>
        </div>
      </div>
    </div>
  );
};
export default AccountSummary;
