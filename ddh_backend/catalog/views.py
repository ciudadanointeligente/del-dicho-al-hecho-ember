from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .utils import createRecords
from django.contrib import messages
import csv
import pandas as pd
from django.core.files.base import ContentFile

@login_required
def bulk(request):
    if request.method == 'POST':
        if request.POST['select'] == 'csv':
            context = {'selected': 'csv'}
            try:
                csvfile = request.FILES['csvFile']
                csv_string = csvfile.read().decode('utf-8')
                csvfile_obj = ContentFile(csv_string)
                df = pd.read_csv(csvfile_obj)
                json_string = df.to_json(orient='records')

                messages.success(request, 'Data uploaded successfully!')
                return render(request, "bulk.html", context)

            except Exception as e:
                messages.error(request, f'Error processing CSV: {e}')
                return render(request, "bulk.html", context)
        else:
            result = createRecords(request)
            if result.get('error'):
                context = {'selected': result.get('typeCatalog')}
                messages.error(request, result.get('error'))
                return render(request, "bulk.html", context)
            else:
                messages.success(request, result.get('response'))
                return redirect('/admin/catalog/' + result.get('typeCatalog') + '/')
        
    else:
        return render(request, "bulk.html")