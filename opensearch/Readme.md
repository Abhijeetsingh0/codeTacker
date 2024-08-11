command: sudo sysctl -w vm.max_map_count=262144
password is 8871592651@As can be changed in docker-compose.yaml


docker-compose.yaml:

version: '3'
services:
  opensearch-node1: # This is also the hostname of the container within the Docker network (i.e. https://opensearch-node1/)
    image: opensearchproject/opensearch:latest # Specifying the latest available image - modify if you want a specific version
    restart: unless-stopped  
    container_name: opensearch-node1  
    environment:
      - cluster.name=opensearch-cluster # Name the cluster
      - node.name=opensearch-node1 # Name the node that will run in this container
      - discovery.seed_hosts=opensearch-node1,opensearch-node2 # Nodes to look for when discovering the cluster
      - cluster.initial_cluster_manager_nodes=opensearch-node1,opensearch-node2 # Nodes eligibile to serve as cluster manager
      - bootstrap.memory_lock=true # Disable JVM heap memory swapping
      - "OPENSEARCH_JAVA_OPTS=-Xms512m -Xmx512m" # Set min and max JVM heap sizes to at least 50% of system RAM
      - OPENSEARCH_INITIAL_ADMIN_PASSWORD=8871592651@As
    ulimits:
      memlock:
        soft: -1 # Set memlock to unlimited (no soft or hard limit)
        hard: -1
      nofile:
        soft: 262144 # Maximum number of open files for the opensearch user - set to at least 65536
        hard: 262144
    volumes:
      - opensearch-data1:/usr/share/opensearch/data # Creates volume called opensearch-data1 and mounts it to the container
    ports:
      - 9200:9200 # REST API
      - 9600:9600 # Performance Analyzer
    networks:
      - opensearch-net # All of the containers will join the same Docker bridge network

  opensearch-node2:
    image: opensearchproject/opensearch:latest # This should be the same image used for opensearch-node1 to avoid issues
    restart: unless-stopped  
    container_name: opensearch-node2
    environment:
      - cluster.name=opensearch-cluster
      - node.name=opensearch-node2
      - discovery.seed_hosts=opensearch-node1,opensearch-node2
      - cluster.initial_cluster_manager_nodes=opensearch-node1,opensearch-node2
      - bootstrap.memory_lock=true
      - "OPENSEARCH_JAVA_OPTS=-Xms512m -Xmx512m"
      - OPENSEARCH_INITIAL_ADMIN_PASSWORD=8871592651@As
    ulimits:
      memlock:
        soft: -1
        hard: -1
      nofile:
        soft: 262144
        hard: 262144
    volumes:
      - opensearch-data2:/usr/share/opensearch/data
    networks:
      - opensearch-net

  opensearch-dashboards:
    image: opensearchproject/opensearch-dashboards:latest # Make sure the version of opensearch-dashboards matches the version of opensearch installed on other nodes
    container_name: opensearch-dashboards
    ports:
      - 5601:5601 # Map host port 5601 to container port 5601
    expose:
      - "5601" # Expose port 5601 for web access to OpenSearch Dashboards
    environment:
      OPENSEARCH_HOSTS: '["https://opensearch-node1:9200","https://opensearch-node2:9200"]' # Define the OpenSearch nodes that OpenSearch Dashboards will query
    networks:
      - opensearch-net
    depends_on:
      - opensearch-node1
      - opensearch-node2    

  data-prepper:
    container_name: data-prepper
    restart: unless-stopped  
    image: opensearchproject/data-prepper:latest
    volumes:
      - ./pipelines.yaml:/usr/share/data-prepper/pipelines/pipelines.yaml
    ports:
      - 2021:2021
      - 21890:21890
    networks:
      - opensearch-net
    depends_on:
      - opensearch-node1
      - opensearch-node2

  otel-collector:
    image: otel/opentelemetry-collector:latest
    restart: unless-stopped
    command: [ "--config=/etc/otel-collector-config.yaml" ]
    volumes:
      - ./otel-collector-config.yaml:/etc/otel-collector-config.yaml
    ports:
      - "55680:55680"        # OTLP gRPC receiver
      - "4318:4318"        # OTLP HTTP receiver
      - "55670:55679" # zpages extension
    depends_on:
      - data-prepper  
      - opensearch-node1
      - opensearch-node2
  
volumes:
  opensearch-data1:
  opensearch-data2:

networks:
  opensearch-net:


otel-collector-config.yaml:
receivers:
  otlp:
    protocols:
      grpc: 
        endpoint: 0.0.0.0:55680
      http: 
        endpoint: 0.0.0.0:4318

processors:
  batch:
    timeout: 10s

exporters:
  otlp/data-prepper:
    endpoint: data-prepper:21890 #Set your endpoint for data-prepper
    tls:
      insecure: true

service:
  pipelines:
    traces:
      receivers: [otlp]
      processors: [batch]
      exporters: [otlp/data-prepper]

pipelines.yaml:

entry-pipeline:
  delay: "100"
  source:
    otel_trace_source:
      ssl: false
  sink:
    - pipeline:
        name: "raw-pipeline"
    - pipeline:
        name: "service-map-pipeline"
raw-pipeline:
  source:
    pipeline:
      name: "entry-pipeline"
  processor:
    - otel_trace_raw:
  sink:
    - opensearch:
        hosts: [ "https://opensearch:9200" ] #Set your opensearch endpoint
        insecure: true
        username: admin
        password: 8871592651@As
        index_type: trace-analytics-raw

service-map-pipeline:
  delay: "100"
  source:
    pipeline:
      name: "entry-pipeline"
  processor:
    - service_map_stateful:
  sink:
    - opensearch:
        hosts: [ "https://opensearch:9200" ] #Set your opensearch endpoint
        insecure: true
        username: admin
        password: 8871592651@As
        index_type: trace-analytics-service-map
log-pipeline:
  source:
    http:
      ssl: false
  processor:
    - grok:
        match:
          log: [ "%{COMMONAPACHELOG}" ]
  sink:
    - opensearch:
        hosts: [ "https://opensearch:9200" ] #Set your opensearch endpoint
        insecure: true
        username: admin
        password: 8871592651@As
        index: apache_logs