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

you can find this file (auth0.config.ts) in google drive -> projeto pixel

export default config;

//get this on auth0 API test tab

//For deployment needs to install Git, Nginx, Node.js, PM2, and CodeDeploy agent in the instance

//nginx config
//nginx start

# For more information on configuration, see:

# \* Official English Documentation: http://nginx.org/en/docs/

# \* Official Russian Documentation: http://nginx.org/ru/docs/

user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log notice;
pid /run/nginx.pid;

# Load dynamic modules. See /usr/share/doc/nginx/README.dynamic.

include /usr/share/nginx/modules/\*.conf;

events {
worker_connections 1024;
}

http {
log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
'"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile            on;
    tcp_nopush          on;
    keepalive_timeout   65;
    types_hash_max_size 4096;

    include             /etc/nginx/mime.types;
    default_type        application/octet-stream;

    # Load modular configuration files from the /etc/nginx/conf.d directory.
    # See http://nginx.org/en/docs/ngx_core_module.html#include
    # for more information.
    include /etc/nginx/conf.d/*.conf;

server {
listen 80;
server_name pixel-app.marcusleitedev.com;

    location / {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

}

server {
listen 80;
server_name pixel-api.marcusleitedev.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

}

# Settings for a TLS enabled server.

#

# server {

# listen 443 ssl http2;

# listen [::]:443 ssl http2;

# server*name *;

# root /usr/share/nginx/html;

#

# ssl_certificate "/etc/pki/nginx/server.crt";

# ssl_certificate_key "/etc/pki/nginx/private/server.key";

# ssl_session_cache shared:SSL:1m;

# ssl_session_timeout 10m;

# ssl_ciphers PROFILE=SYSTEM;

# ssl_prefer_server_ciphers on;

#

# # Load configuration files for the default server block.

# include /etc/nginx/default.d/\*.conf;

#

# error_page 404 /404.html;

# location = /404.html {

# }

#

# error_page 500 502 503 504 /50x.html;

# location = /50x.html {

# }

# }

}
//nginx end
