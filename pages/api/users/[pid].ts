// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Octokit } from "@octokit/core";
import { RequestError } from "@octokit/request-error";
import { UserFetchResults } from "../../../shared/types";

// Initialize the octokit client with the github access token to increase rate limit
const octokit = new Octokit({ auth: process.env.GIT_TOKEN });

export async function getUserData(pid: string | string[]) {
  let response;

  // Query the GitHub API
  try {
    response = await octokit.request(`GET /users/${pid}`);
    // Destructure the data we need
    const {
      created_at: createdAt,
      email,
      avatar_url: imgUrl,
      location,
      name,
      html_url: url,
      login: username,
    } = response?.data;
    return {
      user: {
        createdAt,
        email,
        imgUrl,
        location,
        name,
        url,
        username,
      },
    };
  } catch (error) {
    //   If the user is not found
    if (error instanceof RequestError && error.status === 404) {
      return { user: null, message: `User with pid: ${pid} not found!` };
    } else {
      return { user: null, message: "Uknown error" };
    }
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserFetchResults>
) {
  const { pid } = req.query;
  const jsonData = await getUserData(pid);

  if (jsonData.user === null) {
    res.status(404).json(jsonData);
  }

  res.status(200).json(jsonData);
}
