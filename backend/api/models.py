from django.conf import settings
from django.db import models

class Course(models.Model):
  name = models.CharField(max_length=64, unique=True)
  description = models.CharField(max_length=512)

# For the links showing users are enrolled in a course 
class CourseEnrollment(models.Model):
  user_id = models.ForeignKey(
    settings.AUTH_USER_MODEL, 
    on_delete=models.CASCADE,
    related_name="course_enrollment"
  )
  course_id = models.ForeignKey(Course, on_delete=models.CASCADE)
