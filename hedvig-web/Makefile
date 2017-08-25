.PHONY: prepare-build link

prepare-build:
	yarn unlink hedvig-redux
	yarn add file:../hedvig-redux
	cd node_modules/hedvig-redux; yarn build
	cd node_modules/hedvig-redux; node change-main.js

link:
	-yarn remove hedvig-redux
	cd ../hedvig-redux; yarn link
	yarn link hedvig-redux
