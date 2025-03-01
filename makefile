.PHONY: install dev build preview clean

default: dev

install:
	@npm install

dev:
	@[ -d "node_modules" ] || $(MAKE) install
	@npm run dev

build:
	@npm run build

preview:
	@npm run preview

clean:
	@rm -rf dist/
	@rm -rf node_modules/
