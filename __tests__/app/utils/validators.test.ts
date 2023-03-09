import moment from "moment";
import {
  AddressInfo,
  PaymentInfo,
  ReceiveInfo,
  ReceiveInfoType
} from "../../../app/models/User";
import {
  validateEmail,
  validateCPF,
  maxLength,
  minLength,
  validateBirthDate,
  validateExpirationDate,
  validatePaymentInfo,
  required,
  validateReceiveInfo,
  validateAddressInfo,
  isValidDate,
  arrayIsNotEmpty,
  validateEnum,
} from "../../../app/utils/validators";

import { PaymentStatus } from '../../../app/models/Payment';

describe("testing validateEmail", () => {
  it("test a valid email", () => {
    const resp = validateEmail("mvleite0908@gmail.com");
    expect(resp).toBeTruthy();
  });

  it("test an email without @", () => {
    const resp = validateEmail("mvleite0908gmail.com");
    expect(resp).toBeFalsy();
  });

  it("test an email without .com", () => {
    const resp = validateEmail("mvleite0908@gmail");
    expect(resp).toBeFalsy();
  });
});

describe("testing validateCPF", () => {
  it("test a valid CPF", () => {
    const resp = validateCPF("34959112000");
    expect(resp).toBeTruthy();
  });

  it("test an invalid CPF", () => {
    const resp = validateCPF("11111111111");
    expect(resp).toBeFalsy();
  });

  it("test an invalid CPF", () => {
    const resp = validateCPF("00135829304");
    expect(resp).toBeFalsy();
  });
});

describe("testing length validation", () => {
  it("test a valid max length", () => {
    const resp = maxLength("5511958755705", 13);
    expect(resp).toBeTruthy();
  });

  it("test a invalid max length", () => {
    const resp = maxLength("551195875570566", 13);
    expect(resp).toBeFalsy();
  });

  it("test a valid min length", () => {
    const resp = minLength("11958755705", 11);
    expect(resp).toBeTruthy();
  });

  it("test a invalid min length", () => {
    const resp = minLength("958755705", 11);
    expect(resp).toBeFalsy();
  });
});

describe("testing validateBirthDate", () => {
  it("valid date", () => {
    const resp = validateBirthDate("2001-07-09");
    expect(resp).toBeTruthy();
  });

  it("invalid date", () => {
    const resp = validateBirthDate("sdfg");
    expect(resp).toBeFalsy();
  });

  it("younger than 18 years", () => {
    const resp = validateBirthDate("2020-07-09");
    expect(resp).toBeFalsy();
  });
});

describe("testing payment info validations", () => {
  it("test valid expiration date ", () => {
    const resp = validateExpirationDate("05/23");
    expect(resp).toBeTruthy();
  });
  it("test invalid expiration date ", () => {
    const resp = validateExpirationDate("05/21");
    expect(resp).toBeFalsy();
  });
  it("test valid expiration date, month very close ", () => {
    const resp = validateExpirationDate(`${moment().add("1 month").month}/22`);
    expect(resp).toBeTruthy();
  });

  it("valid payment info object", () => {
    const paymentInfo: PaymentInfo = {
      cards: [
        {
          cardName: "Marcus V Leite",
          cardNumber: "123123123123",
          expirationDate: "05/28",
        },
      ],
    };

    const resp = validatePaymentInfo(paymentInfo);
    expect(resp).toBeTruthy();
  });
});

describe("testing receive info validation", () => {
  it("valid receive info object, with pix", () => {
    const receiveInfo: ReceiveInfo = {
      nickname: "pix nubank",
      pixKey: "asdf@sdf.com",
      type: ReceiveInfoType.PIX_TYPE
    };

    expect(validateReceiveInfo(receiveInfo)).toBeTruthy();
  });

  it("valid receive info object, with bank info", () => {
    const receiveInfo: ReceiveInfo = {
      nickname: "nubank account",
      bankInfo: {
        bankName: "123",
        account: "123",
        agency: "123",
      },
      type: ReceiveInfoType.BANK_TYPE
    };

    expect(validateReceiveInfo(receiveInfo)).toBeTruthy();
  });
});

describe("testing required validator", () => {
  it("test with invalid value", () => {
    expect(required("")).toBeFalsy();
  });
});

describe("testing address info", () => {
  it("test a valid address info object", () => {
    const addressInfo: AddressInfo = {
      zipcode: "05717200",
      street: "rua almaden",
      number: "130",
      district: "vila andrade",
      city: "São Paulo",
      state: "sp",
      complement: "edf macapa. 136",
    };
    expect(validateAddressInfo(addressInfo)).toBeTruthy();
  });

  it("test a invalid address info object", () => {
    const addressInfo: AddressInfo = {
      zipcode: "",
      street: "rua almaden",
      number: "130",
      district: "vila andrade",
      city: "São Paulo",
      state: "sp",
      complement: "edf macapa. 136",
    };
    expect(validateAddressInfo(addressInfo)).toBeFalsy();
  });
});

describe("test date validation", () => {
  it("should be a invalid date", () => {
    expect(isValidDate("sad")).toBeFalsy();
  });

  it("should be a valid date", () => {
    expect(isValidDate("2022-07-14")).toBeTruthy();
  });

  it("should test the past date", () => {
    expect(isValidDate(moment().add(1, "d"), true)).toBeTruthy();
    expect(isValidDate(moment(), true)).toBeFalsy();
  });
});

describe("test-array-validators", () => {
  it("should-be-a-not-empty-array", () => {
    const validArray: number[] = [1,2,3];
    expect(arrayIsNotEmpty(validArray)).toBeTruthy();
  })

  it("should-be-a-empty-array", () =>{
    const invalidArray: any[] = [];
    expect(arrayIsNotEmpty(invalidArray)).toBeFalsy();
  })
})

describe("test-enum-validator", () => {
  it('should-test-validateEnum', () => {
    expect(validateEnum('PAID', PaymentStatus)).toBeTruthy();
    expect(validateEnum('ABC', PaymentStatus)).toBeFalsy();
  })
})