export function returnRandomKey() {
  const randomValues = new Uint8Array(20);
  crypto.getRandomValues(randomValues);
  return Array.from(randomValues, (byte) => byte.toString(16)).join("");
}

export const getUserFromCookie = () => {
  const cookieData = document.cookie
    .split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith("user="));

  if (cookieData) {
    const userData = cookieData.split("=")[1];
    return JSON.parse(decodeURIComponent(userData))[0];
  } else return null;
};
