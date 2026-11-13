from django.core.management.base import BaseCommand
from django.db import transaction
from ...models import Course


SEED_COURSES = [
  {
    "title": 'Amazing Course 1', 
    "description": 'This is the first amazing course' 
  },
  { 
    "title": 'Amazing Course 2', 
    "description": 'This is the second amazing course'
  },
  { 
    "title": 'Amazing Course 3', 
    "description": 'This is the third amazing course' 
  },
]

class Command(BaseCommand):
  help = """Seeds sample courses"""

  def handle(self, *args, **options):
    created_count = 0

    for data in SEED_COURSES:

      course = Course.objects.create(
        title=data["title"],
        description=data["description"]
      )

      created_count += 1

      self.stdout.write(
        self.style.SUCCESS(f"Created course: {course.title}")
      )

    self.stdout.write(
      self.style.SUCCESS(f"\nDone! Created {created_count} new course(s).")
    )