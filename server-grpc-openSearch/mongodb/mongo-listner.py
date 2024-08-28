from pymongo import MongoClient
from pymongo.errors import PyMongoError
import sys
import os
import datetime
import grpc
sys.path.append(os.path.join(os.path.dirname(__file__), 'proto'))
import proto.blogs_pb2_grpc as blogs_pb2_grpc
import proto.blogs_pb2 as blogs_pb2



mongo_uri = "mongodb://localhost:27017,localhost:27018,localhost:27019/?replicaSet=myReplicaSet"

def convert_objectid_to_string(objectid):
    return str(objectid)

def convert_datetime_to_timestamp(datetime_obj):
    return int(datetime_obj.timestamp())

try:
    client = MongoClient(mongo_uri)
    db = client['CodeTracker']
    collection = db['blogs']
    print("Connected to MongoDB at", mongo_uri)

    with collection.watch() as stream:
        print("Listening for changes...")
        for change in stream:
            print("Change detected:", change)

            channel = grpc.insecure_channel("localhost:50051")
            stub = blogs_pb2_grpc.BlogServiceStub(channel)

            # Convert MongoDB types to suitable types for gRPC
            operation_type = change['operationType']
            document = change['fullDocument']
            
            blogReq = blogs_pb2.BlogRequest(
                operationType=operation_type,
                id=convert_objectid_to_string(document['_id']),
                title=document['title'],
                content=document['content'],
                images=document['images'],
                email=document['email'],
                quesId=document['quesId'],
                commentId=document['commentId'],
                createdAt=str(document["createdAt"]),
                updatedAt=str(document["updatedAt"]),
                v=int(document['__v'])
            )
            
            # print(str(document["createdAt"]))

            res = stub.BlogChanges(blogReq)
            print(res)

except PyMongoError as e:
    print("Error connecting to MongoDB:", e)
