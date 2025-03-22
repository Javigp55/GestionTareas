from django.shortcuts import render
from rest_framework import viewsets
from .serializer import TaskSerializer
from .models import task
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

# Create your views here.

class TaskView(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = task.objects.all()

@api_view(["PATCH"])
def actualizar_done(request, id):
    try:
        tarea = task.objects.get(id=id)
    except task.DoesNotExist:
        return Response({"error": "Tarea no encontrada"}, status=status.HTTP_400_BAD_REQUEST)
    conteo = task.objects.filter(done=True).count()
    if conteo < 3 or tarea.done == True:
        tarea.done = not tarea.done
        tarea.save()
    else:
        return Response({"error":"No puedes tener mas de 3 fijados."})
    

    if tarea.done == True:
        return Response({"id": 0 ,"mensaje": "Tarea fijada"})
    else:
        return Response({"id": 1 , "mensaje": "Tarea desfijada"})