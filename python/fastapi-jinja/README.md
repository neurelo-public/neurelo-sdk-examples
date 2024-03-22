## Python FastAPI + Jinja FullStack App

FastAPI + Jinja app using neurelo as a data source.

### Getting started

1. Set up your Neurelo project with the provided schema in `schema/schema.json`
1. Ensure you have an environment with a valid data source running and pointing to a commit with that schema

Run `pip install -r requirements.txt` in this directory
Run `cp .env.example .env` and replace the variables with valid credentials for your environment
Run `uvicorn src.main:app --reload --host 0.0.0.0` to start the dev server

### Starting server

```bash
# Fill in .env.local with your neurelo credentials
cp .env.example .env.local

# Install dependencies
pip install -r requirements.txt

# Run dev server
uvicorn src.main:app --reload --host 0.0.0.0
```
