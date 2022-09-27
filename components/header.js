/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Link from 'next/link';

const navStyles = css`
  background-color: pink;
  margin-top: 20px;
  padding: 10px;

  > a + a {
    margin-left: 20px;
  }

  > a {
    :hover {
      color: white;
    }
  }
`;

export default function Header() {
  return (
    <header>
      <nav styles={navStyles}>
        <Link href="/">Home</Link>
        <Link href="/cart">Cart</Link>
        <Link href="/checkout">Checkout</Link>
        <Link href="/thank-you">Thank you</Link>
      </nav>
    </header>
  );
}
