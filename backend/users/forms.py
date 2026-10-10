from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import get_user_model


User = get_user_model()

class CustomUserCreationForm(UserCreationForm):
  first_name = forms.CharField(max_length=150, required=True, label="First Name")
  last_name = forms.CharField(max_length=150, required=True, label="Last Name")

  class Meta(UserCreationForm.Meta):
    model = User
    fields = UserCreationForm.Meta.fields + ("first_name", "last_name")