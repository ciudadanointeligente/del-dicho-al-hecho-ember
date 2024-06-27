import graphene
from graphene_django import DjangoObjectType
from catalog.models import *;

class GovernmentType(DjangoObjectType):
    class Meta:
        model = Government

class StudyType(DjangoObjectType):
    class Meta:
        model = Study

class Query(graphene.ObjectType):
    governments = graphene.List(GovernmentType)
    Studies = graphene.List(StudyType)

    def resolve_governments(root, info):
        return Government.objects.all()

    def resolve_Studies(root, info):
        return Study.objects.all()

schema = graphene.Schema(query=Query)