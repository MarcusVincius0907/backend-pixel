require('dotenv').config()
import axios from 'axios';

const regex = /^[0-9]*$/

export default function getAddressByZipcode(zipcode: string){

  let url = process.env.VIACEP_URL || null;

  if(!url || !zipcode || !regex.test(zipcode)) return false;

  let urlSufix = '/json';

  return axios
    .get(url + zipcode + urlSufix)
    .then(res => {
      return res;
    })
    .catch(err => {
      return false;
    });

}