import { Button } from "@components/ui";
import { useAuthSlice } from "@store/index";
import { GaugeIcon, GitForkIcon, LogInIcon } from "lucide-react";
import { Link } from "react-router-dom";

const TEXT = {
  title: "Neurelo Express-React Starter",
  description:
    "This is a simple starter for building full-stack applications with Express and React.",
  module: "React ES-Module & Express CommonJs",
};

export function HomePage() {
  const authSlice = useAuthSlice();

  const showSignIn = !authSlice?.account;
  return (
    <div className="w-full h-full flex-1 text-center flex flex-col items-center justify-center select-none gap-3">
      <h1
        className="text-7xl font-thin mb-6
        bg-gradient-to-br from-orange-400 via-zinc-500 to-zinc-600
        text-transparent bg-clip-text"
      >
        {TEXT.title}
      </h1>
      <p className="text-2xl font-thin text-white">{TEXT.description}</p>
      <p className="text-lg font-light text-zinc-400">{TEXT.module}</p>

      <div className="w-full flex items-center justify-center mt-6 gap-3">
        <Link
          to="https://github.com/neurelo-public/neurelo-sdk-examples"
          target="_blank"
        >
          <Button type="button" startIcon={GitForkIcon} size="sm" tabIndex={0}>
            Fork me on Github
          </Button>
        </Link>

        <Link to={showSignIn ? "/sign-in" : "/dashboard"}>
          <Button
            type="button"
            startIcon={showSignIn ? LogInIcon : GaugeIcon}
            size="sm"
            theme="primary"
            tabIndex={0}
          >
            {showSignIn ? "Sign In" : "Dashboard"}
          </Button>
        </Link>
      </div>
    </div>
  );
}
