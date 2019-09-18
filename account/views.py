from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate, get_user_model
from django.conf import settings
# from django.contrib.auth.views import logout
from django.contrib.auth.decorators import login_required
from django.utils.translation import ugettext as _
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from django.core import serializers
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

# django session imports
from django.contrib.sessions.models import Session
from django.contrib.sessions.backends.db import SessionStore

from .serializers import Account_serializer

# Create your views here.

class Account_view(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = Account_serializer
    # permission_classes = (permissions.IsAuthenticated)

    @csrf_exempt
    @action(methods=['get'], detail=False)
    def auth_session(self, request):
        #return number of data in de session db
        session_db_count = Session.objects.all().count()
        session_store = SessionStore()
        session_db = Session.objects.filter(pk=session_store.session_key).count()

        if session_db == 0:
            session_store['auth'] = False
            session_store.create()
            auth_session = Session.objects.get(pk=session_store.session_key)
            return Response({'auth': auth_session.get_decoded()})
        else:
            return Response('session already exist')

        # if request.session.has_data(False):
        #     return Response('session already exist')
        # else:
        #     request.session['auth'] = False
        #     return Response({'auth': request.session['auth'], 'session': request.session})


    @csrf_exempt
    @action(methods=['get'], detail=False)
    def create_session(self, request):
        new_session = request.query_params.get('sessionKey')
        session_value = request.query_params.get('sessionValue')
        if not 'new_session' in request.session:
            request.session['new_session'] = session_value
        else:
            pass
        return Response({'newSession': request.session['new_session']})


    @csrf_exempt
    @action(methods=['get'], detail=False)
    def set_session(self, request):
        pass

    @csrf_exempt
    @action(methods=['get'], detail=False)
    def del_session(self, request):
        pass

