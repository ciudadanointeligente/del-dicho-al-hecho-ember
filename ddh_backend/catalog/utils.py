from django.shortcuts import render, redirect
from django.contrib import messages
from django.db.models import Count
from .models import Government, Study, Phase
import json
import re

mapKeys = {
    'government': {
        'keys': {
            "name": str,
            "start_year": int,
            "end_year": int,
            "extra_info": str,
            "color1": str,
            "color2": str,
            "color3": str,
            "color4": str
        },
        'model': Government
    },
    'study': {
        'keys': {
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
            "in_landing_2": bool,
            "government": int
        },
        'model': Study
    },
    'phase': {
        'keys': {
            "name": str,
            "fullfilment": int
        },
        'model': Phase
    }
}

def createRecords(request):
    typeCatalog = request.POST['select']
    error = None
    response = 'Success'
    validKeys = mapKeys.get(typeCatalog).get('keys')
    elementList = []
    try:
        updatedText = re.sub(r"^\s+", "", request.POST['jsonData'], flags=re.MULTILINE)
        elementList = json.loads(updatedText)
    except:
        error = 'Error parsing JSON'
        response = None
        return {'typeCatalog': typeCatalog, 'response': response, 'error': error}
    if type(elementList) == list:
        if findDuplicate(mapKeys.get(typeCatalog).get('model'), elementList):
            error = 'Duplicated name in JSON'
            response = None
        else:
            for elementItem in elementList:
                for key in validKeys.keys():
                    if elementItem.get(key) == None or not type(elementItem.get(key)) == validKeys.get(key):
                        error = 'Invalid JSON'
                        response = None
    else:
        error = 'Invalid JSON'
        response = None
    if not error:
        for elementItem in elementList:
            if typeCatalog == 'phase':
                newRecord = mapKeys.get(typeCatalog).get('model')(
                    name=elementItem.get('name'), 
                    fullfilment=elementItem.get('fullfilment')
                )
            elif typeCatalog == 'government':
                newRecord = mapKeys.get(typeCatalog).get('model')(
                    name=elementItem.get('name'),
                    start_year=elementItem.get('start_year'),
                    end_year=elementItem.get('end_year'),
                    extra_info=elementItem.get('extra_info'),
                    color1=elementItem.get('color1'),
                    color2=elementItem.get('color2'),
                    color3=elementItem.get('color3'),
                    color4=elementItem.get('color4')
                )
            elif typeCatalog == 'study':
                newRecord = mapKeys.get(typeCatalog).get('model')(
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
                    in_landing_2=elementItem.get('in_landing_2'),
                    government=getGovernment(elementItem.get('government'))
                )
            newRecord.save()   
    return {'typeCatalog': typeCatalog, 'response': response, 'error': error}
    
def findDuplicate(model, elementList):
    isDuplicated = model.objects.filter(name__in=[element['name'] for element in elementList]).values('name').annotate(count=Count('name')).filter(count__gt=0).exists()
    return isDuplicated

def getGovernment(id):
    return Government.objects.get(pk=id)