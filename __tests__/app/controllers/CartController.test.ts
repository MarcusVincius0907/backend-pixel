import {validateCartBeforeSave} from '../../../app/controllers/CartController'
import Cart from '../../../app/models/Cart'
import {validCart, invalidCart} from '../../../__mock__/cart'
import request from "supertest";
import app from "../../../app/index";
import { token } from '../../../__mock__/user';


describe("test-cart-controller-funtions", () => {

  it('testing-validateCartBeforeSave', () => {
    const expectedResp = {
      isValid: true,
      message: "[]"
    }
    expect(validateCartBeforeSave(validCart)).toStrictEqual(expectedResp);
    expect(validateCartBeforeSave(invalidCart).isValid).toBeFalsy();
  })

})

describe("test-controller-request-functions", () => {

  let cartId = '';

  it("should create", async () => {

    try{
      if(cartId)
        await Cart.findOneAndDelete({_id: cartId})
      
    }catch(e){
      console.log(e);
      expect(!!e).toBeFalsy();
    }
    
    const resp = await request(app)
    .post("/api/cart/create")
    .set('authorization', await token())
    .send(validCart)

    cartId = resp?.body?.payload?._id;

    expect(resp.statusCode).toBe(201)

  })

  
  it('should update', async () => {

    const objCreated = await Cart.findOne({_id: cartId})

    expect(objCreated).toBeTruthy();

    if(objCreated){

      validCart.pixelIds.pop()
      
      const resp = await request(app)
      .put(`/api/cart/${objCreated._id}`)
      .set('authorization', await token())
      .send(validCart)
  
      expect(resp.statusCode).toBe(200)

    }
    

  })

  it('should get all', async () => {

    const resp = await request(app)
    .get(`/api/cart`)
    .set('authorization', await token())

    expect(resp.statusCode).toBe(200)
  })

  it('should delete ', async () => {
    const objCreated = await Cart.findOne({_id: cartId})

    expect(objCreated).toBeTruthy();

    if(objCreated){
           
      const resp = await request(app)
      .delete(`/api/cart/${objCreated._id}`)
      .set('authorization', await token())
  
      expect(resp.statusCode).toBe(200)

    }
  })



})