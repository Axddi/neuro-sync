import { DashboardLayout } from "@/components/dashboard-layout";
import { StatsCards } from "@/components/stats-cards";
import { RoutineTimeline } from "@/components/routine-timeline";
import { QuickActions } from "@/components/quick-actions";
import { CareTeamPanel } from "@/components/care-team-panel";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6 space-y-6">
        {/* Welcome Header */}
        <div>
          <h1 className="text-2xl font-semibold text-foreground text-balance">
            Good morning, Sarah
          </h1>
          <p className="text-muted-foreground mt-1">
            {"Here's how Margaret is doing today"}
          </p>
        </div>

        {/* Stats Overview */}
        <StatsCards />

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Routine Timeline - Takes 2 columns */}
          <div className="lg:col-span-2">
            <RoutineTimeline />
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <QuickActions />
            <CareTeamPanel />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
