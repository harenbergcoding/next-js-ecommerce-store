import Head from 'next/head';
import Link from 'next/link';

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
        <h1>Thank you!</h1>
      </main>
    </div>
  );
}
