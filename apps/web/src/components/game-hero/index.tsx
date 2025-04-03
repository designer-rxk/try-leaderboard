import { Button } from "@components/components/ui/button";
import { Container } from "@mono/ui";
import type { Homepage } from "@utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface GameHeroProps {
  game: Homepage;
}

export function GameHero({ game }: GameHeroProps) {
  return (
    <div className="relative bg-muted">
      <div
        className="absolute inset-0 bg-gradient-to-r from-background to-background/20"
        aria-hidden="true"
      />
      <Container>
        <div className="relative py-24 md:py-32 lg:py-40">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
              {game.title || "Discover Amazing Games"}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {game.description ||
                "Explore our collection of interactive games and challenges."}
            </p>
            <div className="flex gap-4">
              <Button asChild>
                <Link href={`/games/${game._id}`}>
                  Play Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline">Learn More</Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
