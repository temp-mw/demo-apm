## Tracing

```
import (
	"github.com/astaxie/beego"
	mw_beego "github.com/middleware-labs/golang-apm-beego/beego"
	track "github.com/middleware-labs/golang-apm/tracker"
)
func main(){
	config, _ := track.Track(
		track.WithConfigTag("service", "your service name"),
		track.WithConfigTag("projectName", "your project name"),
	)
    mware := mw_beego.Middleware(config)
	beego.RunWithMiddleWares(":7777", mware)
}
```

```
go run server/server.go

go run client/client.go

```

