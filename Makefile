services/add/gen-nodejs:
	thrift --gen js:node -o services/add/ thrift-idl/add.thrift

services/multiply/gen-nodejs:
	thrift --gen js:node -o services/multiply/ thrift-idl/multiply.thrift
	thrift --gen js:node -o services/multiply/ thrift-idl/add.thrift

services/calculator/gen-nodejs:
	thrift --gen js:node -o services/calculator/ thrift-idl/multiply.thrift
	thrift --gen js:node -o services/calculator/ thrift-idl/add.thrift

all: \
	services/add/gen-nodejs \
	services/multiply/gen-nodejs \
	services/calculator/gen-nodejs

