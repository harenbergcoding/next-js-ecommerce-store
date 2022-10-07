import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { getNftById } from '../../database/connect';

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
          <a href="/nfts">
            <button>Back</button>
          </a>
        </div>
        <Image src={`/${props.nft.id}.jpg`} width="720" height="480" />
        <div>
          <div>Name: {props.nft.name}</div>
          <div>Type: {props.nft.type}</div>
          <div>Price: {props.nft.price}</div>
        </div>
        <div>
          <label>
            Add quantity
            <br />
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

          <a href="/cart">
            <button data-test-id="product-add-to-cart">Add to cart</button>
          </a>
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
