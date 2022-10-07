import { css } from '@emotion/react';
import { useState } from 'react';

const cookieBannerStyles = (isBannerOpen) => css`
  display: flex;
  justify-content: center;
  height: 35px;
  background-color: #e2e2e2;
  padding: 5px;

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

  return (
    <div css={cookieBannerStyles(isBannerOpen)}>
      <span>By clicking you are accepting our cookies</span>
      <button
        css={cookieButtonStyles}
        onClick={() => {
          setIsBannerOpen(false);
        }}
      >
        Accept all.
      </button>
    </div>
  );
}
