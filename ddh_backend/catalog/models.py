from django.db import models
from django.shortcuts import render, redirect

class Government(models.Model):
    name = models.CharField(max_length=255, null=True)
    start_year = models.IntegerField(null=True)
    end_year = models.IntegerField(null=True)
    extra_info = models.TextField(null=True)
    color1 = models.CharField(max_length=7, null=True)
    color2 = models.CharField(max_length=7, null=True)
    color3 = models.CharField(max_length=7, null=True)
    color4 = models.CharField(max_length=7, null=True)

    def __str__(self):
        return self.name

class Study(models.Model):
    type = models.CharField(max_length=255, null=True)
    img = models.CharField(max_length=255, null=True)
    color = models.CharField(max_length=7, null=True)
    year = models.IntegerField(null=True)
    version = models.CharField(max_length=255, null=True)
    name = models.CharField(max_length=255, null=True)
    filename = models.CharField(max_length=255, null=True)
    description = models.TextField(null=True)
    title = models.CharField(max_length=255, null=True)
    fixed_result = models.IntegerField(null=True)
    visible = models.BooleanField(null=True)
    in_landing = models.BooleanField(default=True)
    in_landing_2 = models.BooleanField(default=True)
    government = models.ForeignKey(Government, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
    
class Area(models.Model):
    name = models.CharField(max_length=255, null=True)

class Promise(models.Model):
    content = models.TextField(null=True)
    number = models.IntegerField(null=True)
    title = models.CharField(max_length=255, null=True)
    ja_why = models.CharField(max_length=255, null=True)
    jc_why = models.CharField(max_length=255, null=True)
    coherence_level = models.CharField(max_length=255, null=True)
    study = models.ForeignKey(Study, on_delete=models.CASCADE)
    area = models.ForeignKey(Area, on_delete=models.CASCADE)

    def __str__(self):
        return self.title
    
class Priority(models.Model):
    name = models.CharField(max_length=255, null=True)
    countColumnName = models.CharField(max_length=255, null=True)

    def __str__(self):
        return self.name
    
class Phase(models.Model):
    name = models.CharField(max_length=255, null=True)
    fullfilment = models.IntegerField(null=True)

    def __str__(self):
        return self.name
    
class Bill(models.Model):
    name = models.CharField(max_length=255, null=True)
    title = models.TextField(null=True)
    url = models.CharField(max_length=255, null=True)
    chekIsEmpty = models.CharField(max_length=255, null=True)
    phase = models.ForeignKey(Phase, on_delete=models.CASCADE, null=True)
    priority = models.JSONField(null=True)
    justification_summary = models.CharField(max_length=255, null=True)

    def __str__(self):
        return self.name
    
class Justification(models.Model):
    justification = models.CharField(max_length=255, null=True)
    promise = models.ForeignKey(Promise, on_delete=models.CASCADE)
    bill = models.ForeignKey(Bill, on_delete=models.CASCADE)