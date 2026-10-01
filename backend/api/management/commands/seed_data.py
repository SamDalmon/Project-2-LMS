from django.core.management.base import BaseCommand
from api.models import Role, Permission, RolePermission

class Command(BaseCommand):
  help = 'Seeds Roles, Permissions, and RolePermissions tables'

  def handle(self, *args, **kwags):
    self.stdout.write("Starting database seed...")

    self.seed_roles()

    self.stdout.write("Database seeding completed")

  def seed_roles(self):
    self.stdout.write("-> Seeding Roles...")

    roles = {}
    role_data = ["Admin", "Teacher", "Student"]

    for role in role_data:
      role_obj, created = Role.objects.get_or_create(name=role)
      roles[role] = role_obj

    self.stdout.write(self.style.SUCCESS("Roles synced!"))

  def seed_permissions(self):
    permissions = {}
    permission_data = {
      "user" : ["create", "read", "update", "delete"],
      "course" : ["create", "read", "update", "delete", "enroll", "un-enroll"],
      "role" : ["read"],
      "course_enrollment": ["read"]
    }
    