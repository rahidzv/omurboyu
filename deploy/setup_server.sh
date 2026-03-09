#!/bin/bash
# ============================================================
# oMDU - Ubuntu 22.04 VPS Server Setup Script
# Flask (Backend) + React/Vite (Frontend) + MySQL + Nginx + Gunicorn
# ============================================================

set -e

# ── Rəngli çıxış ──
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  oMDU VPS Deployment - Ubuntu 22.04    ${NC}"
echo -e "${GREEN}========================================${NC}"

# ── Dəyişənlər (özünə uyğun dəyiş) ──
DOMAIN="omdu.az"              # öz domainini yaz, ya da server IP-sini
DB_NAME="omdu_flask"
DB_USER="omdu"
DB_PASS="omdu2025"
APP_DIR="/var/www/omdu"
FLASK_DIR="$APP_DIR/FlaskApp"
REACT_DIR="$APP_DIR/Proyect"
VENV_DIR="$APP_DIR/.venv"

# ── 1. Sistem yeniləmələri ──
echo -e "\n${YELLOW}[1/8] Sistem yenilənir...${NC}"
sudo apt update && sudo apt upgrade -y

# ── 2. Lazımi paketlərin quraşdırılması ──
echo -e "\n${YELLOW}[2/8] Lazımi paketlər quraşdırılır...${NC}"
sudo apt install -y \
    python3 python3-pip python3-venv \
    mysql-server mysql-client libmysqlclient-dev \
    nginx \
    git curl wget unzip \
    certbot python3-certbot-nginx \
    build-essential pkg-config

# ── 3. Node.js 20 LTS quraşdırma ──
echo -e "\n${YELLOW}[3/8] Node.js 20 LTS quraşdırılır...${NC}"
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt install -y nodejs
fi
echo "Node.js versiyası: $(node -v)"
echo "npm versiyası: $(npm -v)"

# ── 4. MySQL konfiqurasiya ──
echo -e "\n${YELLOW}[4/8] MySQL konfiqurasiya edilir...${NC}"
sudo systemctl start mysql
sudo systemctl enable mysql

# MySQL verilənlər bazası və istifadəçi yaratma
sudo mysql -e "CREATE DATABASE IF NOT EXISTS ${DB_NAME} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
sudo mysql -e "CREATE USER IF NOT EXISTS '${DB_USER}'@'localhost' IDENTIFIED BY '${DB_PASS}';"
sudo mysql -e "GRANT ALL PRIVILEGES ON ${DB_NAME}.* TO '${DB_USER}'@'localhost';"
sudo mysql -e "FLUSH PRIVILEGES;"
echo -e "${GREEN}MySQL hazırdır: DB=${DB_NAME}, User=${DB_USER}${NC}"

# ── 5. Proyekti klonla ──
echo -e "\n${YELLOW}[5/8] Proyekt klonlanır...${NC}"
sudo mkdir -p /var/www
if [ -d "$APP_DIR" ]; then
    echo "Qovluq artıq var, pull edilir..."
    cd "$APP_DIR"
    sudo git pull origin main
else
    sudo git clone https://github.com/rahidzv/omurboyu.git "$APP_DIR"
fi
sudo chown -R $USER:$USER "$APP_DIR"

# ── 6. Python virtual environment + dependencies ──
echo -e "\n${YELLOW}[6/8] Python mühiti qurulur...${NC}"
cd "$APP_DIR"
python3 -m venv "$VENV_DIR"
source "$VENV_DIR/bin/activate"

pip install --upgrade pip
pip install -r "$FLASK_DIR/requirements.txt"
pip install gunicorn cryptography

# .env faylı yarat
cat > "$FLASK_DIR/.env" << EOF
SECRET_KEY=$(python3 -c "import secrets; print(secrets.token_hex(32))")
DATABASE_URL=mysql+pymysql://${DB_USER}:${DB_PASS}@localhost/${DB_NAME}?charset=utf8mb4
EOF
echo -e "${GREEN}.env faylı yaradıldı${NC}"

# Verilənlər bazasını seed et
cd "$FLASK_DIR"
python3 seed_data.py
echo -e "${GREEN}Database seed edildi${NC}"

deactivate

# ── 7. React/Vite build ──
echo -e "\n${YELLOW}[7/8] React frontend build edilir...${NC}"
cd "$REACT_DIR"
npm install
npm run build
echo -e "${GREEN}React build tamamlandı${NC}"

# ── 8. Gunicorn systemd service yarat ──
echo -e "\n${YELLOW}[8/8] Gunicorn service yaradılır...${NC}"
sudo tee /etc/systemd/system/omdu.service > /dev/null << EOF
[Unit]
Description=oMDU Flask Application (Gunicorn)
After=network.target mysql.service

[Service]
User=$USER
Group=www-data
WorkingDirectory=${FLASK_DIR}
Environment="PATH=${VENV_DIR}/bin"
EnvironmentFile=${FLASK_DIR}/.env
ExecStart=${VENV_DIR}/bin/gunicorn --workers 3 --bind unix:${FLASK_DIR}/omdu.sock --timeout 120 run:app
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl start omdu
sudo systemctl enable omdu
echo -e "${GREEN}Gunicorn service işə düşdü${NC}"

# ── Nginx konfiqurasiya ──
echo -e "\n${YELLOW}Nginx konfiqurasiya edilir...${NC}"
sudo tee /etc/nginx/sites-available/omdu > /dev/null << NGINXEOF
server {
    listen 80;
    server_name ${DOMAIN} www.${DOMAIN};

    # React Frontend (static build)
    root ${REACT_DIR}/dist;
    index index.html;

    # Frontend SPA routing
    location / {
        try_files \$uri \$uri/ /index.html;
    }

    # Flask API / Admin / Account
    location /admin {
        proxy_pass http://unix:${FLASK_DIR}/omdu.sock;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    location /account {
        proxy_pass http://unix:${FLASK_DIR}/omdu.sock;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    location /api {
        proxy_pass http://unix:${FLASK_DIR}/omdu.sock;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    # Flask static fayllar (uploads, css, js)
    location /static {
        alias ${FLASK_DIR}/static;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # Upload limiti
    client_max_body_size 20M;

    # Gzip sıxışdırma
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml text/javascript image/svg+xml;
    gzip_min_length 1000;
}
NGINXEOF

sudo ln -sf /etc/nginx/sites-available/omdu /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx
sudo systemctl enable nginx

echo -e "\n${GREEN}========================================${NC}"
echo -e "${GREEN}  DEPLOYMENT TAMAMLANDI!                ${NC}"
echo -e "${GREEN}========================================${NC}"
echo -e ""
echo -e "  Frontend:  http://${DOMAIN}"
echo -e "  Admin:     http://${DOMAIN}/admin"
echo -e "  Account:   http://${DOMAIN}/account"
echo -e ""
echo -e "  Admin login: admin / admin123"
echo -e ""
echo -e "${YELLOW}SSL sertifikat üçün:${NC}"
echo -e "  sudo certbot --nginx -d ${DOMAIN} -d www.${DOMAIN}"
echo -e ""
