/* ═══════════════════════════════════════════════════════════════
   Main JavaScript - Ömürboyu Təhsil Məktəbi
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    // ─── Mobile Menu Toggle ──────────────────────────────────
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('open');
        });
        // Close when clicking a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => mobileMenu.classList.remove('open'));
        });
    }

    // ─── Header Scroll Effect ────────────────────────────────
    const header = document.querySelector('.header-fixed');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                header.style.boxShadow = '0 4px 20px rgba(26,54,93,0.12)';
            } else {
                header.style.boxShadow = 'none';
            }
        });
    }

    // ─── Fade-up Animation on Scroll ─────────────────────────
    const animatedEls = document.querySelectorAll('.animate-on-scroll');
    if (animatedEls.length && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-up');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        animatedEls.forEach(el => observer.observe(el));
    }

    // ─── Auto-dismiss alerts ─────────────────────────────────
    document.querySelectorAll('.alert-dismissible').forEach(alert => {
        setTimeout(() => {
            const bsAlert = bootstrap.Alert.getOrCreateInstance(alert);
            bsAlert.close();
        }, 5000);
    });

    // ─── Admin Sidebar Toggle (mobile) ───────────────────────
    const sidebarToggle = document.getElementById('sidebarToggle');
    const adminSidebar = document.getElementById('adminSidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');

    if (sidebarToggle && adminSidebar) {
        sidebarToggle.addEventListener('click', () => {
            adminSidebar.classList.toggle('show');
            if (sidebarOverlay) sidebarOverlay.classList.toggle('show');
        });
        if (sidebarOverlay) {
            sidebarOverlay.addEventListener('click', () => {
                adminSidebar.classList.remove('show');
                sidebarOverlay.classList.remove('show');
            });
        }
    }

    // ─── Delete Confirmation ─────────────────────────────────
    document.querySelectorAll('.delete-form').forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!confirm('Bu elementi silmək istədiyinizdən əminsiniz?')) {
                e.preventDefault();
            }
        });
    });

    // ─── Language Test ───────────────────────────────────────
    const testForm = document.getElementById('languageTestForm');
    if (testForm) {
        testForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            let score = 0;
            let total = 0;

            // Count answers
            formData.forEach((value, key) => {
                if (key.startsWith('q')) {
                    total++;
                    if (value === document.querySelector(`input[name="${key}"][data-correct="true"]`)?.value) {
                        score++;
                    }
                }
            });

            // Determine level
            const pct = (score / total) * 100;
            let level;
            if (pct >= 85) level = 'C1';
            else if (pct >= 70) level = 'B2';
            else if (pct >= 55) level = 'B1';
            else if (pct >= 35) level = 'A2';
            else level = 'A1';

            // Show result
            const resultDiv = document.getElementById('testResult');
            if (resultDiv) {
                resultDiv.innerHTML = `
                    <div class="card shadow-card p-4 text-center">
                        <div class="mb-3">
                            <span class="avatar-circle avatar-xl mx-auto mb-3" style="font-size:1.5rem; width:80px; height:80px;">${level}</span>
                        </div>
                        <h4 class="fw-bold">Sizin Səviyyəniz: ${level}</h4>
                        <p class="text-muted">Düzgün cavab: ${score}/${total} (${Math.round(pct)}%)</p>
                        <div class="progress mb-3" style="height:10px;">
                            <div class="progress-bar bg-accent" style="width:${pct}%"></div>
                        </div>
                        <p class="small text-muted">Bu nəticə ən uyğun proqramı seçməyinizdə sizə kömək edəcək.</p>
                    </div>
                `;
                resultDiv.scrollIntoView({ behavior: 'smooth' });

                // Send result to server
                const nameEl = document.getElementById('testName');
                const emailEl = document.getElementById('testEmail');
                if (nameEl && emailEl) {
                    fetch('/registration', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                        body: new URLSearchParams({
                            form_type: 'language_test',
                            name: nameEl.value,
                            email: emailEl.value,
                            score: score,
                            total: total,
                            level: level,
                            csrf_token: document.querySelector('input[name="csrf_token"]')?.value || ''
                        })
                    });
                }
            }
        });
    }

    // ─── Program Search/Filter ───────────────────────────────
    const searchInput = document.getElementById('programSearch');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const programCards = document.querySelectorAll('.program-card');
    let activeFilter = 'all';

    if (searchInput) {
        searchInput.addEventListener('input', filterPrograms);
    }
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            activeFilter = this.dataset.category || 'all';
            filterPrograms();
        });
    });

    function filterPrograms() {
        const search = (searchInput?.value || '').toLowerCase();
        programCards.forEach(card => {
            const title = card.dataset.title?.toLowerCase() || '';
            const category = card.dataset.category || '';
            const matchSearch = !search || title.includes(search);
            const matchFilter = activeFilter === 'all' || category === activeFilter;
            card.style.display = (matchSearch && matchFilter) ? '' : 'none';
        });
    }

    // ─── Smooth Scroll ───────────────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

});
