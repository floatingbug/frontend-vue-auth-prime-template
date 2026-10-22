import { authService } from "../../services/authService";
import { clearSession } from "./clearSession";

export async function signOut(store) {
  try {
    await authService.signOut();
  }
  catch {
    // Even if the server call fails, the local session must end.
  }
  finally {
    clearSession(store);
  }
}
