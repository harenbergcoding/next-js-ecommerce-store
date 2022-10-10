import Cookies from 'js-cookie';

// Outcome string or undefined
export function getParsedCookie(key) {
  const initialCookieValue = Cookies.get(key);

  // stop function here is value = undefined
  if (!initialCookieValue) {
    return undefined;
  }

  try {
    return JSON.parse(initialCookieValue);
  } catch (err) {
    return undefined;
  }
}

export function setStringifiedCookie(key, value) {
  return Cookies.set(key, JSON.stringify(value));
}
