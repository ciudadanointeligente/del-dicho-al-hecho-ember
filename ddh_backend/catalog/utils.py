from django.shortcuts import render, redirect
from django.contrib import messages
from django.db.models import Count
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

def createRecords(request, Model, typeCatalog):
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
        if findDuplicate(Model, elementList):
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
    ##if not error:
    ##    for elementItem in elementList:
    ##       newRecord = Model(name=elementItem.get('name'), fullfilment=elementItem.get('fullfilment'))
    ##        newRecord.save()   
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