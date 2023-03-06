import moment from "moment"
import { ISortition } from "../app/models/Sortition"

export const validSortition = {
  
  name: 'sortition-test',
  date: moment().add(1,'d').format('yyyy-MM-DD'),
  idNFTSummary: 'sdfasdf2',
  reward: 'R$ 1000 + NFT',
  status: true,
} as ISortition

export const invalidSortition = {
  _id: '243',
  name: '',
  date: '',
  idNFTSummary: '',
  reward: '',
  status: true,
} as ISortition