from django.db import models
from django.http import HttpResponse
from django.shortcuts import render
import json
import re

class Government(models.Model):
    name = models.CharField(max_length=255)
    start_year = models.IntegerField()
    end_year = models.IntegerField()
    color1 = models.CharField(max_length=7)
    color2 = models.CharField(max_length=7)
    color3 = models.CharField(max_length=7)
    color4 = models.CharField(max_length=7)

    def __str__(self):
        return self.name

class Study(models.Model):
    type = models.CharField(max_length=255)
    img = models.CharField(max_length=255)
    color = models.CharField(max_length=7)
    year = models.IntegerField()
    version = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    filename = models.CharField(max_length=255)
    description = models.TextField(null=False)
    title = models.CharField(max_length=255)
    fixed_result = models.IntegerField()
    visible = models.BooleanField()
    in_landing = models.BooleanField()
    government = models.ForeignKey(Government, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
    
class Area(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Promise(models.Model):
    content = models.CharField(max_length=255)
    number = models.IntegerField()
    title = models.CharField(max_length=255)
    ja_why = models.CharField(max_length=255)
    study = models.ForeignKey(Study, on_delete=models.CASCADE)
    area = models.ForeignKey(Area, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
    
class Priority(models.Model):
    name = models.CharField(max_length=255)
    count = models.IntegerField()

    def __str__(self):
        return self.name
    
class Phase(models.Model):
    name = models.CharField(max_length=255)
    fullfilment = models.IntegerField()

    def __str__(self):
        return self.name
    
    def saveBulk(request):
        if request.method =='POST':
            response = 'Success'
            validKeys = {
                "name": str,
                "fullfilment": int
            }
            phaseList = []
            try:
                updatedText = re.sub(r"^\s+", "", request.POST['jsonData'], flags=re.MULTILINE)
                phaseList = json.loads(updatedText)
            except:
                error = 'Error parsing JSON'
                response = None
                context = {'response': response, 'selected': 'phase', 'error': error}
                return render(request, "bulk.html", context)
            if type(phaseList) == list:
                for phaseItem in phaseList:
                    for key in validKeys.keys():
                        if not phaseItem.get(key) or not type(phaseItem.get(key)) == validKeys.get(key):
                            error = 'Invalid phase JSON'
                            response = None
            else:
                error = 'Invalid phase JSON'
                response = None
        else:
            response = None
        context = {'response': response, 'selected': 'phase', 'error': None}
        return render(request, "bulk.html", context)
    
class Bill(models.Model):
    name = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    url = models.CharField(max_length=255)
    chekIsEmpty = models.CharField(max_length=255)
    phase = models.ForeignKey(Phase, on_delete=models.CASCADE)
    priority = models.ForeignKey(Priority, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
    
class Justification(models.Model):
    promise = models.ForeignKey(Promise, on_delete=models.CASCADE)
    bill = models.ForeignKey(Bill, on_delete=models.CASCADE)