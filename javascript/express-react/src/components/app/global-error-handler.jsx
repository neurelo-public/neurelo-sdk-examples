import { CodeBlock } from "@components/generic";
import { ArrowLeftCircleIcon, Home } from "lucide-react";
import { Link, useRouteError } from "react-router-dom";
import { Header } from ".";
import { Button, Card } from "@components/ui";

function IGlobalErrorHandler() {
  const error = useRouteError();
  return (
    <div
      className="bg-gradient-to-br from-zinc-950 to-zinc-900
        w-full h-full min-h-screen flex flex-col"
    >
      <Header />

      <section
        className="flex flex-col items-center justify-center
    text-zinc-100 flex-1 h-full p-2 max-w-7xl mx-auto w-full"
      >
        <Card className="gap-8 py-12" size="lg">
          <h1 className="text-2xl font-light text-red-400">Error</h1>

          <CodeBlock
            json={error ? error : {}}
            className="text-red-700 text-xs w-full font-light overflow-x-auto overflow-hidden whitespace-pre-wrap"
          />

          <div className="justify-between flex flex-row w-full gap-4">
            <Link to={-1} className="p-0 m-0" tabIndex={-1}>
              <Button startIcon={ArrowLeftCircleIcon} tabIndex={-1}>
                Go Back
              </Button>
            </Link>

            <Link to="/" className="p-0 m-0" tabIndex={-1}>
              <Button startIcon={Home} tabIndex={-1}>
                Back To Home
              </Button>
            </Link>
          </div>
        </Card>
      </section>
    </div>
  );
}

export function GlobalErrorHandler() {
  return <IGlobalErrorHandler />;
}
