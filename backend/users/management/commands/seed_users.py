from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.db import transaction
from rolepermissions.roles import assign_role
from ...roles import *
from ...models import CustomUser

User = get_user_model()

PENDING = CustomUser.StatusChoices.PENDING
ACTIVE = CustomUser.StatusChoices.ACTIVE
REJECTED = CustomUser.StatusChoices.REJECTED


SEED_USERS = [
  {
    "username": "admin",
    "email": "admin@admin.com",
    "password": "admin",
    "first_name": "Andrew",
    "last_name": "Amon",
    "role": Admin,
    "status": ACTIVE,
  },
  {
    "username": "teacher",
    "email": "teacher@teacher.com",
    "password": "teacher",
    "first_name": "Clark",
    "last_name": "Stone",
    "role": Teacher,
    "status": ACTIVE,
  },
  {
    "username": "teacher2",
    "email": "teacher2@teacher.com",
    "password": "teacher2",
    "first_name": "Amanda",
    "last_name": "Kening",
    "role": Teacher,
    "status": PENDING,
  },
  {
    "username": "student",
    "email": "student@student.com",
    "password": "student",
    "first_name": "Rob",
    "last_name": "Banks",
    "role": Student,
    "status": ACTIVE,
  },
]


class Command(BaseCommand):
  help = """Seeds initial users for each role"""

  def handle(self, *args, **options):
    created_count = 0

    with transaction.atomic():
      for data in SEED_USERS:

        if User.objects.filter(email=data["email"]).exists():
          self.stdout.write(self.style.WARNING(f"User with email {data["email"]} already exists. -- Skipped"))
          continue

        user = User.objects.create_user(
          username=data["username"],
          email=data["email"],
          password=data["password"],
          first_name=data["first_name"],
          last_name=data["last_name"],
          status=data["status"],
        )

        assign_role(user, data["role"])

        created_count +=  1

        self.stdout.write(
          self.style.SUCCESS(f"Created user: {user.username}")
        )

    self.stdout.write(
      self.style.SUCCESS(f"\nDone! Created {created_count} new users(s).")
    )
