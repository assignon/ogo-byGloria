# Generated by Django 2.2.4 on 2019-08-07 21:16

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('product_name', models.CharField(max_length=255)),
                ('product_image', models.ImageField(upload_to='product')),
                ('product_price', models.IntegerField()),
                ('likes', models.IntegerField()),
                ('posted_on', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
