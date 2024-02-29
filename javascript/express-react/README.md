## Javascript Express-React FullStack App

This is a template for using Express and React in the same project. It is based on Create React App.

## Prerequisites

- [create-react-app](https://github.com/facebookincubator/create-react-app)

## Installing

```bash
git clone 'this-repo-url' app-name

cd app-name
npm install

cd app-name/server
npm install

# Copy the .env.example file to .env and populate it with your own values
cp .env.example .env
```

> You will need `NEURELO_API_KEY` and `NEURELO_API_BASE_PATH` declared in the `.env` file. You can get these values from your Neurelo environment.

## Running The App

The template can be run in development, or in production. For development, use the following workflow.

### Start the React App

```bash
npm run start
```

### Start the Express Server

```bash
npm run server
```

This will start the frontend and API. Both will be reloaded automatically when you make changes.

### What Is Happening Here?

Create React App and the Express server are running on different processes. This is so that React can still use in memory Webpack to do hot reloads really fast.

All fetch requests to `/api` are sent back to the Express server which is serving all `/api` routes from the `routes/index.js` file. This is done via a proxy setup in the `package.json` file.

## Building For Production

In production, you want Express to serve up your app.

### Build React App

```bash
npm build
# OR
npm run build
```

This will build the entire app into the "**build**" folder. This is the folder that you would deploy to your server. The entrypoint is `server.js`. You can test the production build locally by running...

```bash
npm start
# OR
npm run start
```

Now simply visit the Express app at "http://localhost:3399" and you will see your app served from the "**build**" folder.
