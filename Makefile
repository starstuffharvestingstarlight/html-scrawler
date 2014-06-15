all: app/lib/vendor
app/lib/vendor: install
install: bower.json deps
	bower install
server: php-exists
	php -S localhost:8000 -t app
deps: bower-exists
php-exists: ; @which php > /dev/null
bower-exists: ; @which bower > /dev/null
clean:
	rm -rf app/lib/vendor/*
