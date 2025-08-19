import { Users } from "lucide-react";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

function getInitials(fullName: string) {
  if (!fullName) return "";

  const names = fullName.trim().split(" ");
  const firstInitial = names[0]?.[0] || "";
  const lastInitial = names.length > 1 ? names[names.length - 1][0] : "";

  return (firstInitial + lastInitial).toUpperCase();
}

const InvestorsandActivity = () => {
  const investors: any[] = [
    { name: "John Smith", noofshares: 50, investment: 250000, percentage: 10 },
    { name: "John Smith", noofshares: 50, investment: 250000, percentage: 10 },
    { name: "John Smith", noofshares: 50, investment: 250000, percentage: 10 },
    { name: "John Smith", noofshares: 50, investment: 250000, percentage: 10 },
  ];
  return (
    <div className="flex-1 shadow-md pb-5 rounded-xl ">
      {" "}
      <div className="flex justify-between bg-gradient-to-r from-blue-100 to-blue-50 rounded-t-2xl px-4 py-5 border-b">
        <h1 className="text-lg font-medium flex items-center">
          <Users className="text-blue-500 mr-5 p-1 bg-blue-200 rounded-full h-10" />
          Investors & Activity
        </h1>
      </div>
      <div className="px-5 mt-5">
        <Tabs defaultValue="investors">
          <TabsList className="flex py-5 rounded-sm px-1">
            <TabsTrigger
              className="flex-1 data-[state=active]:text-blue-500 rounded-sm py-1"
              value="investors"
            >
              Investors
            </TabsTrigger>
            <TabsTrigger
              className="flex-1 data-[state=active]:text-blue-500 rounded-sm py-1"
              value="activity"
            >
              Activity
            </TabsTrigger>
          </TabsList>

          <TabsContent className="flex flex-col gap-2 my-5 overflow-x-auto" value="investors">
            {investors.map((investor) => (
              <div className="flex justify-between border-b py-4">
                <div className="flex gap-6 items-center">
                  <h1 className="bg-green-100 text-green-600 rounded-full w-10 h-10 text-xl  text-center flex items-center justify-center font-medium">
                    {getInitials(investor.name)}
                  </h1>
                  <div>
                    <h1 className="text-md font-medium">{investor.name}</h1>
                    <p className="text-sm text-muted-foreground">
                      {investor.noofshares} shares
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <h1 className="text-md font-medium">
                    ${investor.investment}
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    {investor.percentage}%
                  </p>
                </div>
              </div>
            ))}
          </TabsContent>
          <TabsContent value="activity"></TabsContent>
        </Tabs>
      </div>
      <div className="flex justify-between px-5">
        <p className="text-muted-foreground">Total Investment :</p>
        <Button
          variant="outline"
          className="text-blue-600 border border-blue-200 rounded-sm"
        >
          <Users />
          Manage Investors
        </Button>
      </div>
    </div>
  );
};
export default InvestorsandActivity;
