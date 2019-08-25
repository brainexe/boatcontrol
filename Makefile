
all: go/boat bower_components node_modules scripts/sixpair sixad/sixad

go/boat: go/*.go
	cd go && go build -o boat *.go ; cd ..

bower_components: bower.json
	./node_modules/bower/bin/bower update --allow-root

node_modules: package.json
	NODE_ENV=production npm install -q --progress=false

scripts/sixpair: scripts/sixpair.c
	gcc -o scripts/sixpair scripts/sixpair.c -lusb

sixad/sixad: sixad/*.cpp
	cd sixad && (make && make install) ; cd ..
