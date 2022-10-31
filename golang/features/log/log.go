package main

import (
	"github.com/middleware-labs/golang-apm/logger"
	track "github.com/middleware-labs/golang-apm/tracker"
)

func main() {
	track.Track(
		track.WithConfigTag("service", "your service name"),
		track.WithConfigTag("projectName", "your project name"),
	)

	logger.Error("Error")
	logger.Info("Info")
	logger.Warn("Warn")
}
