import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import { getNfts } from '../../database/connect';

const h1Styles = css`
  text-align: center;
  margin: 0 auto;
  padding: 20px;
`;

const nftStyles = css`
  display: flex;
  align-content: center;
  justify-content: center;

  > div {
    width: 620px;
    height: 480 px;
    text-align: center;
    border: 1px solid black;
    color: green;
  }

  > div + div {
    align-items: center;
  }
`;

export default function NftOverview(props) {
  return (
    <>
      <Head>
        <title>Buy, sell and trade NFTs</title>
        <meta
          name="description"
          content="Buy, sell and trade NFTs and become a virtual art collector!"
        />
        <link rel="icon" href="/iguana.jpg" />
      </Head>

      <main>
        <h1 css={h1Styles}>Buy, sell and trade NFTs</h1>

        {props.nftDatabase.map((nft) => {
          return (
            <div css={nftStyles} className="nft single product">
              <a href={`/nfts/${nft.id}`} data-test-id={`product-${nft.id}`}>
                <Image
                  src={`/${nft.id}.jpg`}
                  width="720"
                  height="480"
                  data-test-id="product-image"
                />
              </a>

              <div>
                <h1>{nft.name}</h1>
                <div>
                  Type: {nft.type}
                  <span data-test-id="product-price">Price: {nft.price}</span>
                </div>
                <br />
                About:
                <br />
                {nft.description}
              </div>
            </div>
          );
        })}
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const nfts = await getNfts();

  console.log('nfts', nfts);

  return {
    props: {
      // replace nftDatabase with nfts which comes from the db
      nftDatabase: nfts,
    },
  };
}
