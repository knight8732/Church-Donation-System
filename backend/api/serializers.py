from rest_framework import serializers
from django.db.models import Sum
from django.utils import timezone 
from .models import *

class MemberDonationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Donations
        fields = ['id', 'amount', 'donation_date', 'activity', 'created_at', 'updated_at']

class ChurchesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Churches
        fields = '__all__'

class MembersSerializer(serializers.ModelSerializer):
    church_detail = ChurchesSerializer(source='church_id', read_only=True)
    total_donated = serializers.SerializerMethodField()
    annual_donations = serializers.SerializerMethodField()
    class Meta:
        model = Members
        fields = [
            'id', 'full_name', 'email', 'phone_number', 'address', 
            'status', 'church_id', 'church_detail', 'joined_date', 
            'annual_donations','total_donated', 'created_at', 'updated_at'
        ]

    def get_total_donated(self, obj):
        total = obj.donations_set.aggregate(Sum('amount'))['amount__sum']
        return float(total) if total is not None else 0.0

    def get_annual_donations(self, obj):
        current_year = timezone.now().year
        total = obj.donations_set.filter(donation_date__year=current_year).aggregate(Sum('amount'))['amount__sum']
        return float(total) if total is not None else 0.0

class DonationsSerializer(serializers.ModelSerializer):
    member_detail = MembersSerializer(source='member', read_only=True)
    class Meta:
        model = Donations
        fields = '__all__'
