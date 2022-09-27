import Head from 'next/head';
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
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header />
        Home
      </main>
      {/* <Footer>abc</Footer> */}
    </div>
  );
}
