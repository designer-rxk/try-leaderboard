import { Button } from "@components/components/ui/button";
import { Card, CardContent, CardFooter } from "@components/components/ui/card";
import type { Homepage } from "@utils";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface GameCardProps {
  game: Homepage;
}

export function GameCard({ game }: GameCardProps) {
  return (
    <Link href={`/${game._id}`}>
      <Card className="overflow-hidden transition-all hover:shadow-md rounded-2xl">
        <div className="aspect-[16/9] relative bg-muted">
          <Image
            src="/placeholder.svg"
            alt={game.title || "Game"}
            fill
            className="object-cover"
          />
        </div>
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-2">{game.title}</h3>
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
          <Button variant="ghost" size="sm">
            View <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
