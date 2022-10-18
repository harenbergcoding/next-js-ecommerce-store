import { css, Global } from '@emotion/react';
import Layout from '../components/Layout';
import { getParsedCookie, setStringifiedCookie } from '../utils/cookies';

function MyApp({ Component, pageProps }) {
  const [cart, setCart] = useState();

  const getCookie = getParsedCookie('cart');
  if (getCookie) {
    setCart(getCookie);
  }

  const setCookie = setStringifiedCookie('cart');
  if (typeof cart !== 'undefined') {
    setCart(setCookie);
  }

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
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
