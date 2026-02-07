### WebSystems-9318-AY225-SADICON 

## LOCAL GOVERNMENT UNIT (LGU)
**Industry Focus: Bacoor City (Local Government Website)**

This project is the official web portal for the **City Government of Bacoor**. It serves as a centralized hub for citizens to access online services, read the latest advisories, and quickly find emergency contact information.

### 📝 About This Project
This project was developed as a **Preliminary Examination** requirement. It is an **unofficial clone and reimagining** of the City Government of Bacoor's official portal. 

While the content and visual theme are inspired by the official LGU identity, **the codebase was built entirely from scratch in "my own way."** I focused on implementing my own logic for:
* **Dynamic DOM Manipulation:** Headers, footers, and modals are injected via JavaScript (`script.js`).
* **Custom Accessibility:** Built-in high-contrast mode and text resizing.
* **Interactive UI:** Custom CSS animations, hover effects, and responsive grid layouts without relying on external frameworks like Bootstrap.

**⚠️ Disclaimer:** This is purely an educational project for academic assessment purposes. It is not officially affiliated with the City Government of Bacoor.

## ✨ Key Features

* **Hero Section:** A welcoming banner with the city slogan and a primary Call-to-Action (CTA) button linking directly to **Online Services**.
* **Quick Access Grid:** A 3-column layout featuring animated cards for:
* 📢 **Latest Advisories:** Updates on city ordinances and news.
* 💼 **Business Permits:** Direct link to renewal and application services.
* 🚑 **Emergency Hotlines:** Instant access to BDRRMO and PNP contact numbers.


* **Interactive Modal:** A popup system (Traffic Advisory) that alerts users to urgent announcements upon loading the page.
* **Dynamic Components:** The Header and Footer are loaded dynamically via JavaScript (`loadHeader()`, `loadFooter()`) for consistent navigation across all pages.
* **Modern UI/UX:** Utilizes **FontAwesome** icons and hover effects for a polished, interactive experience.

## 🛠️ Technology Stack

* **HTML5:** Semantic structure.
* **CSS3:** Custom styling (Variables, Grid, Flexbox, Animations).
* **JavaScript:** DOM manipulation for modals and dynamic component loading.
* **FontAwesome:** Vector icons for visual cues.

## 📂 File Structure

Based on the links and scripts used in the project, the structure is organized as follows:

```text
Bacoor City LGU/
├── assets/
│   └── images/
│       ├── about/
│       │   └── history.png
│       ├── background/
│       │   └── bacoorcityhall.JPG
│       ├── branding/
│       │   ├── logo.ico
│       │   └── logo.jpg
│       ├── departments/
│       │   ├── bplo.jpg
│       │   ├── engineering.jpg
│       │   ├── health.JPG
│       │   ├── mayor.jpg
│       │   ├── rescue.jpg
│       │   └── traffic.jpg
│       ├── home/
│       │   ├── business.jpg
│       │   ├── emergency.jpg
│       │   └── news.jpg
│       └── news/
│           ├── business.jpg
│           ├── rabies.jpg
│           └── traffic.jpg
├── css/
│   └── style.css
├── index.html
├── js/
│   └── script.js
└── pages/
    ├── about.html
    ├── contact.html
    ├── departments.html
    ├── news.html
    └── services.html

```

## 🧩 Key Code Components

### Quick Access Cards

The core of the homepage uses a grid layout. Each card contains an image, an icon, and a description.

```html
<div class="card card-with-img home-card">
    <img src="..." class="card-img">
    <div class="card-content">
        <h3><i class="fa-solid fa-bullhorn"></i> Title</h3>
        <p>Description...</p>
        <a href="...">Read More &rarr;</a>
    </div>
</div>

```

### Advisory Modal

A pop-up modal is included to display urgent information (e.g., Traffic Advisories) immediately upon page load.

```html
<div id="homeModal" class="modal-overlay">
    <div class="modal">
        <h2>⚠️ Traffic Advisory</h2>
        <button onclick="closeHomeModal()">I Understand</button>
    </div>
</div>

```
Here is the updated **How to Run** section with your specific GitHub link included.

## 🚀 How to Run

1. **Clone the repository** to your local machine using your terminal or Git Bash:
```bash
git clone https://github.com/jhanerose/WebSystems-9318-AY225-SADICON.git

```


2. **Navigate to the project folder**:
```bash
cd WebSystems-9318-AY225-SADICON

```


3. **Open the Project**:
* Locate the `index.html` file in the folder.
* Open it in any modern web browser (Chrome, Edge, Firefox).


4. **Optional (Recommended)**:
* For the best experience, run using a local server (e.g., **Live Server** extension in VS Code) to ensure all dynamic scripts and assets load correctly.


