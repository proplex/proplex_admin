



import {
  ArrowLeft,
  ChevronRight,
  Mail,
  MapPin,
  Phone,
  Clock,
  Star,
  CreditCard,
  Building,
  FileText,
  Wallet,
  AlertCircle,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TransactionsData from "./components/transactions/TransactionsData"
import { useParams } from "react-router-dom";
import { useGetCustomer } from "@/hooks/useGetCustomer";
import formatDate from "@/constants/formatdate"
import {WalletCard} from "./components/portfolio-wallet"
import {OrdersTable} from "./components/my-orders/OrdersTable"

const CustomerProfile = () => {
  const { id } = useParams();
  const { data: customer, loading, error } = useGetCustomer(Number(id));

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#58AC7B] mx-auto mb-4"></div>
        Loading customer details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center ">
        <AlertCircle className="h-8 w-8 mx-auto mb-4" />
        {error}
      </div>
    );
  }


  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="flex items-center mb-8">
        <ArrowLeft 
          className="w-5 h-5 mr-3 text-[#1f2329] cursor-pointer" 
          onClick={() => window.history.back()}
        />
        <h1 className="text-2xl font-bold text-[#1f2329]">Customer Portfolio</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - User Details */}
        <div className="md:col-span-1">
          <div className="flex items-center mb-6">
            <div className="relative mr-4">
              <img
                src={customer?.user?.avatar}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#0ac295] rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[#1f2329]">{customer?.user?.name}</h2>
              <div className="text-sm text-[#6a7381]">Active</div>
            </div>
          </div>

          {/* User Details Section */}
          <div className="mb-8">
            <h3 className="text-base font-semibold mb-4 text-[#1f2329]">User Details</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <Mail className="w-4 h-4 mt-1 mr-3 text-[#6a7381]" />
                <div className="flex items-center">
                  <div className="text-sm text-[#6a7381]">Mail: </div>
                  <div className="text-sm text-[#1f2329]">{customer?.user?.email}</div>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="w-4 h-4 mt-1 mr-3 text-[#6a7381]" />
                <div className="flex items-center">
                  <div className="text-sm text-[#6a7381]">Phone: </div>
                  <div className="text-sm text-[#1f2329]">{customer?.user?.phone}</div>
                </div>
              </div>
              
              {/* <div className="flex items-start">
                <Star className="w-4 h-4 mt-1 mr-3 text-[#6a7381]" />
                <div className="flex items-center">
                  <div className="text-sm text-[#6a7381]">Referral Code: </div>
                  <div className="text-sm text-[#1f2329]">yfgfyjugfwfg-4444</div>
                </div>
              </div> */}

              {
                customer?.user?.created_at && (
                  <div className="flex items-start">
                  <Clock className="w-4 h-4 mt-1 mr-3 text-[#6a7381]" />
                  <div className="flex items-center">
                    <div className="text-sm text-[#6a7381]">Joined at: </div>
                    <div className="text-sm text-[#1f2329]">{customer?.user?.created_at ? formatDate(customer?.user?.created_at.toString()) : "N/A"}</div>
                  </div>
                </div>
              )}

              
            </div>
          </div>

          {/* Escrow Details Section */}
          <div>
            <h3 className="text-base font-semibold mb-4 text-[#1f2329]">Escrow Details</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <Star className="w-4 h-4 mt-1 mr-3 text-[#6a7381]" />
                <div className="flex items-center">
                  <div className="text-sm text-[#6a7381]">Status: </div>
                  <div className="text-sm text-[#1f2329]">{customer?.escrow?.status === 1 ? "Active" : "Inactive"}</div>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="w-4 h-4 mt-1 mr-3 text-[#6a7381]" />
                <div className="flex items-center">
                  <div className="text-sm text-[#6a7381]">Email: </div>
                  <div className="text-sm text-[#1f2329]">{customer?.escrow?.email || "N/A"} </div>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="w-4 h-4 mt-1 mr-3 text-[#6a7381]" />
                <div className="flex items-center">
                  <div className="text-sm text-[#6a7381]">Mobile No: </div>
                  <div className="text-sm text-[#1f2329]">{customer?.escrow?.mobile_no || "N/A"} </div>
                </div>
              </div>
              <div className="flex items-start">
                <Wallet className="w-4 h-4 mt-1 mr-3 text-[#6a7381]" />
                <div className="flex items-center">
                  <div className="text-sm text-[#6a7381]">Wallet Balance: </div>
                  <div className="text-sm text-[#1f2329]">{customer?.escrow?.wallet_balance || "N/A"} </div>
                </div>
              </div>
              <div className="flex items-start">
                <Building className="w-4 h-4 mt-1 mr-3 text-[#6a7381]" />
                <div className="flex items-center">
                  <div className="text-sm text-[#6a7381]">Bank name: </div>
                  <div className="text-sm text-[#1f2329]">{customer?.escrow?.bank_name || "N/A"} </div>
                </div>
              </div>
              <div className="flex items-start">
                <FileText className="w-4 h-4 mt-1 mr-3 text-[#6a7381]" />
                <div className="flex items-center">
                  <div className="text-sm text-[#6a7381]">Account No: </div>
                  <div className="text-sm text-[#1f2329]">{customer?.escrow?.acccount_number || "N/A"} </div>
                </div>
              </div>
              <div className="flex items-start">
                <CreditCard className="w-4 h-4 mt-1 mr-3 text-[#6a7381]" />
                <div className="flex items-center">
                  <div className="text-sm text-[#6a7381]">IFSC code: </div>
                  <div className="text-sm text-[#1f2329]">{customer?.escrow?.ifsc_code || "N/A"} </div>
                </div>
              </div>
              <div className="flex items-start">
                <AlertCircle className="w-4 h-4 mt-1 mr-3 text-[#6a7381]" />
                <div className="flex items-center">
                  <div className="text-sm text-[#6a7381]">PAN Status: </div>
                  <div className="inline-block px-3 py-1 text-xs font-medium bg-[#e9edff] text-[#547fff] rounded-full">
                    {customer?.escrow?.pan_status === "verified" ? "Verified" : "Not Verified"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Financial Data */}
        <div className="md:col-span-2 space-y-4">
          {/* Financial Overview Card */}
          <WalletCard
            currentBalance={customer?.escrow?.wallet_balance}
            investedValues={1000}
            totalEarned={18.2}
            growth={1000}
            token={1000}
            asset={1000}
            data-testid="wallet-card"
          />

          {/* Orders & Transactions Tabs */}
          <Tabs defaultValue="orders">
            <TabsList className="mb-4 border-b w-full justify-start rounded-none bg-transparent p-0 h-auto">
              <TabsTrigger
                value="orders"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#0ac295] data-[state=active]:text-[#0ac295] px-6 py-2 text-[#6a7381] font-medium"
              >
                Orders
              </TabsTrigger>
              <TabsTrigger
                value="transactions"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#0ac295] data-[state=active]:text-[#0ac295] px-6 py-2 text-[#6a7381] font-medium"
              >
                Transactions
              </TabsTrigger>
            </TabsList>

            <TabsContent value="orders" className="mt-0">
              <div className="overflow-x-auto">
                <OrdersTable />
              </div>
            </TabsContent>

            <TabsContent value="transactions" className="mt-0">
              <TransactionsData escrowId={customer?.escrow?.id}/>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}



export default CustomerProfile;