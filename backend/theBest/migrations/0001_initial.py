# Generated by Django 3.2.9 on 2022-05-20 13:52

import django.contrib.postgres.fields
from django.db import migrations, models
import django.db.models.deletion
import sqlalchemy.sql.expression
import theBest.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Arbitre',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nom', models.CharField(max_length=30)),
                ('prenom', models.CharField(max_length=30)),
                ('dateNaissance', models.DateField()),
                ('email', models.CharField(max_length=40)),
                ('mdp', models.CharField(max_length=30)),
                ('image', models.ImageField(default=None, null=sqlalchemy.sql.expression.true, upload_to='upload/')),
                ('niveau', models.CharField(blank=True, choices=[('A', 'A'), ('B', 'B'), ('C', 'C')], max_length=30, null=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Article',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('titre', models.CharField(max_length=100)),
                ('contenu', models.TextField()),
                ('photo', models.ImageField(default=None, null=sqlalchemy.sql.expression.true, upload_to='upload/')),
                ('auteur', models.CharField(max_length=100)),
                ('date', models.DateField()),
            ],
        ),
        migrations.CreateModel(
            name='But',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('minute', models.PositiveBigIntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Championnat',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nom', models.CharField(max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='Club',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nom', models.CharField(max_length=30)),
                ('mdp', models.CharField(max_length=30)),
                ('email', models.CharField(max_length=30)),
                ('adresse', models.CharField(max_length=30)),
                ('logo', models.ImageField(default=None, upload_to=theBest.models.upload_path)),
            ],
        ),
        migrations.CreateModel(
            name='Entraineur',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nom', models.CharField(max_length=30)),
                ('prenom', models.CharField(max_length=30)),
                ('dateNaissance', models.DateField()),
                ('email', models.CharField(max_length=40)),
                ('mdp', models.CharField(max_length=30)),
                ('image', models.ImageField(default=None, null=sqlalchemy.sql.expression.true, upload_to='upload/')),
                ('diplome', models.CharField(blank=True, choices=[('Cbasic', 'Cbasic'), ('Uefac', 'Uefac'), ('Uefab', 'Uefab'), ('Uefabyouth', 'Uefabyouth'), ('Uefaa', 'Uefaa'), ('Uefaayouth', 'Uefaayouth'), ('Uefapro', 'Uefapro')], max_length=30, null=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Equipe',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nom', models.CharField(max_length=30)),
                ('club', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='theBest.club')),
            ],
        ),
        migrations.CreateModel(
            name='Groupe',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nom', models.CharField(max_length=30)),
                ('classement', django.contrib.postgres.fields.ArrayField(base_field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(blank=True, max_length=10), size=8), blank=True, null=True, size=8)),
                ('championnat', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='theBest.championnat')),
            ],
        ),
        migrations.CreateModel(
            name='Joueur',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nom', models.CharField(max_length=30)),
                ('prenom', models.CharField(max_length=30)),
                ('dateNaissance', models.DateField()),
                ('email', models.CharField(max_length=40)),
                ('mdp', models.CharField(max_length=30)),
                ('image', models.ImageField(default=None, null=sqlalchemy.sql.expression.true, upload_to='upload/')),
                ('pied', models.CharField(blank=True, choices=[('Droit', 'D'), ('Gauche', 'G'), ('Ambidextre', 'A')], max_length=30, null=True)),
                ('taille', models.PositiveBigIntegerField(blank=True, null=True)),
                ('etatFacture', models.BooleanField(default=False)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Match',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('score', models.CharField(max_length=30)),
                ('heure', models.DateTimeField()),
                ('arbitre', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='theBest.arbitre')),
                ('equipes', models.ManyToManyField(to='theBest.Equipe')),
                ('groupe', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='theBest.groupe')),
            ],
        ),
        migrations.CreateModel(
            name='Poste',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nom', models.CharField(max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='Spectateur',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nom', models.CharField(max_length=30)),
                ('prenom', models.CharField(max_length=30)),
                ('dateNaissance', models.DateField()),
                ('email', models.CharField(max_length=40)),
                ('mdp', models.CharField(max_length=30)),
                ('image', models.ImageField(default=None, null=sqlalchemy.sql.expression.true, upload_to='upload/')),
                ('noteMoyenneAttribue', models.PositiveBigIntegerField(blank=True, null=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Terrain',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nom', models.CharField(max_length=30)),
                ('capacite', models.PositiveBigIntegerField()),
                ('adresse', models.CharField(max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='Transfert',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('montant', models.PositiveBigIntegerField(blank=True, null=True)),
                ('date', models.DateField()),
                ('acheteur', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='acheteur', to='theBest.equipe')),
                ('joueur', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='theBest.joueur')),
                ('vendeur', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='vendeur', to='theBest.equipe')),
            ],
        ),
        migrations.CreateModel(
            name='StatistiquesJoueur',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('buts', models.PositiveBigIntegerField()),
                ('passeDec', models.PositiveBigIntegerField()),
                ('cartonsRouge', models.PositiveBigIntegerField()),
                ('cartonsJaune', models.PositiveBigIntegerField()),
                ('noteMoyenne', models.PositiveBigIntegerField()),
                ('annee', models.CharField(max_length=30)),
                ('joueur', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='theBest.joueur')),
            ],
        ),
        migrations.CreateModel(
            name='StatistiquesEquipe',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nb_matchs', models.PositiveBigIntegerField()),
                ('nb_victoires', models.PositiveBigIntegerField()),
                ('nb_defaites', models.PositiveBigIntegerField()),
                ('buts_marqués', models.PositiveBigIntegerField()),
                ('buts_encaissés', models.PositiveBigIntegerField()),
                ('points', models.PositiveBigIntegerField()),
                ('saison', models.PositiveBigIntegerField()),
                ('equipe', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='theBest.groupe')),
            ],
        ),
        migrations.CreateModel(
            name='StatistiquesArbitre',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cartonsRouge', models.PositiveBigIntegerField()),
                ('cartonsJaune', models.PositiveBigIntegerField()),
                ('noteMoyenne', models.PositiveBigIntegerField()),
                ('annee', models.CharField(max_length=30)),
                ('arbitre', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='theBest.arbitre')),
            ],
        ),
        migrations.CreateModel(
            name='Presence',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('presence', models.BooleanField(blank=True, null=True)),
                ('joueur', models.OneToOneField(default=None, on_delete=django.db.models.deletion.CASCADE, to='theBest.joueur')),
            ],
        ),
        migrations.CreateModel(
            name='PasseD',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('minute', models.PositiveBigIntegerField()),
                ('but', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='theBest.but')),
                ('joueur', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='theBest.joueur')),
                ('match', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='theBest.match')),
            ],
        ),
        migrations.CreateModel(
            name='PalmaresJoueur',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('titre', models.CharField(blank=True, max_length=30, null=True)),
                ('joueur', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='theBest.joueur')),
            ],
        ),
        migrations.CreateModel(
            name='PalmaresClub',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('titre', models.CharField(blank=True, max_length=30, null=True)),
                ('club', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='theBest.club')),
            ],
        ),
        migrations.CreateModel(
            name='NoterEntrainement',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('note', models.PositiveBigIntegerField(blank=True, null=True)),
                ('date', models.DateField()),
                ('entraineur', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='theBest.entraineur')),
                ('joueur', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='theBest.joueur')),
            ],
        ),
        migrations.CreateModel(
            name='NoteJoueur',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('note', models.PositiveBigIntegerField()),
                ('joueur', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='theBest.joueur')),
                ('spectateur', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='theBest.spectateur')),
            ],
        ),
        migrations.CreateModel(
            name='NoteArbitre',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('note', models.PositiveBigIntegerField()),
                ('arbitre', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='theBest.arbitre')),
                ('spectateur', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='theBest.spectateur')),
            ],
        ),
        migrations.AddField(
            model_name='match',
            name='presence',
            field=models.ManyToManyField(to='theBest.Presence'),
        ),
        migrations.AddField(
            model_name='match',
            name='terrain',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='theBest.terrain'),
        ),
        migrations.AddField(
            model_name='joueur',
            name='poste',
            field=models.ManyToManyField(to='theBest.Poste'),
        ),
        migrations.CreateModel(
            name='HistoriqueChampionnat',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('annee', models.PositiveBigIntegerField()),
                ('classement', django.contrib.postgres.fields.ArrayField(base_field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(blank=True, max_length=10), size=8), blank=True, null=True, size=8)),
                ('championnat', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='theBest.championnat')),
            ],
        ),
        migrations.CreateModel(
            name='EquipeImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('photo', models.ImageField(default=None, null=sqlalchemy.sql.expression.true, upload_to='upload/')),
                ('equipe', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='theBest.equipe')),
            ],
        ),
        migrations.AddField(
            model_name='equipe',
            name='groupe',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='theBest.groupe'),
        ),
        migrations.AddField(
            model_name='equipe',
            name='joueur',
            field=models.ManyToManyField(to='theBest.Joueur'),
        ),
        migrations.AddField(
            model_name='entraineur',
            name='equipe',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='theBest.equipe'),
        ),
        migrations.CreateModel(
            name='Entrainement',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('theme', models.CharField(max_length=30)),
                ('dateHeure', models.DateTimeField()),
                ('equipe', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='theBest.equipe')),
                ('presence', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='theBest.presence')),
            ],
        ),
        migrations.CreateModel(
            name='Composition',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('etat', models.CharField(blank=True, choices=[('titulaire', 'Tit'), ('remplaçant', 'Rem'), ('absent', 'Abs')], max_length=30, null=True)),
                ('maillot', models.PositiveBigIntegerField(blank=True, null=True)),
                ('equipe', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='theBest.equipe')),
                ('joueur', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='theBest.joueur')),
                ('match', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='theBest.match')),
            ],
        ),
        migrations.AddField(
            model_name='club',
            name='terrain',
            field=models.ManyToManyField(to='theBest.Terrain'),
        ),
        migrations.CreateModel(
            name='Carton',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('minute', models.PositiveBigIntegerField()),
                ('couleur', models.CharField(blank=True, choices=[('Jaune', 'J'), ('Rouge', 'R')], max_length=30, null=True)),
                ('arbitre', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='theBest.arbitre')),
                ('joueur', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='theBest.joueur')),
                ('match', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='theBest.match')),
            ],
        ),
        migrations.AddField(
            model_name='but',
            name='joueur',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='theBest.joueur'),
        ),
        migrations.AddField(
            model_name='but',
            name='match',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='theBest.match'),
        ),
    ]