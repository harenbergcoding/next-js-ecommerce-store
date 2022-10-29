const nfts = [
  {
    name: '#1',
    type: 'Dragonfly ',
    price: 1799,
    description:
      'The Dragonfly is a collection of 13 utility-enabled NFTs. Each Dragonfly is your entry ticket into the great Dragonfly ecosystem. Explore and create new dragonfly races. ',
  },
  {
    name: '#2',
    type: 'Squirrel ',
    price: 2499,
    description:
      'The Squirrel is a unique utility-enabled NFT. Get access to the worlds most desired fashion events by showing ownership of this NFT. There is only one of a kind.',
  },
  {
    name: '#3',
    type: 'Panda ',
    price: 1699,
    description:
      'The Panda is a collection of 13 status NFTs. Each panda shows your membership in a carbon neutral club that aims to save the rainforest and improve the lives of pandas.',
  },
  {
    name: '#4',
    type: 'Rhino ',
    price: 699,
    description:
      'The Rhino is a collection of 999,999 status NFTs. If you have too much money just buy this one to show that it absolutely means nothing to own it but you also do not know what else to buy.',
  },
];

exports.up = async (sql) => {
  await sql`
  -- selecting all properties from the variable nfts to insert into the nfts realtion
    INSERT INTO nfts2022 ${sql(nfts, 'name', 'type', 'price', 'description')}
  `;
};

exports.down = async (sql) => {
  for (const nft of nfts) {
    await sql`
      DELETE FROM
        nfts
      WHERE
        name = ${nft.name} AND
        type = ${nft.type} AND
        price = ${nft.price} AND
        description = ${nft.description}

    `;
  }
};
