# Generated by Django 5.0.4 on 2024-04-19 16:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('spotify', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='spotifytoken',
            old_name='tokens_type',
            new_name='token_type',
        ),
    ]