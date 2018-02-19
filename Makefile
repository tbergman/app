link:
	cd hedvig-redux; yarn link
	cd hedvig-style; yarn link
	cd hedvig-app; yarn link hedvig-redux; yarn link hedvig-style
	cd hedvig-web; yarn link hedvig-redux; yarn link hedvig-style

install:
	cd hedvig-redux; yarn install
	cd hedvig-app; yarn install
	cd hedvig-web; yarn install

lint:
	cd hedvig-redux; yarn lint
	cd hedvig-app; yarn lint
	cd hedvig-web; yarn lint

test:
	cd hedvig-redux; yarn test
	# cd hedvig-app; yarn test # we dont have any tests here yet :(
	cd hedvig-web; yarn test

test-deploy:
	cd hedvig-app; ./test-deploy.sh
	cd hedvig-web; ./test-deploy.sh

production-deploy:
	cd hedvig-app; ./production-deploy.sh
	cd hedvig-web; ./production-deploy.sh
