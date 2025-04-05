import { runQuery } from "@lib/sanity";
import { Container } from "@mono/ui";
import { type Homepage, homePageQuery } from "@utils";
import { notFound } from "next/navigation";
import { GameCard } from "src/components/game-card";

export const revalidate = 60;

async function getData() {
  return (await runQuery(homePageQuery)) as Homepage[];
}

export default async function HomePage() {
  const games = await getData();

  if (!games || games.length === 0) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <Container>
        <div className="py-12">
          <h2 className="text-3xl font-bold tracking-tight mb-8">Games</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game, index) => (
              <GameCard key={index} game={game} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
