import { Users } from "lucide-react";
import { Card, CardContent } from "../ui/card";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
}

function StatsCard({ title, value, change }: StatsCardProps) {
  return (
    <>
      <Card className="border border-gray-200 rounded-2xl py-2">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{title}</p>
              <div className="flex items-center mt-2">
                <span className="text-2xl font-semibold text-gray-900">
                  {value}
                </span>
                <span className="ml-2 text-sm font-medium text-green-600">
                  {change}
                </span>
              </div>
            </div>
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-gray-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default StatsCard;
