import { Card } from "@/components/ui/Card";
import { Bug, LineChart, Activity } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-heading font-bold">Welcome back, John</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="flex flex-col space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
              <Bug size={20} />
            </div>
            <h3 className="font-medium text-lg">Error Fixes</h3>
          </div>
          <div className="text-3xl font-bold">128</div>
          <p className="text-sm text-white/50">Total issues resolved</p>
        </Card>

        <Card className="flex flex-col space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center text-secondary">
              <LineChart size={20} />
            </div>
            <h3 className="font-medium text-lg">Analyses</h3>
          </div>
          <div className="text-3xl font-bold">45</div>
          <p className="text-sm text-white/50">Datasets analyzed</p>
        </Card>

        <Card className="flex flex-col space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center text-success">
              <Activity size={20} />
            </div>
            <h3 className="font-medium text-lg">Time Saved</h3>
          </div>
          <div className="text-3xl font-bold">34h</div>
          <p className="text-sm text-white/50">Estimated hours saved</p>
        </Card>
      </div>
    </div>
  );
}
