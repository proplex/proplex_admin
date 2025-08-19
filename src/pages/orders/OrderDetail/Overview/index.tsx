import { Card, CardContent } from "@/components/ui/card";
import { formatCompactNumber, handleCopy } from "@/helpers/global";
import { Mail, Phone, Copy } from "lucide-react";

interface Investor {
  fullName: string;
  email: string;
  phoneNumber?: string;
  avatar?: string;
}

interface Company {
  name: string;
}

interface Asset {
  name: string;
  tokenInformation?: {
    tokenPrice: number;
  };
}

interface PriceBreakupItem {
  _id: string;
  name: string;
  value: number;
  isPercentage?: boolean;
  percentage?: number;
}

interface Order {
  _id: string;
  investor: Investor;
  company: Company;
  asset: Asset;
  totalOrderValue: number;
  tokensBooked: number;
  breakup: PriceBreakupItem[];
  currency: "usd" | "inr";
}

const InfoRow = ({
  label,
  value,
  currency,
}: {
  label: React.ReactNode;
  value: React.ReactNode;
  currency?: "usd" | "inr";
}) => (
  <div className="flex justify-between items-center">
    <span className="text-gray-600">{label}</span>
    <span className="font-medium">
      {typeof value === "number"
        ? `${currency === "usd" ? "$" : "₹"} ${value}`
        : value ?? "N/A"}
    </span>
  </div>
);

export default function OrderDetailsPage({ order }: { order: Order }) {
  const {
    investor,
    company,
    asset,
    totalOrderValue,
    tokensBooked,
    breakup = [],
    _id,
    currency,
  } = order || {};


  const tokenPrice = asset?.tokenInformation?.tokenPrice ?? 0;
  const tokenTotal = tokensBooked * tokenPrice;

  return (
    <Card className="border-gray-200">
      <CardContent className="p-6">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Customer Info */}
          <section>
            <h2 className="text-xl font-semibold mb-6">Customer Information</h2>

            <div className="flex items-center gap-4 mb-6">
              <img
                src={investor?.avatar || "/placeholder.jpg"}
                alt={investor?.fullName || "Profile Image"}
                className="w-16 h-16 rounded-full object-cover"
              />
              <h3 className="text-lg font-medium">{investor?.fullName}</h3>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <span>{investor?.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gray-400" />
                <span>{investor?.phoneNumber || "N/A"}</span>
              </div>
            </div>

            <div className="border-t pt-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Order ID:</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{_id}</span>
                  <button
                    onClick={() => handleCopy(_id)}
                    className="text-gray-400 hover:text-gray-600"
                    aria-label="Copy Order ID"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <InfoRow label="SPV Name:" value={company?.name} />
              <InfoRow label="Asset Name:" value={asset?.name} />
              <InfoRow label="Payment Type:" value="USDT" />
            </div>
          </section>

          {/* Payment Info */}
          <section>
            <h2 className="text-xl font-semibold mb-6">Payment Summary</h2>

            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-600">Total:</span>
              <span className="text-xl font-semibold">
                {currency === "usd" ? "$" : "₹"} {totalOrderValue}
              </span>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-medium mb-2">Price Breakup</h3>
              <div className="space-y-2">
                <InfoRow
                  label={`Tokens Price (${tokensBooked} x ${tokenPrice})`}
                  value={tokenTotal}
                  currency={currency}
                />
                {breakup.map((item) => (
                  <InfoRow
                    key={item._id}
                    label={
                      <>
                        {item.name}
                        {item.isPercentage && (
                          <span className="ml-2 text-sm text-gray-500">
                            ({item.percentage}%)
                          </span>
                        )}
                      </>
                    }
                    value={formatCompactNumber(item.value)}
                    currency={currency}
                  />
                ))}
              </div>
              <div className="border-t my-4" />
              <InfoRow
                label="Total Price"
                value={totalOrderValue}
                currency={currency}
              />
            </div>
          </section>
        </div>
      </CardContent>
    </Card>
  );
}
