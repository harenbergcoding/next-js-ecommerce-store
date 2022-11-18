import { css } from '@emotion/react';
import Head from 'next/head';
import { useState } from 'react';
import { getNfts } from '../database/nftDatabase';

const formWrapperStyles = css`
  width: 900px;
  margin: 0 auto;
  justify-content: center;
  text-align: center;
  border: 1px solid black;
  padding: 20px 30px 100px;
  margin-top: 30px;
`;

const shippingStyles = css`
  margin-top: 50px;
  > div {
    display: inline-flex;
    justify-content: fill;
    margin: 30px 0 20px;
  }

  > div > label {
    margin-left: 20px;
  }

  > h2 {
  }
`;

const paymentStyles = css`
  margin-top: 50px;

  > div {
    display: inline-flex;
    justify-content: fill;
    text-align: center;
  }

  > div > label {
    margin-left: 20px;
  }
`;

export default function Checkout(props) {
  const nftsInCart = props.cartProducts;

  const [cart, setCart] = useState(nftsInCart);

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
          name="description"
          content="Checkout page. Type in your shipping and billing information."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main css={formWrapperStyles}>
        <h1>Checkout Page</h1>

        <form>
          <div className="shipping-information" css={shippingStyles}>
            <h2>Shipping Information</h2>
            <div>
              <label>
                First Name
                <br />
                <input
                  required
                  data-test-id="checkout-first-name"
                  placeholder="Max"
                />
              </label>
              <label>
                Last Name
                <br />
                <input required data-test-id="checkout-last-name" />
              </label>
              <label>
                E-Mail
                <br />
                <input required type="email" data-test-id="checkout-email" />
              </label>
            </div>
            <div>
              <label>
                Address
                <br />
                <input required data-test-id="checkout-address" />
              </label>
              <label>
                City
                <br />
                <input required data-test-id="checkout-city" />
              </label>
              <label>
                Postal Code
                <br />
                <input required data-test-id="checkout-postal-code" />
              </label>
              <label>
                Country
                <br />
                <input required data-test-id="checkout-country" />
              </label>
            </div>
          </div>
          <div className="payment-information" css={paymentStyles}>
            <h2>Payment Information</h2>
            <div>
              <label>
                Credit Card
                <br />
                <input required data-test-id="checkout-credit-card" />
              </label>
            </div>
            <div>
              <label>
                Expiration Date
                <br />
                <input required data-test-id="checkout-expiration-date" />
              </label>
            </div>
            <div>
              <label>
                Security Code
                <br />
                <input required data-test-id="checkout-security-code" />
              </label>
            </div>
          </div>
          <br />
          <div>
            <h3>Total Sum</h3>
            {totalSum()}
          </div>
          <br />

          <button data-test-id="checkout-confirm-order">
            <a href="/thank-you">Confirm Order</a>
          </button>
        </form>
      </main>
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
