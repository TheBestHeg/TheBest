# Generated by Django 3.2.9 on 2022-06-01 18:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('theBest', '0004_notearbitre_match'),
    ]

    operations = [
        migrations.AddField(
            model_name='statistiquesarbitre',
            name='nb_matchs',
            field=models.PositiveBigIntegerField(default=0),
        ),
    ]
