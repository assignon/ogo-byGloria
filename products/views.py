from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.models import User
# from django.contrib.auth import login, authenticate, get_user_model
from django.conf import settings
# from django.contrib.auth.views import logout
# from django.contrib import messages
# from django.contrib.auth.decorators import login_required
# from django.urls import reverse
# from django.utils.translation import ugettext as _
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

from .serializers import Product_serializer
from products.models import Product, Product_imgs, Like, Comment
# Create your views here.

class Product_view(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = Product_serializer

    @csrf_exempt
    @action(methods=['get'], detail=False)
    def all_products(self, request):
        # products = self.get_queryset().all()
        # serializer = self.get_serializer_class()(products)
        # return Response(serializer.data)
        product_arr = []
        # products = Product.objects.all()
        data = serializers.serialize("json", Product.objects.all(), fields=('id', 'product_name', 'product_image', 'product_price', 'likes', 'posted_on'))
        # for product in products:
        #     data = {
        #         'product_name': product.product_name,
        #         'prouct_image': product.product_image,
        #         'product_price': product.product_price,
        #         'likes': product.likes,
        #         'posted_on': product.posted_on
        #     },
        #     product_arr.append(data)
        # for product in products:
        #     product_arr.append(product)
        return Response(json.loads(data))

    @csrf_exempt
    @action(methods=['get'], detail=False)
    def bags(self, request):
        all_bags = Product.objects.filter(product_type="bag")
        data = serializers.serialize("json", all_bags, fields=('id', 'product_name', 'product_image', 'product_price', 'likes', 'posted_on'))
        return Response(json.loads(data))

    @csrf_exempt
    @action(methods=['get'], detail=False)
    def accessories(self, request):
        all_accessories = Product.objects.filter(product_type="earring")
        data = serializers.serialize("json", all_accessories, fields=('id', 'product_name', 'product_image', 'product_price', 'likes', 'posted_on'))
        return Response(json.loads(data))

    @csrf_exempt
    @action(methods=['get'], detail=False)
    def product_description(self, request):
        product_id = request.query_params.get('productId')
        product_desc = self.get_queryset().get(id=product_id)
        serializer = self.get_serializer_class()(product_desc)
        return Response(serializer.data)

    @csrf_exempt
    @action(methods=['get'], detail=False)
    def product_thumbmail(self, request):
        product_id = request.query_params.get('productId')
        thumbmails = Product_imgs.objects.filter(product_id=product_id)
        data = serializers.serialize('json', thumbmails)
        return Response(json.loads(data))

    @csrf_exempt
    @action(methods=['get'], detail=False)
    def related_product(self, request):
        product_id = request.query_params.get('productId')
        product_type = Product.objects.get(pk=product_id).product_type
        relatedproduct = Product.objects.exclude(pk=product_id).filter(product_type=product_type)
        data = serializers.serialize('json', relatedproduct, fields=('id', 'product_name', 'product_image', 'product_price', 'likes', 'posted_on'))
        return Response(json.loads(data))

    @csrf_exempt
    @action(methods=['get'], detail=False)
    def add_likes(self, request):
        product_id = request.query_params.get('productId')
        user_id = request.query_params.get('userId')
        liked = Like.objects.filter(Q(user_id=user_id) & Q(product_id=product_id))
        if liked.count() == 0:
            # Like.add_like(user_id, product_id)
            Like.objects.get_or_create(user_id=user_id, product_id_id=product_id)
            get_prod_like = Product.objects.get(id=product_id).likes
            Product.objects.filter(id=product_id).update(likes=get_prod_like+1)
            data = {'liked': False, 'likes': Product.objects.get(id=product_id).likes}
        else:
            data = {'liked': True, 'likes': 'Vous avez deja liker ce produit.'}
        return Response(data)

    @csrf_exempt
    @action(methods=['get'], detail=False)
    def get_likes(self, request):
        product_id = request.query_params.get('productId')
        get_prod_like = Product.objects.get(id=product_id).likes
        return Response(get_prod_like)

    @csrf_exempt
    @action(methods=['post'], detail=False)
    # @permission_classes((AllowAny,))
    def add_comment(self, request):
        product_id = request.data['params']['productId']
        user_id = request.data['params']['userId']
        comment = request.data['params']['comment']
        post_comment = Comment.add(self, user_id, comment, product_id)
        return Response(post_comment)

    @csrf_exempt
    @action(methods=['get'], detail=False)
    def get_comment(self, request):
        product_id = request.query_params.get('productId')
        comment = Comment.get(self, product_id)
        data = serializers.serialize('json', comment)
        return Response(json.loads(data))