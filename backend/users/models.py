from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class CustomUser(AbstractUser):
  class StatusChoices(models.TextChoices):
    PENDING = "PENDING", "Pending Approval"
    ACTIVE = "ACTIVE", "Active"
    REJECTED = "REJECTED", "Rejected"

  status = models.CharField(
    max_length=20,
    choices=StatusChoices.choices,
    default=StatusChoices.ACTIVE,
  )