from rest_framework import serializers
from products.models import Product

class Product_serializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = ('id', 'product_name', 'product_image', 'product_price', 'likes', 'posted_on')

