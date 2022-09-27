import Head from 'next/head';
import Link from 'next/link';

export default function Checkout() {
  return (
    <div>
      <Head>
        <title>Cart</title>
        <meta
          name="description"
          content="Checkout page. Type in your shipping and billing information."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>This is the checkout page</h1>
      </main>
    </div>
  );
}