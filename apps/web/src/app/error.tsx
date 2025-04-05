"use client";

import { Button } from "@components/components/ui/button";
import { AlertTriangle, ArrowLeft, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <div className="flex flex-col items-center text-center max-w-md">
        <div className="rounded-full bg-muted p-4 mb-6">
          <AlertTriangle className="h-8 w-8 text-destructive" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          Something went wrong
        </h1>
        <p className="text-muted-foreground mb-6">
          An error occurred while processing your request. Please try again or
          return to the home page.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            variant="outline"
            onClick={() => reset()}
            className="flex items-center gap-2 rounded-lg py-2 px-4 group"
          >
            <RefreshCw className="h-4 w-4 transition-all duration-300 transform group-hover:rotate-180" />
            Try again
          </Button>
          <Button
            asChild
            variant="outline"
            className="rounded-lg py-2 px-4 group"
          >
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4 transition-all duration-300 transform group-hover:-translate-x-1" />
              Return to home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
