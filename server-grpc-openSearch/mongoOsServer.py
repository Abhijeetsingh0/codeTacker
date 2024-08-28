import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), 'proto'))

import proto.user_pb2 as user_pb2
import proto.user_pb2_grpc as user_pb2_grpc

import proto.blogs_pb2 as blogs_pb2
import proto.blogs_pb2_grpc as blogs_pb2_grpc

from concurrent import futures
import grpc

class UserSericer(user_pb2_grpc.UserServicesServicer):
    def RegisterUser(self, request, context):
        print(request)
        return user_pb2.registerUserResponse(message="hername", email="testing")

class BlogServicer(blogs_pb2_grpc.BlogServiceServicer):
    def BlogChanges(self, request, context):
        print(request)
        resp = blogs_pb2.BlogResponse(id="01",message="changes Happend")
        return resp

def serve():
    # Create a gRPC server
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    
    # Add the UserService to the server
    user_pb2_grpc.add_UserServicesServicer_to_server(UserSericer(), server)
    blogs_pb2_grpc.add_BlogServiceServicer_to_server(BlogServicer(),server)
    
    # Specify the port to listen on
    server.add_insecure_port('[::]:50051')
    
    # Start the server
    server.start()
    print("Server is running on port 50051")
    
    # Wait for the server to terminate
    server.wait_for_termination()

if __name__ == '__main__':
    serve()