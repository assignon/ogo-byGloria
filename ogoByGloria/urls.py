"""ogoByGloria URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.conf import settings
from django.urls import include, path
from django.conf.urls.static import static
from django.views.generic import TemplateView
from django.views import defaults as default_views
# from django.contrib.auth.views import logout
from .router import router
from django.contrib import admin

urlpatterns = [

    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('products/', include("products.urls", namespace="products"))

] + static(
    settings.MEDIA_URL, document_root=settings.MEDIA_ROOT
)