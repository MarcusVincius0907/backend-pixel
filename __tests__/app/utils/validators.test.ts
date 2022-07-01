import { validateEmail } from '../../../app/utils/validators'

describe("testing validateEmail", () => {

  it('test a valid email', () => {
    const resp = validateEmail('mvleite0908@gmail.com');
    expect(resp).toBeTruthy();
  })

  it('test an email without @', () => {
    const resp = validateEmail('mvleite0908gmail.com');
    expect(resp).toBeFalsy();
  })

  it('test an email without .com', () => {
    const resp = validateEmail('mvleite0908@gmail');
    expect(resp).toBeFalsy();
  })


});