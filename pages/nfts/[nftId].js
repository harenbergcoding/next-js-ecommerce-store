import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { getNftById, getNfts } from '../../database/nftDatabase';
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

export default function ShowSingleProduct(props) {
  console.log('props.cart[nftId]', props.cart);

  const [productQuantity, setPoductQuantity] = useState(1);

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
          <span>Add Quantity: {productQuantity}</span>
          <button
            // refactor into a HandleChange function!
            onClick={() => {
              if (productQuantity === 0) {
                return 0;
              } else {
                setPoductQuantity(productQuantity - 1);
              }
            }}

            // COMMENT get Cookie the first time
            // COMMENT returns undefined

            // const currentCookieValue = getParsedCookie('product');

            // COMMENT matching existing cookies with page id

            // const foundCookie = currentCookieValue.find(
            //   (nftCookie) => nftCookie.id === props.nft.id,
            // );

            // COMMENT add new cookie if not existent

            //   if (foundCookie) {
            //     // set the productQuantity of the foundCookie -1
            //     foundCookie.productQuantity--;
            //     setStringifiedCookie('product', currentCookieValue);
            //   }
            // }}
          >
            -
          </button>
          <button
            onClick={() => {
              setPoductQuantity(productQuantity + 1);
              // if (!props.cart)
              // {
              //   return props.setCart([
              //     {
              //       id: props.nft.id,
              //       cart: productQuantity,
              //     },
              //   ]);
              // }
            }}

            // COMMENT get Cookie the first time
            // COMMENT returns undefined

            // const currentCookieValue = getParsedCookie('product');

            // COMMENT if cookie does not exist set cookie 'Product' as Array

            // if (!currentCookieValue) {
            //   return setStringifiedCookie('product', [
            //     // productQuantity was initialized with 1
            //     { id: props.nft.id, productQuantity: 2 },
            //   ]);
            // }

            // {
            //   console.log('currentCookieValue', currentCookieValue);
            // }

            // COMMENT matching existing cookies with page id
            // const foundCookie = currentCookieValue.find(
            //   (nftCookie) => nftCookie.id === props.nft.id,
            // );

            // COMMENT add new cookie if not existent

            // if (!foundCookie) {
            //   currentCookieValue.push({
            //     id: props.nft.id,
            //     productQuantity: 2,
            //   });
            //   setStringifiedCookie('product', currentCookieValue);
            // } else {
            // COMMENT set the productQuantity of the foundCookie +1

            //     foundCookie.productQuantity++;
            //     setStringifiedCookie('product', currentCookieValue);
            //   }
            // }}
          >
            +
          </button>
          <a href="/cart-2" alt="">
            <button
              css={addToCartButtonStyles}
              data-test-id="product-add-to-cart"
              onClick={() => {
                if (!props.cart) {
                  return props.setCart([
                    {
                      id: props.nft.id,
                      cart: productQuantity,
                    },
                  ]);
                }

                const foundCookie = props.cart.find((cookieNftObject) => {
                  return cookieNftObject.id === props.nft.id;
                });

                // console.log('props.nft.id', props.nft.id);
                // const foundCookie = currentCookieValue.find(
                //   (nftCookie) => nftCookie.id === props.nft.id,
                // );
                // console.log('foundCookie', foundCookie);

                if (!foundCookie) {
                  props.cart.push({
                    id: props.nft.id,
                    cart: productQuantity,
                  });
                  setStringifiedCookie('cart', props.cart);
                } else {
                  foundCookie.cart = foundCookie.cart + quantity;
                }
                const newQuantity = [...props.cart];

                props.setCart(newQuantity);
              }}

              // COMMENT get Cookie the first time
              // COMMENT returns undefined

              // const currentCookieValue = getParsedCookie('product');

              // if (!currentCookieValue) {
              //   return setStringifiedCookie('product', [

              // COMMENT productQuantity was initialized with 1

              //       { id: props.nft.id, productQuantity: 1 },
              //     ]);
              //   }
              // }}
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
  const singleNftbyId = await getNftById(nftId);
  const nfts = await getNfts();
  // const allNftsWithProductQuantity = nfts;
  // console.log('context.req.cookies.cart', context.req.cookies.cart);

  const parsedCookies = context.req.cookies.cart
    ? JSON.parse(context.req.cookies.cart)
    : [];

  console.log('parsedCookies', parsedCookies);

  const allNftsWithProductQuantity = nfts.map((nft) => {
    return {
      ...nft,
      amount:
        parsedCookies.find((cookieNftObject) => nft.id === cookieNftObject.id)
          ?.cart || 0 /* null or 0 ? */,
    };
  });
  console.log('allNftsWithProductQuantity', allNftsWithProductQuantity);
  // import function grab id from the url

  // const nftMatch = nftDatabase.find((nft) => {
  //   return nft.id === nftId;
  // });

  return {
    props: { nft: singleNftbyId, cartProducts: allNftsWithProductQuantity },
  };
}
