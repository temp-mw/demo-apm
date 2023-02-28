## Distributed Tracing

```
import (
	"github.com/beego/beego/v2/server/web"
	mwbeego "github.com/middleware-labs/golang-apm-beego-beego"
	track "github.com/middleware-labs/golang-apm/tracker"
)
func main(){
	config, _ := track.Track(
		track.WithConfigTag("service", "beego-beego-pname"),
		track.WithConfigTag("projectName", "beego-beego-sname"),
	)
	mware := mwbeego.MiddleWare(config.ServiceName)
	web.RunWithMiddleWares(":7777", mware)
}
```

## Complete Example
```
go run example.go

```

