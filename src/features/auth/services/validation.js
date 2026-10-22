// Input checks shared by the auth services.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email) {
  const trimmed = String(email ?? "").trim();

  if (!EMAIL_PATTERN.test(trimmed)) {
    throw new Error("Please enter a valid e-mail address");
  }
  return trimmed;
}

export function validateNewPassword(password, confirmPassword) {
  if (!password) {
    throw new Error("Please enter a password");
  }
  if (password !== confirmPassword) {
    throw new Error("The passwords do not match");
  }
  return password;
}
