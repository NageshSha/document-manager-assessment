# Propylon Document Manager Assessment

The Propylon Document Management Technical Assessment is a simple (and incomplete) web application consisting of a basic API backend and a React based client.  This API/client can be used as a bootstrap to implement the specific features requested in the assessment description. 

## Getting Started
### API Development
The API project is a [Django/DRF](https://www.django-rest-framework.org/)  This application uses [SQLite](https://www.sqlite.org/index.html) as the default persistence database you are more than welcome to change this. This project requires Python 3.13.7 in order to create the virtual environment.  You will need to ensure that this version of Python is installed on your OS before building the virtual environment.  Running the below commmands should get the development environment running using the Django development server.
1. Checkout complete application from - https://github.com/NageshSha/document-manager-assessment
2. Install django, REST framework and create project 'myassessment' -
	pip install Django
	django-admin --version
	pip install djangorestframework
	pip install django-cors-headers
	django-admin startproject myassessment
	Copy folowwing files into myassessment folder from git structure <document-manager-assessment/tree/main>
		1. Folder - filelocation
		2. Folder - myassessment
		3. Folder - myassessmentapp (use command "python manage.py startapp myassessmentapp" and copy then content)
		4. File - db.sqlite3
		5. File - manage.py
	
	python manage.py makemigrations
	python manage.py migrate
	python manage.py runserver	(REST application can be access at - http://127.0.0.1:8000/)
### Client Development 
See the Readme [here](https://github.com/NageshSha/document-manager-assessment/blob/main/client/doc-manager/README.md)
