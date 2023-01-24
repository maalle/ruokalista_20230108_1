# Ruokalista

## Valmistelu

```bash
sqlite3 ruokalista.db < ruokalista.sql
python3 -m venv venv/
source venv/bin/activate
pip3 install -r requirements.txt
```
## Ajaminen

```bash
python3 app.py
```

* http://localhost:5000

## Purku

```bash
deactivate
rm -rf venv/ ruokalista.db
```

## Docker-levykuva

Tee ensin Ubuntuun sopiva Flask-levykuva käskyllä:

```bash
docker build -t flask-sqlite3 -f Dockerfile_Flask_SQLite3 .
```

Jos tämä on tehty, niin oman levykuvan tästä sovelluksesta voi tehdä käskyllä:

```bash
docker build -t ruokalista .
```

Käännöksen jakaminen kahtia johtuu siitä, että ensinmainittu vaihe kestää kauan
ja sen ajamisen tarve ei ole niin tiheä kuin jälkimmäisen.

### Docker-levykuvan ajaminen kontissa

```bash
docker run -p "5000:5000" ruokalista
```