from rest_framework import serializers
from .models import task

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = task
        #fields = ('id', 'title', 'description', 'done')
        fields = '__all__'
    
    def validate_done(self, value):
        if value:  
            tareas_fijadas = task.objects.filter(done=True).exclude(pk=self.instance.pk).count()
            if tareas_fijadas >= 3:
             raise serializers.ValidationError("Solo puedes tener 3 tareas fijadas.")
        return value