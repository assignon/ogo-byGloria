from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate, get_user_model
from django.conf import settings
# from django.contrib.auth.views import logout
from django.utils.translation import ugettext as _
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from django.core import serializers
from django.db.models import Q
import json
# from django.contrib.auth.hashers import make_password
################################## DRF IMPORTS #######################################
from rest_framework import viewsets, permissions
from rest_framework.decorators import api_view, action, permission_classes
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK
)

from .serializers import Cart_serializer
from cart.models import Cart
from products.models import Product

# Create your views here.


class Cart_view(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = Cart_serializer

    @csrf_exempt
    @action(methods=['get'], detail=False)
    def add_to_cart(self, request):
        product_id = request.query_params.get('productId')
        quantity = request.query_params.get('quantity')
        userid = request.query_params.get("userid")
        product_data = Product.objects.get(id=product_id)
        cart_filter = Cart.objects.filter(Q(user_id=str(userid)) & Q(product_id=product_id))
        if cart_filter.count() == 0:
            Cart.objects.create(
                name=product_data.product_name,
                image=product_data.product_image,
                price=product_data.product_price,
                quantity=quantity,
                product_id=product_id,
                user_id=userid
            )
            return Response({'msg': '{0} succesfully added to cart'.format(product_data.product_name), 'exist': False})
        else:
            prduct_quantity = Cart.objects.get(product_id=product_id, user_id=str(userid)).quantity
            cart_filter.update(quantity=prduct_quantity+1)
            return Response({'msg': 'Product quantity updated', 'exist': True})

    @csrf_exempt
    @action(methods=['get'], detail=False)
    def update_cart(self, request):
        return Response('cart updated')

    @csrf_exempt
    @action(methods=['get'], detail=False)
    def remove_to_cart(self, request):
        pass

    @csrf_exempt
    @action(methods=['get'], detail=False)
    def cart_content(self, request):
        user_id = request.query_params.get('shoppingSession')
        user_cart = Cart.objects.filter(user_id=user_id)
        data = serializers.serialize("json", user_cart)
        return Response(json.loads(data))

    @csrf_exempt
    @action(methods=['get'], detail=False)
    def cart_count(self, request):
        user_id = request.query_params.get('shoppingSession')
        current_user_products = Cart.objects.filter(user_id=user_id).count()
        return Response(current_user_products)
