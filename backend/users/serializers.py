from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()

class UserSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = User
    fields = ["id", "username", "email", "first_name", "last_name", "status"]


class ChangeStatusSerializer(serializers.Serializer):
  is_active = serializers.BooleanField(required=True)