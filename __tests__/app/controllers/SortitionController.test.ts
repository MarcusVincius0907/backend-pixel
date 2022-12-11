import {validateSortitionBeforeSave} from '../../../app/controllers/SortitionController'
import Sortition from '../../../app/models/Sortition'
import {validSortition, invalidSortition} from '../../../__mock__/sortition'
import request from "supertest";
import app from "../../../app/index";
import { token } from '../../../__mock__/user';


describe("test-sortition-controller-funtions", () => {

  

  it('testing-validateSortitionBeforeSave', () => {
    const expectedResp = {
      isValid: true,
      message: "[]"
    }
    expect(validateSortitionBeforeSave(validSortition)).toStrictEqual(expectedResp);
    expect(validateSortitionBeforeSave(invalidSortition).isValid).toBeFalsy();
  })


})

describe("test-controller-request-functions", () => {

  it("should create", async () => {

    try{
      await Sortition.findOneAndDelete({name: validSortition.name})
    }catch(e){
      console.log(e);
      expect(!!e).toBeFalsy();
    }
    
    const resp = await request(app)
    .post("/api/sortition/create")
    .set('authorization', await token())
    .send(validSortition)

    expect(resp.statusCode).toBe(201)

  })

  
  it('should update', async () => {

    const objCreated = await Sortition.findOne({name: validSortition.name})

    expect(objCreated).toBeTruthy();

    if(objCreated){

      let objUpdated = {
        ...validSortition,
        pixelsAvailable: 10
      }
      
      const resp = await request(app)
      .put(`/api/sortition/${objCreated._id}`)
      .set('authorization', await token())
      .send(objUpdated)
  
      expect(resp.statusCode).toBe(200)

    }
    

  })

  it('should get all', async () => {

    const resp = await request(app)
    .get(`/api/sortition`)
    .set('authorization', await token())

    expect(resp.statusCode).toBe(200)
  })

  it('should delete ', async () => {
    const objCreated = await Sortition.findOne({name: validSortition.name})

    expect(objCreated).toBeTruthy();

    if(objCreated){
           
      const resp = await request(app)
      .delete(`/api/sortition/${objCreated._id}`)
      .set('authorization', await token())
  
      expect(resp.statusCode).toBe(200)

    }
  })



})