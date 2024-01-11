# Pixel Backend

# jest

node <path-to-jest> -i <your-test-file> -c <jest-config> -t "<test-block-name>"

<path-to-jest>:
Windows: node_modules\jest\bin\jest.js
Others: node_modules/.bin/jest
-i <you-test-file>: path to the file with tests (js or ts)
-c <jest-config>: path to a separate Jest config file (JSON), if you keep your Jest configuration in package.json, you don't have to specify this parameter (Jest will find it without your help)
-t <the-name-of-test-block>: actually it's a name (the first parameter) of describe(...), it(...), or test(...) block.

jest -i validators.test.ts -t "test-date-validation"

"testu": "jest -i UserController.test.ts -t \"test-controller-request-functions should-create-a-user\"",

#helper links

- https://petstore.swagger.io/v2/swagger.json

#example auth0 config ts file:
const config = {

    client_id:"xxxxxxxxxxxxxxxxxxxxxxxxxx",
    client_secret:"xx-x-xxx",
    audience:"https://dev-2glokavh.us.auth0.com/api/v2/",
    grant_type:"client_credentials"

}
