ARG IMAGE=intersystemsdc/iris-community
FROM $IMAGE
USER root
WORKDIR /home/irisowner/dev

RUN apt update && sleep 5

RUN apt-get -y install npm  --fix-missing 

RUN npm install -g @angular/cli    

USER irisowner
COPY .iris_init /home/irisowner/

RUN --mount=type=bind,src=.,dst=. \
    iris start IRIS && \
	iris session IRIS < iris.script && \
    iris stop IRIS quietly



