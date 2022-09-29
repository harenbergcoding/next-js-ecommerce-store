import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import { nftDatabase } from '../../database/nftDatabase';

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
    width: 720px;
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
              <Image src={`/${nft.id}.jpg`} width="720" height="480" />

              <div>
                <h1>{nft.name}</h1>
                <div>
                  Type: {nft.type}
                  Price: {nft.price}
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

export function getServerSideProps() {
  // console.log('nftDatabase', nftDatabase);

  return {
    props: {
      nftDatabase: nftDatabase,
    },
  };
}
