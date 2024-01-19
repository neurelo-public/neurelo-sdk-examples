package router

import (
	"github.com/gofiber/fiber/v2"
	actor "github.com/neurelo-public/neurelo-sdk-examples/go/src/services/actor"
	film "github.com/neurelo-public/neurelo-sdk-examples/go/src/services/film"
)

func SetupRoutes(app *fiber.App) {
	// --- Render pages ---
	app.Get("/", actor.RenderIndexPage)
	app.Get("/actors", actor.GetAllActors)
	app.Get("/films", film.GetAllFilms)

	// --- API groups   ---
	api_1 := app.Group("/api/v1")

	// --- APIs ---
	api_1.Get("/actors", actor.GetAllActorsAPI)
	api_1.Get("/films", film.GetAllFilmsAPI)
}
