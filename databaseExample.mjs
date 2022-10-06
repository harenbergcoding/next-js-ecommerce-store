import { config } from 'dotenv-safe';
import postgres from 'postgres';

config();

const sql = postgres();
// 'postgresql://nftdatabaseuser:nftdatabasepassword@localhost:5432/nftdatabase',

// console.log('nfts', await sql`SELECT * FROM nfts;`);
