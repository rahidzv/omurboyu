import os
import json
from datetime import datetime
from flask import Blueprint, render_template, request, redirect, url_for, flash, current_app
from flask_login import login_user, logout_user, login_required, current_user
from werkzeug.utils import secure_filename
from app import db
from models import (User, Division, Program, Event, Staff, Testimonial, Document,
                    Registration, ContactMessage, Newsletter, LanguageTestResult,
                    EngineeringProject, SiteSetting)

admin_bp = Blueprint('admin', __name__)

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp', 'pdf', 'doc', 'docx'}


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def save_file(file, subfolder=''):
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S_')
        filename = timestamp + filename
        upload_path = os.path.join(current_app.config['UPLOAD_FOLDER'], subfolder)
        os.makedirs(upload_path, exist_ok=True)
        filepath = os.path.join(upload_path, filename)
        file.save(filepath)
        return os.path.join('uploads', subfolder, filename).replace('\\', '/')
    return None


# ─── AUTH ────────────────────────────────────────────────────────────────────

@admin_bp.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated and current_user.is_admin:
        return redirect(url_for('admin.dashboard'))
    if request.method == 'POST':
        username = request.form.get('username', '')
        password = request.form.get('password', '')
        user = User.query.filter_by(username=username).first()
        if user and user.check_password(password) and user.is_admin:
            login_user(user, remember=True)
            flash('Uğurla daxil oldunuz!', 'success')
            next_page = request.args.get('next')
            return redirect(next_page or url_for('admin.dashboard'))
        flash('Yanlış istifadəçi adı və ya şifrə.', 'danger')
    return render_template('admin/login.html')


@admin_bp.route('/logout')
@login_required
def logout():
    logout_user()
    flash('Çıxış etdiniz.', 'info')
    return redirect(url_for('admin.login'))


# ─── DASHBOARD ───────────────────────────────────────────────────────────────

@admin_bp.route('/')
@login_required
def dashboard():
    stats = {
        'programs': Program.query.count(),
        'events': Event.query.count(),
        'staff': Staff.query.count(),
        'registrations': Registration.query.count(),
        'messages': ContactMessage.query.filter_by(is_read=False).count(),
        'subscribers': Newsletter.query.count(),
        'test_results': LanguageTestResult.query.count(),
        'projects': EngineeringProject.query.count(),
        'documents': Document.query.count(),
        'divisions': Division.query.count(),
        'testimonials': Testimonial.query.count(),
    }
    recent_registrations = Registration.query.order_by(Registration.created_at.desc()).limit(5).all()
    recent_messages = ContactMessage.query.order_by(ContactMessage.created_at.desc()).limit(5).all()
    return render_template('admin/dashboard.html', stats=stats,
                           recent_registrations=recent_registrations,
                           recent_messages=recent_messages)


# ─── DIVISIONS ───────────────────────────────────────────────────────────────

@admin_bp.route('/divisions')
@login_required
def divisions_list():
    divisions = Division.query.order_by(Division.order).all()
    return render_template('admin/divisions_list.html', divisions=divisions)


@admin_bp.route('/divisions/create', methods=['GET', 'POST'])
@login_required
def division_create():
    if request.method == 'POST':
        features = [f.strip() for f in request.form.get('features', '').split('\n') if f.strip()]
        div = Division(
            slug=request.form.get('slug', ''),
            title=request.form.get('title', ''),
            short_title=request.form.get('short_title', ''),
            icon=request.form.get('icon', 'graduation-cap'),
            color=request.form.get('color', 'bg-blue-500'),
            mission=request.form.get('mission', ''),
            overview=request.form.get('overview', ''),
            order=int(request.form.get('order', 0)),
            is_active='is_active' in request.form
        )
        div.set_features(features)
        db.session.add(div)
        db.session.commit()
        flash('Bölmə uğurla yaradıldı!', 'success')
        return redirect(url_for('admin.divisions_list'))
    return render_template('admin/division_form.html', division=None)


@admin_bp.route('/divisions/<int:id>/edit', methods=['GET', 'POST'])
@login_required
def division_edit(id):
    div = Division.query.get_or_404(id)
    if request.method == 'POST':
        div.slug = request.form.get('slug', div.slug)
        div.title = request.form.get('title', div.title)
        div.short_title = request.form.get('short_title', div.short_title)
        div.icon = request.form.get('icon', div.icon)
        div.color = request.form.get('color', div.color)
        div.mission = request.form.get('mission', '')
        div.overview = request.form.get('overview', '')
        div.order = int(request.form.get('order', 0))
        div.is_active = 'is_active' in request.form
        features = [f.strip() for f in request.form.get('features', '').split('\n') if f.strip()]
        div.set_features(features)
        db.session.commit()
        flash('Bölmə uğurla yeniləndi!', 'success')
        return redirect(url_for('admin.divisions_list'))
    return render_template('admin/division_form.html', division=div)


@admin_bp.route('/divisions/<int:id>/delete', methods=['POST'])
@login_required
def division_delete(id):
    div = Division.query.get_or_404(id)
    db.session.delete(div)
    db.session.commit()
    flash('Bölmə silindi!', 'success')
    return redirect(url_for('admin.divisions_list'))


# ─── PROGRAMS ────────────────────────────────────────────────────────────────

@admin_bp.route('/programs')
@login_required
def programs_list():
    programs = Program.query.order_by(Program.created_at.desc()).all()
    return render_template('admin/programs_list.html', programs=programs)


@admin_bp.route('/programs/create', methods=['GET', 'POST'])
@login_required
def program_create():
    if request.method == 'POST':
        prog = Program(
            title=request.form.get('title', ''),
            category=request.form.get('category', ''),
            duration=request.form.get('duration', ''),
            students=int(request.form.get('students', 0)),
            rating=float(request.form.get('rating', 4.5)),
            description=request.form.get('description', ''),
            division_id=int(request.form.get('division_id')) if request.form.get('division_id') else None,
            is_active='is_active' in request.form
        )
        db.session.add(prog)
        db.session.commit()
        flash('Proqram uğurla yaradıldı!', 'success')
        return redirect(url_for('admin.programs_list'))
    divisions = Division.query.filter_by(is_active=True).all()
    return render_template('admin/program_form.html', program=None, divisions=divisions)


@admin_bp.route('/programs/<int:id>/edit', methods=['GET', 'POST'])
@login_required
def program_edit(id):
    prog = Program.query.get_or_404(id)
    if request.method == 'POST':
        prog.title = request.form.get('title', prog.title)
        prog.category = request.form.get('category', prog.category)
        prog.duration = request.form.get('duration', prog.duration)
        prog.students = int(request.form.get('students', 0))
        prog.rating = float(request.form.get('rating', 4.5))
        prog.description = request.form.get('description', '')
        prog.division_id = int(request.form.get('division_id')) if request.form.get('division_id') else None
        prog.is_active = 'is_active' in request.form
        db.session.commit()
        flash('Proqram uğurla yeniləndi!', 'success')
        return redirect(url_for('admin.programs_list'))
    divisions = Division.query.filter_by(is_active=True).all()
    return render_template('admin/program_form.html', program=prog, divisions=divisions)


@admin_bp.route('/programs/<int:id>/delete', methods=['POST'])
@login_required
def program_delete(id):
    prog = Program.query.get_or_404(id)
    db.session.delete(prog)
    db.session.commit()
    flash('Proqram silindi!', 'success')
    return redirect(url_for('admin.programs_list'))


# ─── EVENTS ──────────────────────────────────────────────────────────────────

@admin_bp.route('/events')
@login_required
def events_list():
    events = Event.query.order_by(Event.date.desc()).all()
    return render_template('admin/events_list.html', events=events)


@admin_bp.route('/events/create', methods=['GET', 'POST'])
@login_required
def event_create():
    if request.method == 'POST':
        benefits = [b.strip() for b in request.form.get('benefits', '').split('\n') if b.strip()]
        date_str = request.form.get('date', '')
        evt = Event(
            title=request.form.get('title', ''),
            date=datetime.strptime(date_str, '%Y-%m-%d').date() if date_str else datetime.utcnow().date(),
            time=request.form.get('time', ''),
            location=request.form.get('location', ''),
            category=request.form.get('category', ''),
            participants=request.form.get('participants', ''),
            description=request.form.get('description', ''),
            impact=request.form.get('impact', ''),
            is_active='is_active' in request.form
        )
        evt.set_benefits(benefits)

        if 'image' in request.files:
            file = request.files['image']
            path = save_file(file, 'events')
            if path:
                evt.image = path

        db.session.add(evt)
        db.session.commit()
        flash('Tədbir uğurla yaradıldı!', 'success')
        return redirect(url_for('admin.events_list'))
    return render_template('admin/event_form.html', event=None)


@admin_bp.route('/events/<int:id>/edit', methods=['GET', 'POST'])
@login_required
def event_edit(id):
    evt = Event.query.get_or_404(id)
    if request.method == 'POST':
        benefits = [b.strip() for b in request.form.get('benefits', '').split('\n') if b.strip()]
        date_str = request.form.get('date', '')
        evt.title = request.form.get('title', evt.title)
        evt.date = datetime.strptime(date_str, '%Y-%m-%d').date() if date_str else evt.date
        evt.time = request.form.get('time', evt.time)
        evt.location = request.form.get('location', evt.location)
        evt.category = request.form.get('category', evt.category)
        evt.participants = request.form.get('participants', evt.participants)
        evt.description = request.form.get('description', '')
        evt.impact = request.form.get('impact', '')
        evt.is_active = 'is_active' in request.form
        evt.set_benefits(benefits)

        if 'image' in request.files:
            file = request.files['image']
            path = save_file(file, 'events')
            if path:
                evt.image = path

        db.session.commit()
        flash('Tədbir uğurla yeniləndi!', 'success')
        return redirect(url_for('admin.events_list'))
    return render_template('admin/event_form.html', event=evt)


@admin_bp.route('/events/<int:id>/delete', methods=['POST'])
@login_required
def event_delete(id):
    evt = Event.query.get_or_404(id)
    db.session.delete(evt)
    db.session.commit()
    flash('Tədbir silindi!', 'success')
    return redirect(url_for('admin.events_list'))


# ─── STAFF ───────────────────────────────────────────────────────────────────

@admin_bp.route('/staff')
@login_required
def staff_list():
    staff = Staff.query.order_by(Staff.is_director.desc(), Staff.order).all()
    return render_template('admin/staff_list.html', staff=staff)


@admin_bp.route('/staff/create', methods=['GET', 'POST'])
@login_required
def staff_create():
    if request.method == 'POST':
        member = Staff(
            name=request.form.get('name', ''),
            title=request.form.get('title', ''),
            bio=request.form.get('bio', ''),
            email=request.form.get('email', ''),
            phone=request.form.get('phone', ''),
            division_id=int(request.form.get('division_id')) if request.form.get('division_id') else None,
            is_director='is_director' in request.form,
            order=int(request.form.get('order', 0)),
            is_active='is_active' in request.form
        )

        if 'image' in request.files:
            file = request.files['image']
            path = save_file(file, 'staff')
            if path:
                member.image = path

        db.session.add(member)
        db.session.commit()
        flash('Heyət üzvü uğurla əlavə edildi!', 'success')
        return redirect(url_for('admin.staff_list'))
    divisions = Division.query.filter_by(is_active=True).all()
    return render_template('admin/staff_form.html', member=None, divisions=divisions)


@admin_bp.route('/staff/<int:id>/edit', methods=['GET', 'POST'])
@login_required
def staff_edit(id):
    member = Staff.query.get_or_404(id)
    if request.method == 'POST':
        member.name = request.form.get('name', member.name)
        member.title = request.form.get('title', member.title)
        member.bio = request.form.get('bio', '')
        member.email = request.form.get('email', '')
        member.phone = request.form.get('phone', '')
        member.division_id = int(request.form.get('division_id')) if request.form.get('division_id') else None
        member.is_director = 'is_director' in request.form
        member.order = int(request.form.get('order', 0))
        member.is_active = 'is_active' in request.form

        if 'image' in request.files:
            file = request.files['image']
            path = save_file(file, 'staff')
            if path:
                member.image = path

        db.session.commit()
        flash('Heyət üzvü uğurla yeniləndi!', 'success')
        return redirect(url_for('admin.staff_list'))
    divisions = Division.query.filter_by(is_active=True).all()
    return render_template('admin/staff_form.html', member=member, divisions=divisions)


@admin_bp.route('/staff/<int:id>/delete', methods=['POST'])
@login_required
def staff_delete(id):
    member = Staff.query.get_or_404(id)
    db.session.delete(member)
    db.session.commit()
    flash('Heyət üzvü silindi!', 'success')
    return redirect(url_for('admin.staff_list'))


# ─── TESTIMONIALS ────────────────────────────────────────────────────────────

@admin_bp.route('/testimonials')
@login_required
def testimonials_list():
    testimonials = Testimonial.query.order_by(Testimonial.created_at.desc()).all()
    return render_template('admin/testimonials_list.html', testimonials=testimonials)


@admin_bp.route('/testimonials/create', methods=['GET', 'POST'])
@login_required
def testimonial_create():
    if request.method == 'POST':
        t = Testimonial(
            name=request.form.get('name', ''),
            role=request.form.get('role', ''),
            content=request.form.get('content', ''),
            avatar_initials=request.form.get('avatar_initials', ''),
            is_active='is_active' in request.form
        )
        db.session.add(t)
        db.session.commit()
        flash('Rəy uğurla əlavə edildi!', 'success')
        return redirect(url_for('admin.testimonials_list'))
    return render_template('admin/testimonial_form.html', testimonial=None)


@admin_bp.route('/testimonials/<int:id>/edit', methods=['GET', 'POST'])
@login_required
def testimonial_edit(id):
    t = Testimonial.query.get_or_404(id)
    if request.method == 'POST':
        t.name = request.form.get('name', t.name)
        t.role = request.form.get('role', t.role)
        t.content = request.form.get('content', t.content)
        t.avatar_initials = request.form.get('avatar_initials', t.avatar_initials)
        t.is_active = 'is_active' in request.form
        db.session.commit()
        flash('Rəy uğurla yeniləndi!', 'success')
        return redirect(url_for('admin.testimonials_list'))
    return render_template('admin/testimonial_form.html', testimonial=t)


@admin_bp.route('/testimonials/<int:id>/delete', methods=['POST'])
@login_required
def testimonial_delete(id):
    t = Testimonial.query.get_or_404(id)
    db.session.delete(t)
    db.session.commit()
    flash('Rəy silindi!', 'success')
    return redirect(url_for('admin.testimonials_list'))


# ─── DOCUMENTS ───────────────────────────────────────────────────────────────

@admin_bp.route('/documents')
@login_required
def documents_list():
    docs = Document.query.order_by(Document.category, Document.name).all()
    return render_template('admin/documents_list.html', documents=docs)


@admin_bp.route('/documents/create', methods=['GET', 'POST'])
@login_required
def document_create():
    if request.method == 'POST':
        doc = Document(
            name=request.form.get('name', ''),
            category=request.form.get('category', ''),
            file_type=request.form.get('file_type', 'PDF'),
            file_size=request.form.get('file_size', ''),
            is_active='is_active' in request.form
        )

        if 'file' in request.files:
            file = request.files['file']
            path = save_file(file, 'documents')
            if path:
                doc.file_path = path

        db.session.add(doc)
        db.session.commit()
        flash('Sənəd uğurla əlavə edildi!', 'success')
        return redirect(url_for('admin.documents_list'))
    return render_template('admin/document_form.html', document=None)


@admin_bp.route('/documents/<int:id>/edit', methods=['GET', 'POST'])
@login_required
def document_edit(id):
    doc = Document.query.get_or_404(id)
    if request.method == 'POST':
        doc.name = request.form.get('name', doc.name)
        doc.category = request.form.get('category', doc.category)
        doc.file_type = request.form.get('file_type', 'PDF')
        doc.file_size = request.form.get('file_size', '')
        doc.is_active = 'is_active' in request.form

        if 'file' in request.files:
            file = request.files['file']
            path = save_file(file, 'documents')
            if path:
                doc.file_path = path

        db.session.commit()
        flash('Sənəd uğurla yeniləndi!', 'success')
        return redirect(url_for('admin.documents_list'))
    return render_template('admin/document_form.html', document=doc)


@admin_bp.route('/documents/<int:id>/delete', methods=['POST'])
@login_required
def document_delete(id):
    doc = Document.query.get_or_404(id)
    db.session.delete(doc)
    db.session.commit()
    flash('Sənəd silindi!', 'success')
    return redirect(url_for('admin.documents_list'))


# ─── REGISTRATIONS ───────────────────────────────────────────────────────────

@admin_bp.route('/registrations')
@login_required
def registrations_list():
    regs = Registration.query.order_by(Registration.created_at.desc()).all()
    return render_template('admin/registrations_list.html', registrations=regs)


@admin_bp.route('/registrations/<int:id>/status', methods=['POST'])
@login_required
def registration_status(id):
    reg = Registration.query.get_or_404(id)
    reg.status = request.form.get('status', reg.status)
    db.session.commit()
    flash('Status yeniləndi!', 'success')
    return redirect(url_for('admin.registrations_list'))


@admin_bp.route('/registrations/<int:id>/delete', methods=['POST'])
@login_required
def registration_delete(id):
    reg = Registration.query.get_or_404(id)
    db.session.delete(reg)
    db.session.commit()
    flash('Qeydiyyat silindi!', 'success')
    return redirect(url_for('admin.registrations_list'))


# ─── MESSAGES ────────────────────────────────────────────────────────────────

@admin_bp.route('/messages')
@login_required
def messages_list():
    messages = ContactMessage.query.order_by(ContactMessage.created_at.desc()).all()
    return render_template('admin/messages_list.html', messages=messages)


@admin_bp.route('/messages/<int:id>/read', methods=['POST'])
@login_required
def message_read(id):
    msg = ContactMessage.query.get_or_404(id)
    msg.is_read = True
    db.session.commit()
    flash('Mesaj oxundu olaraq işarələndi.', 'success')
    return redirect(url_for('admin.messages_list'))


@admin_bp.route('/messages/<int:id>/delete', methods=['POST'])
@login_required
def message_delete(id):
    msg = ContactMessage.query.get_or_404(id)
    db.session.delete(msg)
    db.session.commit()
    flash('Mesaj silindi!', 'success')
    return redirect(url_for('admin.messages_list'))


# ─── NEWSLETTER ──────────────────────────────────────────────────────────────

@admin_bp.route('/subscribers')
@login_required
def subscribers_list():
    subs = Newsletter.query.order_by(Newsletter.created_at.desc()).all()
    return render_template('admin/subscribers_list.html', subscribers=subs)


@admin_bp.route('/subscribers/<int:id>/delete', methods=['POST'])
@login_required
def subscriber_delete(id):
    sub = Newsletter.query.get_or_404(id)
    db.session.delete(sub)
    db.session.commit()
    flash('Abunəçi silindi!', 'success')
    return redirect(url_for('admin.subscribers_list'))


# ─── LANGUAGE TEST RESULTS ───────────────────────────────────────────────────

@admin_bp.route('/test-results')
@login_required
def test_results_list():
    results = LanguageTestResult.query.order_by(LanguageTestResult.created_at.desc()).all()
    return render_template('admin/test_results_list.html', results=results)


# ─── ENGINEERING PROJECTS ───────────────────────────────────────────────────

@admin_bp.route('/projects')
@login_required
def projects_list():
    projects = EngineeringProject.query.order_by(EngineeringProject.created_at.desc()).all()
    return render_template('admin/projects_list.html', projects=projects)


@admin_bp.route('/projects/<int:id>/status', methods=['POST'])
@login_required
def project_status(id):
    proj = EngineeringProject.query.get_or_404(id)
    proj.status = request.form.get('status', proj.status)
    db.session.commit()
    flash('Status yeniləndi!', 'success')
    return redirect(url_for('admin.projects_list'))


# ─── SITE SETTINGS ──────────────────────────────────────────────────────────

@admin_bp.route('/settings', methods=['GET', 'POST'])
@login_required
def site_settings():
    if request.method == 'POST':
        keys = [
            'site_name', 'site_description', 'site_tagline',
            'contact_email', 'contact_phone', 'address',
            'facebook', 'instagram', 'linkedin', 'youtube', 'telegram',
            'working_hours', 'map_embed',
            'hero_title', 'hero_subtitle',
            'meta_title', 'meta_description', 'meta_keywords',
            'footer_text', 'google_analytics',
        ]
        for key in keys:
            val = request.form.get(key, '').strip()
            SiteSetting.set(key, val)

        # Handle logo upload
        logo_file = request.files.get('site_logo')
        if logo_file and logo_file.filename:
            logo_path = save_file(logo_file, 'logo')
            if logo_path:
                SiteSetting.set('site_logo', logo_path)

        favicon_file = request.files.get('site_favicon')
        if favicon_file and favicon_file.filename:
            fav_path = save_file(favicon_file, 'logo')
            if fav_path:
                SiteSetting.set('site_favicon', fav_path)

        flash('Sayt ayarları yeniləndi!', 'success')
        return redirect(url_for('admin.site_settings'))

    settings = {}
    all_settings = SiteSetting.query.all()
    for s in all_settings:
        settings[s.key] = s.value
    return render_template('admin/settings.html', settings=settings)


# ─── USER MANAGEMENT ────────────────────────────────────────────────────────

@admin_bp.route('/users')
@login_required
def users_list():
    users = User.query.order_by(User.created_at.desc()).all()
    return render_template('admin/users_list.html', users=users)


@admin_bp.route('/users/create', methods=['GET', 'POST'])
@login_required
def user_create():
    if request.method == 'POST':
        username = request.form.get('username', '').strip()
        email = request.form.get('email', '').strip()
        full_name = request.form.get('full_name', '').strip()
        phone = request.form.get('phone', '').strip()
        password = request.form.get('password', '')
        is_admin = 'is_admin' in request.form

        if User.query.filter_by(username=username).first():
            flash('Bu istifadəçi adı artıq mövcuddur.', 'danger')
            return redirect(url_for('admin.user_create'))
        if User.query.filter_by(email=email).first():
            flash('Bu e-poçt artıq mövcuddur.', 'danger')
            return redirect(url_for('admin.user_create'))

        user = User(
            username=username, email=email, full_name=full_name,
            phone=phone, is_admin=is_admin
        )
        user.set_password(password)
        db.session.add(user)
        db.session.commit()
        flash('İstifadəçi yaradıldı!', 'success')
        return redirect(url_for('admin.users_list'))
    return render_template('admin/user_form.html', user=None)


@admin_bp.route('/users/<int:id>/edit', methods=['GET', 'POST'])
@login_required
def user_edit(id):
    user = User.query.get_or_404(id)
    if request.method == 'POST':
        user.full_name = request.form.get('full_name', '').strip()
        user.email = request.form.get('email', '').strip()
        user.phone = request.form.get('phone', '').strip()
        user.is_admin = 'is_admin' in request.form
        user.is_active_user = 'is_active_user' in request.form
        db.session.commit()
        flash('İstifadəçi yeniləndi!', 'success')
        return redirect(url_for('admin.users_list'))
    return render_template('admin/user_form.html', user=user)


@admin_bp.route('/users/<int:id>/reset-password', methods=['POST'])
@login_required
def user_reset_password(id):
    user = User.query.get_or_404(id)
    new_pw = request.form.get('new_password', '')
    if len(new_pw) < 6:
        flash('Şifrə ən az 6 simvol olmalıdır.', 'danger')
    else:
        user.set_password(new_pw)
        db.session.commit()
        flash(f'{user.username} üçün şifrə dəyişdirildi!', 'success')
    return redirect(url_for('admin.users_list'))


@admin_bp.route('/users/<int:id>/delete', methods=['POST'])
@login_required
def user_delete(id):
    user = User.query.get_or_404(id)
    if user.id == current_user.id:
        flash('Öz hesabınızı silə bilməzsiniz.', 'danger')
        return redirect(url_for('admin.users_list'))
    db.session.delete(user)
    db.session.commit()
    flash('İstifadəçi silindi!', 'success')
    return redirect(url_for('admin.users_list'))


# ─── ADMIN CHANGE PASSWORD ──────────────────────────────────────────────────

@admin_bp.route('/change-password', methods=['GET', 'POST'])
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
            return redirect(url_for('admin.dashboard'))

    return render_template('admin/change_password.html')
