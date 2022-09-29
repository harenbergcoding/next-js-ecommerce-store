import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';

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

const nftDatabase = [
  {
    id: 1,
    name: '#1',
    type: 'Dragonfly',
    price: 1799,
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
  },
  {
    id: 2,
    name: '#2',
    type: 'Squirrel',
    price: 2499,
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
  },
  {
    id: 3,
    name: '#3',
    type: 'Panda',
    price: 1699,
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
  },
  {
    id: 4,
    name: '#4',
    type: 'Rhino',
    price: 699,
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
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

// export function getServerSideProps (){
// return {
// props: {
//   {nftDatabase: nftDatabase}
// }}

// }
