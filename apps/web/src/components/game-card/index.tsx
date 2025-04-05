import { Button } from "@components/components/ui/button";
import { Card, CardContent, CardFooter } from "@components/components/ui/card";
import type { Homepage } from "@utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { SanityImage } from "../sanity-image";

interface GameCardProps {
  game: Homepage;
}

export function GameCard({ game }: GameCardProps) {
  return (
    <Link href={`/${game._id}`}>
      <Card className="group overflow-hidden transition-all duration-300 shadow-sm hover:shadow-lg border border-border/40 rounded-2xl bg-card hover:translate-y-[-4px]">
        <div className="aspect-[16/9] relative bg-muted overflow-hidden">
          <SanityImage
            fill
            sizes="(100vw - 128px)"
            imageField={game.image}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-2 transition-colors group-hover:text-primary">
            {game.title}
          </h3>
          <p className="text-muted-foreground line-clamp-2">
            {game.description}
          </p>
        </CardContent>
        <CardFooter className="p-6 pt-0 flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            {game.lastUpdated ? (
              <time dateTime={new Date(game.lastUpdated).toISOString()}>
                Updated {new Date(game.lastUpdated).toLocaleDateString()}
              </time>
            ) : null}
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="flex gap-1 relative overflow-hidden"
          >
            <span>View</span>
            <ArrowRight className="h-4 w-4 transition-all duration-300 transform group-hover:translate-x-1" />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
