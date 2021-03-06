# QueueRate

## Required Environment Variables

* POSTGRES_URL: The postgres database instance endpoint
* POSTGRES_USER: The postgres database instance user
* POSTGRES_PW: The postgres database instance password
* POSTGRES_DB: The postgres database name in the database instance

## To install dependencies locally
1) activate your virtual env
2) run "pip install -r requirements.txt"
3) install the following dependencies:

* pip install https://github.com/explosion/spacy-models/releases/download/en_core_web_sm-2.2.0/en_core_web_sm-2.2.0.tar.gz
* python3 -m nltk.downloader stopwords
* python3 -m nltk.downloader universal_tagset
* python3 -m spacy download en # download the english model
* pip install git+https://github.com/boudinfl/pke.git

## To run application locally
1) run the command "python run.py"
2) Application is available on localhost:8080

## To create/run migrations locally

1) Remove the migrations folder if desired
2) Make sure you're in your virtualenv
3) run "flask db init" if migrations folder does not exist
4) run "flask db migrate" to generate updated migrations.  
5) run "flask db upgrade" to apply those migrations to the database

Most migration problems can be solved by removing the *.db and migrations folder and regenerating them

## To start celery worker for debugging
1) from the server directory, run:
"celery -A app.tasks.tasks worker"

This will be run as a daemon for production but doing it this way lets us see the debug printouts for development

## Manual Deployment

* git pull
* cd client
* yarn install
* yarn build
* cd
* sudo mv curator/client/dist/* /var/www/html/
* sudo systemctl stop nginx
* sudo systemctl start nginx
* sudo systemctl restart curator.service
* sudo systemctl restart celery.service