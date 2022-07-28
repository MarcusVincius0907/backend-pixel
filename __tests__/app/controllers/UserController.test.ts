import { validateUserBeforeSave } from '../../../app/controllers/UserController';
import request from "supertest";
import app from "../../../app/index";
import { token, user } from '../../../__mock__/user';
import ResponseDefault from '../../../app/models/ResponseDefault';
import User, {User as UserInterface} from '../../../app/models/User';

describe("test user controller funtions", () => {

  

  it('testing validateUserBeforeSave', () => {
    const expectedResp = {
      isValid: true,
      message: "[]"
    }
    expect(validateUserBeforeSave(user)).toStrictEqual(expectedResp);
  })


})

describe("test controller request functions", () => {

  it("should create a user", async () => {

    await User.findOneAndDelete({email: user.email})
    
    const resp = await request(app)
    .post("/api/user/create")
    .set('authorization',await token())
    .send(user)

    expect(resp.statusCode).toBe(201)

  })

  
  it('should update the user', async () => {

    const userCreated = await User.findOne({email: user.email})

    expect(userCreated).toBeTruthy();

    if(userCreated){

      let objUpdated = {
        ...user,
        name: 'Arlindo'
      }
      
      const resp = await request(app)
      .put(`/api/user/${userCreated._id}`)
      .set('authorization',await token())
      .send(objUpdated)
  
      expect(resp.statusCode).toBe(200)

    }
    

  })

  it('should get a user', async () => {

    const userCreated = await User.findOne({email: user.email})

    expect(userCreated).toBeTruthy();

    if(userCreated){
           
      const resp = await request(app)
      .get(`/api/user/${userCreated._id}`)
      .set('authorization',await token())
  
      expect(resp.statusCode).toBe(200)

    }

  })

  it('should delete a user', async () => {
    const userCreated = await User.findOne({email: user.email})

    expect(userCreated).toBeTruthy();

    if(userCreated){
           
      const resp = await request(app)
      .delete(`/api/user/${userCreated._id}`)
      .set('authorization',await token())
  
      expect(resp.statusCode).toBe(200)

    }
  })

  it('should consult zipcode', async () => {
    const zipcode = '05717200';
    const resp = await request(app)
      .get(`api/zipcode/${zipcode}`)
      .set('authorization', await token())
  
      expect(resp.statusCode).toBe(200)
  })



})