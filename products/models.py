from django.db import models

# Create your models here.

class Product(models.Model):
    product_name = models.CharField(max_length=255)
    product_image = models.ImageField(upload_to='product')
    product_price = models.IntegerField()
    likes = models.IntegerField(default=0, editable=False)
    product_type = models.CharField(max_length=255)
    posted_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return 'Nom du produit: {0}'.format(self.product_name)

class Product_imgs(models.Model):
    images = models.ImageField(upload_to='product/thumbmail')
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE)

    def __str__(self):
        return 'Nom du produit: {0}'.format(self.images)