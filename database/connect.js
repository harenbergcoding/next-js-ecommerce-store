import postgres from 'postgres';
import { config } from 'process';

config();

const sql = postgres();

// get all nfts from SQL
// const allNfts = await sql`SELECT * FROM nfts;`;

//create function to call/get all nfts in the backend
export async function getNfts() {
  const allNfts = await sql`SELECT * FROM nfts;`;

  return allNfts;
}

console.log('allNFTs', allNfts);
