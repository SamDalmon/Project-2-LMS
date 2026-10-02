from django.db import models

class Course(models.Model):
  name = models.CharField(max_length=64, unique=True)
  description = models.CharField(max_length=512)

# For the links showing users are enrolled in a course 
class CourseEnrollment(models.Model):
  user_id = models.ForeignKey(User, on_delete=models.CASCADE)
  course_id = models.ForeignKey(Course, on_delete=models.CASCADE)
