npm install

mkdir -p public/uploads/
mkdir -p db/

CURRENT_DIR=$(dirname $0)

node ${CURRENT_DIR}/init-users.js
NODE_ENV=production  node --harmony_generators ${CURRENT_DIR}/../app.js
