FROM python3-sqlite3

WORKDIR /app
COPY app.py requirements.txt ./
COPY static/* static/
COPY templates/* templates/
RUN pip3 install -r requirements.txt
EXPOSE 5000
VOLUME /db
CMD ["-m", "flask", "-A", "app.py", "run", "-h", "0.0.0.0"]