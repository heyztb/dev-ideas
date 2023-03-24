import type { PageLoad } from "./$types";

export const load: PageLoad = async (event) => {
  return {
    title: "rAuto • Account",
    description: "Manage your account"
  }
}