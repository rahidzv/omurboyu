from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from app import db


class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    full_name = db.Column(db.String(150), default='')
    phone = db.Column(db.String(50), default='')
    is_admin = db.Column(db.Boolean, default=False)
    is_active_user = db.Column(db.Boolean, default=True)
    avatar = db.Column(db.String(200), default='')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    registrations = db.relationship('Registration', backref='user', lazy=True)
    test_results = db.relationship('LanguageTestResult', backref='user', lazy=True)
    engineering_projects = db.relationship('EngineeringProject', backref='user', lazy=True)
    messages = db.relationship('ContactMessage', backref='user', lazy=True)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def get_initials(self):
        name = self.full_name or self.username
        parts = name.split()
        if len(parts) >= 2:
            return (parts[0][0] + parts[1][0]).upper()
        return name[:2].upper()

    def __repr__(self):
        return f'<User {self.username}>'


class Division(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    slug = db.Column(db.String(50), unique=True, nullable=False)
    title = db.Column(db.String(200), nullable=False)
    short_title = db.Column(db.String(100), nullable=False)
    icon = db.Column(db.String(50), default='graduation-cap')
    color = db.Column(db.String(50), default='bg-blue-500')
    mission = db.Column(db.Text)
    overview = db.Column(db.Text)
    features = db.Column(db.Text)  # JSON stored as text
    order = db.Column(db.Integer, default=0)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    programs = db.relationship('Program', backref='division', lazy=True)
    staff_members = db.relationship('Staff', backref='division', lazy=True)

    def get_features(self):
        import json
        try:
            return json.loads(self.features) if self.features else []
        except:
            return []

    def set_features(self, features_list):
        import json
        self.features = json.dumps(features_list, ensure_ascii=False)

    def __repr__(self):
        return f'<Division {self.title}>'


class Program(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    duration = db.Column(db.String(50))
    students = db.Column(db.Integer, default=0)
    rating = db.Column(db.Float, default=4.5)
    description = db.Column(db.Text)
    division_id = db.Column(db.Integer, db.ForeignKey('division.id'))
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<Program {self.title}>'


class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    date = db.Column(db.Date, nullable=False)
    time = db.Column(db.String(50))
    location = db.Column(db.String(200))
    category = db.Column(db.String(50))
    participants = db.Column(db.String(100))
    description = db.Column(db.Text)
    benefits = db.Column(db.Text)  # JSON
    impact = db.Column(db.Text)
    image = db.Column(db.String(200))
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def get_benefits(self):
        import json
        try:
            return json.loads(self.benefits) if self.benefits else []
        except:
            return []

    def set_benefits(self, benefits_list):
        import json
        self.benefits = json.dumps(benefits_list, ensure_ascii=False)

    def __repr__(self):
        return f'<Event {self.title}>'


class Staff(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150))
    title = db.Column(db.String(200), nullable=False)
    bio = db.Column(db.Text)
    image = db.Column(db.String(200))
    email = db.Column(db.String(120))
    phone = db.Column(db.String(50))
    division_id = db.Column(db.Integer, db.ForeignKey('division.id'))
    is_director = db.Column(db.Boolean, default=False)
    order = db.Column(db.Integer, default=0)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<Staff {self.name}>'


class Testimonial(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    role = db.Column(db.String(100))
    content = db.Column(db.Text, nullable=False)
    avatar_initials = db.Column(db.String(10))
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<Testimonial {self.name}>'


class Document(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    category = db.Column(db.String(100), nullable=False)
    file_type = db.Column(db.String(20), default='PDF')
    file_size = db.Column(db.String(20))
    file_path = db.Column(db.String(200))
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<Document {self.name}>'


class Registration(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    name = db.Column(db.String(150), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(50))
    division = db.Column(db.String(100))
    program = db.Column(db.String(200))
    notes = db.Column(db.Text)
    status = db.Column(db.String(20), default='new')  # new, contacted, accepted, rejected
    admin_note = db.Column(db.Text, default='')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<Registration {self.name}>'


class ContactMessage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    name = db.Column(db.String(150), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    subject = db.Column(db.String(200))
    message = db.Column(db.Text, nullable=False)
    is_read = db.Column(db.Boolean, default=False)
    admin_reply = db.Column(db.Text, default='')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<ContactMessage {self.name}>'


class Newsletter(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<Newsletter {self.email}>'


class LanguageTestResult(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    name = db.Column(db.String(150))
    email = db.Column(db.String(120))
    score = db.Column(db.Integer)
    level = db.Column(db.String(10))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<LanguageTestResult {self.name} - {self.level}>'


class EngineeringProject(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    name = db.Column(db.String(150), nullable=False)
    email = db.Column(db.String(120))
    project_name = db.Column(db.String(200), nullable=False)
    project_description = db.Column(db.Text)
    technologies = db.Column(db.String(300))
    portfolio_link = db.Column(db.String(300))
    status = db.Column(db.String(20), default='new')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<EngineeringProject {self.project_name}>'


class SiteSetting(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    key = db.Column(db.String(100), unique=True, nullable=False)
    value = db.Column(db.Text)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    @staticmethod
    def get(key, default=None):
        setting = SiteSetting.query.filter_by(key=key).first()
        return setting.value if setting else default

    @staticmethod
    def set(key, value, auto_commit=True):
        setting = SiteSetting.query.filter_by(key=key).first()
        if setting:
            setting.value = value
        else:
            setting = SiteSetting(key=key, value=value)
            db.session.add(setting)
        if auto_commit:
            db.session.commit()
