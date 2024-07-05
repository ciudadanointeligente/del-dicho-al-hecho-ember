from django.contrib import admin

from .models import *

class AreaAdmin(admin.ModelAdmin):
    list_display = ('id', 'get_name')

    def get_name(self, obj):
        if obj.name is None:
            return 'None'
        else:
            return obj.name

    get_name.short_description = 'name'

class GovernmentAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')

class JustificationAdmin(admin.ModelAdmin):
    list_display = ('id', 'promise')

admin.site.register(Government, GovernmentAdmin)
admin.site.register(Study)
admin.site.register(Area, AreaAdmin)
admin.site.register(Promise)
admin.site.register(Priority)
admin.site.register(Phase)
admin.site.register(Bill)
admin.site.register(Justification, JustificationAdmin)