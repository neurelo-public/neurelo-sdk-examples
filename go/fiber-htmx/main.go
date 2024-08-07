package main

import (
	"log"
	"os"

	"github.com/goccy/go-json"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"

	htmx "github.com/neurelo-public/neurelo-sdk-examples/go/src/htmx"
	"github.com/neurelo-public/neurelo-sdk-examples/go/src/lib"
	router "github.com/neurelo-public/neurelo-sdk-examples/go/src/router"
)

func main() {
	// Env File
	env := os.Getenv("ENV")
	if env != "production" {
		err := godotenv.Load(".env")
		if err != nil {
			log.Print("Could not load .env file")
		}
	}

	// Get Template Engine
	template_engine := htmx.GetTemplateEngine()

	app := fiber.New(fiber.Config{
		JSONEncoder: json.Marshal,
		JSONDecoder: json.Unmarshal,
		Views:       template_engine,
		// Views Layout is the global layout for all template render until override on Render function.
		ViewsLayout: "layouts/main",
	})
	app.Use(cors.New(cors.Config{
		AllowOrigins:     os.Getenv("CORS_ALLOWED"),
		AllowCredentials: true,
		AllowMethods:     "GET, PUT, POST, DELETE, OPTIONS",
		AllowHeaders:     "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization",
	}))

	// Setup client
	lib.SetupApiClient()

	// Register all routes
	router.SetupRoutes(app)

	// Start server
	serverUrl := os.Getenv("SERVER_URL")
	app.Listen(serverUrl)
}
