import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, CircleAlert } from "lucide-react";

interface CreditScoreFactorsProps {
  creditScore: number;
}

interface CreditScoreFactors {
  title: string;
  grade: "Good" | "Fair";
}

const creditScoreFactors: CreditScoreFactors[] = [
  { title: "Payment History", grade: "Good" },
  { title: " Credit Utilization", grade: "Fair" },
  { title: "Credit Age", grade: "Good" },
  { title: "Recent inquiries", grade: "Fair" },
];

const CreditScoreFactors = ({ creditScore }: CreditScoreFactorsProps) => {
  return (
    <Card className="shadow-none border-0 w-4/12">
      <CardHeader>
        <CardTitle className="text-lg justify-end flex items-center gap-2">
          Credit Score:{" "}
          <span className="text-2xl px-3 py-2 border rounded-full">
            {creditScore}
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent className="bg-gray-50 py-4 rounded-lg">
        <h1 className="text-md text-gray-500 font-medium mb-3">
          Credit Score Factors
        </h1>

        <div className="flex flex-col gap-2">
          {creditScoreFactors.map((factor) => (
            <div key={factor.title} className="flex justify-between">
              <h1 className="flex gap-2 text-md items-center font-medium ">
                {" "}
                <span
                  className={`text-${
                    factor.grade === "Good" ? "green" : "amber"
                  }-500`}
                >
                  {factor.grade === "Good" ? (
                    <CheckCircle size={20} />
                  ) : (
                    <CircleAlert size={20} />
                  )}
                </span>
                {factor.title}
              </h1>
              <p
                className={`px-3 py-1 font-medium border rounded-full bg-${
                  factor.grade === "Good" ? "green" : "amber"
                }-100`}
              >
                {factor.grade}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
export default CreditScoreFactors;
