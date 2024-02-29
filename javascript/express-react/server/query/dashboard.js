var {
  FilmApiService,
  ActorApiService,
  AuthApiService,
} = require("neurelo-sdk");

async function fetchDashboardStats() {
  try {
    const resTotalFilms = await FilmApiService.aggregateByFilm({
      _count: ["film_id"],
    });

    const resTotalActors = await ActorApiService.aggregateByActor({
      _count: ["actor_id"],
    });

    const resTotalUsers = await AuthApiService.aggregateByAuth({
      _count: ["user_id"],
    });

    return [
      {
        totalFilms: resTotalFilms.data?.data?._count?.film_id || 0,
        totalActors: resTotalActors.data?.data?._count?.actor_id || 0,
        totalUsers: resTotalUsers.data?.data?._count?.user_id || 0,
      },
      undefined,
    ];
  } catch (error) {
    console.error("Error fetching dashboard stats from server : ", {
      error,
      errorMessage: error?.response?.data?.errors,
    });
    return [
      {
        totalFilms: 0,
        totalActors: 0,
        totalUsers: 0,
      },
      error?.response?.data?.errors,
    ];
  }
}

module.exports = {
  fetchDashboardStats,
};
