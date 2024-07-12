from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .utils import createRecords, saveCSV, getStudies, getStudyById
from django.contrib import messages
import csv
import json
import pandas as pd
from django.core.files.base import ContentFile
from django.http import HttpResponse
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
    query_str = 'query { governments { id, name, startYear, endYear, color1, color2, color3, color4, extraInfo, studySet { id, name } } }'
    result = schema.execute(query_str)
    return HttpResponse(result)