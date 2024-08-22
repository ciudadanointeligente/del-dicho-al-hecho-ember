import graphene
from graphene_django import DjangoObjectType
from catalog.models import *;

class GovernmentType(DjangoObjectType):
    class Meta:
        model = Government

class StudyType(DjangoObjectType):
    class Meta:
        model = Study

class AreaType(DjangoObjectType):
    class Meta:
        model = Area

class PromiseType(DjangoObjectType):
    class Meta:
        model = Promise

class PriorityType(DjangoObjectType):
    class Meta:
        model = Priority

class PhaseType(DjangoObjectType):
    class Meta:
        model = Phase

class BillType(DjangoObjectType):
    class Meta:
        model = Bill

class JustificationType(DjangoObjectType):
    class Meta:
        model = Justification

class Query(graphene.ObjectType):
    governments = graphene.List(GovernmentType)
    studies = graphene.List(StudyType)
    study_by_id = graphene.Field(StudyType, studyId=graphene.String(required=True))
    areas = graphene.List(AreaType)
    promises = graphene.List(PromiseType)
    priorities = graphene.List(PriorityType)
    phases = graphene.List(PhaseType)
    bills = graphene.List(BillType)
    justifications = graphene.List(JustificationType)

    def resolve_governments(root, info):
        return Government.objects.all()

    def resolve_studies(root, info):
        return Study.objects.all()
    
    def resolve_study_by_id(root, info, studyId):
        try:
            return Study.objects.get(id=studyId)
        except Study.DoesNotExist:
            return None
    
    def resolve_areas(root, info):
        return Area.objects.all()
    
    def resolve_promises(root, info):
        return Promise.objects.all()
    
    def resolve_priorities(root, info):
        return Priority.objects.all()
    
    def resolve_phases(root, info):
        return Phase.objects.all()
    
    def resolve_bills(root, info):
        return Bill.objects.all()
    
    def resolve_justifications(root, info):
        return Justification.objects.all()

schema = graphene.Schema(query=Query)