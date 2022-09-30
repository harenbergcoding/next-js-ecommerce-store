import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Footer from '../components/footer';
import Header from '../components/header.js';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Home</title>
        <meta
          name="description"
          content="Buy your first bored monkey nfts and become a virtual art collector!"
        />
        <link rel="icon" href="/iguana.jpg" />
      </Head>

      <main>
        <h1>Get Your NFTs </h1>
        <Image src="/iguana.jpg" alt="iguana nft" width="720" height="407" />
      </main>
    </div>
  );
}
