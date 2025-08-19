import { CreditChart } from "../Charts_Graphs/CreditChart";
import CreditScoreFactors from "./CreditScoreFactors";

const CreditOverview = ({ creditScore }: any) => {
  return (
    <div className="bg-white w-12/12 flex  shadow-sm border border-gray-200 rounded-lg">
      <CreditChart creditScore={creditScore} />
      <CreditScoreFactors creditScore={creditScore} />
    </div>
  );
};
export default CreditOverview;
