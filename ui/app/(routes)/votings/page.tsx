"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Election, VotingStats } from "@/types/blockchain.types";
import { mockElections, mockVotingStats } from "@/test/data";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { Button } from "@/components/shadcn/ui/button";
import { Badge } from "@/components/shadcn/ui/badge";
import { Input } from "@/components/shadcn/ui/input";
import { toast } from "sonner";
import {
  Vote,
  Clock,
  Users,
  AlertCircle,
  Shield,
  Calendar,
  Timer,
  Award,
  BarChart3,
  Loader2,
  Lock,
  Unlock,
  Search,
  Filter,
  Eye,
  Zap,
  Globe,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

export default function VotingsPage() {
  const router = useRouter();
  const [elections, setElections] = useState<Election[]>([]);
  const [votingStats, setVotingStats] = useState<Record<string, VotingStats>>(
    {}
  );
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "upcoming" | "ended"
  >("all");

  useEffect(() => {
    loadElections();
  }, []);

  const loadElections = async () => {
    try {
      setIsLoading(true);
      setElections(mockElections);
      setVotingStats(mockVotingStats);
    } catch (error) {
      toast.error("Failed to load elections");
      console.error("Error loading elections:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getUserVotes = () => {
    const votes = localStorage.getItem("user_votes");
    return votes ? JSON.parse(votes) : {};
  };

  const hasUserVoted = (electionId: string) => {
    const userVotes = getUserVotes();

    if (Array.isArray(userVotes)) {
      return userVotes.some((vote: any) => vote.votingId === electionId);
    }
    return false;
  };

  const getUserVoteForElection = (electionId: string) => {
    const userVotes = getUserVotes();
    return userVotes[electionId] || null;
  };

  const filteredElections = elections.filter((election) => {
    const matchesSearch =
      election.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      election.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || election.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatTimeRemaining = (timeMs: number) => {
    const days = Math.floor(timeMs / (24 * 60 * 60 * 1000));
    const hours = Math.floor(
      (timeMs % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
    );

    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h`;
    return `<1h`;
  };

  const getStatusColor = (status: Election["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "upcoming":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "ended":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: Election["status"]) => {
    switch (status) {
      case "active":
        return <Unlock className="h-4 w-4" />;
      case "upcoming":
        return <Clock className="h-4 w-4" />;
      case "ended":
        return <Lock className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getLeadingCandidate = (election: Election) => {
    if (election.candidates.length === 0) return "No candidates";
    const leading = election.candidates.reduce((prev, current) =>
      prev.voteCount > current.voteCount ? prev : current
    );
    return leading.name;
  };

  const handleElectionClick = (electionId: string) => {
    router.push(`/votings/${electionId}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className="h-8 w-8 text-primary" />
        </motion.div>
      </div>
    );
  }

  const activeElections = elections.filter((e) => e.status === "active").length;
  const upcomingElections = elections.filter(
    (e) => e.status === "upcoming"
  ).length;
  const endedElections = elections.filter((e) => e.status === "ended").length;
  const totalVotes = elections.reduce(
    (sum, election) => sum + election.totalVotes,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-blue-950/20 dark:via-background dark:to-purple-950/20 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="relative overflow-hidden border-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-600/90" />
            <CardHeader className="relative">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <CardTitle className="text-4xl font-bold mb-2">
                    Blockchain Voting Hub
                  </CardTitle>
                  <p className="text-white/90 text-lg">
                    Participate in democratic governance and shape the future of
                    our decentralized platform
                  </p>
                </div>
              </div>
            </CardHeader>
          </Card>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <Card>
            <CardContent className="p-4 text-center">
              <Zap className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{activeElections}</div>
              <div className="text-sm text-muted-foreground">
                Active Elections
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Lock className="h-8 w-8 text-gray-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{endedElections}</div>
              <div className="text-sm text-muted-foreground">Ended</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Vote className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">
                {totalVotes.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Total Votes</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Globe className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{elections.length}</div>
              <div className="text-sm text-muted-foreground">All Elections</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex-1 max-w-md relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search elections..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  {(["all", "active", "upcoming", "ended"] as const).map(
                    (status) => (
                      <Button
                        key={status}
                        variant={
                          statusFilter === status ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => setStatusFilter(status)}
                        className="capitalize"
                      >
                        <Filter className="h-3 w-3 mr-1" />
                        {status}
                      </Button>
                    )
                  )}
                </div>
              </div>
            </CardHeader>
          </Card>
        </motion.div>

        {/* Elections Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {filteredElections.map((election, index) => {
            const stats = votingStats[election.id];
            const leadingCandidate = getLeadingCandidate(election);
            const hasVoted = hasUserVoted(election.id);
            const userVote = getUserVoteForElection(election.id);

            return (
              <motion.div
                key={election.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <Card
                  className="hover:shadow-lg transition-all cursor-pointer h-full relative"
                  onClick={() => handleElectionClick(election.id)}
                >
                  {hasVoted && (
                    <div className="absolute top-3 right-3 z-10">
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Voted
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Badge
                          className={`${getStatusColor(
                            election.status
                          )} border`}
                        >
                          {getStatusIcon(election.status)}
                          <span className="ml-1 capitalize">
                            {election.status}
                          </span>
                        </Badge>
                        {stats?.timeRemaining &&
                          election.status === "active" && (
                            <Badge className="bg-orange-100 text-orange-800 border-orange-200">
                              <Timer className="h-3 w-3 mr-1" />
                              {formatTimeRemaining(stats.timeRemaining)}
                            </Badge>
                          )}
                      </div>
                      <Button variant="ghost" size="sm">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>

                    <CardTitle className="text-xl leading-tight line-clamp-2">
                      {election.title}
                    </CardTitle>
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {election.description}
                    </p>

                    {hasVoted && userVote && (
                      <div className="mt-3 p-2 bg-green-50 dark:bg-green-950/20 rounded-md border border-green-200">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <div>
                            <p className="text-sm font-medium text-green-800 dark:text-green-200">
                              You voted for: {userVote.candidateName}
                            </p>
                            <p className="text-xs text-green-600 dark:text-green-300">
                              {new Date(
                                userVote.timestamp
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-3 text-center">
                        <Users className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                        <div className="text-lg font-bold">
                          {election.totalVotes}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Votes
                        </div>
                      </div>

                      <div className="bg-green-50 dark:bg-green-950/20 rounded-lg p-3 text-center">
                        <BarChart3 className="h-5 w-5 text-green-600 mx-auto mb-1" />
                        <div className="text-lg font-bold">
                          {stats?.participationRate || 0}%
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Participation
                        </div>
                      </div>
                    </div>

                    {/* Leading Candidate */}
                    {election.totalVotes > 0 && (
                      <div className="bg-purple-50 dark:bg-purple-950/20 rounded-lg p-3">
                        <div className="flex items-center space-x-2 mb-1">
                          <Award className="h-4 w-4 text-purple-600" />
                          <span className="text-sm font-medium text-purple-800 dark:text-purple-200">
                            Leading
                          </span>
                        </div>
                        <div className="text-sm font-semibold truncate">
                          {leadingCandidate}
                        </div>
                      </div>
                    )}

                    {/* Candidates Count */}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Candidates</span>
                      <span className="font-medium">
                        {election.candidates.length}
                      </span>
                    </div>

                    {/* Dates */}
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-3 w-3" />
                        <span>
                          Started:{" "}
                          {new Date(election.startDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-3 w-3" />
                        <span>
                          Ends:{" "}
                          {new Date(election.endDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-2">
                      {election.status === "active" ? (
                        hasVoted ? (
                          <Button
                            variant="outline"
                            className="w-full"
                            size="sm"
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Your Vote
                          </Button>
                        ) : (
                          <Button className="w-full" size="sm">
                            <Vote className="h-4 w-4 mr-2" />
                            Vote Now
                          </Button>
                        )
                      ) : election.status === "upcoming" ? (
                        <Button variant="outline" className="w-full" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      ) : (
                        <Button
                          variant="secondary"
                          className="w-full"
                          size="sm"
                        >
                          <BarChart3 className="h-4 w-4 mr-2" />
                          View Results
                          {hasVoted && <span className="ml-1">(Voted)</span>}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* No Results */}
        {filteredElections.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardContent className="text-center py-12">
                <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  No Elections Found
                </h3>
                <p className="text-muted-foreground mb-4">
                  No elections match your current search criteria.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setStatusFilter("all");
                  }}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Blockchain Voting Features</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <Shield className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h4 className="font-semibold mb-1">Secure & Transparent</h4>
                  <p className="text-sm text-muted-foreground">
                    All votes are recorded on blockchain and publicly verifiable
                  </p>
                </div>
                <div className="text-center">
                  <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <h4 className="font-semibold mb-1">Democratic</h4>
                  <p className="text-sm text-muted-foreground">
                    One wallet, one vote - fair and equal participation for all
                  </p>
                </div>
                <div className="text-center">
                  <Zap className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <h4 className="font-semibold mb-1">Instant Results</h4>
                  <p className="text-sm text-muted-foreground">
                    Real-time vote counting with immediate result updates
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
