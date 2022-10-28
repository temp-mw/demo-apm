package main

import (
	"github.com/gin-gonic/gin"
	g "github.com/middleware-labs/golang-apm-gin/gin"
	track "github.com/middleware-labs/golang-apm/tracker"
	"net/http"
)

func main() {
	go track.Track(
		track.WithConfigTag("service", "Your service Name"),
		track.WithConfigTag("projectName", "gin-app"),
	)
	r := gin.Default()
	r.Use(g.Middleware("serviceName"))
	r.GET("/books", FindBooks)
	r.POST("/add", AddBook)
	r.PUT("/update/:id", UpdateBook)
	r.DELETE("/delete/:id", DeleteBook)
	r.GET("/user/:id", func(c *gin.Context) {
		userId := c.Param("id")
		span := track.SpanFromContext(c.Request.Context())
		span.SetAttributes(track.String("id", userId), track.String("controller", "users"))
		c.JSON(http.StatusInternalServerError, "Internal server error")
	})
	r.Run(":8090")
}

func FindBooks(c *gin.Context) {
	span := track.SpanFromContext(c.Request.Context())
	span.SetAttributes(track.String("controller", "books"))
	c.JSON(http.StatusOK, gin.H{"data": "ok"})
}
func AddBook(c *gin.Context) {
	span := track.SpanFromContext(c.Request.Context())
	span.SetAttributes(track.String("id", "add"), track.String("controller", "books"))
	c.JSON(http.StatusOK, gin.H{"data": "ok"})
}
func UpdateBook(c *gin.Context) {
	bookId := c.Param("id")
	span := track.SpanFromContext(c.Request.Context())
	span.SetAttributes(track.String("id", bookId), track.String("controller", "books"))
	c.JSON(http.StatusOK, gin.H{"bookId": bookId})
}
func DeleteBook(c *gin.Context) {
	bookId := c.Param("id")
	span := track.SpanFromContext(c.Request.Context())
	span.SetAttributes(track.String("id", bookId), track.String("controller", "books"))
	c.JSON(http.StatusOK, gin.H{"bookId": bookId})
}
