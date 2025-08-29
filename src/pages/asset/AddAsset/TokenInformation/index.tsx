import { useParams } from "react-router-dom";
import { Suspense } from "react";
import Loading from "@/components/ui/Loading";
import TokenDetails from "./TokenDetails";

interface Props {
  tab?: string;
  step?: string;
  asset?: any;
}

const TokenInformationComponent = ({ asset }: Props) => {
  const { id = null } = useParams<{ id?: string }>();

  return (
    <Suspense fallback={<div>Loading Token Information...</div>}>
      <div className="max-w-7xl mx-auto p-4">
        {/* Direct Token Details */}
        <Suspense fallback={<div className="flex items-center justify-center p-8"><Loading /></div>}>
          <TokenDetails />
        </Suspense>
      </div>
    </Suspense>
  );
}

TokenInformationComponent.displayName = "TokenInformationComponent";

export default TokenInformationComponent;