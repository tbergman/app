link:
	cd hedvig-redux; yarn link
	cd hedvig-style; yarn link
	cd hedvig-app; yarn link hedvig-redux; yarn link hedvig-style
	cd hedvig-web; yarn link hedvig-redux; yarn link hedvig-style

install:
	cd hedvig-redux; yarn install
	cd hedvig-app; yarn install
	cd hedvig-web; yarn install
