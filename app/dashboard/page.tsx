import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import SectionCard from "../components/SectionCard";

import { Heart, Brain, Activity, TrendingUp } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-[#0A0F1F] text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div className="flex-1 flex flex-col">

        {/* Top Navbar */}
        <Navbar />

        {/* Main Content */}
        <div className="p-6 md:p-10 space-y-10">

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Mood Score"
              value="8.7/10"
              icon={<Heart className="text-pink-400" size={28} />}
              className="bg-gradient-to-br from-pink-500/20 to-red-500/10"
            />

            <StatCard
              title="Focus Level"
              value="92%"
              icon={<Brain className="text-blue-400" size={28} />}
              className="bg-gradient-to-br from-blue-500/20 to-cyan-400/10"
            />

            <StatCard
              title="Activity Points"
              value="1450"
              icon={<Activity className="text-green-400" size={28} />}
              className="bg-gradient-to-br from-green-500/20 to-emerald-400/10"
            />

            <StatCard
              title="Weekly Growth"
              value="+23%"
              icon={<TrendingUp className="text-yellow-300" size={28} />}
              className="bg-gradient-to-br from-yellow-500/20 to-orange-500/10"
            />
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Weekly Mood Analysis */}
            <SectionCard title="Weekly Mood Analysis">
              <div className="h-64 flex items-center justify-center text-gray-400">
                {/* Replace with chart later */}
                (Chart coming soon)
              </div>
            </SectionCard>

            {/* Wellness Goals */}
            <SectionCard title="Today's Wellness Goals">
              <div className="space-y-4 text-gray-300">
                <div className="bg-white/5 p-4 rounded-xl">✔ Meditate for 10 minutes</div>
                <div className="bg-white/5 p-4 rounded-xl">✔ Journal thoughts</div>
                <div className="bg-white/5 p-4 rounded-xl">✦ Drink 2L water</div>
              </div>
            </SectionCard>

          </div>
        </div>
      </div>
    </div>
  );
}

