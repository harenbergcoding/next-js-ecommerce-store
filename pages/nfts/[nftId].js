import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { getNftById } from '../../database/connect';

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
  padding-bottom: 200px;
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

// import { nftDatabase } from '../../database/nftDatabase';

// function PositiveCartNumbers(event, numberOfItems, setNumberOfItems) {
//   if (numberOfItems >= 0) {
//     return setNumberOfItems(event.currentTarget.value);
//   } else {
//     setNumberOfItems(0);
//     console.log('hello');
//   }
// }

// function HandleChange(event, numberOfItems, setNumberOfItems) {
//   if (numberOfItems >= 0) {
//     return (
//       <input
//         value={numberOfItems}
//         onChange={(event) => setNumberOfItems(event.currentTarget.value)}
//       />
//     );
//   } else {
//     return (
//       <input value={numberOfItems} onChange={(event) => setNumberOfItems(0)} />
//     );
//   }
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
        <div>
          {/* <div>Name: {props.nft.name}</div> */}
          {/* <div>Type: {props.nft.type}</div>
          <div>Price: {props.nft.price}</div> */}
        </div>
        <div>
          <div>
            <label css={addToCartStyles}>
              Add quantity:
              <input
                value={numberOfItems}
                onChange={(event) => {
                  // PositiveCartNumbers(event, numberOfItems, setNumberOfItems);
                  event.currentTarget.value >= 0
                    ? setNumberOfItems(event.currentTarget.value)
                    : setNumberOfItems(0);
                }}
              />
            </label>
          </div>
          <div css={addToCartButtonWrapperStyles}>
            <a href="/cart">
              <button
                css={addToCartButtonStyles}
                data-test-id="product-add-to-cart"
              >
                Add to cart
              </button>
            </a>
          </div>
        </div>
        {console.log('numberOfItems', numberOfItems)}
        {/* {PositiveCartNumber(numberOfItems, setNumberOfItems)}

      <button
        onClick={() => {
          setNumberOfItems(numberOfItems - 1);
        }}
      >
        -
      </button>
      <button
        onClick={() => {
          setNumberOfItems(numberOfItems + 1);
        }}
      >
        +
      </button>
      <a href="/cart" alt="">
        <button>Add to cart </button>
      </a>
    </div> */}{' '}
      </div>{' '}
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
  console.log('singleNftbyId', singleNftbyId);
  // console.log('nftMatch', nftMatch);
  return { props: { nft: singleNftbyId } };
}
