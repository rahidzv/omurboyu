import os
from dotenv import load_dotenv

basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv(os.path.join(basedir, '.env'))


class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', '9f8c2b5e6d7a3c4b1e9f2a8d6c5b3e7a9d2c4b6f8a1e3c5d7b9a2f4c6e8d1b3')
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', 'mysql+pymysql://omdu:omdu2025@localhost/omdu_flask?charset=utf8mb4')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    UPLOAD_FOLDER = os.path.join(basedir, 'static', 'uploads')
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB max upload
    WTF_CSRF_ENABLED = True
