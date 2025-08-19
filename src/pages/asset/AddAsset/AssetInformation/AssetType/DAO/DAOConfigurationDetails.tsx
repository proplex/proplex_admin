import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Circle } from "lucide-react";

type DAOConfigurationDetailsProps = {
  daoConfig: {
    daoName?: string;
    tokenSymbol?: string;
    blockchain?: string;
    governanceModel?: string;
    governanceRights?: {
      votingRights?: boolean;
      proposalCreation?: boolean;
      adminVotePower?: boolean;
    };
    proposalThresholdPercent?: number;
    quorumPercent?: number;
    votingPeriod?: {
      days?: number;
      hours?: number;
    };
    issuerRepSignature?: boolean;
  } | null;
};

const DAOConfigurationDetails = ({
  daoConfig,
}: DAOConfigurationDetailsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 rounded-lg border border-gray-200 p-6 mt-6 bg-white">
      {/* Left Column */}
      <div className="space-y-6">
        <Card className="p-4 bg-gray-50">
          <div className="space-y-1">
            <p className="text-sm text-gray-500">DAO Name</p>
            <h3 className="text-2xl font-bold">
              {daoConfig?.daoName || "N/A"}
            </h3>
          </div>
        </Card>

        <Card className="p-4 bg-gray-50">
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Token Symbol</p>
            <h3 className="text-2xl font-bold">
              {daoConfig?.tokenSymbol?.toUpperCase() || "N/A"}
            </h3>
            <p className="text-xs text-gray-500">(2-5 characters)</p>
          </div>
        </Card>

        <Card className="p-4 bg-gray-50">
          <div className="space-y-3">
            <p className="text-sm text-gray-500">Selected Blockchain</p>
            <div className="flex items-center gap-2">
              <div className="bg-black rounded-full p-1">
                <Circle className="h-4 w-4 text-white" />
              </div>
              <span className="text-gray-700">
                {daoConfig?.blockchain?.toUpperCase() || "N/A"}
              </span>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gray-50">
          <div className="space-y-3">
            <p className="text-sm text-gray-500">Governance Model</p>
            <div className="bg-gray-200 rounded-sm p-2 inline-flex items-center gap-2">
              <Circle className="h-5 w-5 text-gray-700 fill-gray-700" />
              <div>
                <p className="font-medium">
                  {daoConfig?.governanceModel?.toUpperCase() || "N/A"}
                </p>
                <p className="text-xs text-gray-600">
                  Voting power based on reputation and contributions
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Right Column */}
      <div className="space-y-6">
        {/* Governance Rights */}
        <div className="space-y-4">
          <h3 className="font-bold text-lg">Governance Rights</h3>

          <div className="flex items-center justify-between">
            <span>Voting Rights</span>
            <Switch
              disabled
              defaultChecked={
                daoConfig?.governanceRights?.votingRights ?? false
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <span>Proposal Creation</span>
            <Switch
              disabled
              defaultChecked={
                daoConfig?.governanceRights?.proposalCreation ?? false
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <span>Admin Vote Power</span>
            <Switch
              disabled
              defaultChecked={
                daoConfig?.governanceRights?.adminVotePower ?? false
              }
            />
          </div>
        </div>

        {/* Governance Parameters */}
        <div className="space-y-4">
          <h3 className="font-bold text-lg">Governance Parameters</h3>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-sm text-gray-500">Proposal Threshold</p>
              <p className="font-bold text-lg">
                {daoConfig?.proposalThresholdPercent ?? 0}%
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Quorum</p>
              <p className="font-bold text-lg">
                {daoConfig?.quorumPercent ?? 0}%
              </p>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-gray-500">Voting Period</p>
              <p className="font-bold text-lg">
                {daoConfig?.votingPeriod?.days ?? 0} days{" "}
                {daoConfig?.votingPeriod?.hours ?? 0} hours
              </p>
            </div>
          </div>
        </div>

        {/* Authorized Issuer */}
        <div className="space-y-2">
          <h3 className="font-bold text-lg">
            Authorized Issuer Representative signature
          </h3>
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Please note that your token symbol will be reserved for not more
              than 60 days if you could not use it.
            </p>
            <Switch
              defaultChecked={daoConfig?.issuerRepSignature ?? false}
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DAOConfigurationDetails;
