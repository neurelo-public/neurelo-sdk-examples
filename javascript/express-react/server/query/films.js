var { FilmApiService } = require("neurelo-sdk");

const PAGE_SIZE = 20;

async function getAllFilms({ pageNum, search, orderBy, sortBy }) {
  try {
    const res = await FilmApiService.findFilm(
      undefined,
      {
        OR: [
          {
            title: {
              contains: search,
            },
          },
          {
            description: {
              contains: search,
            },
          },
        ],
      },
      [{ [orderBy]: sortBy }],
      (pageNum - 1) * PAGE_SIZE,
      PAGE_SIZE
    );

    const resForTotal = await FilmApiService.aggregateByFilm(
      { _count: ["film_id"] },
      {
        OR: [
          {
            title: {
              contains: search,
            },
          },
          {
            description: {
              contains: search,
            },
          },
        ],
      }
    );

    if (res.data?.data) {
      return {
        data: res.data?.data,
        totalCount: resForTotal.data?.data?._count?.film_id || 0,
      };
    } else {
      return {
        data: undefined,
        totalCount: 0,
      };
    }
  } catch (error) {
    console.error("Error fetching films from server : ", {
      error,
      errorMessage: error?.response?.data?.errors,
    });
    return {
      data: undefined,
      totalCount: 0,
      message: "Error fetching films",
    };
  }
}

async function getOneFilm(filmId) {
  try {
    const res = await FilmApiService.findFilmByFilmId(filmId);
    if (res.data?.data) {
      return {
        data: res.data?.data,
      };
    } else {
      return {
        data: undefined,
        message: "Error fetching film",
      };
    }
  } catch (error) {
    console.error("Error fetching film from server : ", {
      error,
      errorMessage: error?.response?.data?.errors,
    });
    return {
      data: undefined,
      message: "Error fetching film",
    };
  }
}

async function updateFilm(data) {
  try {
    console.log("data : ", data);

    const res = await FilmApiService.updateFilmByFilmId(
      data?.film_id,
      {
        title: data?.title,
        description: data?.description,
        rental_rate: data?.rental_rate,
      },
      undefined
    );
    if (res.data?.data) {
      return {
        data: res.data?.data,
        message: "Film updated successfully",
      };
    } else {
      return {
        data: undefined,
        message: "Error updating film",
      };
    }
  } catch (error) {
    console.error("Error updating film : ", {
      error,
      errorMessage: error?.response?.data?.errors,
    });
    return {
      data: undefined,
      message: "Error updating film",
    };
  }
}

module.exports = {
  getAllFilms,
  getOneFilm,
  updateFilm,
};
