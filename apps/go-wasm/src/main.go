package main

import (
	"syscall/js"
	"fmt"
)

func main() {
	alert := js.Global().Get("alert")
	alert.Invoke("Hello, WebAssembly!")

	fmt.Println("Hello, WebAssembly!")

	// Access a DOM object and change its text content
	changeText := js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		document := js.Global().Get("document")
		element := document.Call("getElementById", "myElement")
		element.Set("textContent", "Text changed by WebAssembly!")
		return nil
	})

	// Expose the changeText function to JavaScript
	js.Global().Set("changeText", changeText)

	// Keep the Go program running
	select {}
}
