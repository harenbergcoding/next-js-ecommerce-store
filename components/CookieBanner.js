import { css } from '@emotion/react';
import { useEffect, useState } from 'react';

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

  //useEffect to run window.localStorage.getItem in the FE
  useEffect(() => {
    //defining initival local storage value before any user interaction
    const initialLocalStorageValue =
      window.localStorage.getItem('isBannerOpen');
  }, []);

  return (
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
        }}
      >
        Accept all
      </button>
    </div>
  );
}
