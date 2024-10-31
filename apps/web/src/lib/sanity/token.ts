import "server-only";

import { SANITY_READ_TOKEN } from "@utils";

export const token = SANITY_READ_TOKEN;

if (!token) {
  throw new Error("Missing SANITY_API_READ_TOKEN");
}
