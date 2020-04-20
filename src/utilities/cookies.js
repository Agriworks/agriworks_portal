import { getCookie } from "../js/authentication"

export const sessionExists = () => {
    const sessionId = getCookie("SID");
    if (sessionId) {
    //   store.commit("setLoggedInFalse");
    //   router.push("/");
      return true;
    }
    return false;
}