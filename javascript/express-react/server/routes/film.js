var express = require("express");
var filmQueries = require("../query/films");

var router = express.Router();

router.get("/film-list", async function (req, res, next) {
  const data = await filmQueries.getAllFilms({
    pageNum: req.query?.pageNum || 1,
    search: req.query?.search || "",
    orderBy: req.query?.orderBy || "",
    sortBy: req.query?.sortBy || "",
  });
  res.json(data);
});

router.get("/film/:filmId", async function (req, res, next) {
  const data = await filmQueries.getOneFilm(req.params.filmId);
  res.json(data);
});

router.put("/film/:filmId", async function (req, res, next) {
  const data = await filmQueries.updateFilm(req.body);
  res.json(data);
});

module.exports = router;
