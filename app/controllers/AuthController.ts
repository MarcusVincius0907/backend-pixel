import axios from 'axios';
import { Request, Response } from 'express';
import config from '../../auth0.config';
import ResponseDefault from '../models/ResponseDefault';

async function getTokenAuth0(){
    let options = {
        url: 'https://dev-2glokavh.us.auth0.com/oauth/token',
        headers: { 'content-type': 'application/json' },
        body: config };
      
      return axios
        .post(options.url, options.body)
        .then(res => {
          return `${res.data.access_token}`
        })
        .catch(err => {
          return '';
        })
}

export class AuthController{
    async getToken(req: Request,res: Response){
        try{
          const token = await getTokenAuth0();
          return res.status(200).json({status: 'Ok', message: 'Token encontrado', payload: token} as ResponseDefault);
        }catch(e: any){
          return res.status(500).json({status: 'Error', message: JSON.stringify(e)} as ResponseDefault);
        }
      }
}