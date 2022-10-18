/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Link from 'next/link';

// const headerStyles = css`
//   position: fixed;
//   top: 0;
//   width: 100%;
// `;

const navStyles = css`
  margin-top: 20px;
  padding: 10px 100px;
  display: flex;
  justify-content: space-between;
  text-align: center;
  z-index: 10;

  > div > a {
    margin-left: 40px;
  }

  > div > a {
    text-transform: uppercase;
    :hover {
      color: #e04326;
    }
  }

  > div > Link {
    gap: 20px;
  }
`;

export default function Header() {
  return (
    <header>
      <nav css={navStyles}>
        <div></div>
        <div>
          <Link href="/">HOME</Link>
          <Link data-test-id="products-link" href="/nfts">
            NFTS
          </Link>
          <Link href="/cart">CART 3</Link>
        </div>
        <div></div>
      </nav>
    </header>
  );
}
