import Head from 'next/head';
import Link from 'next/link';

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

      <main>
        <h1>This is the checkout page</h1>
        <div>Total items: NUMBER Total amount: NUMBER</div>
        <form>
          <div className="shipping-information">
            <h2>Shipping Information</h2>
            <label>
              First Name
              <br />
              <input data-test-id="checkout-first-name" />
            </label>
            <label>
              Last Name
              <input data-test-id="checkout-last-name" />
            </label>
            <label>
              E-Mail
              <input type="email" data-test-id="checkout-email" />
            </label>
            <label>
              Address
              <input data-test-id="checkout-address" />
            </label>
            <label>
              City
              <input data-test-id="checkout-city" />
            </label>
            <label>
              Postal Code
              <input data-test-id="checkout-postal-code" />
            </label>
            <label>
              Country
              <input data-test-id="checkout-country" />
            </label>
          </div>
          <div className="payment-information">
            <h2>Shipping Information</h2>
            <label>
              Credit Card
              <input data-test-id="checkout-credit-card" />
            </label>
            <label>
              Expiration Date
              <input data-test-id="checkout-expiration-date" />
            </label>
            <label>
              Security Code
              <input data-test-id="checkout-security-code" />
            </label>
          </div>
        </form>
      </main>
    </div>
  );
}
