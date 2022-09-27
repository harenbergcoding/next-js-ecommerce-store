/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
// import Footer from 'next/footer';
import Head from 'next/head';
import Link from 'next/link';

const mainStyles = css`
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

export default function Home() {
  return (
    <div>
      <Head>
        <title>Home</title>
        <meta
          name="description"
          content="Buy your first bored monkey nfts and become a virtual art collector!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main css={mainStyles}>
        <Link href="/">Home</Link>
        <Link href="/cart">Cart</Link>
        <Link href="/checkout">Checkout</Link>
        <Link href="/thank-you">Thank you</Link>
      </main>
      {/* <Footer>abc</Footer> */}
    </div>
  );
}
