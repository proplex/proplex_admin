import { useAssetApi } from "@/hooks/asset/useAssetApi";
import CustomTabs from "@/components/ui/custom-tab";
import queryString from "query-string";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import Loading from "@/components/ui/Loading";
import Documents from "./Documents";
import Orders from "./Orders";
import Investors from "./Investors";
import Overview from "./Overview";

const Index = () => {
  const navigate = useNavigate();
  const { id = null } = useParams();
  const { assetOverview, getAssetOverview, isPending } = useAssetApi();
  const queryParams = queryString.parse(location.search);

  useEffect(() => {
    const fetchAsset = async () => {
      if (id) {
        await getAssetOverview(id);
      }
    };
    fetchAsset();
  }, [id]);

  const tab: string = Array.isArray(queryParams["tab"])
    ? queryParams["tab"][0] || "overview"
    : queryParams["tab"] || "overview";

  const tabs = [
    {
      id: "overview",
      title: "Overview",
      component: <Overview assetOverview={assetOverview} />,
    },
    {
      id: "investers",
      title: "Investers",
      component: <Investors assetOverview={assetOverview} />,
    },
    {
      id: "orders",
      title: "Orders",
      component: <Orders assetOverview={assetOverview} />,
    },
    {
      id: "documents",
      title: "Documents",
      component: <Documents assetOverview={assetOverview} />,
    },
  ];

  const handleTabChange = (tabId: string) => {
    navigate(`/dashborad-asset/${id}?tab=${tabId}`, { replace: true });
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <CustomTabs
        defaultTab={tab}
        tabs={tabs}
        handleTabChange={handleTabChange}
        aria-label="Additional Details"
      />
    </div>
  );
};
export default Index;
