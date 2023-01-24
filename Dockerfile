FROM flask-sqlite3

WORKDIR /app
COPY app.py requirements.txt ./
COPY static/* static/
COPY templates/* templates/
RUN pip3 install -r requirements.txt
EXPOSE 5000
VOLUME /db
CMD ["python3", "app.py"]