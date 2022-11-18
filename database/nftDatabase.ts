import { sql } from './connect';

// create functions to call/get all nfts from the database
// get all Nfts

export async function getNfts() {
  const allNfts = await sql`SELECT * FROM nfts;`;

  return allNfts;
}

// select nft by id

export async function getNftById(id: number) {
  const nft = await sql`SELECT * FROM nfts WHERE id = ${id}`;

  return nft[0];
}
