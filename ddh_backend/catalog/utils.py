from django.shortcuts import render, redirect
from django.contrib import messages
from django.db.models import Count
from .models import *
import json
import re
from .matcher import getMatcher
import random
import string
from django.db import transaction

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
            "government": str
        },
        'model': Study
    },
    'phase': {
        'keys': {
            "name": str,
            "fullfilment": int
        },
        'model': Phase
    },
    'priority': {
        'keys': {
            "countColumnName": str,
            "name": str
        },
        'model': Priority
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
            elif typeCatalog == 'priority':
                newRecord = mapKeys.get(typeCatalog).get('model')(
                    countColumnName=elementItem.get('countColumnName'),
                    name=elementItem.get('name'),
                )
            newRecord.save()   
    return {'typeCatalog': typeCatalog, 'response': response, 'error': error}
    
def findDuplicate(model, elementList):
    isDuplicated = model.objects.filter(name__in=[element['name'] for element in elementList]).values('name').annotate(count=Count('name')).filter(count__gt=0).exists()
    return isDuplicated

def getGovernment(gName):
    return Government.objects.get(name=gName)

def getStudies():
    return Study.objects.all()

def getStudyById(studyId):
    return Study.objects.get(pk=studyId)

def firstLetterUppercase(text):
    if text:
        words = text.strip().split()
        newString = ' '.join(word.title() if len(word) > 2 else word for word in words)
        return newString
    else:
        return None

def saveArea(data):
    print('saveArea->')
    AreaName = firstLetterUppercase(data.get('attributes').get('name'))
    if AreaName:
        try:
            newArea = Area.objects.get(name=AreaName)
            print('Area exists->')
        except Area.DoesNotExist:
            try:
                newArea = Area(name=AreaName)
            except Exception as e:
                print('Error:', e)
                print('data->', data)
                return {'Error': e}
            newArea.save()
            print('Success->')
        return newArea
    return None;

def savePhase(phaseName):
    print('savePhase')
    phaseName = firstLetterUppercase(phaseName)
    try:
        newPhase = Phase.objects.get(name=phaseName)
        print('Phase exists->')
    except Area.DoesNotExist:
        try:
            newPhase = Phase(name=newPhase)
        except Exception as e:
            print('Error:', e)
            print('phaseName->', phaseName)
            return e
        newPhase.save()
    print('Success->')
    return newPhase
    

def savePromise(data, areaInstance):
    print('savePromise->')
    if areaInstance:
        try:
            newPromise = Promise(
                id = data.get('id'),
                content = data.get('attributes').get('content'),
                number = data.get('attributes').get('number'),
                title = data.get('attributes').get('title'),
                ja_why = data.get('attributes').get('ja_why'),
                jc_why = data.get('attributes').get('jc_why'),
                coherence_level = data.get('attributes').get('coherence_level'),
                study = Study.objects.get(pk=data.get('relationships').get('study').get('data').get('id')),
                area = areaInstance
            )
            newPromise.save()
            print('Success->')
            return newPromise
        except Exception as e:
            print('Error:', e)
            print('data->', data)
            return {'Error': e}
    print('Skiped->')
    return None

def saveBill(data):
    print('saveBill->')
    if data.get('relationships').get('phase'):
        phaseInstance = savePhase(data.get('relationships').get('phase').get('data').get('name'))
        if phaseInstance and type(phaseInstance) is dict and phaseInstance.get('Error'):
            return phaseInstance
    else:
        phaseInstance = None
    try:
        newBill = Bill(
            id = data.get('id'),
            name = data.get('attributes').get('name'),
            title = data.get('attributes').get('title'),
            url = data.get('attributes').get('url'),
            chekIsEmpty = data.get('attributes').get('chekIsEmpty'),
            justification_summary = data.get('attributes').get('justification'),
            phase = phaseInstance,
            priority = data.get('relationships').get('priorities').get('data')
        )
        newBill.save()
        print('Success->')
        return newBill
    except Exception as e:
        print('Error:', e)
        print('data->', data)
        return {'Error': e}

def saveJustification(data, promiseInstance, billInstance):
    print('saveJustification->')
    if promiseInstance and billInstance:
        try:
            newJustification = Justification(
                justification = data.get('attributes').get('justification'),
                promise = promiseInstance,
                bill = billInstance
            )
            print('Success->')
            newJustification.save()
            return
        except Exception as e:
            print('Error:', e)
            print('data->', data)
            return {'Error': e}
    print('Skiped->')
    return None

@transaction.atomic
def saveCSV(data_csv, study):
    parsedRecords = []
    for record in data_csv:
        parsedRecords.append(parseAttributes(record, study))
    try:
        for parsedRecord in parsedRecords:
            areaInstance = None
            promiseInstance = None
            billInstance = None
            for element in parsedRecord:
                if element.get('type') == 'area':
                    #areaInstance = saveArea(element)
                    print('saveArea->')
                    AreaName = firstLetterUppercase(element.get('attributes').get('name'))
                    if AreaName:
                        try:
                            newArea = Area.objects.get(name=AreaName)
                            areaInstance = newArea
                            print('Area exists->')
                        except Area.DoesNotExist:
                            newArea = Area(name=AreaName)
                            newArea.save()
                            areaInstance = newArea
                            print('Success->')
                    else:
                        print('Skiped->')
                        areaInstance = None
                elif element.get('type') == 'promise':
                    #promiseInstance = savePromise(element, areaInstance)
                    print('savePromise->')
                    if areaInstance:
                        newPromise = Promise(
                            id = element.get('id'),
                            content = element.get('attributes').get('content'),
                            number = element.get('attributes').get('number'),
                            title = element.get('attributes').get('title'),
                            ja_why = element.get('attributes').get('ja_why'),
                            jc_why = element.get('attributes').get('jc_why'),
                            coherence_level = element.get('attributes').get('coherence_level'),
                            study = Study.objects.get(pk=element.get('relationships').get('study').get('data').get('id')),
                            area = areaInstance
                        )
                        newPromise.save()
                        promiseInstance = newPromise
                        print('Success->')
                    else:
                        print('Skiped->')
                        promiseInstance = None
                elif element.get('type') == 'bill':
                    #billInstance = saveBill(element)
                    print('saveBill->')
                    phaseInstance = None
                    if element.get('relationships').get('phase'):
                        #phaseInstance = savePhase(data.get('relationships').get('phase').get('data').get('name'))
                        print('savePhase')
                        phaseName = firstLetterUppercase(element.get('relationships').get('phase').get('data').get('name'))
                        try:
                            newPhase = Phase.objects.get(name=phaseName)
                            phaseInstance = newPhase
                            print('Phase exists->')
                        except Area.DoesNotExist:
                            newPhase = Phase(name=newPhase)
                            newPhase.save()
                            phaseInstance = newPhase
                            print('Success->')
                    newBill = Bill(
                        id = element.get('id'),
                        name = element.get('attributes').get('name'),
                        title = element.get('attributes').get('title'),
                        url = element.get('attributes').get('url'),
                        chekIsEmpty = element.get('attributes').get('chekIsEmpty'),
                        justification_summary = element.get('attributes').get('justification'),
                        phase = phaseInstance,
                        priority = element.get('relationships').get('priorities').get('data')
                    )
                    newBill.save()
                    billInstance = newBill
                    print('Success->')
                elif element.get('type') == 'justification':
                    #justificationInstance = saveJustification(element, promiseInstance, billInstance)
                    print('saveJustification->')
                    if promiseInstance and billInstance:
                        newJustification = Justification(
                            id = element.get('id'),
                            justification = element.get('attributes').get('justification'),
                            promise = promiseInstance,
                            bill = billInstance
                        )
                        newJustification.save()
                        print('Success->')
                    else:
                        print('failed->', parsedRecord)
                else:
                    print('Invalid Type')
    except Exception as e:
            print('Error:', e)
            return {'Error': e}
    return ""

def parseAttributes(data_csv, study):
    config = getMatcher()
    keys_that_can_be_empty = ['justification']
    columnName = 'nombre_avance'
    data = []
    keys = config.keys()
    idsBill = []
    for key in keys:
        if config.get(key).get('chekIsEmpty'):
            if not data_csv.get(config.get(key).get('chekIsEmpty')):
                continue

        obj = {
            'type': key,
            'id': None,
            'attributes': {}
        };
        isBreak = False
        for subKey in config.get(key).keys():
            value = config.get(key).get(subKey)
            if subKey not in ("id", "relationships"):
                obj['attributes'][subKey] = data_csv.get(value)
            elif subKey == 'id':
                fieldToGetIdFrom = config.get(key).get(subKey).get('fieldToGetIdFrom')
                id_from_csv = data_csv.get(fieldToGetIdFrom);
                if study is not None and (key == 'promise' or key == 'bill'):
                    if id_from_csv is None or not str(id_from_csv).strip():
                        isBreak = True
                        continue
                    else:
                        obj["id"] = hash(str(id_from_csv) +  str(study.government.name) + str(study.version) + str(study.year));
                else:
                    if key not in keys_that_can_be_empty:
                        if id_from_csv is None or not str(id_from_csv).strip():
                            isBreak = True
                            continue
                    if not isBreak:
                        if id_from_csv is None or not str(id_from_csv).strip() or key in keys_that_can_be_empty:
                            existing_promise = next(
                                (o for o in data if o["type"] == 'promise'), None
                            )
                            existing_Bill = next(
                                (o for o in data if o["type"] == 'bill'), None
                            )
                            if existing_promise and existing_Bill:
                                obj["id"] = hash(str(existing_promise["id"]) + str(existing_Bill["id"]))
                            else:
                                obj["id"] = hash("".join(random.choices(string.digits, k=5)))
                        else:
                            obj["id"] = hash(str(id_from_csv))
            elif subKey == "relationships":
                if "relationships" not in obj.keys():
                    obj.setdefault("relationships", {})
                if study is not None and key == "promise":
                    obj["relationships"]["study"] = {"data": {"id": study.id, "type": "study"}}
                for relationship_model in value:
                    if relationship_model == "phase":
                        if data_csv.get(columnName):
                            obj["relationships"]["phase"] = {"data": {"name": data_csv.get(columnName), "type": relationship_model}}
                    elif relationship_model == "priority":
                        PriorityData = Priority.objects.all()
                        priorities = []
                        for priority_config in PriorityData:
                            if obj.get("id"):
                                priority_id = priority_config.id
                                priorityValue = data_csv.get(priority_config.countColumnName)
                                count = 0 if priorityValue is None else int(priorityValue)
                                priorities.append({"id": priority_id, "type": "priority", "name": priority_config.name, "count": count})
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
        if isBreak or obj["id"] is None:
            continue
        else:
            data.append(obj);
    return data

def getPriorityById(priorityId):
    return Priority.objects.get(pk=priorityId)