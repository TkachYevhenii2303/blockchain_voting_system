"use client";
import { useState, useEffect } from "react";

interface UserVote {
  votingId: string;
  candidateId: string;
  candidateName: string;
  timestamp: string;
}

const STORAGE_KEY = "user_votes";

export const useVoteStorage = () => {
  const [userVotes, setUserVotes] = useState<UserVote[]>([]);

  useEffect(() => {
    loadVotes();
  }, []);

  const loadVotes = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setUserVotes(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Error loading votes:", error);
      setUserVotes([]);
    }
  };

  const saveVote = (
    votingId: string,
    candidateId: string,
    candidateName: string
  ) => {
    const newVote: UserVote = {
      votingId,
      candidateId,
      candidateName,
      timestamp: new Date().toISOString(),
    };

    const updatedVotes = [
      ...userVotes.filter((vote) => vote.votingId !== votingId),
      newVote,
    ];

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedVotes));
      setUserVotes(updatedVotes);
      return true;
    } catch (error) {
      console.error("Error saving vote:", error);
      return false;
    }
  };

  const hasVoted = (votingId: string): boolean => {
    return userVotes.some((vote) => vote.votingId === votingId);
  };

  const getUserVote = (votingId: string): UserVote | null => {
    return userVotes.find((vote) => vote.votingId === votingId) || null;
  };

  return {
    hasVoted,
    getUserVote,
    saveVote,
    userVotes,
  };
};
