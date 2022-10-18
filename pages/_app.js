import { css, Global } from '@emotion/react';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { getParsedCookie, setStringifiedCookie } from '../utils/cookies';

function MyApp({ Component, pageProps }) {
  const [cart, setCart] = useState();

  // define Cookies + Values in app.js to have acces on other pages via props
  // get Cookie, triggers on first render only
  useEffect(() => {
    const getCookie = getParsedCookie('cart');
    if (getCookie) {
      setCart(getCookie);
    }
  }, []);

  // set Cookie, renders every time the cart changes
  useEffect(() => {
    if (typeof cart !== 'undefined') {
      setStringifiedCookie('cart', cart);
    }
  }, [cart]);
  console.log('AppCart', cart);

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
      <Layout>
        {/* including Header and Footer components  */}
        <Component {...pageProps} cart={cart} setCart={setCart} />
      </Layout>
    </>
  );
}

export default MyApp;
