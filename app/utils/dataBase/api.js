import { firebaseauth, reauthenticated, EmailAuthProvider } from "./firabase";

export function reauthenticate(password) {
  const user = firebaseauth.currentUser;
  const credentials = EmailAuthProvider.credential(user.email, password);
  return reauthenticated(user, credentials);
}
