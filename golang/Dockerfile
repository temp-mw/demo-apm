FROM golang:1.18
RUN mkdir -p /app
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod tidy
COPY . .
RUN go build /app/features/log
RUN go build /app/features/metric
RUN go build /app/features/trace