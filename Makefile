BUILDTIME=$(shell date +"%s")


deploy:
	# BUILD HERE
	npm install
	rm -rf dist
	ng build
	docker build -t amirmfallah/mobydick-app-frontend:panel.0.0.${BUILDTIME} .
	docker push amirmfallah/mobydick-app-frontend:panel.0.0.${BUILDTIME}
	~/arvan paas set image deployment/mobydick-panel-beta mobydick-panel-beta=amirmfallah/mobydick-app-frontend:panel.0.0.${BUILDTIME}