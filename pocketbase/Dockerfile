# https://dev.to/marselit/build-and-deploy-a-pocketbase-project-oi4
#docker build -t NAME LOCATION
#docker run -p 8090:8090 NAME

FROM alpine:3.14

WORKDIR /app
COPY ./pocketbase .
COPY pb_public ./pb_public

# The http flag tells docker where to listen, 0.0.0.0 simply tells pocketbase to listen on all ips 
#(the request will not come from localhost, but from our system which will use docker bridge which has its own ip --> looks like a request from outside)
CMD ["./pocketbase", "serve", "--http=0.0.0.0:8090"]

EXPOSE 8090