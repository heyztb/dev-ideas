import type { PageLoad } from "./$types";

export const ssr = false

export const load: PageLoad = async (event) => {
  return {
    title: "rAuto • Update Password",
    description: "Update your password for rAuto"
  }
}