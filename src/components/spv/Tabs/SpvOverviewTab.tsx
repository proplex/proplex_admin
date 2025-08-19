import SpvOverViewLeft from "./SpvOverViewLeft";
import SpvOverViewRight from "./SpvOverViewRight";

const SpvOverviewTab = () => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4 items-center justify-center">
        <SpvOverViewLeft />
        <SpvOverViewRight
          title="Annual Revenue"
          currentFunding={1500000}
          fundingTarget={1750000}
        />
      </div>
    </>
  );
};

export default SpvOverviewTab;
