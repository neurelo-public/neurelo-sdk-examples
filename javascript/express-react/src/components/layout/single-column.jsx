import { Header } from "@components/app/header";
import { Outlet } from "react-router-dom";

export function SingleColumn() {
  return (
    <div
      className="bg-gradient-to-br from-zinc-950 to-zinc-900
        w-full h-full min-h-screen flex flex-col"
    >
      <Header />

      <section
        className="flex flex-col 
    text-zinc-100 flex-1 h-full p-2 max-w-7xl mx-auto w-full"
      >
        <Outlet />
      </section>
    </div>
  );
}
