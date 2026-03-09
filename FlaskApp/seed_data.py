#!/usr/bin/env python3
"""Seed the database with initial data matching the original React project."""

import json
from datetime import date
from app import create_app
from models import db, User, Division, Program, Event, Staff, Testimonial, Document, SiteSetting

def seed():
    app = create_app()
    with app.app_context():
        db.drop_all()
        db.create_all()
        print("Database tables created.")

        # ── Admin User ──────────────────────────────────
        admin = User(username='admin', email='admin@omdu.az', is_admin=True, full_name='Admin')
        admin.set_password('admin123')
        db.session.add(admin)
        print("Admin user created (admin / admin123)")

        # ── Divisions ──────────────────────────────────
        div_qiyabi = Division(
            title='Qiyabi Təhsil Bölməsi',
            short_title='Qiyabi Təhsil',
            slug='qiyabi',
            icon='bi-mortarboard',
            color='#1a365d',
            mission='Qiyabi təhsil bölməsi, işləyən peşəkarlara və müxtəlif səbəblərdən əyani təhsil ala bilməyən şəxslərə yüksək keyfiyyətli təhsil xidmətləri təqdim edir.',
            overview='Bölmə 2010-cu ildən fəaliyyət göstərir və bu müddət ərzində 5000-dən çox məzun yetişdirib. Müasir distant təhsil texnologiyalarından istifadə edərək, tələbələrə çevik təhsil imkanları yaradılır.',
            features=json.dumps([
                'Çevik tədris cədvəli',
                'Online və offline dərs seçimləri',
                'Peşəkar müəllim heyəti',
                'Müasir tədris materialları',
                'Fərdi yanaşma',
                'Dövlət diplomu'
            ])
        )
        div_muhendis = Division(
            title='Mühəndislik Bölməsi',
            short_title='Mühəndislik',
            slug='muhendis',
            icon='bi-gear',
            color='#0ea5e9',
            mission='Mühəndislik bölməsi, müasir texnologiyalar sahəsində peşəkar kadrların hazırlanması və ixtisasartırma kurslarının təşkili ilə məşğuldur.',
            overview='2015-ci ildən fəaliyyət göstərən bölmə, IT, elektron mühəndislik və digər texniki sahələrdə peşəkar proqramlar təklif edir.',
            features=json.dumps([
                'Müasir laboratoriya avadanlığı',
                'Sənaye ilə əməkdaşlıq',
                'Praktiki layihə işləri',
                'Beynəlxalq sertifikatlar',
                'Staj imkanları',
                'Karyera dəstəyi'
            ])
        )
        div_dil = Division(
            title='Dil Mərkəzi',
            short_title='Dil Mərkəzi',
            slug='dil',
            icon='bi-translate',
            color='#22c55e',
            mission='Dil Mərkəzi, müxtəlif xarici dillərin öyrədilməsi və beynəlxalq dil imtahanlarına hazırlıq kurslarının təşkili ilə məşğuldur.',
            overview='Mərkəz 2012-ci ildən fəaliyyət göstərir. İngilis, rus, türk, alman və fransız dillərində kurslar təklif olunur.',
            features=json.dumps([
                'Native speaker müəllimlər',
                'Kiçik qruplar (max 12 nəfər)',
                'IELTS/TOEFL hazırlıq',
                'Danışıq klubları',
                'Online dərslər',
                'Beynəlxalq sertifikatlar'
            ])
        )
        db.session.add_all([div_qiyabi, div_muhendis, div_dil])
        db.session.flush()
        print("3 divisions created.")

        # ── Programs ───────────────────────────────────
        programs = [
            Program(title='İngilis Dili Kursu', category='Dil', duration='6 ay', students=450, rating=4.8, description='Başlanğıcdan irəli səviyyəyə qədər İngilis dili kursları. IELTS və TOEFL hazırlığı daxil.', division_id=div_dil.id),
            Program(title='Rus Dili Kursu', category='Dil', duration='4 ay', students=200, rating=4.6, description='Rus dili kursları - danışıq, qrammatika və yazı bacarıqları.', division_id=div_dil.id),
            Program(title='Türk Dili Kursu', category='Dil', duration='3 ay', students=180, rating=4.7, description='Türk dili kursu - əsas kommunikasiya bacarıqları və qrammatika.', division_id=div_dil.id),
            Program(title='IELTS Hazırlıq', category='İmtahan', duration='3 ay', students=320, rating=4.9, description='IELTS imtahanına intensiv hazırlıq proqramı. Hər 4 bölmə üzrə hazırlıq.', division_id=div_dil.id),
            Program(title='SAT Hazırlıq', category='İmtahan', duration='4 ay', students=150, rating=4.7, description='SAT imtahanına hazırlıq - Riyaziyyat və Verbal bölmələr.', division_id=div_dil.id),
            Program(title='Web Development', category='IT', duration='6 ay', students=280, rating=4.8, description='Full-stack web developer olmaq üçün HTML, CSS, JavaScript, React, Node.js öyrənin.', division_id=div_muhendis.id),
            Program(title='Data Science', category='IT', duration='8 ay', students=120, rating=4.6, description='Python ilə data analizi, machine learning və AI əsasları.', division_id=div_muhendis.id),
            Program(title='Cybersecurity', category='IT', duration='5 ay', students=95, rating=4.5, description='Kibertəhlükəsizlik əsasları, şəbəkə təhlükəsizliyi və etik hakerlik.', division_id=div_muhendis.id),
            Program(title='Elektrik Mühəndisliyi', category='Mühəndislik', duration='1 il', students=85, rating=4.4, description='Elektrik sistemləri, güc elektronikası və avtomatlaşdırma.', division_id=div_muhendis.id),
            Program(title='Mexanika Mühəndisliyi', category='Mühəndislik', duration='1 il', students=70, rating=4.3, description='Mexaniki sistemlər, CAD/CAM və istehsal texnologiyaları.', division_id=div_muhendis.id),
            Program(title='Bakalavr Proqramı', category='Dərəcə', duration='4 il', students=500, rating=4.5, description='Müxtəlif ixtisaslar üzrə bakalavr dərəcəsi proqramları.', division_id=div_qiyabi.id),
            Program(title='Magistr Proqramı', category='Dərəcə', duration='2 il', students=200, rating=4.6, description='İxtisaslaşmış magistr proqramları - tədqiqat və peşəkar yönümlü.', division_id=div_qiyabi.id),
            Program(title='Müəllim Sertifikatı', category='Peşəkar', duration='6 ay', students=160, rating=4.7, description='Pedaqoji sertifikat proqramı - müasir tədris metodları və praktika.', division_id=div_qiyabi.id),
            Program(title='Biznes İdarəetmə', category='Peşəkar', duration='8 ay', students=230, rating=4.5, description='Biznes idarəetmə, marketinq, maliyyə və sahibkarlıq əsasları.', division_id=div_qiyabi.id),
        ]
        db.session.add_all(programs)
        print("14 programs created.")

        # ── Events ─────────────────────────────────────
        events = [
            Event(
                title='Açıq Qapı Günü 2025',
                date=date(2025, 3, 15),
                time='10:00 - 16:00',
                location='MDU Baş Bina',
                category='Açıq gün',
                participants=500,
                description='Mingəçevir Dövlət Universitetinin Ömürboyu Təhsil Məktəbi öz qapılarını bütün maraqlanan şəxslər üçün açır.',
                benefits=json.dumps(['Bölmələrlə tanışlıq', 'Pulsuz məsləhət', 'Qeydiyyat endirimi', 'Sertifikat']),
                impact='Keçən il 300-dən çox iştirakçı'
            ),
            Event(
                title='IT Hackathon 2025',
                date=date(2025, 4, 20),
                time='09:00 - 21:00',
                location='MDU Texnologiya Mərkəzi',
                category='Müsabiqə',
                participants=200,
                description='24 saatlıq proqramlaşdırma marafonu. Komandalar real problemlərə innovativ həllər tapacaq.',
                benefits=json.dumps(['Pul mükafatları', 'Staj imkanları', 'Networking', 'Sertifikat']),
                impact='10+ şirkət sponsorluğu'
            ),
            Event(
                title='Karyera Yarmarkası',
                date=date(2025, 5, 10),
                time='11:00 - 17:00',
                location='MDU Konferans Zalı',
                category='Karyera',
                participants=300,
                description='Regionun ən böyük şirkətləri ilə birbaşa əlaqə qurun. CV hazırlığı və müsahibə məsləhətləri.',
                benefits=json.dumps(['İş imkanları', 'CV nəzərdən keçirmə', 'Müsahibə hazırlığı', 'Networking']),
                impact='50+ işəgötürən şirkət'
            ),
            Event(
                title='IELTS Masterclass',
                date=date(2025, 3, 25),
                time='14:00 - 17:00',
                location='Dil Mərkəzi',
                category='Seminar',
                participants=80,
                description='IELTS imtahanında yüksək bal almaq üçün strategiyalar və tövsiyələr. British Council ekspertləri ilə.',
                benefits=json.dumps(['Pulsuz sınaq testi', 'Strategiya kitabçası', 'Ekspert məsləhəti']),
                impact='Orta IELTS balı 6.5+'
            ),
            Event(
                title='Rəqəmsal Marketinq Konfransı',
                date=date(2025, 6, 5),
                time='10:00 - 18:00',
                location='MDU Baş Bina',
                category='Konfrans',
                participants=250,
                description='Rəqəmsal marketinqin ən son trendləri, SEO, SMM və content marketinq strategiyaları.',
                benefits=json.dumps(['Ekspert məruzələri', 'Workshop sessiyalar', 'Networking', 'Sertifikat']),
                impact='20+ spiker, 5 panel'
            ),
            Event(
                title='Elm və Texnologiya Festivalı',
                date=date(2025, 4, 12),
                time='10:00 - 20:00',
                location='MDU Kampus',
                category='Festival',
                participants=1000,
                description='Elm və texnologiyanın birləşdiyi böyük festival. Robotika, VR, 3D çap və daha çox.',
                benefits=json.dumps(['İnteraktiv stendlər', 'Robot yarışları', 'VR təcrübə', 'Uşaq proqramı']),
                impact='Ailəvi tədbirdir'
            ),
            Event(
                title='Sahibkarlıq Bootcamp',
                date=date(2025, 5, 20),
                time='09:00 - 18:00',
                location='MDU Biznes İnkubator',
                category='Bootcamp',
                participants=60,
                description='3 günlük intensiv sahibkarlıq proqramı. Biznes plan hazırlığı, pitch təqdimatı.',
                benefits=json.dumps(['Mentor dəstəyi', 'Biznes plan hazırlığı', 'İnvestor pitch', 'Startap dəstəyi']),
                impact='10+ startap layihə'
            ),
            Event(
                title='Alumni Görüşü 2025',
                date=date(2025, 6, 15),
                time='18:00 - 22:00',
                location='MDU Mədəniyyət Evi',
                category='Şəbəkələşmə',
                participants=400,
                description='Ömürboyu Təhsil Məktəbinin bütün məzunları üçün il görüşü.',
                benefits=json.dumps(['Məzun şəbəkəsi', 'Uğur hekayələri', 'Networking', 'Əyləncə proqramı']),
                impact='15+ illik ənənə'
            ),
            Event(
                title='Python Workshop',
                date=date(2025, 4, 5),
                time='14:00 - 18:00',
                location='MDU Kompüter Laboratoriyası',
                category='Workshop',
                participants=40,
                description='Python proqramlaşdırma dilinin əsasları. Yeni başlayanlar üçün intensiv workshop.',
                benefits=json.dumps(['Hands-on təlim', 'Layihə işi', 'Materiallar', 'Sertifikat']),
                impact='Başlanğıc dostu'
            ),
            Event(
                title='Dil Olimpiadası',
                date=date(2025, 5, 1),
                time='10:00 - 15:00',
                location='MDU Baş Bina',
                category='Müsabiqə',
                participants=150,
                description='İngilis, rus və türk dilləri üzrə bilik yarışması. Fərdi və komanda müsabiqələri.',
                benefits=json.dumps(['Pul mükafatları', 'Sertifikatlar', 'Kitab hədiyyələri', 'Media əhatəsi']),
                impact='3 dil, 5 kateqoriya'
            ),
            Event(
                title='Təhsildə İnnovasiyalar Forumu',
                date=date(2025, 6, 25),
                time='09:00 - 17:00',
                location='MDU Konferans Zalı',
                category='Forum',
                participants=350,
                description='Təhsil sahəsində innovativ yanaşmalar, EdTech trendləri və gələcəyin təhsili.',
                benefits=json.dumps(['Beynəlxalq spikerler', 'Panel müzakirələr', 'EdTech sərgi', 'Networking']),
                impact='Beynəlxalq iştirak'
            ),
        ]
        db.session.add_all(events)
        print("11 events created.")

        # ── Staff ──────────────────────────────────────
        staff_list = [
            Staff(name='Prof. Vəfa Məhərrəmova', title='Direktor', bio='Ömürboyu Təhsil Məktəbinin direktoru. 20+ il təhsil sahəsində təcrübə.', email='vefa@omdu.az', phone='+994 50 555 01 01', division_id=div_qiyabi.id, is_director=True, order=0),
            Staff(name='Günel Məmmədli', title='Qiyabi Bölmə Müdiri', bio='Qiyabi təhsil bölməsinin rəhbəri. Distant təhsil texnologiyaları üzrə mütəxəssis.', email='gunel@omdu.az', phone='+994 50 555 02 02', division_id=div_qiyabi.id, order=1),
            Staff(name='Elvin Muradzadə', title='Mühəndislik Bölmə Müdiri', bio='IT və mühəndislik proqramlarının rəhbəri. Full-stack developer.', email='elvin@omdu.az', phone='+994 50 555 03 03', division_id=div_muhendis.id, order=1),
            Staff(name='Lalə Rüstəmova', title='Dil Mərkəzi Müdiri', bio='Dil Mərkəzinin rəhbəri. IELTS trainer, Cambridge CELTA sertifkatlı.', email='lale@omdu.az', phone='+994 50 555 04 04', division_id=div_dil.id, order=1),
            Staff(name='Kamran Əliyev', title='IT Müəllim', bio='Web development və cybersecurity üzrə müəllim.', email='kamran@omdu.az', division_id=div_muhendis.id, order=2),
            Staff(name='Nigar Həsənova', title='İngilis Dili Müəllimi', bio='IELTS və General English müəllimi. 10+ il təcrübə.', email='nigar@omdu.az', division_id=div_dil.id, order=2),
            Staff(name='Rəşad Quliyev', title='Data Science Müəllim', bio='Machine learning və data analitikası mütəxəssisi.', email='resad@omdu.az', division_id=div_muhendis.id, order=3),
            Staff(name='Aynur Babayeva', title='Koordinator', bio='Tələbə qeydiyyatı və koordinasiya işlərinin rəhbəri.', email='aynur@omdu.az', division_id=div_qiyabi.id, order=2),
        ]
        db.session.add_all(staff_list)
        print("8 staff members created.")

        # ── Testimonials ──────────────────────────────
        testimonials = [
            Testimonial(name='Aysel Hüseynova', role='IELTS 7.5, Dil Mərkəzi Məzunu', content='Dil Mərkəzindəki IELTS hazırlıq kursu həyatımı dəyişdi. 3 ay ərzində 5.0-dan 7.5-ə qədər irəliləyiş əldə etdim. Müəllimlər çox peşəkar idi.', avatar_initials='AH'),
            Testimonial(name='Rəşid Məmmədov', role='Web Developer, IT Bölməsi Məzunu', content='Web Development proqramı sayəsində 6 ay ərzində full-stack developer oldum və indi böyük bir şirkətdə işləyirəm. Praktiki yanaşma çox faydalı idi.', avatar_initials='RM'),
            Testimonial(name='Leyla Əlizadə', role='Bakalavr, Qiyabi Təhsil Məzunu', content='İşləyə-işləyə bakalavr dərəcəmi almaq mümkün oldu. Qiyabi təhsil bölməsinin çevik cədvəli buna imkan yaratdı. Təşəkkür edirəm!', avatar_initials='LƏ'),
        ]
        db.session.add_all(testimonials)
        print("3 testimonials created.")

        # ── Documents ─────────────────────────────────
        documents = [
            Document(name='Qəbul Qaydaları 2025', category='Qəbul', file_type='PDF', file_size='2.4 MB'),
            Document(name='Təhsil Haqqı Cədvəli', category='Qəbul', file_type='PDF', file_size='1.1 MB'),
            Document(name='Tələbə Müqaviləsi Nümunəsi', category='Qəbul', file_type='PDF', file_size='890 KB'),
            Document(name='Tədris Planı - Qiyabi', category='Akademik', file_type='PDF', file_size='3.2 MB'),
            Document(name='Tədris Planı - Mühəndislik', category='Akademik', file_type='PDF', file_size='2.8 MB'),
            Document(name='Tədris Planı - Dil Mərkəzi', category='Akademik', file_type='PDF', file_size='2.1 MB'),
            Document(name='İmtahan Cədvəli', category='Akademik', file_type='PDF', file_size='1.5 MB'),
            Document(name='Akademik Təqvim 2024-2025', category='Akademik', file_type='PDF', file_size='1.8 MB'),
            Document(name='Məzuniyyət Tələbləri', category='Məzuniyyət', file_type='PDF', file_size='1.2 MB'),
            Document(name='Diplom Əlavəsi Nümunəsi', category='Məzuniyyət', file_type='PDF', file_size='950 KB'),
            Document(name='Tələbə Davranış Qaydaları', category='Qaydalar', file_type='PDF', file_size='1.6 MB'),
            Document(name='Kitabxana Qaydaları', category='Qaydalar', file_type='PDF', file_size='780 KB'),
            Document(name='İnformasiya Təhlükəsizliyi Siyasəti', category='Qaydalar', file_type='PDF', file_size='2.0 MB'),
            Document(name='Tələbə Təqaüd Proqramı', category='Maliyyə', file_type='PDF', file_size='1.3 MB'),
            Document(name='Maliyyə Yardımı Ərizəsi', category='Maliyyə', file_type='DOCX', file_size='560 KB'),
        ]
        db.session.add_all(documents)
        print("15 documents created.")

        # ── Site Settings ─────────────────────────────
        settings = {
            'site_name': 'Ömürboyu Təhsil Məktəbi',
            'site_description': 'Mingəçevir Dövlət Universiteti - Ömürboyu Təhsil Məktəbi',
            'contact_email': 'info@omdu.az',
            'contact_phone': '+994 24 266 20 20',
            'address': 'Atatürk pr. 21, Mingəçevir, Azərbaycan',
            'facebook': 'https://facebook.com/maboromdu',
            'instagram': 'https://instagram.com/maboromdu',
            'linkedin': 'https://linkedin.com/company/maboromdu',
        }
        for key, val in settings.items():
            SiteSetting.set(key, val, auto_commit=False)
        print("Site settings created.")

        db.session.commit()
        print("\n✅ Database seeded successfully!")
        print("─────────────────────────────────")
        print("Admin login: admin / admin123")
        print("─────────────────────────────────")

if __name__ == '__main__':
    seed()
