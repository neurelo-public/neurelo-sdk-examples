package lib

import (
	"context"
	"net/http"
	"os"

	neurelo_sdk "github.com/neurelo-public/neurelo-sdk-examples/go/pkg/neurelo_sdk"
)

var ApiClient *neurelo_sdk.Client

func RequestEditor(ctx context.Context, req *http.Request) error {
	req.Header.Set("X-API-KEY", os.Getenv("NEURELO_API_KEY"))
	return nil
}

// Setup client after reading env variables or in main.go
func SetupApiClient() {
	hc := http.Client{}
	server := os.Getenv("NEURELO_API_ENDPOINT")
	api_client := neurelo_sdk.Client{
		Server: server,
		Client: &hc,
		RequestEditors: []neurelo_sdk.RequestEditorFn{
			RequestEditor,
		},
	}
	ApiClient = &api_client
}
