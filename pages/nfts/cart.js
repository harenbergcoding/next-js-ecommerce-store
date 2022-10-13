import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getNfts } from '../../database/connect';
import { getParsedCookie, setStringifiedCookie } from '../../utils/cookies';

export default function Cart(props) {
  const cartCookie = getParsedCookie('Product');

  // 1:43 https://www.youtube.com/watch?v=iXZw8zo1qbI&ab_channel=UpLeveled

  // console.log('cartCookieFE', cartCookie);
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

        {/* <div>{JSON.stringify(cartCookie)}</div> */}
        <div>
          {props.cartProducts.map((singleNft) => {
            return (
              // css={nftStyles}
              <div className="nft single product">
                <div>
                  <div>
                    <Image
                      src={`/${singleNft.id}.jpg`}
                      width="345"
                      height="230"
                    />
                  </div>
                </div>
                {/* css={descriptionStyles} */}
                <div>
                  <h1>{singleNft.name}</h1>
                  <div>
                    Type: {singleNft.type} |
                    <span data-test-id="product-price">
                      {' '}
                      Price: {singleNft.price}
                      Amount: {singleNft.amount}
                    </span>
                  </div>
                  <br />
                  About:
                  <br />
                  {/* {nft.description} */}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const nftId = parseInt(context.query.nftId);

  console.log('currentCookieValue', context.req.currentCookieValue);

  const parsedCookies = context.req.cookies.productQuantity
    ? JSON.parse(context.req.cookies.productQuantity)
    : [];

  const cartProducts = (await getNfts()).map((nft) => {
    return {
      ...nft,
      amount:
        parsedCookies.find(
          (currentCookieValue) => product.id === currentCookieValue.id,
        )?.amount || 0 /* null or 0 ? */,
    };
  });

  return {
    props: { cartProducts: cartProducts },
  };
}

// export async function getServerSideProps(context) {
//   const nfts = await getNfts();

//   return {
//     props: {
//       // replace nftDatabase with nfts which comes from the db
//       nftDatabase: nfts,
//     },
//   };
// }

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
