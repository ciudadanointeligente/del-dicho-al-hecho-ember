from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .utils import createRecords
from django.contrib import messages

@login_required
def bulk(request):
    if request.method == 'POST':
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