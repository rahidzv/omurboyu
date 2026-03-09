from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_wtf.csrf import CSRFProtect
from config import Config

try:
    from flask_migrate import Migrate
except ImportError:
    Migrate = None

db = SQLAlchemy()
login_manager = LoginManager()
csrf = CSRFProtect()
migrate = Migrate()

login_manager.login_view = 'user.login'
login_manager.login_message = 'Zəhmət olmasa daxil olun.'
login_manager.login_message_category = 'warning'


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)
    login_manager.init_app(app)
    csrf.init_app(app)
    if Migrate is not None:
        migrate.init_app(app, db)

    import os
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

    from routes.public import public_bp
    from routes.admin import admin_bp
    from routes.user import user_bp

    app.register_blueprint(public_bp)
    app.register_blueprint(admin_bp, url_prefix='/admin')
    app.register_blueprint(user_bp, url_prefix='/account')

    from models import User, SiteSetting

    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(int(user_id))

    @app.errorhandler(404)
    def not_found(e):
        return app.jinja_env.get_template('errors/404.html').render(), 404

    @app.errorhandler(500)
    def server_error(e):
        return app.jinja_env.get_template('errors/500.html').render(), 500

    @app.context_processor
    def inject_globals():
        from datetime import datetime
        settings = {}
        try:
            all_settings = SiteSetting.query.all()
            for s in all_settings:
                settings[s.key] = s.value
        except:
            pass
        return {
            'now': datetime.utcnow(),
            'site_settings': settings
        }

    return app
