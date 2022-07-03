import { AddressInfo, PaymentInfo, ReceiveInfo, User } from "../../../app/models/User";
import { validateUserBeforeSave } from '../../../app/controllers/UserController'

describe("test user controller funtions", () => {

  const addressInfo:AddressInfo = {
    zipcode: '05717200',
    street: 'rua almaden',
    number: '130',
    district: 'vila andrade',
    city: 'São Paulo',
    estate: 'sp',
    complement: 'edf macapa. 136'
  }

  const paymentInfo: PaymentInfo = {
    cards:[
      {
        cardName: 'Marcus V Leite',
        cardNumber: '123123123123',
        expirationDate: '05/28'
      }
    ]
  }

  const receiveInfo: ReceiveInfo = {
    nickname: 'pix nubank', 
    pixKey: 'asdf@sdf.com'
  }

  const user: User = {
    name: 'Marcus Vinicius Leite',
    email: 'mvleite0908@gmail.com',
    cpf: '52245472888',
    cell: '11958755705',
    birthDate: '2001-07-09',
    addressInfo,
    paymentInfo,
    receiveInfo
  }

  it('testing validateUserBeforeSave', () => {
    const expectedResp = {
      isValid: true,
      message: "[]"
    }
    expect(validateUserBeforeSave(user)).toStrictEqual(expectedResp);
  })

})