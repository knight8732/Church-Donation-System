from django.shortcuts import render
from rest_framework import viewsets, permissions
from .serializers import *
from .models import *
from rest_framework.response import Response
from django.db.models import Sum, Count
from rest_framework.decorators import action
from django.utils import timezone  

# Create your views here.
class ChurchesViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]  
    queryset = Churches.objects.all()
    serializer_class = ChurchesSerializer

    def list(self, request):
        queryset = Churches.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)
    
    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

    def retrieve(self, request, pk=None):
            queryset = self.queryset.get(pk=pk)
            serializer = self.serializer_class(queryset)
            return Response(serializer.data)
    
    def update(self, request, pk=None):
        queryset = self.queryset.get(pk=pk)
        serializer = self.serializer_class(queryset, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    
class MembersViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]  
    queryset = Members.objects.all()
    serializer_class = MembersSerializer

    def list(self, request):
        queryset = Members.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)
    
    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

    def retrieve(self, request, pk=None):
        queryset = self.queryset.get(pk=pk)
        serializer = self.serializer_class(queryset)
        return Response(serializer.data)

    def update(self, request, pk=None):
        queryset = self.queryset.get(pk=pk)
        serializer = self.serializer_class(queryset, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

class DonationsViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]  
    queryset = Donations.objects.all()
    serializer_class = DonationsSerializer

    def list(self, request):
        queryset = Donations.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    def retrieve(self, request, pk=None):
            queryset = self.queryset.get(pk=pk)
            serializer = self.serializer_class(queryset)
            return Response(serializer.data)
    
    def update(self, request, pk=None):
        queryset = self.queryset.get(pk=pk)
        serializer = self.serializer_class(queryset, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

    @action(detail=False, methods=['get'], url_path='activity-breakdown')
    def activity_breakdown(self, request):
        current_year = timezone.now().year
        
        report = (
            Donations.objects
            .filter(donation_date__year=current_year) # ✅ Filters database rows before aggregation
            .values('activity')
            .annotate(
                total_amount=Sum('amount'),
                donation_count=Count('id')
            )
            .order_by('-total_amount')
        )
        
        data = [
            {
                "activity": item['activity'] if item['activity'] else "General Offering",
                "total_amount": float(item['total_amount']) if item['total_amount'] is not None else 0.0,
                "donation_count": item['donation_count']
            }
            for item in report
        ]
        
        return Response(data)
    