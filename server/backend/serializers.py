from rest_framework import serializers

from model.models import Tokens, Classes, UserProfile, StudentData


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'
