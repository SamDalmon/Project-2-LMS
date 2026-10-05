from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model
from rolepermissions.roles import assign_role
from backend.users.roles import Student

User = get_user_model()

@receiver (post_save, sender=User)
def assign_default_role(sender, instance, created, **kwargs):
  if created: 
    assign_role(instance, Student)
