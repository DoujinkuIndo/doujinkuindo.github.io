#! /bin/bash

git clean -fxd
git reset --hard HEAD
git pull

CSV_ALLOGGI='https://docs.google.com/spreadsheets/d/1WL5BuoKQRM560VNctYOeDeineLeBwP7vtFlwltasASM/pub?gid=2016214992&single=true&output=csv'
CSV_DONAZIONI='https://docs.google.com/spreadsheets/d/1WL5BuoKQRM560VNctYOeDeineLeBwP7vtFlwltasASM/pub?gid=444688992&single=true&output=csv'
CSV_RACCOLTE='https://docs.google.com/spreadsheets/d/1WL5BuoKQRM560VNctYOeDeineLeBwP7vtFlwltasASM/pub?gid=178302385&single=true&output=csv'
CSV_NOTIZIE='https://docs.google.com/spreadsheets/d/1WL5BuoKQRM560VNctYOeDeineLeBwP7vtFlwltasASM/pub?gid=739713240&single=true&output=csv'
CSV_BOLLETTINO='https://docs.google.com/spreadsheets/d/1WL5BuoKQRM560VNctYOeDeineLeBwP7vtFlwltasASM/pub?gid=814315&single=true&output=csv'
CSV_FABBISOGNI='https://docs.google.com/spreadsheets/d/1WL5BuoKQRM560VNctYOeDeineLeBwP7vtFlwltasASM/pub?gid=66190431&single=true&output=csv'

wget -O _data/alloggi.csv $CSV_ALLOGGI 
wget -O _data/donazioni.csv $CSV_DONAZIONI
wget -O _data/raccolte.csv $CSV_RACCOLTE
wget -O _data/notizie.csv $CSV_NOTIZIE
wget -O _data/bollettino.csv $CSV_BOLLETTINO
wget -O _data/fabbisogni.csv $CSV_FABBISOGNI

git add _data
git commit -m "auto CSV update $(date -Iseconds)"
git pull --rebase
git push

git clean -fxd
git reset --hard HEAD

