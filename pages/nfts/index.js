import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';

const nftDatabase = [
  {
    id: 1,
    name: '#1',
    type: 'Dragonfly',
    price: 1799,
  },
  {
    id: 2,
    name: '#2',
    type: 'Squirrel',
    price: 2499,
  },
  {
    id: 3,
    name: '#3',
    type: 'Panda',
    price: 1699,
  },
  {
    id: 4,
    name: '#4',
    type: 'Rhino',
    price: 699,
  },
];

export default function NftOverview() {
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
        {nftDatabase.map((nft) => {
          return (
            <div
              css={css`
                display: flex;
              `}
            >
              <div>
                <Image src={`/${nft.id}.jpg`} width="720" height="480" />
              </div>
              <div>
                <h1>{nft.name}</h1>
              </div>
              <div>
                {nft.type}
                {nft.price}
              </div>
            </div>
          );
        })}
      </main>
    </>
  );
}

// export function getServerSideProps (){
// return {
// props: {
//   {nftDatabase: nftDatabase}
// }}

// }
