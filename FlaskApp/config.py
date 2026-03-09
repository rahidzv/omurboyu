import os

basedir = os.path.abspath(os.path.dirname(__file__))


class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', 'omdu-flask-secret-key-2025')
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', 'mysql+pymysql://omdu:omdu2025@localhost/omdu_flask?charset=utf8mb4')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    UPLOAD_FOLDER = os.path.join(basedir, 'static', 'uploads')
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB max upload
    WTF_CSRF_ENABLED = True
