import { DollarSign, Wallet } from "lucide-react";
import { PieChart } from "../Charts_Graphs/PieChart";

const OutStandingbalance = ({ balances }: any) => {
  const {
    Outstanding_Balance_All,
    Outstanding_Balance_Secured: Secured,
    Outstanding_Balance_UnSecured: UnSecured,
  } = balances;

  console.log(Outstanding_Balance_All, Secured , UnSecured , "Balance")

  return (
    <div className="space-y-4 border border-gray-200 p-5 mt-4 rounded-md bg-white shadow-sm">
      <h1 className="flex text-2xl font-bold items-center gap-2">
        {" "}
        <span>
          <Wallet size={20} />
        </span>
        Outstanding Balance
      </h1>

      <PieChart
        data={[
          // {name : ""}
          { name: "Secured", value: Secured, color: "#3B82F6" }, // blue
          { name: "UnSecured", value: UnSecured, color: "#02c4a1" }, // red
        ]}
      />

      <div className="flex flex-col gap-3 items-center w-full">
        <div className=" flex flex-col items-center rounded-xl py-4">
          <p className="text-sm text-gray-500">Total Outstanding</p>
          <h1 className="text-black font-bold text-2xl flex items-center gap-2 ">
            {/* <DollarSign color="#7758f5" size={20} /> */}₹{" "}
            {/* {Secured + UnSecured} */}
            {Outstanding_Balance_All}
          </h1>
        </div>
        <hr className="w-[80%]" />
        <div className="flex justify-around w-full">
          <div className=" flex flex-col items-center rounded-xl py-4">
            <p className="text-sm text-gray-500">Secured</p>
            <h1 className=" font-bold text-2xl  ">₹ {Secured}</h1>
          </div>
          <div className=" flex flex-col items-center rounded-xl py-4">
            <p className="text-sm text-gray-500">Unsecured</p>
            <h1 className=" font-bold text-2xl  ">₹ {UnSecured}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OutStandingbalance;
