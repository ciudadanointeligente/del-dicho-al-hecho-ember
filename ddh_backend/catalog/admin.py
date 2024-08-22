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

class BillAdmin(admin.ModelAdmin):
    list_display = ('id', 'get_name')

    def get_name(self, obj):
        print('entro->')
        if obj.name is None:
            return 'None'
        else:
            return obj.name

    get_name.short_description = 'name'

class GovernmentAdmin(admin.ModelAdmin):
    list_display = ('id', 'get_name')

    def get_name(self, obj):
        if obj.name is None:
            return 'None'
        else:
            return obj.name

    get_name.short_description = 'name'

class JustificationAdmin(admin.ModelAdmin):
    list_display = ('id', 'get_promise')

    def get_promise(self, obj):
        if obj.promise is None:
            return 'None'
        else:
            if obj.promise.title is None:
                return 'None'
            else:
                return obj.promise.title

    get_promise.short_description = 'promise'

class PromiseAdmin(admin.ModelAdmin):
    list_display = ('id', 'get_title')

    def get_title(self, obj):
        if obj.title is None:
            return 'None'
        else:
            return obj.title

    get_title.short_description = 'title'

admin.site.register(Government, GovernmentAdmin)
admin.site.register(Study)
admin.site.register(Area, AreaAdmin)
admin.site.register(Promise, PromiseAdmin)
admin.site.register(Priority)
admin.site.register(Phase)
admin.site.register(Bill, BillAdmin)
admin.site.register(Justification, JustificationAdmin)