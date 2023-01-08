# Ruokalista

## Valmistelu

```bash
sqlite3 ruokalista.db < ruokalista.sql
python3 -m venv venv/
source venv/bin/activate
pip3 install flask sqlalchemy
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
