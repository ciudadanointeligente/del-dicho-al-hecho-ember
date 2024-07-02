from django.contrib import admin

from .models import *

class GovernmentAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')

admin.site.register(Government, GovernmentAdmin)
admin.site.register(Study)
admin.site.register(Area)
admin.site.register(Promise)
admin.site.register(Priority)
admin.site.register(Phase)
admin.site.register(Bill)
admin.site.register(Justification)