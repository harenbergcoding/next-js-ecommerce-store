import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getNfts } from '../database/nftDatabase';
import { getParsedCookie, setStringifiedCookie } from '../utils/cookies';

// 1. Erstelle [] - check
// 2. Get sum of each product
// 3. push into array
// 4. reduce to totalsum [Sum1, Sum2, ...]

export function getSum(props) {
  let cartProductTotalSumArray = [];

  // get singleNftSum.props.children (sum of 1 product)
  let cartProductSumArray = props.cartProducts.map((singleNftSum) => {
    return <div>{singleNftSum.amount * singleNftSum.price}</div>;
  });

  return cartProductSumArray;
}

export default function Cart(props) {
  // const cartCookie = getParsedCookie('Product');

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
          {props.cartProducts.map((nftsInCart) => {
            if (nftsInCart.amount) {
              return (
                // css={nftStyles}
                <div className="nft single product">
                  <div>
                    <div></div>
                  </div>
                  {/* css={descriptionStyles} */}
                  <div>
                    <h1>{nftsInCart.name}</h1>
                    <Image
                      src={`/${nftsInCart.id}.jpg`}
                      width="345"
                      height="230"
                    />
                    <div>
                      <span data-test-id="product-price">
                        Price: {nftsInCart.price * nftsInCart.amount}
                        <br />
                        Amount: {nftsInCart.amount}
                      </span>
                      <div></div>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
        <h2>Total amount</h2>
        <span>{getSum(props)}</span>
        {console.log('getSum(props)', getSum(props))}
        {console.log(
          'getSum(props)[0].props.children',
          getSum(props)[0].props.children,
        )}
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const nfts = await getNfts();

  console.log(
    'context.req.cookies.productQuantityCart',
    context.req.cookies.productQuantity,
  );

  // get parsed cookie into the BackEnd
  const parsedCookies = context.req.cookies.product
    ? JSON.parse(context.req.cookies.product)
    : [];

  console.log('parsedCookiesCart', parsedCookies);
  // Map over database and add property amount + corresponding value

  const allNftsWithProductQuantity = nfts.map((nft) => {
    return {
      ...nft,
      amount:
        parsedCookies.find((cookieNftObject) => nft.id === cookieNftObject.id)
          ?.productQuantity || 0 /* null or 0 ? */,
    };
  });
  console.log('allNftsWithProductQuantity', allNftsWithProductQuantity);
  return {
    props: { cartProducts: allNftsWithProductQuantity },
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

// (nftsInCart) => {return (nftsInCart.id === cartProducts.id)

// import Head from 'next/head';
// import Image from 'next/image';
// import Link from 'next/link';
// import { useEffect, useState } from 'react';
// import { getNfts } from '../../database/nftDatabase';
// import { getParsedCookie, setStringifiedCookie } from '../../utils/cookies';

// export default function Cart(props) {
//   // const cartCookie = getParsedCookie('Product');

//   // console.log('cartCookieFE', cartCookie);
//   return (
//     <div>
//       <Head>
//         <title>Cart</title>
//         <meta
//           name="Cart"
//           content="Review all your selected products in the cart page"
//         />
//         <link rel="icon" href="/2.jpg" />
//       </Head>

//       <main>
//         <h1>This is the cart page</h1>

//         {/* <div>{JSON.stringify(cartCookie)}</div> */}
//         <div>
//           {props.cartProducts.map((nftsInCart) => {
//             return (
//               // css={nftStyles}
//               <div className="nft single product">
//                 <div>
//                   <div>
//                     <Image
//                       src={`/${nftsInCart.id}.jpg`}
//                       width="345"
//                       height="230"
//                     />
//                   </div>
//                 </div>
//                 {/* css={descriptionStyles} */}
//                 <div>
//                   <h1>{nftsInCart.name}</h1>
//                   <div>
//                     Type: {nftsInCart.type} |
//                     <span data-test-id="product-price">
//                       {' '}
//                       Price: {nftsInCart.price}
//                       Amount: {nftsInCart.amount}
//                     </span>
//                   </div>
//                   <br />
//                   About:
//                   <br />
//                   {/* {nft.description} */}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </main>
//     </div>
//   );
// }
