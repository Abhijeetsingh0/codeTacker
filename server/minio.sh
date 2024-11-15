mkdir -p ~/minio/data

docker run -d \
   -p 9000:9000 \
   -p 9001:9001 \
   --name minio \
   -v ~/minio/data:/data \
   --restart always \
   -e "MINIO_ROOT_USER=user" \
   -e "MINIO_ROOT_PASSWORD=pass@123" \
   quay.io/minio/minio server /data --console-address ":9001"