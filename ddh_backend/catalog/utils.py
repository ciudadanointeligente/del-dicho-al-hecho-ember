from django.shortcuts import render, redirect
from django.contrib import messages
from django.db.models import Count
from models import Government
import json
import re

mapKeys = {
    'phase': {
        "name": str,
        "fullfilment": int
    },
    'government': {
        "name": str,
        "start_year": int,
        "end_year": int,
        "color1": str,
        "color2": str,
        "color3": str,
        "color4": str
    },
    'study': {
        "type": str,
        "img": str,
        "color": str,
        "year" : int,
        "version": str,
        "name": str,
        "filename": str,
        "description": str,
        "title": str,
        "fixed_result": int,
        "visible": bool,
        "in_landing": bool,
        "government": int
    }
}

def createRecords(request, model, typeCatalog):
    response = 'Success'
    error = None
    validKeys = mapKeys.get(typeCatalog)
    elementList = []
    try:
        updatedText = re.sub(r"^\s+", "", request.POST['jsonData'], flags=re.MULTILINE)
        elementList = json.loads(updatedText)
    except:
        error = 'Error parsing JSON'
        response = None
        context = {'selected': typeCatalog}
        messages.error(request, error)
        return render(request, "bulk.html", context)
    if type(elementList) == list:
        if findDuplicate(model, elementList):
            error = 'Duplicated name in'
            response = None
        else:
            for elementItem in elementList:
                for key in validKeys.keys():
                    if not elementItem.get(key) or not type(elementItem.get(key)) == validKeys.get(key):
                        error = 'Invalid phase JSON'
                        response = None
    else:
        error = 'Invalid phase JSON'
        response = None
    if not error:
        for elementItem in elementList:
            if typeCatalog == 'phase':
                newRecord = model(
                    name=elementItem.get('name'), 
                    fullfilment=elementItem.get('fullfilment')
                )
            elif typeCatalog == 'government':
                newRecord = model(
                    name=elementItem.get('name')
                    start_year=elementItem.get('start_year'),
                    end_year=elementItem.get('end_year'),
                    color1=elementItem.get('color1'),
                    color2=elementItem.get('color2'),
                    color3=elementItem.get('color3'),
                    color4=elementItem.get('color4')
                )
            elif typeCatalog == 'study':
                newRecord = model(
                    type=elementItem.get('type'),
                    img=elementItem.get('img'),
                    color=elementItem.get('color'),
                    year=elementItem.get('year'),
                    version=elementItem.get('version'),
                    name=elementItem.get('name'),
                    filename=elementItem.get('filename'),
                    description=elementItem.get('description'),
                    title=elementItem.get('title'),
                    fixed_result=elementItem.get('fixed_result'),
                    visible=elementItem.get('visible'),
                    in_landing=elementItem.get('in_landing'),
                    government=getGovernment(elementItem.get('government'))
                )
            newRecord.save()   
    if error:
        context = {'selected': typeCatalog}
        messages.error(request, error)
        return render(request, "bulk.html", context)
    else:
        messages.success(request, response)
        return redirect('/admin/catalog/' + typeCatalog + '/')
    
def findDuplicate(model, elementList):
    isDuplicated = model.objects.filter(name__in=[element['name'] for element in elementList]).values('name').annotate(count=Count('name')).filter(count__gt=0).exists()
    return isDuplicated

def getGovernment(id):
    return Government.objects.get(pk=id)