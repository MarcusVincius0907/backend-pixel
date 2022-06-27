


export default class Controllers {

    async test(req: any, res: any){
        try{    
            return res.json({status: 'Ok', message: 'Sucesso'});
        }
        catch(e){
            //console.log(e);
            return res.json({status: 'Error', message: JSON.stringify(e)});
        }
    }
}
