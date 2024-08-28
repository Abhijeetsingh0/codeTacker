sudo sysctl -w vm.max_map_count=262144
docker-compose up -d


userProtoBuffer => python3 -m grpc_tools.protoc --proto_path=./proto/ --python_out=./proto/ --pyi_out=./proto/ --grpc_python_out=./proto/ ./proto/user.proto 
