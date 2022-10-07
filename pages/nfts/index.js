import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import { getNfts } from '../../database/connect';

const h1Styles = css`
  margin-top: 100px;
  margin-bottom: 50px;
  color: black;
  font-size: 36px;
  text-align: center;
`;

const nftStyles = css`
  display: flex;
  align-content: center;
  justify-content: center;
  border-radius: 12px;
  border: 1px solid black;
  width: 1240px;
  margin: 0 auto;

  > div {
    width: 620px;
    height: 480 px;
    text-align: center;
    /* border: 1px solid black; */
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
        <title>NFT Overview</title>
        <meta name="description" content="See our beautiful NFTs" />
        <link rel="icon" href="/2.jpg" />
      </Head>

      <main>
        <h1 css={h1Styles}>Pick Your NFT</h1>

        {props.nftDatabase.map((nft) => {
          return (
            <div css={nftStyles} className="nft single product">
              <div>
                <a href={`/nfts/${nft.id}`} data-test-id={`product-${nft.id}`}>
                  <Image
                    src={`/${nft.id}.jpg`}
                    width="720"
                    height="480"
                    data-test-id="product-image"
                  />
                </a>
              </div>

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
