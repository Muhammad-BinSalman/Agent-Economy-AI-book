"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ProgressBar } from "@/components/progress-bar";

export default function BookPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the first chapter (preface)
    router.replace("/book/preface");
  }, [router]);

  return (
    <>
      <ProgressBar />
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded mb-4 w-3/4 mx-auto"></div>
            <div className="h-4 bg-muted rounded mb-2 w-full"></div>
            <div className="h-4 bg-muted rounded mb-2 w-5/6 mx-auto"></div>
            <div className="h-4 bg-muted rounded w-4/6 mx-auto"></div>
          </div>
        </div>
      </div>
    </>
  );
}
