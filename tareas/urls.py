from django.urls import path, include
from rest_framework import routers
from tareas import views
from .views import actualizar_done

router = routers.DefaultRouter()
router.register('task', views.TaskView, 'tasks')

urlpatterns = [
    path("api/", include(router.urls)),
    path("api/<int:id>/fijar/", actualizar_done, name="actualizar_done")
]