import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
  return {
    title: "rAuto • Dashboard",
    description: "rAuto Dashboard - Effortlessly share your posts across multiple subreddits simultaneously."
  }
}