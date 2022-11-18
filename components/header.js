import { css } from '@emotion/react';
import { ValueOf } from 'next/dist/shared/lib/constants';
import Link from 'next/link';

const navStyles = css`
  margin-top: 20px;
  padding: 10px 100px;
  display: flex;
  justify-content: space-between;
  text-align: center;
  z-index: 10;

  > div > a {
    margin-left: 40px;
  }

  > div > a {
    text-transform: uppercase;
    :hover {
      color: #e04326;
    }
  }

  > div > Link {
    gap: 20px;
  }
`;

// type Props = {
//   accumulator: number;
//   item: number;
//   reduce: number;
//   cart?: number | undefined;
// };

export default function Header(props) {
  const cartSum = () => {
    return props.cart?.reduce(
      (accumulator, item) => accumulator + item.cart,
      0,
    );
  };

  return (
    <header>
      <nav css={navStyles}>
        <div></div>
        <div>
          <Link href="/">HOME</Link>
          <Link href="/nfts">NFTS</Link>
          <Link href="/cart">
            <a data-test-id="cart-link">
              CART{' '}
              <span data-test-id="cart-count">
                {props.cart ? cartSum() : 0}
              </span>
            </a>
          </Link>
        </div>
        <div></div>
      </nav>
    </header>
  );
}
