import FormGenerator from "@/components/UseForm/FormGenerator";
import { assetCategory } from "./assetCategory";
import { assetStageConfig } from "./assetStageConfig";
import { assetInfoConfig } from "./assetInfoConfig";
import DAO from "./DAO";

function Index({ asset }: { asset: any }) {
  return (
    <div>
      <div className="space-y-4">
        <h1 className="text-xl font-semibold">Asset Category</h1>
        <div className="grid grid-cols-4 gap-4">
          {FormGenerator(assetCategory())}
        </div>

        <h1 className="text-xl font-semibold">Asset Stage</h1>
        <div className="grid grid-cols-4 gap-4">
          {FormGenerator(assetStageConfig())}
        </div>

        <div className="grid  grid-cols-2  gap-2">
          {FormGenerator(assetInfoConfig({
            asset
          }))}
        </div>

        <DAO asset={asset} />
      </div>
    </div>
  );
}

export default Index;
