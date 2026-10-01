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
  ROLE = "role"
  USER = "user"
  COURSE = "course"
  COURSE_ENROLlMENT = "course_enrollment"
  PERMISSION = "permission"
  ROLE_PERMISSION = "role_permission"

ROLE_PERMISSIONS_MATRIX = {
  Role.ADMIN : {
    Model.ROLE : [ModelAction.READ],
    Model.USER : [*CRUD_ACTIONS],
    Model.COURSE : [*CRUD_ACTIONS],
    Model.COURSE_ENROLlMENT : [*CRUD_ACTIONS],
    Model.PERMISSION : [ModelAction.READ],
    Model.ROLE_PERMISSION : [ModelAction.READ],
  }
}