import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { getNfts } from '../database/nftDatabase';
import { getParsedCookie, setStringifiedCookie } from '../utils/cookies';

export default function Cart(props) {
  const nftsInCart = props.cartProducts;

  const [cart, setCart] = useState(nftsInCart);

  const cartCookie = getParsedCookie('cart');

  // Get values from database and reduce, Show total amount
  function totalSum() {
    return cart.reduce((previousValue, currentValue) => {
      // previousValue is the intional value 0
      return previousValue + currentValue.amount * currentValue.price;
    }, 0);
  }

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
      <h1>This is the cart page</h1>
      {cart.map((nftInCart) => {
        if (nftInCart.amount) {
          return (
            <div
              className="nft single product"
              data-test-id={`cart-product-${nftInCart.id}`}
            >
              <h1>{nftInCart.name}</h1>
              <Image src={`/${nftInCart.id}.jpg`} width="345" height="230" />
              <span data-test-id="product-price">
                <br />
                Price: {nftInCart.price * nftInCart.amount}
                <br />
                <div data-test-id={`cart-product-quantity-${nftInCart.id}`}>
                  Amount: {nftInCart.amount}
                </div>
              </span>
              <button
                data-test-id={`cart-product-remove-${nftInCart.id}`}
                onClick={() => {
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
                }}
              >
                X
              </button>
            </div>
          );
        }
      })}
      <div data-test-id="cart-total">
        <h2>Total amount</h2>
        {totalSum()}
      </div>
      <a href="/checkout">
        <button data-test-id="cart-checkout">Checkout</button>
      </a>
    </div>
  );
}

export async function getServerSideProps(context) {
  const nfts = await getNfts();

  // get parsed cookie into the BackEnd
  const parsedCookies = context.req.cookies.cart
    ? JSON.parse(context.req.cookies.cart)
    : [];

  // Map over database and add property amount + corresponding value

  const allNftsWithProductQuantity = nfts.map((nft) => {
    return {
      ...nft,
      amount:
        parsedCookies.find((cookieNftObject) => nft.id === cookieNftObject.id)
          ?.cart || 0,
    };
  });
  return {
    props: { cartProducts: allNftsWithProductQuantity },
  };
}
