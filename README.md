This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# GitHub API consumer

This project consists of a web client and serverless API lambda functions, written in Next.js. The serverless API methods consume version 3 (REST) of the GitHub API to fetch details about users. Currently, the client has two features:

1. The user can search for a user in the vast database of GitHub users with an autocomplete component.
1. The user can select a user from the autocomplete component and fetch more detailed information about the selected user.

I had never tried Next.js before, but I had heard some nice things about it, so I thought I would give it a shot, and it is very promising. I am using dynamic routing and server-side data pre-fetching, which are two significant features of Next.js.

## Getting Started

First, download the dependencies:

```bash
npm install
# or
yarn
```

Secondly, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/users/fabpot](http://localhost:3000/api/users/fabpot). This endpoint can be edited in `pages/api/users/[pid].ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.
