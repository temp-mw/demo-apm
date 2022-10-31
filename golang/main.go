package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
	g "github.com/middleware-labs/golang-apm-gin/gin"
	"github.com/middleware-labs/golang-apm/logger"
	track "github.com/middleware-labs/golang-apm/tracker"
)

func main() {
	go track.Track(
		track.WithConfigTag("service", "Your service Name"),
		track.WithConfigTag("projectName", "go-demo-app"),
	)
	r := gin.Default()
	r.Use(g.Middleware("serviceName"))
	r.GET("/books", FindBooks)
	r.Run(":8090")

	// logs

	logger.Error("Error")

	logger.Info("Info")

	logger.Warn("Warn")

}

func FindBooks(c *gin.Context) {
	span := track.SpanFromContext(c.Request.Context())
	span.SetAttributes(track.String("controller", "books"))
	c.JSON(http.StatusOK, gin.H{"data": "ok"})
}
