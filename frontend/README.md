# Church Donation Management System

A production-grade, full-stack web application designed to manage church memberships, tracking localized church branches, and aggregate financial offerings with real-time analytics. Built using a decoupled architecture featuring **Django REST Framework (DRF)** on the backend and **React (Vite) + Material-UI (MUI)** on the frontend.

## 🚀 Key Features

*   **Financial Insights Dashboard**: Aggregates and displays current calendar year contributions grouped dynamically by church activity lines (e.g., General Offerings vs. Building Funds).
*   **Dynamic Data Tables**: Implements `Material React Table` with custom column filtering, full server-data mapping, and fluid action handling hooks.
*   **Automated Metrics Realignment**: Dynamically runs database aggregations (`Sum`, `Count`) to surface lifetime member contributions alongside Year-to-Date (YTD) summaries.
*   **Robust Data Integrity**: Implements rigorous schema verification via Formik & Yup matching custom Django model constraints to prevent orphan data states.

## 🛠️ Tech Stack

*   **Frontend**: React 19 (Vite), Material-UI v6, Material React Table, Formik, Yup, Axios.
*   **Backend**: Python 3.14, Django 6.0, Django REST Framework (DRF).
*   **Database**: SQLite (Development) / PostgreSQL compatible schema configurations.

## 📐 System Architecture & Database Schema

The platform relies on a clean relational architecture optimized with database-layer lookups (`select_related`, `prefetch_related`) to minimize operational overhead (resolving N+1 query problems).

```text
  ┌──────────────┐             ┌──────────────┐             ┌──────────────┐
  │   Churches   │             │   Members    │             │  Donations   │
  ├──────────────┤             ├──────────────┤             ├──────────────┤
  │ id (PK)      │◄───1:N──────┤ church_id    │◄───1:N──────┤ member (FK)  │
  │ name         │             │ full_name    │             │ amount       │
  │ address      │             │ email        │             │ activity     │
  └──────────────┘             └──────────────┘             └──────────────┘
```

## 🛠️ Installation & Setup

### Prerequisites
*   Python 3.14+
*   Node.js 20+

### Backend Setup
1. Clone the repository and navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run migrations and start the Django server:
   ```bash
   python manage.py migrate
   python manage.py runserver
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install npm packages:
   ```bash
   npm install
   ```
3. Spin up the Vite development server:
   ```bash
   npm run dev
   ```