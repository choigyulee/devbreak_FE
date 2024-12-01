#!/bin/sh
cd ../
mkdir output
cd devbreak
npm run build
cp -R ./FE/* ../output
cp -R ../output ./FE/
cd ..