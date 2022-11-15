import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';

//css written as function accepting cookie state
const cookieBannerStyles = (isBannerOpen) => css`
  display: flex;
  justify-content: center;
  height: 35px;
  background-color: #e2e2e2;
  padding: 5px;

  //conditional rendering with inserting a variable which triggers if cookies were accepted
  ${!isBannerOpen &&
  css`
    height: 0px;
    padding: 0px;
    overflow: hidden;
    transition: all 0.5s ease-in-out;
  `}
`;

const cookieButtonStyles = css`
  background-color: #6495ed;
  color: white;
  border-radius: 4px;
`;

export function CookieBanner() {
  const [isBannerOpen, setIsBannerOpen] = useState(true);

  //useEffect to run window.localStorage.getItem only in the browser
  useEffect(() => {
    //grabbing the initival local storage value before any user interaction
    //e.g. is user was already on the website don't show banner again
    //returns true (banner not clicked),false (banner already clicked) or null (cookie not existent)

    const initialLocalStorageValue = getLocalStorage('isBannerOpen');

    // parsing cookie abstrackted in CookieBanner
    setIsBannerOpen(JSON.parse(initialLocalStorageValue));

    //setting Bannerstate to initial local storage value
    //null will cause error - don't parse Cookie if null
    if (initialLocalStorageValue !== null) {
      return (
        // no need to JSON.strigify() since it's happening it CookieBanner();
        setIsBannerOpen(initialLocalStorageValue)
      );
    }
  }, []);

  return (
    //css function that lets the banner vanish if clicked
    <div css={cookieBannerStyles(isBannerOpen)}>
      <span
        css={css`
          margin-right: 10px;
        `}
      >
        By clicking you are accepting our cookies
      </span>
      <button
        css={cookieButtonStyles}
        onClick={() => {
          setIsBannerOpen(false);

          //Store value in local storage - converting value false to string happening in util function setLocalStorage
          setLocalStorage('isBannerOpen', false);
        }}
      >
        Accept all
      </button>
    </div>
  );
}
