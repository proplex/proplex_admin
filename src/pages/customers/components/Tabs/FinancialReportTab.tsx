import AccountSummary from "../Financial_Report/AccountSummary";
import CreditOverview from "../Financial_Report/CreditOverview";
import CreditUtilization from "../Financial_Report/CreditUtilization";
import OutStandingbalance from "../Financial_Report/OutStandingBalance";

const FinancialReportTab = ({ financialDetails, creditScore }: any) => {
  const { Credit_Account, Total_Outstanding_Balance } =
    financialDetails.CAIS_Summary;



  return (
    <div className="flex flex-col ">
      <div className="flex  justify-between gap-3">
        <CreditOverview creditScore={creditScore} />
      </div>

      <div className="grid grid-cols-3 gap-4 mt-3">
        <AccountSummary accounts={Credit_Account} />
        <OutStandingbalance balances={Total_Outstanding_Balance} />
        <CreditUtilization />
      </div>
    </div>
  );
};
export default FinancialReportTab;
