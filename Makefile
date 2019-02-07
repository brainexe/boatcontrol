
all: scripts/speak node_modules bower_components go/boat

go/boat: go/*.go
	cd go && go build -o boat *.go ; cd ..

bower_components: bower.json
	./node_modules/bower/bin/bower update

node_modules: package.json
	NODE_ENV=production npm install -q --progress=false

scripts/sixpair: scripts/sixpair.c
	gcc -o scripts/sixpair scripts/sixpair.c -lusb