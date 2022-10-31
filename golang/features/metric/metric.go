package main

import (
	track "github.com/middleware-labs/golang-apm/tracker"
)

func main() {
	track.Track(
		track.WithConfigTag("service", "your service name"),
		track.WithConfigTag("projectName", "your project name"),
	)
}
