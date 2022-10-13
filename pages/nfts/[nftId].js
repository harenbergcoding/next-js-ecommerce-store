import { css } from '@emotion/react';
import Cookie from 'js-cookie';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { getNftById } from '../../database/connect';
import { nftDatabase } from '../../database/nftDatabase';
import { getParsedCookie, setStringifiedCookie } from '../../utils/cookies';

const h1Styles = css`
  margin-top: 80px;
  margin-bottom: 50px;
  color: black;
  font-size: 36px;
  text-align: center;
`;

const pictureStyles = css`
  display: flex;
  justify-content: center;
`;

const backButtonStyles = css`
  margin-left: 20px;
  border-radius: 4px;
  width: 80px;
  background-color: white;
  color: #e04326;

  :hover {
    background-color: #e04326;
    color: white;
  }
`;

const addToCartStyles = css`
  margin-top: 30px;
  display: flex;
  justify-content: center;
`;

const addToCartButtonWrapperStyles = css`
  margin-top: 10px;
  display: flex;
  justify-content: center;
  padding-bottom: 50px;
`;

const addToCartButtonStyles = css`
  display: flex;

  background-color: #4b9793;
  color: white;
  justify-content: center;
  border-radius: 4px;
  width: 150px;
  padding: 4px;
  :hover {
    background-color: white;
    color: #4b9793;
  }
`;

// export function handleChangeAddproduct(numberOfItems, productName) {
//   return (
//   setNumberOfItems(numberOfItems + 1);
//   setStringifiedCookie(`Product ${productName}`, numberOfItems);)
// }

export default function ShowSingleProduct(props) {
  const [numberOfItems, setNumberOfItems] = useState(1);

  return (
    <>
      <Head>
        <title>Buy, sell and trade NFTs</title>
        <meta
          name="NFT #1"
          content="Buy, sell and trade NFTs and become a virtual art collector!"
        />
        <link rel="icon" href="/2.jpg" />
      </Head>

      <div>
        <div>
          <div>
            <a href="/nfts">
              <button css={backButtonStyles}> 🠔 Back</button>
            </a>
          </div>
          <h1 css={h1Styles}>
            {props.nft.name} - The {props.nft.type}
          </h1>
        </div>
        <div css={pictureStyles}>
          <Image
            src={`/${props.nft.id}.jpg`}
            width="720"
            height="480"
            css={css`
              border-radius: 12px;
            `}
          />
        </div>
        <div>{/* <div>Price: {props.nft.price}</div> */}</div>
        <div></div>
        <div css={addToCartStyles}>
          <span>Add Quantity: {numberOfItems}</span>
          <button
            // refactor into a HandleChange function!
            onClick={() => {
              // number initialized with 1, preventing user going below 1
              numberOfItems >= 2
                ? setNumberOfItems(numberOfItems - 1)
                : setNumberOfItems(1);

              //get Cookie the first time
              //returns undefined
              const currentCookieValue = getParsedCookie('Product');

              // matching existing cookies with page id
              const foundCookie = currentCookieValue.find(
                (nftCookie) => nftCookie.id === props.nft.id,
              );

              // add new cookie if not existent

              if (foundCookie) {
                // set the productQuantity of the foundCookie -1
                foundCookie.productQuantity--;
                setStringifiedCookie('Product', currentCookieValue);
              }

              // add new cookie if not existent

              // if (!foundCookie) {
              //   currentCookieValue.push({
              //     id: props.nft.id,
              //     productQuantity: 2,
              //   });
              //   setStringifiedCookie('Product', currentCookieValue);
              // } else {
              //   // set the productQuantity of the foundCookie +1
              //   foundCookie.productQuantity++;
              //   setStringifiedCookie('Product', currentCookieValue);
              // }
            }}
          >
            -
          </button>
          <button
            onClick={() => {
              setNumberOfItems(numberOfItems + 1);

              //get Cookie the first time
              //returns undefined
              const currentCookieValue = getParsedCookie('Product');

              // if cookie does not exist set cookie 'Product' as Array

              if (!currentCookieValue) {
                return setStringifiedCookie('Product', [
                  // productQuantity was initialized with 1
                  { id: props.nft.id, productQuantity: 2 },
                ]);
              }

              // matching existing cookies with page id
              const foundCookie = currentCookieValue.find(
                (nftCookie) => nftCookie.id === props.nft.id,
              );

              // add new cookie if not existent

              if (!foundCookie) {
                currentCookieValue.push({
                  id: props.nft.id,
                  productQuantity: 2,
                });
                setStringifiedCookie('Product', currentCookieValue);
              } else {
                // set the productQuantity of the foundCookie +1
                foundCookie.productQuantity++;
                setStringifiedCookie('Product', currentCookieValue);
              }
            }}
          >
            +
          </button>
          <a href="/cart" alt="">
            <button
              css={addToCartButtonStyles}
              data-test-id="product-add-to-cart"
              onClick={() => {
                setNumberOfItems(numberOfItems);

                //get Cookie the first time
                //returns undefined
                const currentCookieValue = getParsedCookie('Product');

                if (!currentCookieValue) {
                  return setStringifiedCookie('Product', [
                    // productQuantity was initialized with 1
                    { id: props.nft.id, productQuantity: 1 },
                  ]);
                }
              }}
            >
              Add to cart
            </button>
          </a>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const nftId = parseInt(context.query.nftId);

  // import function grab id from the url
  const singleNftbyId = await getNftById(nftId);

  // const nftMatch = nftDatabase.find((nft) => {
  //   return nft.id === nftId;
  // });

  return { props: { nft: singleNftbyId } };
}
