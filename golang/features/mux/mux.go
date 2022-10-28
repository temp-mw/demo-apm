package main

import (
	"context"
	"fmt"
	"github.com/gorilla/mux"
	mw_mux "github.com/middleware-labs/golang-apm-mux/mux"
	track "github.com/middleware-labs/golang-apm/tracker"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"time"
)

var t = mw_mux.CreateTracer("test")

type spaHandler struct {
	staticPath string
	indexPath  string
}

func (h spaHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	path, err := filepath.Abs(r.URL.Path)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	path = filepath.Join(h.staticPath, path)
	_, err = os.Stat(path)
	if os.IsNotExist(err) {
		http.ServeFile(w, r, filepath.Join(h.staticPath, h.indexPath))
		return
	} else if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	http.FileServer(http.Dir(h.staticPath)).ServeHTTP(w, r)
}

func main() {
	go track.Track(
		track.WithConfigTag("service", "service1"),
		track.WithConfigTag("projectName", "mux-app"),
	)
	r := mux.NewRouter()
	r.Use(mw_mux.Middleware("my-server"))
	r.HandleFunc("/users/{id:[0-9]+}", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		id := vars["id"]
		name := getUser(r.Context(), id)
		reply := fmt.Sprintf("user %s (id %s)\n", name, id)
		_, _ = w.Write(([]byte)(reply))
	}))
	spa := spaHandler{staticPath: "build", indexPath: "index.html"}
	r.PathPrefix("/").Handler(spa)
	srv := &http.Server{
		Handler:      r,
		Addr:         "127.0.0.1:8000",
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}
	log.Fatal(srv.ListenAndServe())
}

func getUser(ctx context.Context, id string) string {
	_, span := t.Start(ctx, "getUser")
	span.SetAttributes(track.String("id", id))
	defer span.End()
	if id == "123" {
		return "tester"
	}
	return "unknown"
}
