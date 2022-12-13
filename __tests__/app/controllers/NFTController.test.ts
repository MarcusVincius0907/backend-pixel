import { calculateNFTMeasurements, calculatePixelsQuantity, createNFT, validateNFTBeforeSave } from '../../../app/controllers/NFTController';
import NFT, { INFTSummary, NFTSummary } from '../../../app/models/NFT';
import request from "supertest";
import app from "../../../app/index";
import { token } from '../../../__mock__/user';
import { NFTSummaryInvalid, NFTSummaryValid } from '../../../__mock__/nft';

describe("test-NFT-controller-funtions", () => {

  it('should return the correct calc result calculatePixelsQuantity', () => {
    expect(calculatePixelsQuantity(10)).toBe(800);
    expect(calculatePixelsQuantity(12)).toBe(1152);
    expect(calculatePixelsQuantity(14)).toBe(1568);
  })

  it('should calculate NFT Measurements', () => {
    expect(calculateNFTMeasurements(12, 20)).toStrictEqual({NFTWidth: 720, chunkWidth: 240})
  })

  
  it('should create NFT object', () => {
    const nft = createNFT(12);
    expect(nft).toBeTruthy();
    expect(nft?.chunks).toBeTruthy();
    if(nft && nft.chunks){

      expect(nft.chunks.length).toBe(8);
      expect(nft?.chunkSize).toBe(12);
      

      if(nft?.chunks?.length > 0){

        const chunk = nft?.chunks[0];
        expect(chunk).toBeTruthy;
        expect(chunk?.pixels.length).toBe(144);
        expect(chunk?.position).toBe(0);
        const pixel = chunk.pixels[0];

        if(pixel){
          expect(pixel).toBeTruthy();
          expect(pixel.color).toBe('#FFFFFF');
          expect(pixel.isAvailible).toBeTruthy();
          expect(pixel.uuid.length).toBe(36);
        }

      }
    }

  })

  it('testing-validateNFTBeforeSave', () => {
    const expectedResp = {
      isValid: true,
      message: "[]"
    }
    expect(validateNFTBeforeSave(NFTSummaryValid)).toStrictEqual(expectedResp);
    expect(validateNFTBeforeSave(NFTSummaryInvalid).isValid).toBeFalsy();
  })

})

describe("test-controller-request-functions", () => {

  it("should-create", async () => {

    try{
      const nFTSummary = await NFTSummary.findOneAndDelete({name: NFTSummaryValid.name});
      await NFT.findOneAndDelete({_id: nFTSummary?.idNFT });
    }catch(e){
      console.log(e);
      expect(!!e).toBeFalsy();
    }
    
    const resp = await request(app)
    .post("/api/nft/create")
    .set('authorization', await token())
    .send(NFTSummaryValid)

    expect(resp.statusCode).toBe(201)

  })

  it('should-update', async () => {

    const objCreated = await NFTSummary.findOne({name: NFTSummaryValid.name})

    expect(objCreated).toBeTruthy();

    if(objCreated){

      let objUpdated: INFTSummary = {
        ...NFTSummaryValid,
        pixelQuantity: 12
      }
      
      const resp = await request(app)
      .put(`/api/nft/${objCreated._id}`)
      .set('authorization', await token())
      .send(objUpdated)
  
      expect(resp.statusCode).toBe(200)

    }
    

  })

  it('should-get-all', async () => {

    const resp = await request(app)
    .get(`/api/nft`)
    .set('authorization', await token())

    expect(resp.statusCode).toBe(200)
  })

  it('should-delete ', async () => {
    const objCreated = await NFTSummary.findOne({name: NFTSummaryValid.name})

    expect(objCreated).toBeTruthy();

    if(objCreated){
           
      const resp = await request(app)
      .delete(`/api/nft/${objCreated._id}`)
      .set('authorization', await token())
  
      expect(resp.statusCode).toBe(200)

    }
  })

})