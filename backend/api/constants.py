from enum import StrEnum

# Actions to be performed on models
class ModelAction(StrEnum):
  CREATE = "create"
  READ = "read"
  UPDATE = "update"
  DELETE = "delete"
  ENROLL = "enroll"
  UNENROLL = "un-enroll"

CRUD_ACTIONS = [
  ModelAction.CREATE,
  ModelAction.READ,
  ModelAction.UPDATE,
  ModelAction.DELETE
]

class Role(StrEnum):
  ADMIN = "admin"
  TEACHER = "teacher"
  STUDENT = "student"

class Model(StrEnum):
  USER = "user"
  COURSE = "course"
  COURSE_ENROLlMENT = "course_enrollment"
