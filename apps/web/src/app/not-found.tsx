import { Button } from "@components/components/ui/button";
import { ArrowLeft, FileX2 } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <div className="flex flex-col items-center text-center max-w-md">
        <div className="rounded-full bg-muted p-4 mb-6">
          <FileX2 className="h-8 w-8 text-muted-foreground text-red-500" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          No data found
        </h1>
        <p className="text-muted-foreground mb-6">
          It looks like no data has been added yet. Please check back later or
          add some data to get started.
        </p>
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
  );
}
