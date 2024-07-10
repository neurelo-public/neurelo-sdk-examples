## Go Fiber-HTMX FullStack App

Go htmx server side rendering using neurelo as a data source.

## Setup

-   Set up a project in neurelo using the schema provided in the `./schema/neurelo-postgresql-schema.json` directory.
-   After setting up your project, make sure you have a data source connected to your environment.
-   Copy the url from your environment and paste it in the `.env` file.
-   Create a new API key in your environment and paste it in the `.env` file.
-   Unzip compressed file into pkg:

```sh
# Change directory (cd) to your project root.
# Make pkg/neurelo_sdk directory if it doesn't exists.
mkdir -p ./pkg/neurelo
# Unzip sdk files into pkg/neurelo_sdk
unzip ./specs/neurelo-sdk-golang-cmt_621453.zip -d ./pkg/neurelo_sdk
```

```sh
# Replace module name with your neurelo_sdk name.
go mod edit -replace <YOUR_MODULE_URL>=./pkg/neurelo_sdk
```

### Starting server

```bash
# Fill in the .env file with your credentials.
cp .env.example .env

go run main.go

# For development, First install go-air locally.
# Air is a development tool for Go apps. (https://github.com/air-verse/air)
air
```
