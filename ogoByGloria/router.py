from rest_framework import routers
from products.views import Product_view


router = routers.DefaultRouter()
router.register('product', Product_view, base_name='productdata')