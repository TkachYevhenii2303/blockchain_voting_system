"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/shadcn/ui/card";
import { Legend, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from "recharts";
import { Users, Vote, BarChart3, LineChart as LineChartIcon, Award } from "lucide-react";
import { SidebarInset, SidebarProvider } from "@/components/shadcn/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";


export default function VotingAnalyticsPage() {
  const [dataLoaded, setDataLoaded] = useState(false);

const elections = [
  {
    id: "1",
    title: "Presidential Election",
    totalVotes: 3000,
    candidates: ["Alice", "Bob", "Charlie"],
  },
  {
    id: "2",
    title: "Parliamentary Election",
    totalVotes: 5000,
    candidates: ["Diana", "Eve", "Frank", "Grace"],
  },
];

const votingStats: Record<string, { participationRate: number }> = {
  "1": { participationRate: 65 },
  "2": { participationRate: 78 },
};


const mockParticipationData = [
  { date: "2024-01", participation: 35 },
  { date: "2024-02", participation: 42 },
  { date: "2024-03", participation: 57 },
  { date: "2024-04", participation: 63 },
  { date: "2024-05", participation: 49 },
  { date: "2024-06", participation: 68 },
];

const mockTopCandidates = [
  { name: "Alice", votes: 1200 },
  { name: "Bob", votes: 980 },
  { name: "Charlie", votes: 720 },
  { name: "Diana", votes: 460 },
];

const averageCandidates =
  elections.reduce((sum, e) => sum + e.candidates.length, 0) /
  (elections.length || 1);

const mostPopularElection = elections.reduce((prev, curr) =>
  curr.totalVotes > prev.totalVotes ? curr : prev
);

const highestParticipationElection = elections.reduce((prev, curr) =>
  (votingStats[curr.id]?.participationRate || 0) >
  (votingStats[prev.id]?.participationRate || 0)
    ? curr
    : prev
);

  const participationData = [
    { name: "Jan", votes: 400 },
    { name: "Feb", votes: 800 },
    { name: "Mar", votes: 600 },
    { name: "Apr", votes: 1100 },
    { name: "May", votes: 900 },
    { name: "Jun", votes: 1300 },
  ];

  const candidateVotes = [
    { name: "Alice", votes: 1200 },
    { name: "Bob", votes: 850 },
    { name: "Charlie", votes: 630 },
    { name: "Diana", votes: 980 },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setDataLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  if (!dataLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <BarChart3 className="h-8 w-8 text-primary" />
        </motion.div>
      </div>
    );
  }

  return (
	    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
    <div className="min-h-screen p-4 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-blue-950/20 dark:via-background dark:to-purple-950/20">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="relative overflow-hidden border-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/90 to-blue-600/90" />
            <CardHeader className="relative z-10">
              <CardTitle className="text-4xl font-bold">Analytics Dashboard</CardTitle>
              <p className="text-white/90 text-lg mt-2">
                Insights and trends in the blockchain voting system
              </p>
            </CardHeader>
          </Card>
        </motion.div>

        {/* Chart 1: Participation Over Time */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <CardHeader className="flex items-center space-x-2">
              <LineChartIcon className="h-5 w-5 text-blue-600" />
              <CardTitle>Monthly Participation Trend</CardTitle>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={participationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="votes" stroke="#6366F1" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Chart 2: Candidate Vote Count */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-green-600" />
              <CardTitle>Candidate Vote Distribution</CardTitle>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={candidateVotes}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="votes" fill="#10B981" barSize={40} radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Info Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <Card>
            <CardContent className="p-6 text-center">
              <Vote className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">6,500</div>
              <div className="text-sm text-muted-foreground">Total Votes</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">1,200</div>
              <div className="text-sm text-muted-foreground">Unique Voters</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <BarChart3 className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">62%</div>
              <div className="text-sm text-muted-foreground">Avg. Turnout Rate</div>
            </CardContent>
          </Card>
        </motion.div>

		  {/* Additional Metrics */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.2 }}
  className="grid grid-cols-1 md:grid-cols-3 gap-4"
>
  <Card>
    <CardContent className="p-4 text-center">
      <Users className="h-8 w-8 text-cyan-600 mx-auto mb-2" />
      <div className="text-2xl font-bold">{averageCandidates.toFixed(1)}</div>
      <div className="text-sm text-muted-foreground">
        Avg. Candidates per Election
      </div>
    </CardContent>
  </Card>

  <Card>
    <CardContent className="p-4 text-center">
      <Award className="h-8 w-8 text-amber-600 mx-auto mb-2" />
      <div className="text-md font-semibold">{mostPopularElection.title}</div>
      <div className="text-sm text-muted-foreground">
        Most Votes: {mostPopularElection.totalVotes}
      </div>
    </CardContent>
  </Card>

  <Card>
    <CardContent className="p-4 text-center">
      <BarChart3 className="h-8 w-8 text-lime-600 mx-auto mb-2" />
      <div className="text-md font-semibold">
        {highestParticipationElection.title}
      </div>
      <div className="text-sm text-muted-foreground">
        Highest Participation: {votingStats[highestParticipationElection.id]?.participationRate ?? 0}%
      </div>
    </CardContent>
  </Card>
</motion.div>

{/* Analytics Charts */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.3 }}
  className="grid grid-cols-1 md:grid-cols-2 gap-6"
>
  {/* Participation Over Time */}
  <Card>
    <CardHeader>
      <CardTitle className="text-lg">Participation Over Time</CardTitle>
    </CardHeader>
    <CardContent className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={mockParticipationData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="participation"
            stroke="#6366f1"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>

  {/* Top Candidates */}
  <Card>
    <CardHeader>
      <CardTitle className="text-lg">Top Candidates by Votes</CardTitle>
    </CardHeader>
    <CardContent className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={mockTopCandidates}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="votes" fill="#8b5cf6" />
        </BarChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
</motion.div>

      </div>
    </div>
	</SidebarInset>
	</SidebarProvider>
  );
}
