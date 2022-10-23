exports.up = async (sql) => {
  await sql`
    CREATE TABLE nfts (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name varchar(40) NOT NULL,
      type varchar(40) NOT NULL,
      price integer,
      decription varchar (200) NOT NULL
    )
  `;
};

exports.down = async (sql) => {
  await sql`
    DROP TABLE nfts
  `;
};
