import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { getNfts } from '../database/nftDatabase';
import { getParsedCookie, setStringifiedCookie } from '../utils/cookies';

export default function Cart(props) {
  const nftsInCart = props.cartProducts;
  const [cart, setCart] = useState(nftsInCart);
  const cartCookie = getParsedCookie('cart');

  const nftSingleProductStyles = css`
    h1,
    h2 {
      text-align: center;
    }
    .productImage {
      justify-content: center;
      width: 100%;
      margin: 0 auto;
      display: block;
    }
    .productImage {
      border-radius: 4px;
      display: block;
      margin: 0 auto;
      width: 345px;
      height: 230px;
    }

    .price {
      display: flex;
      justify-content: center;
    }
    .deleteButton {
      height: 25px;
      margin: 20px 10px 0px;
      border: 2px solid black;
      border-radius: 4px;
      background-color: lightpink;
      cursor: pointer;
      color: black;
    }
  `;

  const sumStyles = css`
    border: 1px solid black;
    width: 345px;
    margin: 20px auto;
    text-align: center;
    border-radius: 4px;

    .checkoutButton {
      width: 150px;
      margin-bottom: 20px;
      border-radius: 4px;
      background-color: #4b9793;
      color: white;
    }
  `;

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

      {cart.map((nftInCart) => {
        if (nftInCart.amount) {
          return (
            <div
              css={nftSingleProductStyles}
              data-test-id={`cart-product-${nftInCart.id}`}
            >
              <h1>Shopping Cart</h1>
              <h2>{nftInCart.name}</h2>
              <img
                src={`/${nftInCart.id}.jpg`}
                width="345"
                height="230"
                className="productImage"
              />
              <div className="price">
                <span data-test-id="product-price">
                  <br />
                  Price: {nftInCart.amount} x{' '}
                  {nftInCart.price * nftInCart.amount}
                  <br />
                </span>
                <button
                  className="deleteButton"
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
            </div>
          );
        }
      })}
      <div css={sumStyles}>
        <div data-test-id="cart-total">
          <h2>Total : {totalSum()},-</h2>
        </div>
        <a href="/checkout">
          <button data-test-id="cart-checkout" className="checkoutButton">
            Checkout
          </button>
        </a>
      </div>
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
