// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Octokit } from "@octokit/core";
import { UsersSearchResults } from "../../shared/types";

// Initialize the octokit client with the github access token to increase rate limit
const octokit = new Octokit({ auth: process.env.GIT_TOKEN });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UsersSearchResults>
) {
  const q = req.query.q as string;

  // Make sure the query parameter is valid
  if (!q || q.length < 2) {
    res.status(412).json({
      users: [],
      message: "Query string too short. Should be at least of length 2.",
    });
  }

  // Query the GitHub API
  const response = await octokit.request("GET /search/users", {
    q: q,
  });

  res.status(200).json({
    users: response.data.items.map((user) => {
      return {
        name: user.login,
        img_url: user.avatar_url,
      };
    }),
  });
}
