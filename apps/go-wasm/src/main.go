package main

import (
	"syscall/js"
	"fmt"
)

func main() {
	alert := js.Global().Get("alert")
	alert.Invoke("Hello, WebAssembly!")

	fmt.Println("Hello, WebAssembly!")
}
