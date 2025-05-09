package main

import (
	"errors"
	"net/http"
	"reflect"
	"unsafe"

	"github.com/gin-gonic/gin"
	g "github.com/middleware-labs/golang-apm-gin/gin"
	"github.com/middleware-labs/golang-apm/logger"
	track "github.com/middleware-labs/golang-apm/tracker"
)

func main() {
	r := gin.Default()
	config, _ := track.Track(
		track.WithConfigTag(track.Service, "go-demo-1.6.0"),
		//track.WithConfigTag(track.Target, "bwfhm.mw.lc:443"),
		track.WithConfigTag(track.Token, "mgqjtlgshkyhlykoaermkzbjpmgprkrzmbsb"),
		//track.WithConfigTag(track.Token, "xbqiunvwxdnksvtucxdywxehecupgqnawjxy"),
		track.WithConfigTag(track.Target, "sbncr.stage.env.middleware.io:443"),
	)
	// logs
	logger.Error("Error")
	logger.Info("Info")
	logger.Warn("Warn")

	r.Use(g.Middleware(config))
	r.GET("/books", FindBooks)
	r.GET("/exception", GenerateErrors)
	r.Run(":8090")
}

func FindBooks(c *gin.Context) {
	ctx := c.Request.Context()
	err := errors.New("something went wrong")
	track.ErrorRecording(ctx, err)
	track.SetAttribute(ctx, "user.id", "1")
	track.SetAttribute(ctx, "user.role", "admin")
	track.SetAttribute(ctx, "user.scope", "read:message,write:files")
	c.JSON(http.StatusOK, gin.H{"data": "ok"})
}

func GenerateErrors(c *gin.Context) {
	// 1. Division by zero (using runtime error)
	var zero int
	_ = 1 / zero

	// 2. Type conversion error
	var i interface{} = "hello"
	_ = i.(int)

	// 3. Nil pointer dereference
	var ptr *int
	_ = *ptr

	// 4. Array out of bounds (using runtime error)
	arr := [3]int{1, 2, 3}
	index := 3
	_ = arr[index] // This will cause a runtime error

	// 5. Invalid memory address
	var invalidPtr *int = (*int)(unsafe.Pointer(uintptr(0x12345678)))
	_ = *invalidPtr

	// 6. Channel send to nil channel
	var ch chan int
	ch <- 1

	// 7. Channel receive from nil channel
	_ = <-ch

	// 8. Close nil channel
	close(ch)

	// 9. Close closed channel
	ch2 := make(chan int)
	close(ch2)
	close(ch2)

	// 10. Map access to nil map
	var m map[string]int
	_ = m["key"]

	// 11. Map write to nil map
	m["key"] = 1

	// 12. Slice bounds out of range
	s := []int{1, 2, 3}
	_ = s[3] // This will cause a runtime error

	// 13. Slice capacity out of range
	_ = s[:4] // This will cause a runtime error

	// 14. Invalid slice index
	start := 2
	end := 1
	_ = s[start:end] // This will cause a runtime error

	// 15. Interface conversion error
	var x interface{} = "string"
	_ = x.([]int)

	// 16. Call of reflect.Value.Type on zero Value
	var v reflect.Value
	_ = v.Type()

	// 17. Call of reflect.Value.Interface on zero Value
	_ = v.Interface()

	// 18. Call of reflect.Value.Method on zero Value
	_ = v.Method(0)

	// 19. Call of reflect.Value.Field on zero Value
	_ = v.Field(0)

	// 20. Call of reflect.Value.Index on zero Value
	_ = v.Index(0)

	// 21. Call of reflect.Value.MapIndex on zero Value
	_ = v.MapIndex(reflect.ValueOf("key"))

	// 22. Call of reflect.Value.MapKeys on zero Value
	_ = v.MapKeys()

	// 23. Call of reflect.Value.Set on zero Value
	v.Set(reflect.ValueOf(1))

	// 24. Call of reflect.Value.SetMapIndex on zero Value
	v.SetMapIndex(reflect.ValueOf("key"), reflect.ValueOf(1))

	// 25. Call of reflect.Value.Slice on zero Value
	_ = v.Slice(0, 1)

	// 26. Call of reflect.Value.String on zero Value
	_ = v.String()

	// 27. Call of reflect.Value.Uint on zero Value
	_ = v.Uint()

	// 28. Call of reflect.Value.UnsafeAddr on zero Value
	_ = v.UnsafeAddr()

	// 29. Call of reflect.Value.Bytes on zero Value
	_ = v.Bytes()

	// 30. Call of reflect.Value.CanAddr on zero Value
	_ = v.CanAddr()

	c.JSON(http.StatusInternalServerError, gin.H{"error": "Multiple errors generated"})
}
