/* --- DATA SOURCES --- */
const db = {
    departments: [
        { 
            name: "Office of the Mayor", 
            head: "Hon. Strike Revilla", 
            contact: "mayor@bacoor.gov.ph",
            image: "mayor.jpg" 
        },
        { 
            name: "City Health Office", 
            head: "Dr. Ivy Marie Yrastorza", 
            contact: "health@bacoor.gov.ph",
            image: "health.JPG" 
        },
        { 
            name: "City Engineering", 
            head: "Engr. Jicky Jusay", 
            contact: "engineering@bacoor.gov.ph",
            image: "engineering.jpg" 
        },
        { 
            name: "BPLO (Business Permits)", 
            head: "Mr. Jesus Francisco", 
            contact: "bplo@bacoor.gov.ph",
            image: "bplo.jpg" 
        },
        { 
            name: "BDRRMO (Disaster Risk)", 
            head: "Mr. Richard Quion", 
            contact: "rescue@bacoor.gov.ph",
            image: "rescue.jpg" 
        },
        { 
            name: "Traffic Management (BTMD)", 
            head: "Col. R. Pamalas", 
            contact: "traffic@bacoor.gov.ph",
            image: "traffic.jpg" 
        }
    ],
    news: [
        { 
            date: "2026-02-10", 
            title: "Business Permit Renewal Extended", 
            category: "Advisory", 
            summary: "The deadline for business permit renewal is extended until Feb 28.",
            image: "business.jpg" 
        },
        { 
            date: "2026-02-12", 
            title: "Free Anti-Rabies Vaccination", 
            category: "Health", 
            summary: "Schedule: Brgy. Molino III covered court, 8:00 AM - 12:00 NN.",
            image: "rabies.jpg" 
        },
        { 
            date: "2026-02-15", 
            title: "Traffic Re-routing Scheme", 
            category: "Traffic", 
            summary: "Heavy traffic expected at Aguinaldo Highway due to road repairs.",
            image: "traffic.jpg" 
        }
    ]
};

/* --- SHARED COMPONENT LOADER --- */
document.addEventListener("DOMContentLoaded", () => {
    loadHeader();
    loadFooter();
    initAccessibility();
    
    // Start Live Clock & Weather
    updateDateTime();
    updateWeather(); // Initialize Weather
    setInterval(updateDateTime, 1000);

    // Router Logic
    const path = window.location.pathname;
    if (path.includes("contact.html")) initContact();
    if (path.includes("departments.html")) initDepartments();
    if (path.includes("news.html")) initNews();
    if (path.includes("services.html")) initServices();
    if (path.includes("index.html") || path === "/") initHome();
});

/* --- CORE FUNCTIONS --- */

/* --- HEADER LOADER WITH ZOOM MODAL --- */
function loadHeader() {
    const isPagesFolder = window.location.pathname.includes("/pages/");
    const rootPath = isPagesFolder ? "../" : "";
    
    // Links
    const homeLink = isPagesFolder ? "../index.html" : "index.html";
    const aboutLink = isPagesFolder ? "about.html" : "pages/about.html";
    const deptLink = isPagesFolder ? "departments.html" : "pages/departments.html";
    const servLink = isPagesFolder ? "services.html" : "pages/services.html";
    const newsLink = isPagesFolder ? "news.html" : "pages/news.html";
    const contactLink = isPagesFolder ? "contact.html" : "pages/contact.html";

    // Image Path
    const logoPath = rootPath + "assets/images/branding/logo.jpg";

    const headerHTML = `
        <div class="top-bar">
            <div class="date-weather-container">
                <div class="location-title">BACOOR</div>
                <div class="live-meta" style="display: flex; gap: 10px; align-items: center;">
                    <div id="live-date" class="live-date">Loading...</div>
                    <div id="live-weather" class="live-weather" style="font-size: 0.9rem; opacity: 0.9; font-weight: 300;"></div>
                </div>
            </div>
            <div class="access-tools">
                <button onclick="toggleTextSize()" title="Toggle Text Size">A+</button>
            </div>
        </div>
        <div class="nav-container">
            <div class="logo">
                <img src="${logoPath}" alt="Bacoor City Logo" class="header-logo" onclick="openLogoModal('${logoPath}')">
                <div>
                    BACOOR <span>CITY</span>
                </div>
            </div>
            <nav>
                <ul>
                    <li><a href="${homeLink}">Home</a></li>
                    <li><a href="${aboutLink}">About</a></li>
                    <li><a href="${deptLink}">Departments</a></li>
                    <li><a href="${servLink}">Services</a></li>
                    <li><a href="${newsLink}">News</a></li>
                    <li><a href="${contactLink}">Contact</a></li>
                </ul>
            </nav>
        </div>

        <div id="logoModal" class="logo-modal-overlay" onclick="closeLogoModal()">
            <img id="fullSizeLogo" class="logo-modal-img" src="" alt="Full Size Logo">
            <p style="position:absolute; bottom:20px; color:white; font-family:'Poppins';">Click anywhere to close</p>
        </div>
    `;
    
    const headerElement = document.getElementById("main-header");
    if (headerElement) {
        headerElement.innerHTML = headerHTML;
        
        // Active Link Highlighting
        const currentFile = window.location.pathname.split("/").pop() || "index.html";
        const links = headerElement.querySelectorAll("nav a");
        links.forEach(link => {
            if(link.getAttribute("href").includes(currentFile)) {
                link.classList.add("active");
            }
        });
        
        // Ensure weather is shown immediately after header loads
        updateWeather();
    }
}

function loadFooter() {
    const footerElement = document.getElementById("main-footer");
    if (footerElement) {
        footerElement.innerHTML = `
            <p>&copy; 2026 City Government of Bacoor. All Rights Reserved.</p>
            <p style="font-size:0.8rem; color:#aaa;">Strike as One. Progress for All.</p>
        `;
    }
}

function updateDateTime() {
    const dateElement = document.getElementById('live-date');
    if (dateElement) {
        const now = new Date();
        const options = { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        dateElement.textContent = now.toLocaleDateString('en-US', options);
    }
}

/* --- UPDATED: WEATHER FUNCTION (With FA Icons) --- */
function updateWeather() {
    const weatherElement = document.getElementById('live-weather');
    if (weatherElement) {
        // Simple logic: Day (6AM-6PM) = Sun, Night = Moon
        const hour = new Date().getHours();
        const isDay = hour >= 6 && hour < 18;
        
        // Use FontAwesome Icons
        const icon = isDay ? '<i class="fa-solid fa-sun" style="color:#FFD700;"></i>' : '<i class="fa-solid fa-moon" style="color:#f4f6f8;"></i>';
        const temp = isDay ? "31°C" : "26°C"; // Simulated temp
        
        // Insert separator and weather
        weatherElement.innerHTML = `<span style="opacity:0.5; margin:0 8px;">|</span> ${icon} <span style="margin-left:5px;">${temp}</span>`;
    }
}

/* --- ACCESSIBILITY --- */
function initAccessibility() {
    if(localStorage.getItem('largeText') === 'true') {
        document.body.classList.add('large-text');
    }
}

function toggleTextSize() {
    document.body.classList.toggle('large-text');
    localStorage.setItem('largeText', document.body.classList.contains('large-text'));
}

/* --- LOGO MODAL FUNCTIONS --- */
function openLogoModal(imagePath) {
    const modal = document.getElementById('logoModal');
    const modalImg = document.getElementById('fullSizeLogo');
    
    modalImg.src = imagePath; 
    modal.style.display = 'flex'; 
}

function closeLogoModal() {
    const modal = document.getElementById('logoModal');
    modal.style.display = 'none'; 
}

/* --- PAGE SPECIFIC LOGIC --- */

// 1. HOME
function initHome() {
    if (!sessionStorage.getItem('advisoryShown')) {
        setTimeout(() => {
            const modal = document.getElementById('homeModal');
            if(modal) modal.style.display = 'flex';
        }, 1000);
        sessionStorage.setItem('advisoryShown', 'true');
    }
}

function closeHomeModal() {
    document.getElementById('homeModal').style.display = 'none';
}

// 2. DEPARTMENTS
function initDepartments() {
    const container = document.getElementById('dept-grid');
    const searchInput = document.getElementById('dept-search');

    function render(filter = "") {
        container.innerHTML = "";
        const filtered = db.departments.filter(d => 
            d.name.toLowerCase().includes(filter.toLowerCase())
        );
        
        if (filtered.length === 0) container.innerHTML = "<p>No departments found.</p>";

        filtered.forEach(dept => {
            const card = document.createElement('div');
            card.className = 'card dept-card'; 
            
            const imgName = dept.image || "default.jpg";
            const imgPath = `../assets/images/departments/${imgName}`;

            card.innerHTML = `
                <div class="dept-img-wrapper">
                    <img src="${imgPath}" alt="${dept.name}" onerror="this.style.display='none'">
                </div>
                <div class="card-content">
                    <h3 style="margin-bottom: 15px;">${dept.name}</h3>
                    <p style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
                        <i class="fa-solid fa-user-tie" style="color: var(--primary-blue); width: 20px;"></i>
                        <span>${dept.head}</span>
                    </p>
                    <p style="display: flex; align-items: center; gap: 10px;">
                        <i class="fa-solid fa-envelope" style="color: var(--primary-blue); width: 20px;"></i>
                        <a href="mailto:${dept.contact}" style="color: var(--text-light); text-decoration: underline;">${dept.contact}</a>
                    </p>
                </div>
            `;
            container.appendChild(card);
        });
    }

    if(container) render(); 
    if(searchInput) searchInput.addEventListener('input', (e) => render(e.target.value));
}

// 3. NEWS
function initNews() {
    const container = document.getElementById('news-grid');
    if(container) {
        container.innerHTML = "";
        db.news.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card card-with-img';
            
            const imgName = item.image || "default.jpg";
            const imgPath = `../assets/images/news/${imgName}`;

            card.innerHTML = `
                <div style="height: 200px; overflow: hidden;">
                    <img src="${imgPath}" alt="${item.title}" class="card-img">
                </div>
                <div class="card-content">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                        <small style="color:var(--primary-blue); font-weight:700; text-transform:uppercase;">${item.category}</small>
                        <small style="color:#999;">${item.date}</small>
                    </div>
                    <h3 style="margin-bottom:10px;">${item.title}</h3>
                    <p>${item.summary}</p>
                    <a href="#" class="read-more">Read Full Story &rarr;</a>
                </div>
            `;
            container.appendChild(card);
        });
    }
}

function filterNews() {
    const input = document.getElementById('news-search').value.toLowerCase();
    const container = document.getElementById('news-grid');
    const cards = container.getElementsByClassName('card');
    let visibleCount = 0;

    Array.from(cards).forEach(card => {
        const text = card.innerText.toLowerCase();
        if (text.includes(input)) {
            card.style.display = 'flex'; 
            visibleCount++;
        } else {
            card.style.display = 'none'; 
        }
    });

    let noResultMsg = document.getElementById('no-news-msg');
    if (visibleCount === 0) {
        if (!noResultMsg) {
            noResultMsg = document.createElement('p');
            noResultMsg.id = 'no-news-msg';
            noResultMsg.style.textAlign = 'center';
            noResultMsg.style.gridColumn = '1 / -1'; 
            noResultMsg.style.padding = '2rem';
            noResultMsg.style.color = '#888';
            noResultMsg.style.fontSize = '1.2rem';
            noResultMsg.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> No news found matching your search.';
            container.appendChild(noResultMsg);
        }
    } else {
        if (noResultMsg) noResultMsg.remove();
    }
}

// 4. SERVICES
function selectService(serviceName) {
    const select = document.getElementById('service-type');
    if(select) {
        select.value = serviceName;
        document.getElementById('application-section').scrollIntoView({ behavior: 'smooth' });
    }
}

function initServices() {
    const form = document.getElementById('service-form');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); 
            const btn = document.getElementById('btn-submit');
            const service = document.getElementById('service-type').value;

            if(!service) {
                alert("Please select a service first.");
                return;
            }

            btn.classList.add('btn-loading');

            setTimeout(() => {
                btn.classList.remove('btn-loading');
                const refId = "BCR-" + Math.floor(100000 + Math.random() * 900000);
                document.getElementById('modal-service-name').textContent = service;
                document.getElementById('modal-ref-id').textContent = refId;
                document.getElementById('successModal').style.display = 'flex';
                form.reset();
            }, 1500);
        });
    }
}

function closeSuccessModal() {
    document.getElementById('successModal').style.display = 'none';
}

// 5. CONTACT
function initContact() {
    const form = document.getElementById('contact-form');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = document.getElementById('btn-contact-submit');
            const name = document.getElementById('contact-name').value;
            const topic = document.getElementById('contact-topic').value;

            btn.classList.add('btn-loading');

            setTimeout(() => {
                btn.classList.remove('btn-loading');
                document.getElementById('modal-contact-name').textContent = name;
                document.getElementById('modal-contact-topic').textContent = topic;
                document.getElementById('contactSuccessModal').style.display = 'flex';
                form.reset();
            }, 1500);
        });
    }
}

function closeContactModal() {
    document.getElementById('contactSuccessModal').style.display = 'none';
}

function closeModal() {
    const modal = document.getElementById('advisoryModal');
    if(modal) modal.style.display = 'none';
}
