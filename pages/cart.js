import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getNfts } from '../database/nftDatabase';
import { getParsedCookie, setStringifiedCookie } from '../utils/cookies';

export default function Cart(props) {
  const nftsInCart = props.cartProducts;

  console.log('nftsInCart', nftsInCart);
  console.log('props.cart.CART', props.cart);

  const [productAmount, setProductAmount] = useState(1);
  const [cart, setCart] = useState(nftsInCart);

  console.log('cart', cart);

  const cartCookie = getParsedCookie('cart');
  console.log('cartCookie', cartCookie);

  // const nftsInCartCookie = cartCookie?.map((nftInCart) => {
  //   return {
  //     ...nftInCart,
  //     name: props.cartProducts.find(
  //       (nftObject) => nftObject.id === nftObject.id,
  //     )?.name,

  //     price: props.cartProducts.find(
  //       (nftObject) => nftObject.id === nftObject.id,
  //     )?.price,
  //   };
  // });

  // console.log('nftsInCartCookie', nftsInCartCookie);

  // Get values from database and reduce

  // Show total amount
  function totalSum() {
    return cart.reduce((previousValue, currentValue) => {
      // previousValue is the intional value 0
      return previousValue + currentValue.amount * currentValue.price;
    }, 0);
  }

  // console.log('nftsInCart', nftsInCart);
  // console.log('props.cart', props.cart);
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
      {/* <main> */}
      <h1>This is the cart page</h1>
      {cart.map((nftInCart) => {
        if (nftInCart.amount) {
          return (
            // css={nftStyles}
            <div className="nft single product">
              <h1>{nftInCart.name}</h1>
              <Image src={`/${nftInCart.id}.jpg`} width="345" height="230" />
              <span data-test-id="product-price">
                <br />
                Price: {nftInCart.price * nftInCart.amount}
                <br />
                Amount: {nftInCart.amount}
              </span>
              <button
                onClick={
                  () => {
                    // handleRemove(nftsInCart.id);

                    // call Cookies
                    const cartCookie = getParsedCookie('cart');

                    // get object that should be remove from cart
                    const foundCookie = cartCookie.filter((item) => {
                      return item.id === nftInCart.id;
                    });

                    // get id from object that should be removed frmo cart
                    const foundCookieId = foundCookie[0].id;

                    // create new cart
                    const newCart = cart.filter((item) => {
                      return item.id !== foundCookieId;
                    });

                    // get all objects to set in new cookie minus the object that should be deleted
                    const foundCookieToSetCart = cartCookie.filter((item) => {
                      return item.id !== nftInCart.id;
                    });

                    // set new cart
                    setCart(newCart);

                    // set new cookie
                    setStringifiedCookie(
                      'cart',
                      props.setCart(foundCookieToSetCart),
                    );

                    // if (foundCookie) {
                    //   foundCookie.cart = 0;
                    // setCart([]); - REMOVE ALL FEATURE
                    // setStringifiedCookie('cart', cart);

                    // const initialCookieValueCart = getParsedCookie('cart');

                    // console.log(
                    //   'initialCookieValueCart.productQuantity',
                    //   initialCookieValueCart.productQuantity,
                    // );

                    // console.log('productAmount', productAmount);

                    // const currentCookieValue = getParsedCookie('cart');

                    // console.log('currentCookieValue', currentCookieValue);

                    // match cookie id with product id

                    // const foundCookie = currentCookieValue.find(
                    //   (nftCartCookie) => nftCartCookie.id === nftInCart.id,
                    // );

                    // if (foundCookie) {
                    //   foundCookie.productQuantity = setProductAmount(0);
                    // setCart([]); - REMOVE ALL FEATURE
                    // setStringifiedCookie('cart', currentCookieValue);
                    // }
                  }

                  // console.log('foundCookie', foundCookie);
                }
                // }
              >
                X
              </button>
            </div>
          );
        }
      })}
      <h2>Total amount</h2>;{totalSum()}
    </div>

    // </div>
    //   );
    // }
    //     })}
    //   </div>
    //   <h2>Total amount</h2>
    //   <span>{productsSummary}</span>
    // </div>
  );
}

export async function getServerSideProps(context) {
  const nfts = await getNfts();
  // const allNftsWithProductQuantity = nfts;

  // console.log(
  //   'context.req.cookies.productQuantityCart',
  //   context.req.cookies.productQuantity,
  // );

  // get parsed cookie into the BackEnd
  const parsedCookies = context.req.cookies.cart
    ? JSON.parse(context.req.cookies.cart)
    : [];

  // console.log('parsedCookiesCart', parsedCookies);
  // Map over database and add property amount + corresponding value

  const allNftsWithProductQuantity = nfts.map((nft) => {
    return {
      ...nft,
      amount:
        parsedCookies.find((cookieNftObject) => nft.id === cookieNftObject.id)
          ?.cart || 0,
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
