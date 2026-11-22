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

class Command(BaseCommand):
  help = """Seeds a number of Pending teachers"""

  NUM_TEACHERS = "num_teachers"

  def add_arguments(self, parser):
    parser.add_argument(self.NUM_TEACHERS, type=int, help="The number of pending teachers to add")

  def handle(self, *args, **options):
    created_count = 0

    with transaction.atomic():
      for i in range(0, options[self.NUM_TEACHERS]):
        username = f"teacher{i}"
        
        if User.objects.filter(username=username).exists():
          self.stdout.write(self.style.WARNING(f"User with username {username} already exists. -- Skipped"))
          continue
         
        teacher = User.objects.create_user(
          username= username,
          email= "teacher@teacher.com",
          password= "teacher",
          first_name= "Teacher",
          last_name= f"Number{i}",
          status= PENDING,
        )

        assign_role(teacher, Teacher,)

        created_count += 1

        self.stdout.write(
          self.style.SUCCESS(f"Created user: {teacher.username}")
        )
        
    self.stdout.write(
      self.style.SUCCESS(f"\nDone! Created {created_count} new users(s).")
    )
