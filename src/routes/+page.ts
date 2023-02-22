import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
  return {
    title: "rAuto",
    description: "rAuto - The ultimate tool for effortlessly sharing your posts across multiple subreddits simultaneously."
  }
}