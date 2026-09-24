# BISathi 2.0 — Evidence-first AI Platform for Indian Standards

> **Ask. Verify. Act.** — Your AI-powered guide to BIS (Bureau of Indian Standards) certification, standards, and compliance.

---

## 🚀 Features

- 🤖 **AI Assistant** — Ask questions about BIS standards, get evidence-backed answers
- 📄 **Document Library** — Browse & read official BIS documents (Acts, Regulations, PDFs)
- 🏭 **Certification Guide** — Step-by-step BIS product certification journey
- 🔬 **Laboratory Finder** — Find BIS-recognized testing labs
- 📋 **Standards Browser** — Search Indian Standards by category
- 🗺️ **Journey Tracker** — Track your certification progress

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, Lucide Icons |
| Backend | FastAPI, Python 3.14, Uvicorn |
| AI | Google Gemini API |
| Styling | Vanilla CSS (glassmorphism, dark mode) |

---

## ⚙️ Setup & Installation

### Prerequisites
- Python 3.10+
- Node.js 18+

### 1. Clone the repo
```bash
git clone https://github.com/shekhadaabhay159-art/bisathi-platform.git
cd bisathi-platform
```

### 2. Set up environment variables
```bash
cp .env.example .env
# Edit .env and add your GEMINI_API_KEY
```

### 3. Install backend dependencies
```bash
pip install -r backend/requirements.txt
```

### 4. Install frontend dependencies
```bash
cd frontend
npm install
```

### 5. Run the app

**Backend** (from project root):
```bash
python -m uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload
```

**Frontend** (from `frontend/` folder):
```bash
npm run dev
```

Open **http://localhost:5173** in your browser 🎉

---

## 📁 Project Structure

```
bisathi-platform/
├── backend/                # FastAPI backend
│   ├── api/routes/         # API route handlers
│   ├── core/               # Config & settings
│   ├── models/             # Pydantic schemas
│   ├── services/           # Business logic (AI, evidence)
│   └── main.py             # App entry point
├── frontend/               # React + Vite frontend
│   ├── public/             # Static assets, PDFs, images
│   └── src/
│       ├── components/     # Reusable UI components
│       ├── pages/          # Page-level components
│       ├── data/           # Static data files
│       └── services/       # API service layer
├── knowledge/              # BIS document knowledge base
├── ingestion/              # Document ingestion scripts
├── .env.example            # Environment variable template
└── README.md
```

---

## 📜 License

This project is for educational and informational purposes about Indian Standards.

---

## 👤 Author

**Abhay Shekhada** — [@shekhadaabhay159-art](https://github.com/shekhadaabhay159-art)
