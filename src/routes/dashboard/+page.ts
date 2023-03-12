import type { PageLoad } from "./$types";

export const load: PageLoad = async (event) => {
  return {
    title: "rAuto • Dashboard",
    description: "rAuto Dashboard - Effortlessly share your posts across multiple subreddits simultaneously."
  }
}