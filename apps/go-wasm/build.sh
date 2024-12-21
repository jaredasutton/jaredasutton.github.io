#!/bin/sh

# Print a message indicating the script has started
echo "Starting build script..."

# Print the current directory
echo "Current directory: $(pwd)"

# Print Go environment variables
go env

# Check if Go is installed
if ! command -v go &> /dev/null
then
    echo "Go could not be found"
    exit 1
fi

# Build the WebAssembly module
echo "Building the WebAssembly module..."
GOOS=js GOARCH=wasm go build -o main.wasm main.go

# Check if the build was successful
if [ $? -eq 0 ]; then
    echo "Build successful"
    # Move the main.wasm file to the src directory
    mv main.wasm src/
else
    echo "Build failed"
fi

# Print a message indicating the script has finished
echo "Build script finished."
