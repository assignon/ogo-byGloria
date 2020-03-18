from rest_framework import serializers
from cart.models import Cart
class Cart_serializer(serializers.ModelSerializer):

    class Meta:
        model = Cart
        fields = ('id', 'name', 'image', 'price', 'quantity', 'posted_on')
