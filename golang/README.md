# golang-apm

go get github.com/middleware-labs/golang-apm


```golang

import (
	track "github.com/middleware-labs/golang-apm/tracker"
	"github.com/middleware-labs/golang-apm/logger"
)

func main() {
	go track.Track(
		track.WithConfigTag("service", "Your service Name"),
		track.WithConfigTag("projectName", "go-demo-app"),
	)
	
	logger.Error("Your Error Message")
	
	logger.Info("Your Info Message")
	
	logger.Warn("Your Warn Message")
}