import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';

const formWrapperStyles = css`
  width: 900px;
  margin: 0 auto;
  justify-content: center;
  text-align: center;
  border: 1px solid black;
  padding: 20px 30px 400px;
  margin-top: 30px;
`;

const shippingStyles = css`
  margin-top: 50px;
  > div {
    display: flex;
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
    display: flex;
    justify-content: fill;
  }

  > div > label {
    margin-left: 20px;
  }
`;

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

      <main css={formWrapperStyles}>
        <h1>Checkout Page</h1>

        <form>
          <div className="shipping-information" css={shippingStyles}>
            <h2>Shipping Information</h2>
            <div>
              <label>
                First Name
                <br />
                <input data-test-id="checkout-first-name" placeholder="Max" />
              </label>
              <label>
                Last Name
                <br />
                <input data-test-id="checkout-last-name" />
              </label>
              <label>
                E-Mail
                <br />
                <input type="email" data-test-id="checkout-email" />
              </label>
            </div>
            <div>
              <label>
                Address
                <br />
                <input data-test-id="checkout-address" />
              </label>
              <label>
                City
                <br />
                <input data-test-id="checkout-city" />
              </label>
              <label>
                Postal Code
                <br />
                <input data-test-id="checkout-postal-code" />
              </label>
              <label>
                Country
                <br />
                <input data-test-id="checkout-country" />
              </label>
            </div>
          </div>
          <div className="payment-information" css={paymentStyles}>
            <h2>Payment Information</h2>
            <label>
              Credit Card
              <br />
              <input data-test-id="checkout-credit-card" />
            </label>
            <label>
              Expiration Date
              <br />
              <input data-test-id="checkout-expiration-date" />
            </label>
            <label>
              Security Code
              <br />
              <input data-test-id="checkout-security-code" />
            </label>
          </div>
        </form>
      </main>
    </div>
  );
}
