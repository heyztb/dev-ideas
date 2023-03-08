import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
  return {
    title: "rAuto • Reset Password",
    description: "Reset your password for rAuto"
  }
}