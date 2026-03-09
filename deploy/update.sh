#!/bin/bash
# ============================================================
# oMDU - Yeniləmə Scripti (kod dəyişiklikləri üçün)
# ============================================================

set -e

APP_DIR="/var/www/omdu"
FLASK_DIR="$APP_DIR/FlaskApp"
VENV_DIR="$APP_DIR/.venv"

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}Yeniliklər çəkilir...${NC}"
cd "$APP_DIR"
git pull origin main

echo -e "${YELLOW}Python dependencies yenilənir...${NC}"
source "$VENV_DIR/bin/activate"
pip install -r "$FLASK_DIR/requirements.txt"
deactivate

echo -e "${YELLOW}Gunicorn restart edilir...${NC}"
sudo systemctl restart omdu

echo -e "${GREEN}Yeniləmə tamamlandı!${NC}"
