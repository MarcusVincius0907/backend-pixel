import moment from "moment"
import { ISortition } from "../app/models/Sortition"

export const validSortition = {
  
  themes: '#fff',
  name: 'sortition-test',
  date: moment().add(1,'d').format('yyyy-MM-DD'),
  idNFT: 'sdfasdf2',
  pixelsAvailable: 120,
  reward: 'R$ 1000 + NFT',
  status: true,
} as ISortition

export const invalidSortition = {
  _id: 243,
  themes: '',
  name: '',
  date: '',
  idNFT: '',
  pixelsAvailable: 0,
  reward: '',
  status: true,
} as ISortition