require('dotenv').config()
import axios from 'axios';
import { AddressInfo } from '../models/User';

const regex = /^[0-9]*$/

export default function getAddressByZipcode(zipcode: string){

  let url = process.env.VIACEP_URL || null;

  if(!url || !zipcode || !regex.test(zipcode)) return false;

  let urlSufix = '/json';

  return axios
    .get(url + zipcode + urlSufix)
    .then(res => {

      const address = {
        zipcode: res.data.cep,
        street: res.data.logradouro,
        district: res.data.bairro,
        city: res.data.localidade,
        estate: res.data.uf,

      } as AddressInfo
      
      return address;
    })
    .catch(err => {
      return false;
    });

}