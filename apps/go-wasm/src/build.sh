#!/bin/sh

echo "Building the WebAssembly module..."
GOOS=js GOARCH=wasm go build -o main.wasm main.go