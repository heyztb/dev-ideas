import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
  return {
    title: "rAuto • Log in",
    description: "Log in to rAuto - The ultimate tool for effortlessly sharing your posts across multiple subreddits simultaneously."
  }
}