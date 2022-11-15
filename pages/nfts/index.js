import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import { getNfts } from '../../database/nftDatabase';

const h1Styles = css`
  margin-top: 80px;
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
  width: 1150px;
  margin: 0 auto;
  margin-bottom: 20px;

  > div {
    width: 576px;
    height: 382px;
  }
`;

const descriptionStyles = css`
  width: 576px;
  height: 380px;
  text-align: center;
  padding-top: 50px;
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
                <div>
                  <a
                    href={`/nfts/${nft.id}`}
                    data-test-id={`product-${nft.id}`}
                  >
                    <Image
                      src={`/${nft.id}.jpg`}
                      width="576"
                      height="384"
                      data-test-id="product-image"
                      css={css`
                        border-radius: 12px;
                      `}
                    />
                  </a>
                </div>
              </div>
              <div css={descriptionStyles}>
                <h1>{nft.name}</h1>
                <div>
                  Type: {nft.type} |
                  <span data-test-id="product-price"> Price: {nft.price}</span>
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

  return {
    props: {
      nftDatabase: nfts,
    },
  };
}
