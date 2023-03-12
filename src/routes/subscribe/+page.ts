import type { PageLoad } from "./$types";

export const load: PageLoad = async (event) => {
  return {
    title: "rAuto • Subscribe",
    description: "Susbcribe to rAuto today to access premium features, priority support, and more"
  }
}