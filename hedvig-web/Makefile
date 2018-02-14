.PHONY: clean prepare-build link

clean:
	-yarn unlink hedvig-redux
	-yarn unlink hedvig-style
	-yarn remove hedvig-redux
	-yarn remove hedvig-style
	-cd ../hedvig-redux; rm -rf build

prepare-build:
	make clean
	yarn add file:../hedvig-redux
	yarn add file:../hedvig-style
	# Don't run `yarn` after changing node_modules, your changes will be overwritten!
	cd node_modules/hedvig-redux; yarn build
	cd node_modules/hedvig-redux; node change-main.js

link:
	-yarn remove hedvig-redux
	-yarn remove hedvig-style
	cd ../hedvig-redux; yarn link
	cd ../hedvig-style; yarn link
	yarn link hedvig-redux
	yarn link hedvig-style
