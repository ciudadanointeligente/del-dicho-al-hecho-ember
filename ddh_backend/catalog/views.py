from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .utils import createRecords, saveCSV, getStudies, getStudyById, getPriorityById
from django.contrib import messages
import csv
import json
import pandas as pd
from django.core.files.base import ContentFile
from django.http import HttpResponse, JsonResponse
from graphql import parse
from ddh_backend.schema import schema

@login_required
def bulk(request):
    studies = getStudies()
    if request.method == 'POST':
        if request.POST['select'] == 'csv':
            selectedStudy = getStudyById(request.POST['selectedStudy'])
            context = {'selected': 'csv', 'studies': studies}
            try:
                csvfile = request.FILES['csvFile']
                csv_string = csvfile.read().decode('utf-8')
                csvfile_obj = ContentFile(csv_string)
                df = pd.read_csv(csvfile_obj)
                json_string = df.to_json(orient='records')
                jsonData = json.loads(json_string)
                dataParsed = saveCSV(jsonData, selectedStudy)

                messages.success(request, 'Data uploaded successfully!')
                return render(request, "bulk.html", context)

            except Exception as e:
                messages.error(request, f'Error processing CSV: {e}')
                return render(request, "bulk.html", context)
        else:
            result = createRecords(request)
            if result.get('error'):
                context = {'selected': result.get('typeCatalog'), 'studies': studies}
                messages.error(request, result.get('error'))
                return render(request, "bulk.html", context)
            else:
                messages.success(request, result.get('response'))
                return redirect('/admin/catalog/' + result.get('typeCatalog') + '/')
        
    else:
        context = {'studies': studies}
        return render(request, "bulk.html", context)

def getGovernments(request):
    query_str = """
        query 
            { governments { id, name, startYear, endYear, color1, color2, color3, color4, extraInfo, 
                studySet { id, name, version, type, year, img, color, filename, 
                description, title, fixedResult, visible, inLanding, inLanding2 }
            }, phases { id, name, fullfilment }
        }
    """
    try:
        result = schema.execute(query_str)
        data = result.data
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse(data)

def getAttributes(dictionary):
    excludeKeys = ['id', 'promiseSet', 'justificationSet', 'area', 'bill', 'phase']
    attributes = {}
    for k, v in dictionary.items():
        if not k in excludeKeys:
            key = k
            if key == "coherenceLevel":
                key = "coherence_level"
            elif key == "jaWhy":
                key = "ja-why"
            elif key == "jcWhy":
                key = "jc-why"
            elif key == "justificationSummary":
                key = "justification"
            attributes[key] = v
    return attributes

def entityExist(current, id, type):
    for entity in current['data']:
        if 'id' in entity and entity['id'] == id and 'type' in entity and entity['type'] == type :
            return True
    return False

def getStudiesById(request, study_id):
    query_str = """
        query 
            { studyById(studyId: "%s") { id, name,
                promiseSet { id, content, number, title, jaWhy, jcWhy, coherenceLevel,
                    area { id, name }
                    justificationSet { id, justification,
                        bill {id, name, priority, title, url, justificationSummary, chekIsEmpty,
                            phase {
                                id
                            }
                        }
                    }
                }
            }
        }
    """ % (study_id)
    try:
        result = schema.execute(query_str)
        data = result.data
        responseData = {
            'data': []
        }
        if data['studyById'].get('promiseSet'):
            studyId = data['studyById'].get('id')
            for promise in data['studyById'].get('promiseSet'):
                if not entityExist(responseData, promise.get('id'), 'promise'):
                    areaId = None
                    if promise.get('area') and promise.get('area').get('id'):
                        areaId = promise.get('area').get('id')
                        if not entityExist(responseData, areaId, 'area'):
                            responseData['data'].append({
                                "type": "area", "id": areaId, 
                                "attributes": getAttributes(promise.get('area')),
                            })
                    responseData['data'].append({ 
                        "type": "promise", "id": promise.get("id"), 
                        "attributes": getAttributes(promise),
                        "relationships": {
                            "study": {
                                "data": {
                                    "id": studyId,
                                    "type": "study"
                                }
                            },
                            "area": {
                                "data": {
                                    "id": areaId,
                                    "type": "area"
                                }
                            }
                        }
                    })
                if promise.get('justificationSet'):
                    for justification in promise.get('justificationSet'):
                        if not entityExist(responseData, justification.get('id'), 'justification'):
                            billId = None
                            if justification.get('bill') and justification.get('bill').get('id'):
                                if not entityExist(responseData, justification.get('bill').get('id'), 'bill'):
                                    phaseId = None
                                    if justification.get('bill').get('phase') and justification.get('bill').get('phase').get('id'):
                                        phaseId = justification.get('bill').get('phase').get('id')
                                        """ if not entityExist(responseData, phaseId, 'phase'):
                                            responseData['data'].append({
                                                "type": "phase", "id": phaseId, 
                                                "attributes": getAttributes(justification.get('bill').get('phase'))
                                            }) """
                                    priorityIds = []
                                    if justification.get('bill').get('priority'):
                                        jsonPriorities = []
                                        try:
                                            jsonPriorities = json.loads(justification.get('bill').get('priority'))
                                        except Exception as e:
                                            print('Error: ', e)
                                        for priority in jsonPriorities:
                                            if priority.get('id'):
                                                if not entityExist(responseData, priority.get('id'), 'priority'):
                                                    responseData['data'].append({
                                                        "type": "priority", "id": priority.get('id'), 
                                                        "attributes": getAttributes(priority)
                                                    })
                                                    priorityIds.append({"type": "priority", "id": priority.get('id')})
                                    billId = justification.get('bill').get('id')
                                    if phaseId:
                                        responseData['data'].append({
                                            "type": "bill", "id": billId, 
                                            "attributes":getAttributes(justification.get('bill')),
                                            "relationships": {
                                                "phase": {
                                                    "data": {
                                                        "id": phaseId,
                                                        "type": "phase"
                                                    }
                                                },
                                                "priorities": {
                                                    "data": priorityIds
                                                }
                                            }
                                        })
                                    else:
                                        responseData['data'].append({
                                            "type": "bill", "id": billId, 
                                            "attributes":getAttributes(justification.get('bill')),
                                            "relationships": {
                                                "priorities": {
                                                    "data": priorityIds
                                                }
                                            }
                                        })
                        responseData['data'].append({
                            "type": "justification", "id": justification.get('id'), 
                            "attributes": getAttributes(justification),
                            "relationships": {
                                "promise": {
                                    "data": {
                                        "id": promise.get('id'),
                                        "type": "promise"
                                    }
                                },
                                "bill": {
                                    "data": {
                                        "id": billId,
                                        "type": "bill"
                                    }
                                }
                            }
                        })
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse(responseData)