from django.db import models

# Create your models here.
class Cart(models.Model):
    name = models.CharField(max_length=255)
    image = models.ImageField(upload_to='product')
    price = models.IntegerField()
    quantity = models.IntegerField()
    product_id = models.IntegerField()
    user_id = models.CharField(max_length=255) #can contain a generated id if the user in not signed, is stored as str in db but parsed with int()
    posted_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
