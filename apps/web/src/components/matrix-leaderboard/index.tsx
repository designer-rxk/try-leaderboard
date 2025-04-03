"use client";

import { Badge } from "@components/components/ui/badge";
import { Card } from "@components/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/components/ui/table";
import type { MatchPage } from "@utils";
import { useEffect, useState } from "react";

interface MatrixLeaderboardProps {
  matches: MatchPage[];
}

type Player = {
  name: string;
  wins: number;
  losses: number;
  draws: number;
};

type MatchResult = {
  result: "win" | "loss" | "draw" | null;
};

export function MatrixLeaderboard({ matches }: MatrixLeaderboardProps) {
  const [isClient, setIsClient] = useState(false);

  // Use useEffect to ensure we only render the complex table on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="flex items-center justify-center p-8">
        <p>Loading leaderboard...</p>
      </div>
    );
  }

  // Extract unique players from matches
  const playersMap = new Map<string, Player>();

  matches.forEach((match) => {
    // Add player1 if they exist and have a name
    if (match.player1?.name) {
      if (!playersMap.has(match.player1.name)) {
        playersMap.set(match.player1.name, {
          name: match.player1.name,
          wins: 0,
          losses: 0,
          draws: 0,
        });
      }
    }

    // Add player2 if they exist and have a name
    if (match.player2?.name) {
      if (!playersMap.has(match.player2.name)) {
        playersMap.set(match.player2.name, {
          name: match.player2.name,
          wins: 0,
          losses: 0,
          draws: 0,
        });
      }
    }

    // Count wins/losses/draws
    if (match.winner?.name) {
      // Someone won the match
      if (match.player1?.name && match.winner.name === match.player1.name) {
        // Player 1 won
        const player = playersMap.get(match.player1.name);
        if (player) player.wins++;

        if (match.player2?.name) {
          const opponent = playersMap.get(match.player2.name);
          if (opponent) opponent.losses++;
        }
      } else if (
        match.player2?.name &&
        match.winner.name === match.player2.name
      ) {
        // Player 2 won
        const player = playersMap.get(match.player2.name);
        if (player) player.wins++;

        if (match.player1?.name) {
          const opponent = playersMap.get(match.player1.name);
          if (opponent) opponent.losses++;
        }
      }
    } else if (match.player1?.name && match.player2?.name) {
      // No winner, so it's a draw
      const player1 = playersMap.get(match.player1.name);
      if (player1) player1.draws++;

      const player2 = playersMap.get(match.player2.name);
      if (player2) player2.draws++;
    }
  });

  // Convert to array and sort by wins
  const players = Array.from(playersMap.values()).sort(
    (a, b) => b.wins - a.wins,
  );

  // Create matrix of results
  const resultsMatrix: Record<string, Record<string, MatchResult>> = {};

  players.forEach((player) => {
    resultsMatrix[player.name] = {};
  });

  matches.forEach((match) => {
    if (match.player1?.name && match.player2?.name) {
      const player1Name = match.player1.name;
      const player2Name = match.player2.name;

      // Initialize if needed
      if (!resultsMatrix[player1Name]?.[player2Name]) {
        resultsMatrix[player1Name] = {
          ...resultsMatrix[player1Name],
          [player2Name]: { result: null },
        };
      }

      if (!resultsMatrix[player2Name]?.[player1Name]) {
        resultsMatrix[player2Name] = {
          ...resultsMatrix[player2Name],
          [player1Name]: { result: null },
        };
      }

      if (match.winner?.name === player1Name) {
        // Player 1 won
        resultsMatrix[player1Name]![player2Name]!.result = "win";
        resultsMatrix[player2Name]![player1Name]!.result = "loss";
      } else if (match.winner?.name === player2Name) {
        // Player 2 won
        resultsMatrix[player1Name]![player2Name]!.result = "loss";
        resultsMatrix[player2Name]![player1Name]!.result = "win";
      } else {
        // Draw
        resultsMatrix[player1Name]![player2Name]!.result = "draw";
        resultsMatrix[player2Name]![player1Name]!.result = "draw";
      }
    }
  });

  // Calculate total scores and stats
  const playerStats = players
    .map((player) => {
      const totalMatches = player.wins + player.losses + player.draws;
      const winRate =
        totalMatches > 0 ? Math.round((player.wins / totalMatches) * 100) : 0;

      return {
        ...player,
        totalMatches,
        winRate,
        points: player.wins * 3 + player.draws, // 3 points for win, 1 for draw
      };
    })
    .sort((a, b) => b.points - a.points);

  // Get latest match date
  const latestMatch =
    matches.length > 0
      ? matches.reduce((latest, match) => {
          if (!latest?.date) return match;
          if (!match.date) return latest;
          return new Date(match.date) > new Date(latest.date) ? match : latest;
        }, matches[0])
      : null;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 xl:grid-cols-2 xl:grid-cols-4 gap-4">
        <Card className="p-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">
            Total Matches
          </h3>
          <p className="text-2xl font-bold">{matches.length}</p>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">
            Players
          </h3>
          <p className="text-2xl font-bold">{players.length}</p>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">
            Top Player
          </h3>
          <p className="text-2xl font-bold">{playerStats[0]?.name || "N/A"}</p>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">
            Latest Match
          </h3>
          <p className="text-2xl font-bold">
            {latestMatch?.date
              ? new Date(latestMatch.date).toLocaleDateString()
              : "N/A"}
          </p>
        </Card>
      </div>
      {/* Desktop view - only show on md screens and larger */}
      <div className="hidden xl:block">
        <Card className="rounded-xl overflow-hidden shadow-md">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[180px] font-medium">
                    Player
                  </TableHead>
                  {playerStats.map((player) => (
                    <TableHead
                      key={player.name}
                      className="text-center font-medium"
                    >
                      {player.name}
                    </TableHead>
                  ))}
                  <TableHead className="text-center font-medium">W</TableHead>
                  <TableHead className="text-center font-medium">L</TableHead>
                  <TableHead className="text-center font-medium">D</TableHead>
                  <TableHead className="text-center font-medium">
                    Points
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {playerStats.map((rowPlayer, index) => (
                  <TableRow
                    key={rowPlayer.name}
                    className={index % 2 === 0 ? "bg-muted/50" : ""}
                  >
                    <TableCell className="font-medium text-center p-4">
                      {rowPlayer.name}
                    </TableCell>
                    {playerStats.map((colPlayer) => (
                      <TableCell
                        key={colPlayer.name}
                        className="text-center p-4"
                      >
                        {rowPlayer.name === colPlayer.name ? (
                          <div className="text-muted-foreground">-</div>
                        ) : (
                          <ResultCell
                            result={
                              resultsMatrix[rowPlayer.name]?.[colPlayer.name]
                            }
                          />
                        )}
                      </TableCell>
                    ))}
                    <TableCell className="text-center font-medium p-4">
                      {rowPlayer.wins}
                    </TableCell>
                    <TableCell className="text-center text-muted-foreground p-4">
                      {rowPlayer.losses}
                    </TableCell>
                    <TableCell className="text-center text-muted-foreground p-4">
                      {rowPlayer.draws}
                    </TableCell>
                    <TableCell className="text-center font-medium p-4">
                      {rowPlayer.points}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>

      {/* Mobile view - only show on smaller than xl screens */}
      <div className="block xl:hidden space-y-4">
        {playerStats.map((player) => (
          <Card key={player.name} className="p-4 rounded-xl shadow-md">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold">{player.name}</h3>
              <Badge variant="outline" className="ml-2 px-3 py-1 rounded-full">
                {player.points} pts
              </Badge>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center mb-4">
              <div className="bg-muted/30 p-2 rounded-lg">
                <p className="text-xs text-muted-foreground">Wins</p>
                <p className="font-bold text-lg">{player.wins}</p>
              </div>
              <div className="bg-muted/30 p-2 rounded-lg">
                <p className="text-xs text-muted-foreground">Losses</p>
                <p className="font-bold text-lg">{player.losses}</p>
              </div>
              <div className="bg-muted/30 p-2 rounded-lg">
                <p className="text-xs text-muted-foreground">Draws</p>
                <p className="font-bold text-lg">{player.draws}</p>
              </div>
            </div>
            <div className="mt-3">
              <p className="text-sm font-medium mb-2">Matchups:</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {playerStats
                  .filter((opponent) => opponent.name !== player.name)
                  .map((opponent) => (
                    <div
                      key={opponent.name}
                      className="flex flex-col items-center bg-muted/20 p-2 rounded-lg"
                    >
                      <span className="text-sm font-medium mb-1 truncate w-full text-center">
                        {opponent.name}
                      </span>
                      <ResultCell
                        result={resultsMatrix[player.name]?.[opponent.name]}
                        showLabel={true}
                      />
                    </div>
                  ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ResultCell({
  result,
  showLabel = false,
}: {
  result?: MatchResult;
  showLabel?: boolean;
}) {
  if (!result || result.result === null) {
    return <div className="text-muted-foreground">-</div>;
  }

  let badgeVariant: "default" | "outline" | "secondary" | "destructive" =
    "outline";
  let label = "";
  let fullLabel = "";

  switch (result.result) {
    case "win":
      badgeVariant = "default";
      label = "W";
      break;
    case "loss":
      badgeVariant = "destructive";
      label = "L";
      break;
    case "draw":
      badgeVariant = "secondary";
      label = "D";
      break;
  }

  return (
    <div className="flex flex-col items-center">
      <Badge
        variant={badgeVariant}
        className="h-8 w-8 flex items-center justify-center rounded-full p-0 text-sm font-medium"
      >
        {label}
      </Badge>
      {showLabel && <span className="text-xs mt-1">{fullLabel}</span>}
    </div>
  );
}
