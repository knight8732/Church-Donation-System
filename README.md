# Church Donation & Member Management System

An internal administrative dashboard designed to securely manage church member directory records, track annual financial tithes and offerings, and dynamically generate tax-compliant contribution receipts on the client side.

## 🚀 Key Features

*   **Member Directory**: Full CRUD lifecycle operations handled through a responsive `material-react-table` interface.
*   **Dynamic Document Engine**: Instant extraction of member financials into stylized Microsoft Word (`.docx`) files matching legal donation guidelines.
*   **Asynchronous Bulk Actions**: Simultaneous multi-page receipt compilation using local browser background threads.
*   **Intuitive UI Themes**: Built strictly with Material UI styling patterns using deep religious palette configurations (`#1b5e20`).

---

## 🛠️ Tech Stack & Dependencies

### Frontend Core
*   **Framework:** React 18+ (with Vite toolchain)
*   **UI Components:** Material UI (MUI v5)
*   **Data Grids:** Material React Table (MRT)

### Document Processing
*   **`docx`**: Native binary client-side OpenXML schema compiler
*   **`file-saver`**: Local browser microtask data-stream downloading handler

---

## ⚙️ Local Development Setup

Follow these exact steps to spin up the application structure locally on your workstation.

### Prerequisites
*   **Node.js**: `v20.x` or higher installed
*   **Package Manager**: `npm` or `yarn`

### 1. Installation
Clone this repository locally and run the clean workspace setup script inside your root frontend folder:
```bash
cd frontend
npm install
```

### 2. Configure Environment Properties
Create a `.env` file in the root of the project structure directory to connect to your local `AxiosInstance` endpoint routing configurations:
```env
VITE_API_BASE_URL=http://localhost:8000/api/v1/
```

### 3. Spin Up Development Server
Initialize the Vite hot-reloading development pipeline:
```bash
npm run dev
```
Once initialized, navigate your active browser tab to `http://localhost:5173`.

---

## 📁 Repository Structure Mapping

```text
src/
├── components/
│   ├── Members/
│   │   ├── MemberList.jsx       # Main member directory grid table view
│   │   └── CreateMember.jsx     # Addition profile forms interface
│   ├── Forms/
│   │   ├── AlertDialog.jsx      # Reusable transactional warning dialogs
│   │   └── GenerateDocument.jsx # Core word document compilation engine
│   └── Axios.jsx                # Global interceptor networking instance
```

---

## 📜 Compliance & Document Guidelines

All receipts exported through the system are formatted according to non-profit regulatory criteria:
1.  **Font Standardizations**: Set to structural `Arial` styles with strict relative font dimensions (tracked via half-points inside the document engine module).
2.  **Tax Statements**: Generates dynamic tax exemption text certifying that "no goods or services were provided in exchange for this contribution other than intangible religious benefits".
