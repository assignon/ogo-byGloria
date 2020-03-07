from django.shortcuts import render

def index(request):
    return render(request, template_name='index.html')

def bag(request):
    return render(request, template_name='index.html')

def about(request):
    return render(request, template_name='index.html')

def contact(request):
    return render(request, template_name='index.html')

def accessory(request):
    return render(request, template_name='index.html')

def product(request, id):
    return render(request, template_name='index.html')

def signup(request):
    return render(request, template_name='index.html')

def order(request, step):
    return render(request, template_name='index.html')

def products(request):
    return render(request, template_name='index.html')