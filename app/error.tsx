"use client";

import { useEffect } from "react";
import AppShell from "@/components/layout/AppShell";
import ErrorState from "@/components/ui/ErrorState";
import Button from "@/components/ui/Button";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <AppShell contentClassName="flex flex-1 items-center justify-center px-8 py-7">
      <ErrorState
        title="This page failed to load"
        description="Something went wrong loading this screen. You can try again, or contact IT if it keeps happening."
        action={
          <Button variant="primary" onClick={reset}>
            Try again
          </Button>
        }
      />
    </AppShell>
  );
}
