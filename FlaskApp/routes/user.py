from flask import Blueprint, render_template, request, redirect, url_for, flash
from flask_login import login_user, logout_user, login_required, current_user
from app import db
from models import (User, Registration, ContactMessage, LanguageTestResult,
                    EngineeringProject, Newsletter)

user_bp = Blueprint('user', __name__)


# ─── AUTH ────────────────────────────────────────────────────────────────────

@user_bp.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        if current_user.is_admin:
            return redirect(url_for('admin.dashboard'))
        return redirect(url_for('user.dashboard'))

    if request.method == 'POST':
        username = request.form.get('username', '').strip()
        password = request.form.get('password', '')

        user = User.query.filter(
            (User.username == username) | (User.email == username)
        ).first()

        if user and user.check_password(password):
            if not user.is_active_user:
                flash('Hesabınız deaktiv edilib. Admin ilə əlaqə saxlayın.', 'danger')
                return redirect(url_for('user.login'))
            login_user(user, remember='remember' in request.form)
            flash('Uğurla daxil oldunuz!', 'success')
            next_page = request.args.get('next')
            if user.is_admin:
                return redirect(next_page or url_for('admin.dashboard'))
            return redirect(next_page or url_for('user.dashboard'))
        flash('Yanlış istifadəçi adı və ya şifrə.', 'danger')

    return render_template('user/login.html')


@user_bp.route('/register', methods=['GET', 'POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('user.dashboard'))

    if request.method == 'POST':
        username = request.form.get('username', '').strip()
        email = request.form.get('email', '').strip()
        full_name = request.form.get('full_name', '').strip()
        phone = request.form.get('phone', '').strip()
        password = request.form.get('password', '')
        password2 = request.form.get('password2', '')

        errors = []
        if not username or len(username) < 3:
            errors.append('İstifadəçi adı ən az 3 simvol olmalıdır.')
        if not email or '@' not in email:
            errors.append('Düzgün e-poçt daxil edin.')
        if not password or len(password) < 6:
            errors.append('Şifrə ən az 6 simvol olmalıdır.')
        if password != password2:
            errors.append('Şifrələr uyğun gəlmir.')
        if User.query.filter_by(username=username).first():
            errors.append('Bu istifadəçi adı artıq mövcuddur.')
        if User.query.filter_by(email=email).first():
            errors.append('Bu e-poçt artıq qeydiyyatdan keçib.')

        if errors:
            for e in errors:
                flash(e, 'danger')
            return render_template('user/register.html')

        user = User(
            username=username,
            email=email,
            full_name=full_name,
            phone=phone,
            is_admin=False
        )
        user.set_password(password)
        db.session.add(user)
        db.session.commit()

        login_user(user)
        flash('Hesabınız uğurla yaradıldı!', 'success')
        return redirect(url_for('user.dashboard'))

    return render_template('user/register.html')


@user_bp.route('/logout')
@login_required
def logout():
    logout_user()
    flash('Çıxış etdiniz.', 'info')
    return redirect(url_for('public.index'))


# ─── DASHBOARD ───────────────────────────────────────────────────────────────

@user_bp.route('/dashboard')
@login_required
def dashboard():
    registrations = Registration.query.filter_by(user_id=current_user.id)\
        .order_by(Registration.created_at.desc()).all()
    messages = ContactMessage.query.filter_by(user_id=current_user.id)\
        .order_by(ContactMessage.created_at.desc()).all()
    test_results = LanguageTestResult.query.filter_by(user_id=current_user.id)\
        .order_by(LanguageTestResult.created_at.desc()).all()
    projects = EngineeringProject.query.filter_by(user_id=current_user.id)\
        .order_by(EngineeringProject.created_at.desc()).all()

    stats = {
        'registrations': len(registrations),
        'messages': len(messages),
        'test_results': len(test_results),
        'projects': len(projects),
    }

    return render_template('user/dashboard.html',
                           stats=stats,
                           registrations=registrations,
                           messages=messages,
                           test_results=test_results,
                           projects=projects)


# ─── PROFILE ─────────────────────────────────────────────────────────────────

@user_bp.route('/profile', methods=['GET', 'POST'])
@login_required
def profile():
    if request.method == 'POST':
        full_name = request.form.get('full_name', '').strip()
        email = request.form.get('email', '').strip()
        phone = request.form.get('phone', '').strip()

        if email != current_user.email:
            existing = User.query.filter_by(email=email).first()
            if existing:
                flash('Bu e-poçt artıq istifadə olunur.', 'danger')
                return redirect(url_for('user.profile'))

        current_user.full_name = full_name
        current_user.email = email
        current_user.phone = phone
        db.session.commit()
        flash('Profiliniz yeniləndi!', 'success')
        return redirect(url_for('user.profile'))

    return render_template('user/profile.html')


# ─── CHANGE PASSWORD ────────────────────────────────────────────────────────

@user_bp.route('/change-password', methods=['GET', 'POST'])
@login_required
def change_password():
    if request.method == 'POST':
        current_pw = request.form.get('current_password', '')
        new_pw = request.form.get('new_password', '')
        new_pw2 = request.form.get('new_password2', '')

        if not current_user.check_password(current_pw):
            flash('Cari şifrə yanlışdır.', 'danger')
        elif len(new_pw) < 6:
            flash('Yeni şifrə ən az 6 simvol olmalıdır.', 'danger')
        elif new_pw != new_pw2:
            flash('Yeni şifrələr uyğun gəlmir.', 'danger')
        else:
            current_user.set_password(new_pw)
            db.session.commit()
            flash('Şifrəniz uğurla dəyişdirildi!', 'success')
            return redirect(url_for('user.profile'))

    return render_template('user/change_password.html')


# ─── MY REGISTRATIONS ───────────────────────────────────────────────────────

@user_bp.route('/registrations')
@login_required
def my_registrations():
    registrations = Registration.query.filter_by(user_id=current_user.id)\
        .order_by(Registration.created_at.desc()).all()
    return render_template('user/registrations.html', registrations=registrations)


# ─── MY MESSAGES ─────────────────────────────────────────────────────────────

@user_bp.route('/messages')
@login_required
def my_messages():
    messages = ContactMessage.query.filter_by(user_id=current_user.id)\
        .order_by(ContactMessage.created_at.desc()).all()
    return render_template('user/messages.html', messages=messages)


# ─── MY TEST RESULTS ────────────────────────────────────────────────────────

@user_bp.route('/test-results')
@login_required
def my_test_results():
    results = LanguageTestResult.query.filter_by(user_id=current_user.id)\
        .order_by(LanguageTestResult.created_at.desc()).all()
    return render_template('user/test_results.html', results=results)
