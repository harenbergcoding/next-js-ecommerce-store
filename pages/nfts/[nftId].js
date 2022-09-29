import Image from 'next/image';
import { nftDatabase } from '../../database/nftDatabase';

export default function (props) {
  return (
    <div>
      <Image src={`/${props.nft.id}.jpg`} width="720" height="480" />
      <div>Name: {props.nft.name}</div>
      <div>Type: {props.nft.type}</div>
      <div>Price: {props.nft.price}</div>
    </div>
  );
}

export function getServerSideProps(context) {
  // console.log('context', context.query);
  // console.log('nftId', context.query.nftId);
  // console.log('nftDatabase', nftDatabase);
  const nftId = parseInt(context.query.nftId);

  const nftMatch = nftDatabase.find((nft) => {
    return nft.id === nftId;
  });
  console.log('nftMatch', nftMatch);
  return { props: { nft: nftMatch } };
}
