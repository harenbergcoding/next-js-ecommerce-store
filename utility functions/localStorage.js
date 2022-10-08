// create reusable functions here

// 1. get the item and parse it
// try catch handles error in case the try part can't be run
// 2. return values are string (window defined and item is true or false) | null ( window defined and cookie does not existent) | undefined (when window is run in the backend)
export function getLocalStorage(key) {
  try {
    // catch the item
    return JSON.parse(window.localStorage.getItem(key));
  } catch (err) {
    // if window is undefined return undefined
    return undefined;
  }
}
// strigify the value and set the item
export function setLocalStorage(key, value) {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
}
