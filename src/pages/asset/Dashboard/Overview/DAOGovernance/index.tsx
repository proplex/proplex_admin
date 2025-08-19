import { Settings } from "lucide-react";

interface DAOGovernanceProps {
  assetOverview: any; // Replace 'any' with the actual type if known
}

export function DAOGovernance({ assetOverview }: DAOGovernanceProps) {
  const { blockchain, votingPeriod, proposalThresholdPercent, quorumPercent,governanceModel,tokenSymbol,daoName } =
    assetOverview?.company?.daoConfiguration || {};

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Settings className="h-5 w-5 text-blue-500" />
          <h3 className="text-lg font-medium ml-2">DAO Governance</h3>
        </div>
        <button className="text-gray-400 hover:text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <p className="text-sm text-gray-500 mb-6">
        Decentralized organization structure and voting parameters
      </p>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <div className="text-sm text-gray-500">DAO Name</div>
          <div className="font-medium">{daoName}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Token Symbol</div>
          <div className="flex items-center">
            <span className="font-medium">{tokenSymbol}</span>
            <span className="text-xs text-gray-500 ml-2">(5-9 characters)</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-blue-500 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="text-sm text-gray-500 mb-2">Selected Blockchain</div>
        <div className="flex items-center">
          <span className="inline-block h-3 w-3 rounded-full bg-black mr-2"></span>
          <span className="font-medium">{blockchain}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-blue-500 ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center mb-2">
          <Settings className="h-5 w-5 text-gray-500" />
          <div className="text-sm font-medium ml-2">Governance Model</div>
        </div>
        <div className="flex items-center mb-2">
          <span className="inline-block h-3 w-3 rounded-full bg-blue-500 mr-2"></span>
          <span className="font-medium">{governanceModel}</span>
        </div>
        <p className="text-sm text-gray-500 pl-5">
          Voting power based on reputation and contributions
        </p>
      </div>

      <div className="mb-6">
        <div className="flex items-center mb-4">
          <Settings className="h-5 w-5 text-blue-500" />
          <h4 className="font-medium ml-2">DAO Features</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
              <svg
                className="h-3 w-3 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <div className="text-sm font-medium">Unlimited Members</div>
              <div className="text-xs text-gray-500">DAO LLC Members</div>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
              <svg
                className="h-3 w-3 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <div className="text-sm font-medium">Treasury Management</div>
              <div className="text-xs text-gray-500">
                Treasury management enabled
              </div>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
              <svg
                className="h-3 w-3 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <div className="text-sm font-medium">Voting Enabled</div>
              <div className="text-xs text-gray-500">
                Member vote option enabled
              </div>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
              <svg
                className="h-3 w-3 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <div className="text-sm font-medium">75% Votes required</div>
              <div className="text-xs text-gray-500">
                Vote Consensus threshold
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center mb-4">
          <Settings className="h-5 w-5 text-blue-500" />
          <h4 className="font-medium ml-2">DAO Features</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
              <svg
                className="h-3 w-3 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <div className="text-sm font-medium">Voting Rights</div>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
              <svg
                className="h-3 w-3 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <div className="text-sm font-medium">Admin Vote Power</div>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
              <svg
                className="h-3 w-3 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <div className="text-sm font-medium">Proposal Creation</div>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
              <svg
                className="h-3 w-3 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <div className="text-sm font-medium">Governance Parameters</div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center mb-4">
          <Settings className="h-5 w-5 text-blue-500" />
          <h4 className="font-medium ml-2">Governance Parameters</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="text-sm text-gray-500">Proposal Threshold</div>
            <div className="flex items-center">
              <span className="font-medium">{proposalThresholdPercent}%</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-blue-500 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          <div>
            <div className="text-sm text-gray-500">Quorum</div>
            <div className="flex items-center">
              <span className="font-medium">{quorumPercent}%</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-blue-500 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          <div>
            <div className="text-sm text-gray-500">Voting Period</div>
            <div className="flex items-center">
              <span className="font-medium">
                {votingPeriod?.days}d {votingPeriod?.hours}h
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-blue-500 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
