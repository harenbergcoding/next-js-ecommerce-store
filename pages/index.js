import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';

// import { useState } from 'react';

const h1Styles = css`
  margin-top: 80px;
  margin-bottom: 50px;
  color: black;
  font-size: 36px;
  text-align: center;
`;

const gridStyles = css`
  display: grid;
  grid-template-columns: 420px 420px;
  grid-template-rows: 280px 280px;
  grid-gap: 10px;
  justify-content: center;
  align-items: center;
`;

const gridboxStyles = css`
  grid-auto-flow: row;
  width: 420px;
  height: 280px;
  border-radius: 12px;
  display: block;
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
        <link rel="icon" href="/2.jpg" />
      </Head>

      <main>
        <h1 css={h1Styles}>Buy, Sell and Trade Your NFTs </h1>
        <div css={gridStyles}>
          <div css={gridboxStyles}>
            <a href="/nfts">
              <Image
                src={'/1.jpg'}
                width="420"
                height="280"
                css={css`
                  border-radius: 12px;
                `}
              />
            </a>
          </div>
          <div css={gridboxStyles}>
            <a href="/nfts">
              <Image
                src={'/2.jpg'}
                width="420"
                height="280"
                css={css`
                  border-radius: 12px;
                `}
              />
            </a>
          </div>
          <div css={gridboxStyles}>
            <a href="/nfts">
              <Image
                src={'/3.jpg'}
                width="420"
                height="280"
                css={css`
                  border-radius: 12px;
                `}
              />
            </a>
          </div>
          <div css={gridboxStyles}>
            <a href="/nfts">
              <Image
                src={'/4.jpg'}
                width="420"
                height="280"
                css={css`
                  border-radius: 12px;
                `}
              />
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
