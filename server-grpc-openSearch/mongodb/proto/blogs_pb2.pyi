from google.protobuf.internal import containers as _containers
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Iterable as _Iterable, Optional as _Optional

DESCRIPTOR: _descriptor.FileDescriptor

class BlogRequest(_message.Message):
    __slots__ = ("operationType", "id", "title", "content", "images", "email", "quesId", "commentId", "createdAt", "updatedAt", "v")
    OPERATIONTYPE_FIELD_NUMBER: _ClassVar[int]
    ID_FIELD_NUMBER: _ClassVar[int]
    TITLE_FIELD_NUMBER: _ClassVar[int]
    CONTENT_FIELD_NUMBER: _ClassVar[int]
    IMAGES_FIELD_NUMBER: _ClassVar[int]
    EMAIL_FIELD_NUMBER: _ClassVar[int]
    QUESID_FIELD_NUMBER: _ClassVar[int]
    COMMENTID_FIELD_NUMBER: _ClassVar[int]
    CREATEDAT_FIELD_NUMBER: _ClassVar[int]
    UPDATEDAT_FIELD_NUMBER: _ClassVar[int]
    V_FIELD_NUMBER: _ClassVar[int]
    operationType: str
    id: str
    title: str
    content: str
    images: _containers.RepeatedScalarFieldContainer[str]
    email: str
    quesId: str
    commentId: str
    createdAt: str
    updatedAt: str
    v: int
    def __init__(self, operationType: _Optional[str] = ..., id: _Optional[str] = ..., title: _Optional[str] = ..., content: _Optional[str] = ..., images: _Optional[_Iterable[str]] = ..., email: _Optional[str] = ..., quesId: _Optional[str] = ..., commentId: _Optional[str] = ..., createdAt: _Optional[str] = ..., updatedAt: _Optional[str] = ..., v: _Optional[int] = ...) -> None: ...

class BlogResponse(_message.Message):
    __slots__ = ("id", "message")
    ID_FIELD_NUMBER: _ClassVar[int]
    MESSAGE_FIELD_NUMBER: _ClassVar[int]
    id: str
    message: str
    def __init__(self, id: _Optional[str] = ..., message: _Optional[str] = ...) -> None: ...
