const animals = [
  {
    name: '#1',
    type: 'Dragonfly ',
    price: 1799,
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et',
  },
  {
    name: '#2',
    type: 'Squirrel ',
    price: 2499,
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et',
  },
  {
    name: '#3',
    type: 'Panda ',
    price: 1699,
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et',
  },
  {
    name: '#4',
    type: 'Rhino ',
    price: 699,
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et',
  },
];

exports.up = async (sql) => {
  await sql`
    INSERT INTO nfts ${sql(nfts, 'name', 'type', price, 'description')}
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
