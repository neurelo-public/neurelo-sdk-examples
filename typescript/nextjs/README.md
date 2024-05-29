## Typescript NextJS FullStack App

Nextjs 14 SSR app using neurelo as a data source.

### Getting started

- Check the docs for Neurelo-SDK [here](https://docs.neurelo.com/sdks/typescript-javascript-sdk)
- You can use any nextjs example by providing options for create-next-app

```bash
npx create-next-app -e https://github.com/neurelo-public/neurelo-sdk-examples/tree/main/typescript/nextjs
# or
yarn create next-app -e https://github.com/neurelo-public/neurelo-sdk-examples/tree/main/typescript/nextjs
# or
pnpm create next-app -e https://github.com/neurelo-public/neurelo-sdk-examples/tree/main/typescript/nextjs
```

> Note: You can view all the available options for create-next-app by running `npx create-next-app --help` or [nextjs documentation reference](https://nextjs.org/docs/app/api-reference/create-next-app#non-interactive)

### Starting server

```bash
# Fill in .env.local with your neurelo credentials
cp .env.example .env.local

npm install
npm run format
npm run dev
```
