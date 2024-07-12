from django.http import HttpResponse
from graphql import parse
from ddh_backend.schema import schema

def execute_graphql_query(request):
    query_str = 'query {governments {name,studySet {id,name,},}}'
    result = schema.execute(query_str)
    return HttpResponse(result)