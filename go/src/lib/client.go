package lib

import (
	"os"

	neurelo_sdk "github.com/neurelo-public/neurelo-sdk-examples/go-sdk"
)

var NeureloClient *neurelo_sdk.APIClient

func SetupClient() {
    sdk_config := neurelo_sdk.NewConfiguration()
    sdk_config.Host = os.Getenv("NEURELO_API_ENDPOINT")
    sdk_config.DefaultHeader["X-API-KEY"] = os.Getenv("NEURELO_API_KEY")
    sdk_config.Debug = false

    NeureloClient = neurelo_sdk.NewAPIClient(sdk_config)
}
