import { ISortition } from "../app/models/Sortition"

export const validSortition = {
  
  themes: '#fff',
  name: 'sortition-test',
  date: new Date('2022-07-25'),
  idNFT: 'sdfasdf2',
  pixelsAvailable: 120,
  reward: 'R$ 1000 + NFT',
  status: true,
} as ISortition

export const invalidSortition = {
  _id: 243,
  themes: '',
  name: '',
  date: new Date(''),
  idNFT: '',
  pixelsAvailable: 0,
  reward: '',
  status: true,
} as ISortition