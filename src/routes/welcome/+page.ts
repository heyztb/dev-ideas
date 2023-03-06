import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
  return {
    title: "Welcome to rAuto",
    description: "Welcome to rAuto - A quick thank you for signing up and onboarding information"
  }
}