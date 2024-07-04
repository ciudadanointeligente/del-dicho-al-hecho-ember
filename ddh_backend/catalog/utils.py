from django.shortcuts import render, redirect
from django.contrib import messages
from django.db.models import Count
from .models import Government, Study, Phase, Priority
import json
import re
from .matcher import getMatcher
import random
import string

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

def parseAttributes(data_csv, study):
    config = getMatcher()
    keys_that_can_be_empty = ['justification']
    columnName = 'nombre_avance'
    data = []
    keys = config.keys()
    for key in keys:
        if config[key].get('chekIsEmpty'):
            if not data_csv.get(config[key].get('chekIsEmpty')):
                continue

        obj = {
            'type': key,
            'id': None,
            'attributes': {}
        };
        for subKey in config.get(key).keys():
            value = config.get(key).get(subKey)
            if subKey not in ("id", "relationships"):
                obj['attributes'][subKey] = data_csv.get(value)
            elif subKey == 'id':
                id_from_csv = data_csv[value.get('fieldToGetIdFrom')];
                if id_from_csv == None or key in keys_that_can_be_empty:
                    id_from_csv = "".join(random.choices(string.digits, k=5))
                if key in ("promise", "bill") and study is not None:
                    if not len(data_csv.get(value.get('fieldToGetIdFrom').strip())):
                        continue
                    id = hash(f"{id_from_csv}{study.get('government').get('name')}{study.get('version')}{study.get('year')}")
                    obj["id"] = id;
                else:
                    if isinstance(id_from_csv, str):
                        id_from_csv = id_from_csv.strip().lower().replace("-", "")
                    try:
                        obj["id"] = int(id_from_csv)
                    except ValueError:
                        if key in keys_that_can_be_empty:
                            obj["id"] = "".join(random.choices(string.digits, k=5))
                        else:
                            obj["id"] = hash(id_from_csv)
            elif subKey == "relationships":
                if "relationships" not in obj.keys():
                    obj.setdefault("relationships", {})
                if study is not None and key == "promise":
                    obj["relationships"]["study"] = {"data": {"id": study.get("id"), "type": "study"}}
                for relationship_model in value:
                    if relationship_model == "phase":
                        if data_csv.get(columnName):
                            obj["relationships"]["phase"] = {"data": {"id": hash(data_csv.get(columnName)), "type": relationship_model}}
                    elif relationship_model == "priority":
                        priorities = []
                        PriorityData = Priority.objects.all()
                        for priority_config in PriorityData:
                            if obj.get("id"):
                                priority_id = hash(f"{obj['id']}{priority_config['name']}")
                                count = int(data_csv.get(priority_config["countColumnName"], 0))
                                priority = {
                                    "type": "priority",
                                    "id": priority_id,
                                    "attributes": {"name": priority_config["name"], "count": count},
                                }
                                data.append(priority)
                                priorities.append({"id": priority_id, "type": "priority"})
                        obj["relationships"]["priorities"] = {"data": priorities}
                    else:
                        existing_object = next(
                            (o for o in data if o["type"] == relationship_model), None
                        )
                        if existing_object:
                            obj["relationships"][relationship_model] = {
                                "data": {"id": existing_object["id"], "type": relationship_model}
                            }
                        else:
                            obj["id"] = None
        if obj.get("id"):
            data.add(obj);
    return data