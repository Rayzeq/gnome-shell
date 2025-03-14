#! /usr/bin/env nix-shell
#! nix-shell -i bash -p bash yarn
trash package.tgz
yarn build
yarn pack