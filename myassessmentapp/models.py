from django.db import models
# NS

def upload_to(instance, filename):
    return f'/filelocation/{instance.owner.username}/{filename}'

class UploadFile(models.Model):
    title = models.CharField(max_length=255)
    file = models.FileField(upload_to=upload_to)

    def __str__(self):
        return self.file.title