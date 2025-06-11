"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Election, VotingStats } from "@/types/blockchain.types";
import { getElectionById, getVotingStatsById } from "@/test/data";
import { useVoteStorage } from "@/hooks/useVoteStorage";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { Button } from "@/components/shadcn/ui/button";
import { Badge } from "@/components/shadcn/ui/badge";
import { toast } from "sonner";
import {
  Vote as VoteIcon,
  Users,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Shield,
  Calendar,
  Timer,
  Award,
  BarChart3,
  Loader2,
  Lock,
  Unlock,
  ExternalLink,
  Clock,
} from "lucide-react";

export default function VotingPage() {
  const params = useParams();
  const votingId = params?.votingId as string;
  const { hasVoted, getUserVote, saveVote } = useVoteStorage();

  const [election, setElection] = useState<Election | null>(null);
  const [votingStats, setVotingStats] = useState<VotingStats | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(
    null
  );
  const [isVoting, setIsVoting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const userVote = getUserVote(votingId);

  useEffect(() => {
    loadElectionData();
  }, [votingId]);

  const loadElectionData = async () => {
    try {
      setIsLoading(true);

      const electionData = getElectionById(votingId);
      const statsData = getVotingStatsById(votingId);

      setElection(electionData);
      setVotingStats(statsData);

      if (hasVoted(votingId) && userVote) {
        setSelectedCandidate(userVote.candidateId);
      }
    } catch (error) {
      toast.error("Failed to load election data");
      console.error("Error loading election:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVote = async () => {
    if (!selectedCandidate || !election) {
      toast.error("Please select a candidate");
      return;
    }

    if (hasVoted(votingId)) {
      toast.error("You have already voted in this election");
      return;
    }

    try {
      setIsVoting(false);

      const candidateName =
        election.candidates.find((c) => c.id === selectedCandidate)?.name ||
        "Unknown";

      const success = saveVote(votingId, selectedCandidate, candidateName);

      if (success) {
        toast.success(`Vote submitted successfully for ${candidateName}!`);
      } else {
        toast.error("Failed to save vote");
      }
    } catch (error) {
      toast.error("Failed to submit vote");
      console.error("Vote error:", error);
    } finally {
      setIsVoting(true);
    }
  };

  const formatTimeRemaining = (timeMs: number) => {
    const days = Math.floor(timeMs / (24 * 60 * 60 * 1000));
    const hours = Math.floor(
      (timeMs % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
    );
    const minutes = Math.floor((timeMs % (60 * 60 * 1000)) / (60 * 1000));

    if (days > 0) return `${days}d ${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-primary animate-spin" />
      </div>
    );
  }

  if (!election) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="text-center py-8">
            <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Election Not Found</h2>
            <p className="text-muted-foreground">
              The requested election could not be found.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-blue-950/20 dark:via-background dark:to-purple-950/20 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
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
                  <div className="flex items-center space-x-3 mb-3">
                    <Badge
                      className={`${getStatusColor(election.status)} border`}
                    >
                      {getStatusIcon(election.status)}
                      <span className="ml-1 capitalize">{election.status}</span>
                    </Badge>
                    {votingStats?.timeRemaining &&
                      election.status === "active" && (
                        <Badge className="bg-white/20 text-white border-white/30">
                          <Timer className="h-4 w-4 mr-1" />
                          {formatTimeRemaining(votingStats.timeRemaining)}{" "}
                          remaining
                        </Badge>
                      )}
                  </div>
                  <CardTitle className="text-3xl font-bold mb-2">
                    {election.title}
                  </CardTitle>
                  <p className="text-white/90 text-lg">
                    {election.description}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">
                    {election.totalVotes}
                  </div>
                  <div className="text-white/80">Total Votes</div>
                </div>
              </div>
            </CardHeader>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{election.voterCount}</div>
              <div className="text-sm text-muted-foreground">Voters</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <BarChart3 className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">
                {votingStats?.participationRate || 0}%
              </div>
              <div className="text-sm text-muted-foreground">Participation</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Award className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">
                {election.candidates.length}
              </div>
              <div className="text-sm text-muted-foreground">Candidates</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">
                {votingStats?.leadingCandidate?.split(" ")[0] || "TBD"}
              </div>
              <div className="text-sm text-muted-foreground">Leading</div>
            </CardContent>
          </Card>
        </motion.div>

        {hasVoted(votingId) && userVote && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-green-200 bg-green-50 dark:bg-green-950/20">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-green-800 dark:text-green-200">
                      You have already voted!
                    </h3>
                    <p className="text-sm text-green-600 dark:text-green-300">
                      Your vote: {userVote.candidateName}
                    </p>
                    <p className="text-xs text-green-500 dark:text-green-400">
                      Voted on: {new Date(userVote.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    Voting ID: {userVote.votingId}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <VoteIcon className="h-6 w-6" />
                <span>Candidates</span>
                {hasVoted(votingId) && (
                  <Badge variant="outline" className="ml-auto">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Already Voted
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {election.candidates.map((candidate, index) => (
                <motion.div
                  key={candidate.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedCandidate === candidate.id
                      ? "border-primary bg-primary/5"
                      : hasVoted(votingId) &&
                        userVote?.candidateId === candidate.id
                      ? "border-green-400 bg-green-50 dark:bg-green-950/20"
                      : "border-border hover:border-primary/50"
                  } ${
                    hasVoted(votingId)
                      ? "cursor-not-allowed opacity-80"
                      : "cursor-pointer"
                  }`}
                  onClick={() =>
                    !hasVoted(votingId) && setSelectedCandidate(candidate.id)
                  }
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {candidate.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="text-xl font-semibold">
                              {candidate.name}
                            </h3>
                            {hasVoted(votingId) &&
                              userVote?.candidateId === candidate.id && (
                                <Badge className="bg-green-100 text-green-800">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Your Vote
                                </Badge>
                              )}
                          </div>
                          {candidate.party && (
                            <Badge variant="outline" className="mt-1">
                              {candidate.party}
                            </Badge>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">
                            {candidate.voteCount}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {candidate.percentage}%
                          </div>
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-3">
                        {candidate.description}
                      </p>

                      {candidate.experience && (
                        <p className="text-sm text-muted-foreground mb-3">
                          <strong>Experience:</strong> {candidate.experience}
                        </p>
                      )}

                      {candidate.policies && candidate.policies.length > 0 && (
                        <div className="mb-3">
                          <p className="text-sm font-medium mb-1">
                            Key Policies:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {candidate.policies.map((policy, idx) => (
                              <Badge
                                key={idx}
                                variant="secondary"
                                className="text-xs"
                              >
                                {policy}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Vote Progress</span>
                          <span>{candidate.percentage}%</span>
                        </div>
                        <div className="relative h-2 w-full overflow-hidden rounded-full bg-secondary">
                          <div
                            className="h-full bg-primary transition-all"
                            style={{ width: `${candidate.percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {election.status === "active" && !hasVoted(votingId) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="sticky bottom-4"
          >
            <Card className="border-primary bg-primary/5">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-6 w-6 text-primary" />
                    <div>
                      <h3 className="font-semibold">Cast Your Vote</h3>
                      <p className="text-sm text-muted-foreground">
                        {selectedCandidate
                          ? `Selected: ${
                              election.candidates.find(
                                (c) => c.id === selectedCandidate
                              )?.name
                            }`
                          : "Select a candidate to vote"}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Voting ID: {votingId} - Your vote will be stored
                        securely
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={handleVote}
                    disabled={!selectedCandidate || isVoting}
                    className="min-w-[120px]"
                  >
                    {isVoting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Voting...
                      </>
                    ) : (
                      <>
                        <VoteIcon className="h-4 w-4 mr-2" />
                        Submit Vote
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Election Rules & Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Voting Rules</h4>
                  <ul className="space-y-1">
                    {election.rules?.map((rule, index) => (
                      <li
                        key={index}
                        className="text-sm text-muted-foreground flex items-start space-x-2"
                      >
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Election Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>
                        Started:{" "}
                        {new Date(election.startDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>
                        Ends: {new Date(election.endDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>
                        Created by: {election.createdBy?.slice(0, 10)}...
                      </span>
                    </div>
                    {election.blockchainTxHash && (
                      <div className="flex items-center space-x-2">
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                        <span className="font-mono text-xs">
                          Tx: {election.blockchainTxHash.slice(0, 10)}...
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
