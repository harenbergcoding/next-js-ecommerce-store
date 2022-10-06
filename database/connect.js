import { config } from 'dotenv-safe';
import postgres from 'postgres';

config();

const sql = postgres();

//create function to call/get all nfts in the backend
export async function getNfts() {
  const allNfts = await sql`SELECT * FROM nfts;`;

  return allNfts;
}
