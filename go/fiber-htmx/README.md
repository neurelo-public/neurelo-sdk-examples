## Go Fiber-HTMX FullStack App

Go htmx server side rendering using neurelo as a data source.

## After downloading GO-SDK from Neurelo docs page.

-   Unzip compressed file into pkg:

```sh
# Change directory (cd) to your project root.
# Make pkg/neurelo_sdk directory if it doesn't exists. `mkdir -p pkg/neurelo`
# Unzip sdk files into pkg/neurelo_sdk
unzip ./specs/<file_name>.zip -d ./pkg/neurelo_sdk
```

### Starting server

```bash
# Fill in the .env file with your credentials.
cp .env.example .env

go run main.go

# For development, First install go-air locally.
# Air is a development tool for Go apps.
air
```
