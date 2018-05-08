link:
	cd hedvig-redux; yarn link
	cd hedvig-app; yarn link hedvig-redux;

install:
	cd hedvig-redux; yarn install
	cd hedvig-app; yarn install

lint:
	cd hedvig-redux; yarn lint
	cd hedvig-app; yarn lint

test:
	cd hedvig-redux; yarn test
	cd hedvig-app; yarn test

test-deploy:
	cd hedvig-app; ./test-deploy.sh

production-deploy:
	cd hedvig-app; ./production-deploy.sh
