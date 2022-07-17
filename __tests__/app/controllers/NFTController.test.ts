import { calculateNFTMeasurements, calculatePixelsQuantity, createNFT } from '../../../app/controllers/NFTController';

describe("test NFT controller funtions", () => {

  it('should return the correct calc result calculatePixelsQuantity', () => {
    expect(calculatePixelsQuantity(10)).toBe(800);
    expect(calculatePixelsQuantity(12)).toBe(1152);
    expect(calculatePixelsQuantity(14)).toBe(1568);
  })

  it('should calculate NFT Measurements', () => {
    expect(calculateNFTMeasurements(12, 20)).toStrictEqual({NFTWidth: 720, chunkWidth: 240})
  })

  //TODO not working yet
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

})