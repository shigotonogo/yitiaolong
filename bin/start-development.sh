npm install

mkdir -p public/uploads/
mkdir -p db/

kill -9 $(lsof -i:1025 -t) 2> /dev/null
node_modules/maildev/bin/maildev & # visit http://127.0.0.1:1080 to see the email


CURRENT_DIR=$(dirname $0)

node ${CURRENT_DIR}/init-users.js
NODE_ENV=development SMTP_SERVER=127.0.0.1 SMTP_PORT=1025  node --harmony_generators ${CURRENT_DIR}/../app.js
