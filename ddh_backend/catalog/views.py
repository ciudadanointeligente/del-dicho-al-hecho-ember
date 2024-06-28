from django.http import HttpResponse
from django.template import loader
from django.contrib.auth.decorators import login_required

@login_required
def bulk(request):
    template = loader.get_template('bulk.html')
    return HttpResponse(template.render())