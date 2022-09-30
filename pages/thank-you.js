import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';

const h1Styles = css`
  text-align: center;
  margin: 0 auto;
  padding: 100px;
`;

const thankYoutext = css`
  text-align: center;
  margin: 0 auto;
  padding: 20px;
  font-size: 20px;
  padding-bottom: 350px;

  > a:hover {
    background-color: purple;
    color: white;
  }
`;

export default function Thankyou() {
  return (
    <div>
      <Head>
        <title>Thank you!</title>
        <meta
          name="description"
          content="Congratulations! Your digital art work journey just has begun!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 css={h1Styles}>Thank you for your order</h1>
        <div css={thankYoutext}>
          You can now consider yourself a savy nft collector! Find more digital
          art work within our <Link href="/nfts">nft collection</Link>👊😎
        </div>
      </main>
    </div>
  );
}
