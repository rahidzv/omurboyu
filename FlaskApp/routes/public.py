from flask import Blueprint, render_template, request, redirect, url_for, flash, jsonify
from flask_login import current_user
from app import db
from models import (Division, Program, Event, Staff, Testimonial, Document,
                    Registration, ContactMessage, Newsletter, LanguageTestResult,
                    EngineeringProject, SiteSetting)

public_bp = Blueprint('public', __name__)


@public_bp.route('/')
def index():
    divisions = Division.query.filter_by(is_active=True).order_by(Division.order).all()
    programs = Program.query.filter_by(is_active=True).order_by(Program.rating.desc()).limit(4).all()
    events = Event.query.filter_by(is_active=True).order_by(Event.date.desc()).limit(3).all()
    testimonials = Testimonial.query.filter_by(is_active=True).all()
    return render_template('public/index.html',
                           divisions=divisions,
                           programs=programs,
                           events=events,
                           testimonials=testimonials)


@public_bp.route('/about')
def about():
    director = Staff.query.filter_by(is_director=True, is_active=True).first()
    return render_template('public/about.html', director=director)


@public_bp.route('/divisions')
def divisions():
    divisions = Division.query.filter_by(is_active=True).order_by(Division.order).all()
    active_tab = request.args.get('tab', divisions[0].slug if divisions else 'qiyabi')
    return render_template('public/divisions.html', divisions=divisions, active_tab=active_tab)


@public_bp.route('/staff')
def staff():
    divisions = Division.query.filter_by(is_active=True).order_by(Division.order).all()
    director = Staff.query.filter_by(is_director=True, is_active=True).first()
    staff_by_division = {}
    for div in divisions:
        members = Staff.query.filter_by(division_id=div.id, is_active=True, is_director=False)\
                              .order_by(Staff.order).all()
        if members:
            staff_by_division[div.title] = members
    return render_template('public/staff.html',
                           director=director,
                           staff_by_division=staff_by_division)


@public_bp.route('/programs')
def programs():
    search = request.args.get('search', '')
    category = request.args.get('category', 'Hamısı')

    query = Program.query.filter_by(is_active=True)

    if search:
        query = query.filter(
            db.or_(
                Program.title.ilike(f'%{search}%'),
                Program.description.ilike(f'%{search}%')
            )
        )

    if category and category != 'Hamısı':
        query = query.filter_by(category=category)

    programs = query.order_by(Program.rating.desc()).all()
    categories = ['Hamısı'] + sorted(set(p.category for p in Program.query.filter_by(is_active=True).all()))
    
    return render_template('public/programs.html',
                           programs=programs,
                           categories=categories,
                           search=search,
                           selected_category=category)


@public_bp.route('/events')
def events():
    events = Event.query.filter_by(is_active=True).order_by(Event.date.desc()).all()
    return render_template('public/events.html', events=events)


@public_bp.route('/registration')
def registration():
    """Redirect to user account registration."""
    return redirect(url_for('user.register'))


@public_bp.route('/apply', methods=['GET', 'POST'])
def apply():
    if request.method == 'POST':
        form_type = request.form.get('form_type')

        if form_type == 'registration':
            reg = Registration(
                name=request.form.get('name', ''),
                email=request.form.get('email', ''),
                phone=request.form.get('phone', ''),
                division=request.form.get('division', ''),
                program=request.form.get('program', ''),
                notes=request.form.get('notes', ''),
                user_id=current_user.id if current_user.is_authenticated else None
            )
            db.session.add(reg)
            db.session.commit()
            flash('Qeydiyyatınız uğurla göndərildi! Sizinlə tezliklə əlaqə saxlanılacaq.', 'success')
            return redirect(url_for('public.apply'))

        elif form_type == 'language_test':
            answers = {}
            score = 0
            questions = get_language_test_questions()
            for q in questions:
                ans = request.form.get(f'q{q["id"]}')
                if ans is not None:
                    answers[q['id']] = int(ans)
                    if int(ans) == q['correct']:
                        score += 1

            if score <= 4:
                level = 'A1'
            elif score <= 8:
                level = 'A2'
            elif score <= 12:
                level = 'B1'
            elif score <= 16:
                level = 'B2'
            else:
                level = 'C1'

            result = LanguageTestResult(
                name=request.form.get('test_name', ''),
                email=request.form.get('test_email', ''),
                score=score,
                level=level,
                user_id=current_user.id if current_user.is_authenticated else None
            )
            db.session.add(result)
            db.session.commit()
            flash(f'Sizin dil səviyyəniz: {level} ({score}/20 düzgün cavab)', 'info')
            return redirect(url_for('public.apply', tab='language-test', level=level, score=score))

        elif form_type == 'engineering':
            project = EngineeringProject(
                name=request.form.get('eng_name', ''),
                email=request.form.get('eng_email', ''),
                project_name=request.form.get('project_name', ''),
                project_description=request.form.get('project_description', ''),
                technologies=request.form.get('technologies', ''),
                portfolio_link=request.form.get('portfolio_link', ''),
                user_id=current_user.id if current_user.is_authenticated else None
            )
            db.session.add(project)
            db.session.commit()
            flash('Layihəniz uğurla göndərildi!', 'success')
            return redirect(url_for('public.apply', tab='engineering'))

    programs = Program.query.filter_by(is_active=True).all()
    divisions = Division.query.filter_by(is_active=True).all()
    questions = get_language_test_questions()
    active_tab = request.args.get('tab', 'registration')
    level = request.args.get('level')
    score = request.args.get('score')
    return render_template('public/registration.html',
                           programs=programs,
                           divisions=divisions,
                           questions=questions,
                           active_tab=active_tab,
                           test_level=level,
                           test_score=score)


@public_bp.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        msg = ContactMessage(
            name=request.form.get('name', ''),
            email=request.form.get('email', ''),
            subject=request.form.get('subject', ''),
            message=request.form.get('message', ''),
            user_id=current_user.id if current_user.is_authenticated else None
        )
        db.session.add(msg)
        db.session.commit()
        flash('Mesajınız uğurla göndərildi!', 'success')
        return redirect(url_for('public.contact'))
    return render_template('public/contact.html')


@public_bp.route('/documents')
def documents():
    docs = Document.query.filter_by(is_active=True).all()
    categories = {}
    for doc in docs:
        if doc.category not in categories:
            categories[doc.category] = []
        categories[doc.category].append(doc)
    return render_template('public/documents.html', categories=categories)


@public_bp.route('/news')
def news():
    events = Event.query.filter_by(is_active=True).order_by(Event.date.desc()).all()
    return render_template('public/events.html', events=events)


@public_bp.route('/faq')
def faq():
    return render_template('public/index.html',
                           divisions=Division.query.filter_by(is_active=True).all(),
                           programs=Program.query.filter_by(is_active=True).limit(4).all(),
                           events=Event.query.filter_by(is_active=True).limit(3).all(),
                           testimonials=Testimonial.query.filter_by(is_active=True).all())


@public_bp.route('/resources')
def resources():
    return redirect(url_for('public.documents'))


@public_bp.route('/newsletter', methods=['POST'])
def newsletter():
    email = request.form.get('email', '')
    if email:
        existing = Newsletter.query.filter_by(email=email).first()
        if not existing:
            sub = Newsletter(email=email)
            db.session.add(sub)
            db.session.commit()
            flash('Xəbər bülletenimizə uğurla abunə oldunuz!', 'success')
        else:
            flash('Bu e-poçt artıq abunə olub.', 'info')
    return redirect(url_for('public.index'))


def get_language_test_questions():
    return [
        {"id": 1, "question": "She ___ to school every day.", "options": ["go", "goes", "going", "went"], "correct": 1},
        {"id": 2, "question": "I ___ watching TV right now.", "options": ["am", "is", "are", "be"], "correct": 0},
        {"id": 3, "question": "They ___ finished their homework.", "options": ["has", "have", "had", "having"], "correct": 1},
        {"id": 4, "question": "If I ___ rich, I would travel.", "options": ["am", "was", "were", "be"], "correct": 2},
        {"id": 5, "question": "The book ___ on the table.", "options": ["is", "are", "be", "been"], "correct": 0},
        {"id": 6, "question": "She asked me where I ___.", "options": ["live", "lived", "living", "lives"], "correct": 1},
        {"id": 7, "question": "I wish I ___ speak French.", "options": ["can", "could", "will", "would"], "correct": 1},
        {"id": 8, "question": "The letter ___ yesterday.", "options": ["sent", "was sent", "sends", "sending"], "correct": 1},
        {"id": 9, "question": "He is ___ than his brother.", "options": ["tall", "taller", "tallest", "more tall"], "correct": 1},
        {"id": 10, "question": "I ___ never been to Paris.", "options": ["has", "have", "had", "having"], "correct": 1},
        {"id": 11, "question": "She ___ here since 2010.", "options": ["works", "worked", "has worked", "working"], "correct": 2},
        {"id": 12, "question": "By next year, I ___ graduated.", "options": ["will", "will have", "would", "have"], "correct": 1},
        {"id": 13, "question": "___ you mind opening the window?", "options": ["Do", "Would", "Will", "Can"], "correct": 1},
        {"id": 14, "question": "The meeting ___ at 9 AM tomorrow.", "options": ["starts", "started", "starting", "start"], "correct": 0},
        {"id": 15, "question": "I'd rather you ___ smoke here.", "options": ["don't", "didn't", "won't", "not"], "correct": 1},
        {"id": 16, "question": "Not only ___ intelligent but also hardworking.", "options": ["she is", "is she", "she was", "was she"], "correct": 1},
        {"id": 17, "question": "Had I known, I ___ come earlier.", "options": ["will have", "would have", "had", "have"], "correct": 1},
        {"id": 18, "question": "The more you practice, ___ you become.", "options": ["better", "the better", "best", "the best"], "correct": 1},
        {"id": 19, "question": "It's high time we ___ a decision.", "options": ["make", "made", "making", "makes"], "correct": 1},
        {"id": 20, "question": "Scarcely ___ arrived when it started raining.", "options": ["I had", "had I", "I have", "have I"], "correct": 1},
    ]
