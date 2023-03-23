package main

import (
	"flag"
	"fmt"
	"io"
	"log"
	"net/http"
)

func main() {
	url := flag.String("server", "http://localhost:7777/hello", "server url")
	flag.Parse()

	client := http.Client{}

	req, err := http.NewRequest("GET", *url, nil)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Printf("sending request...\n")
	res, err := client.Do(req)
	if err != nil {
		log.Fatal(err)
	}

	body, err := io.ReadAll(res.Body)
	if err != nil {
		log.Fatal(err)
	}
	_ = res.Body.Close()

	fmt.Printf("Response Received: %s\n\n\n", body)
}
