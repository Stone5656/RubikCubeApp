.PHONY: add update install

add:
	poetry add $(pkg)
	poetry export -f requirements.txt --output requirements.txt --without-hashes

update:
	poetry update $(pkg)
	poetry export -f requirements.txt --output requirements.txt --without-hashes

install:
	poetry install
	poetry export -f requirements.txt --output requirements.txt --without-hashes
