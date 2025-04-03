import { Button } from "@components/components/ui/button";
import { runQuery } from "@lib/sanity";
import { Container } from "@mono/ui";
import { type MatchPage, matchPageQuery } from "@utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MatrixLeaderboard } from "src/components/matrix-leaderboard";

export const revalidate = 60;

async function getData() {
  return (await runQuery(matchPageQuery)) as MatchPage[];
}

export default async function Page({ params }: { params: { gameId: string } }) {
  const { gameId } = params;
  const matches = await getData();

  if (!gameId || !matches || matches.length === 0) {
    notFound();
  }

  const gameTitle = matches[0]?.game?.title || "Game Leaderboard";

  return (
    <div className="min-h-screen bg-background">
      <Container>
        <div className="py-12">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" size="sm" asChild className="rounded-lg">
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Link>
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">{gameTitle}</h1>
          </div>

          <MatrixLeaderboard matches={matches} />
        </div>
      </Container>
    </div>
  );
}
