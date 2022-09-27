import { css } from '@emotion/react';

const footerStyles = css`
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

export default function Footer() {
  return (
    <div styles={footerStyles}>
      <Link href="/">Home</Link>
      <Link href="/cart">Cart</Link>
      <Link href="/checkout">Checkout</Link>
      <Link href="/thank-you">Thank you</Link>
    </div>
  );
}
