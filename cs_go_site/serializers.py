import requests
from allauth.socialaccount.models import SocialAccount
from rest_framework.serializers import ModelSerializer


class UserSerializer(ModelSerializer):
    class Meta:
        model = SocialAccount
        fields = '__all__'
