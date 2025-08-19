import { useNavigate, useParams } from "react-router-dom";
import { Suspense, useCallback, useMemo, JSX } from "react";
import { ASSET_STEPS_TABS } from "@/constants/global";
import Loading from "@/components/ui/Loading";
import TokenInformation from "./TokenAllocation";
import DAO from "../AssetInformation/AssetType/DAO/index";
interface Props {
  tab: string;
  step: string;
  asset?: any; // Adjust to the correct type
}

const IssuesDue =({ tab, step, asset }: Props) => {
  const { id = null } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  const COMPONENT_MAP: Record<string, JSX.Element> = {
    "token-information": (
      <Suspense fallback={<Loading />}>
        <TokenInformation />
      </Suspense>
    ),
    "dao-information": (
      <Suspense fallback={<Loading />}>
        <DAO  asset={asset} />
      </Suspense>
    ),
  } as const;

  // Memoized tab change handler
  const handleTabChange = useCallback(
    (tabId: string) => {
      const basePath = id ? `/edit-asset/${id}` : "/add-asset";
      navigate(`${basePath}?step=${step}&tab=${tabId}`, { replace: false });
    },
    [id, navigate, step]
  );

  const tabs = useMemo(() => {
    const stepTabs =
      ASSET_STEPS_TABS.find((ele) => ele.id === step)?.tabs || [];
    return stepTabs.map((tabItem) => ({
      id: tabItem.id,
      title: tabItem.title,
      component: COMPONENT_MAP[tabItem.id] || <div />,
    }));
  }, [step]);

  return (
    <Suspense fallback={<div>Loading Asset Information...</div>}>
      <div className="asset-information">
        <TokenInformation />
        {/* <CustomTabs
          defaultTab={tab}
          tabs={tabs}
          handleTabChange={handleTabChange}
          aria-label='Asset information tabs'
        /> */}
      </div>
    </Suspense>
  );
}

IssuesDue.displayName = "IssuesDue";

export default IssuesDue;
