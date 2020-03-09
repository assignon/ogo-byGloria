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
        return self.product_name


class Product_imgs(models.Model):
    images = models.ImageField(upload_to='product/thumbmail')
    # @property
    # def image_name(self):
    #     name = str(self.images)
    #     return name
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.images)


class Like(models.Model):
    # user_id = models.IntegerField()
    try:
        user_id = models.IntegerField()
    except ValueError:
        pass
    else:
        user_id = models.CharField(max_length=255)
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE)
    # @property
    # def add_like(self, user_id, prod_id):
    #     product = Product()
    #     self.objects.get_or_create(user_id=user_id, product_id=prod_id)
    #     product.objects.filter(id=prod_id).update(likes=product.likes+1)

    def __str__(self):
        pass


class Comment(models.Model):
    try:
        user_id = models.IntegerField()
    except ValueError:
        pass
    else:
        user_id = models.CharField(max_length=255)
    comment = models.TextField()
    posted_on = models.DateTimeField(auto_now_add=True)
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE)