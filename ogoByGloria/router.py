from rest_framework import routers
from products.views import Product_view
from cart.views import Cart_view
from account.views import Account_view


router = routers.DefaultRouter()
router.register('product', Product_view, base_name='productdata')
router.register('cart', Cart_view, base_name='cartdata')
router.register('account', Account_view, base_name='accountdata')
