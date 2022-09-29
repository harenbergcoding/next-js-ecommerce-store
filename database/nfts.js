// This page simulates a data base
import fs from 'node:fs';

console.log('fs', 'write' in fs);

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
