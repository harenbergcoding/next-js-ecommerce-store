import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { getNfts } from '../../database/connect';
import { getParsedCookie, setStringifiedCookie } from '../../utils/cookies';

export default function Cart(props) {
  const cartCookie = getParsedCookie();
  console.log(cartCookie);
  return (
    <div>
      <Head>
        <title>Cart</title>
        <meta
          name="Cart"
          content="Review all your selected products in the cart page"
        />
        <link rel="icon" href="/2.jpg" />
      </Head>

      <main>
        <h1>This is the cart page</h1>
        <div>
          {props.nftDatabase.map((singleNft) => {
            return (
              <div key={singleNft.id}>
                {singleNft.name} <br />
                {singleNft.type}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const nfts = await getNfts();

  // console.log('nfts', nfts);

  return {
    props: {
      // replace nftDatabase with nfts which comes from the db
      nftDatabase: nfts,
    },
  };
}

// We (Ute and I) were trying to implement the product quantity count on the single product page so that it updates on click. José and Lukas helped us figure it out and asked us to document it as it might help others.
// What would be the expected behaviour
// Product quantity count on the single product page updates on click and stores the values in the cookie.
// Your guess of what the problem is
// - we didn’t understand the concept of cookies
// - the state of the count was not synchronized with the cookie “cart”
// A list of things you have tried to solve it
// - make it work with cookies in single product page only (but then it updated only on refresh)
// - implement a useState for the count on the single product page, but then realized we need the state on other pages (header, cart) as well
// How we solved it
// - lift state up and use useEffects to set state and get state
// - first useEffect for getting the cookies on first render
// - second useEffect for updating the cookies everytime state changes
// - use state in the areas where we need to display the values of the cookies
// We tried to recreate the visual explanation of cookies that José gave us (see attached drawing below).

// https://openclassrooms.com/en/courses/7132446-create-a-web-application-with-react-js/7208826-share-state-between-different-components
