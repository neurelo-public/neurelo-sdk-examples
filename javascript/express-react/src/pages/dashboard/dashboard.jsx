import { useEffect, useMemo, useState } from "react";
import { Card, LoadingSpinner } from "@components/ui";
import { AuthOnly } from "@components/auth";

const STAT_ITEMS = {
  totalActors: {
    title: "Total Actors",
    value: -1,
  },
  totalFilms: {
    title: "Total Films",
    value: -1,
  },
  totalUsers: {
    title: "Total Users",
    value: -1,
  },
};

async function getAllStats() {
  const res = await fetch("/api/dashboard-stats");
  const data = await res.json();
  return {
    data,
    status: res.status,
  };
}

function Dashboard() {
  const [data, setData] = useState();

  useEffect(() => {
    async function fetchData() {
      const { data, status } = await getAllStats();
      if (status === 200) {
        setData(data);
      }
    }
    fetchData();
  }, []);

  const allStats = useMemo(() => {
    const stateToUse = STAT_ITEMS;
    if (!data) return stateToUse;

    stateToUse.totalActors.value = data.totalActors;
    stateToUse.totalFilms.value = data.totalFilms;
    stateToUse.totalUsers.value = data.totalUsers;
    return stateToUse;
  }, [data]);

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-lg font-medium my-4">Dashboard</h1>

      <div className="w-full grid grid-cols-3 gap-3">
        {Object.keys(allStats).map((key) => (
          <Card
            key={key}
            className="hover:bg-sky-950/20 hover:border-sky-800 transition-colors duration-300
              place-content-start items-start gap-2 p-6"
          >
            {STAT_ITEMS[key].value !== -1 ? (
              <>
                <h2 className="text-sm uppercase tracking-wider font-light text-zinc-300">
                  {STAT_ITEMS[key].title}
                </h2>
                <p className="text-xl font-semibold text-zinc-100">
                  {STAT_ITEMS[key].value}
                </p>
              </>
            ) : (
              <LoadingSpinner className="gap-3 text-start items-start" />
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

export function DashboardPage() {
  return (
    <AuthOnly>
      <Dashboard />
    </AuthOnly>
  );
}
