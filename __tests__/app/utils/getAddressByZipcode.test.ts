import getAddressByZipcode from '../../../app/utils/getAddressByZipcode'

describe('test getAddressByZipcode function', () => {

  let zipcode = '05717200';

  it('should return the address', async () => {
    const resp = await getAddressByZipcode(zipcode);
    expect(resp).toBeTruthy();
    
  })

  it('should return false', async() => {

    let resp = await getAddressByZipcode('sadfasdf');
    expect(resp).toBeFalsy();

    resp = await getAddressByZipcode('000');
    expect(resp).toBeFalsy();

    resp = await getAddressByZipcode('');
    expect(resp).toBeFalsy();

  })

})