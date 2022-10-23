import { css, Global } from '@emotion/react';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { getParsedCookie, setStringifiedCookie } from '../utils/cookies';

function MyApp({ Component, pageProps }) {
  const [cart, setCart] = useState();

  // define Cookies + Values in app.js to have acces on other pages via props
  // get Cookie, triggers on first render only

  const getCookie = getParsedCookie('cart');
  console.log('getCookieApp.js', getCookie);

  // const totalAmount = getCookie.reduce((previousValue, currentValue) => {
  //   // previousValue is the intional value 0
  //   return previousValue + currentValue.cart;
  // }, 0);

  // console.log('totalAmountApp.js', totalAmount);

  useEffect(() => {
    console.log('triggered1');

    const getCookie = getParsedCookie('cart');
    if (getCookie) {
      setCart(getCookie);
    }
  }, []);

  // set Cookie, renders every time the cart changes
  useEffect(() => {
    console.log('triggered2');
    if (typeof cart !== 'undefined') {
      setStringifiedCookie('cart', cart);
    }
  }, [cart]);

  console.log('AppCart', cart);

  // const productSum = getParsedCookie('cart');

  // console.log('productSum', productSum);

  return (
    <>
      <Global // global styles
        styles={css`
          *,
          *::before,
          *::after {
            text-decoration: none;
            box-sizing: border-box;
          }

          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
              Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
              sans-serif;
            margin: 0px;
          }
        `}
      />
      <Layout cart={cart}>
        {/* including Header and Footer components  */}
        <Component {...pageProps} cart={cart} setCart={setCart} />
      </Layout>
    </>
  );
}

export default MyApp;
