from django.shortcuts import render
from django.contrib.auth.decorators import login_required

@login_required
def bulk(request):
    return render(request, "bulk.html")