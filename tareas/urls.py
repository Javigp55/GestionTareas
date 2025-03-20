from django.urls import path, include
from rest_framework import routers
from tareas import views

router = routers.DefaultRouter()
router.register('task', views.TaskView, 'tasks')

urlpatterns = [
    path("api/", include(router.urls))


]