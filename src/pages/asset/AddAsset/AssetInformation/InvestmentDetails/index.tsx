import AssetPrice from "./AssetPrice";

interface AssetProps {
  asset: any; // Replace 'any' with the actual type of 'asset' if known
}

function Index({ asset }: AssetProps) {
  return (
    <div className='flex flex-col gap-4'>
      <AssetPrice />
      {/* <Investment /> */}
    </div>
  );
}
export default Index;