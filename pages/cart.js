import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

export default function Cart() {
  return (
    <div>
      <Head>
        <title>Cart</title>
        <meta
          name="description"
          content="Review all your selected products in the cart page"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>This is the cart page</h1>
      </main>
    </div>
  );
}
