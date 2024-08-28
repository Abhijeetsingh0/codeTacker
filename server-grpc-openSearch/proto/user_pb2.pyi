from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Optional as _Optional

DESCRIPTOR: _descriptor.FileDescriptor

class registerUserRequest(_message.Message):
    __slots__ = ("username", "email", "password", "admin")
    USERNAME_FIELD_NUMBER: _ClassVar[int]
    EMAIL_FIELD_NUMBER: _ClassVar[int]
    PASSWORD_FIELD_NUMBER: _ClassVar[int]
    ADMIN_FIELD_NUMBER: _ClassVar[int]
    username: str
    email: str
    password: str
    admin: bool
    def __init__(self, username: _Optional[str] = ..., email: _Optional[str] = ..., password: _Optional[str] = ..., admin: bool = ...) -> None: ...

class registerUserResponse(_message.Message):
    __slots__ = ("message", "email")
    MESSAGE_FIELD_NUMBER: _ClassVar[int]
    EMAIL_FIELD_NUMBER: _ClassVar[int]
    message: str
    email: str
    def __init__(self, message: _Optional[str] = ..., email: _Optional[str] = ...) -> None: ...
