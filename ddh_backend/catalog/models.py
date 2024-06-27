from django.db import models

class Government(models.Model):
    name = models.CharField(max_length=255)
    start_year = models.IntegerField()
    end_year = models.IntegerField()
    color1 = models.CharField(max_length=7)
    color2 = models.CharField(max_length=7)
    color3 = models.CharField(max_length=7)
    color4 = models.CharField(max_length=7)

    def __str__(self):
        return self.name

class Study(models.Model):
    type = models.CharField(max_length=255)
    img = models.CharField(max_length=255)
    color = models.CharField(max_length=7)
    year = models.IntegerField()
    version = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    filename = models.CharField(max_length=255)
    description = models.TextField(null=False)
    title = models.CharField(max_length=255)
    fixed_result = models.IntegerField()
    visible = models.BooleanField()
    in_landing = models.BooleanField()
    government = models.ForeignKey(Government, on_delete=models.CASCADE)

    def __str__(self):
        return self.name