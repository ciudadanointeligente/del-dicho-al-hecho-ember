from django.contrib import admin
from django.urls import include, path
from graphene_django.views import GraphQLView
from django.views.decorators.csrf import csrf_exempt
from catalog import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('bulk/', views.bulk),
    path('get_governments/', views.getGovernments),
    path('get_study_by_id/<int:study_id>/', views.getStudiesById),
    path('graphql/', csrf_exempt(GraphQLView.as_view(graphiql=True))),
]
