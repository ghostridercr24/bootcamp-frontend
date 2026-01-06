// --- S.I.T.O. ATS Logic ---

// 1. Select DOM Elements
const modal = document.getElementById('modal');
const addBtn = document.getElementById('add-btn');
const closeBtn = document.querySelector('.close-btn');
const form = document.getElementById('ats-form');
const tableBody = document.getElementById('candidate-list');
const emptyState = document.getElementById('empty-state');
const searchInput = document.getElementById('search-input');

// 2. Initialize Data
let candidates = JSON.parse(localStorage.getItem('candidates')) || [];

// 3. Functions

// NEW: Update Dashboard Statistics (KPIs)
function updateStats() {
    // 1. Total Count
    const total = candidates.length;
    if(document.getElementById('count-total')) {
        document.getElementById('count-total').innerText = total;
    }

    // 2. Interview Count
    const interviewCount = candidates.filter(c => c.status === 'Interview').length;
    if(document.getElementById('count-interview')) {
        document.getElementById('count-interview').innerText = interviewCount;
    }

    // 3. Hired Count
    const hiredCount = candidates.filter(c => c.status === 'Hired').length;
    if(document.getElementById('count-hired')) {
        document.getElementById('count-hired').innerText = hiredCount;
    }
}

// Render the Table
function renderCandidates(data = candidates) {
    // First, update the stats cards
    updateStats();

    // Then, clear table
    tableBody.innerHTML = ''; 

    // Handle Empty State
    if (data.length === 0) {
        if(emptyState) emptyState.style.display = 'block';
    } else {
        if(emptyState) emptyState.style.display = 'none';
        
        // Loop through data
        data.forEach((candidate) => {
            const realIndex = candidates.indexOf(candidate);
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>
                    <div style="font-weight:600; color: #fff;">${candidate.name}</div>
                    <div style="font-size:0.8rem; color:#666;">${candidate.email}</div>
                </td>
                <td style="color: #bbb;">${candidate.position}</td>
                <td>
                    <span class="status ${candidate.status}">${candidate.status}</span>
                </td>
                <td>
                    <button class="delete-btn" onclick="deleteCandidate(${realIndex})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }
}

// Search Filter
function searchTable(e) {
    const term = e.target.value.toLowerCase();
    const filteredList = candidates.filter(candidate => 
        candidate.name.toLowerCase().includes(term) || 
        candidate.position.toLowerCase().includes(term)
    );
    renderCandidates(filteredList);
}

// Add Candidate
function addCandidate(e) {
    e.preventDefault();

    const newCandidate = {
        name: document.getElementById('name').value,
        position: document.getElementById('position').value,
        status: document.getElementById('status').value,
        email: `candidate.${Date.now()}@ats.com`
    };

    candidates.push(newCandidate);
    saveData();
    renderCandidates();
    toggleModal();
    form.reset();
}

// Delete Candidate
window.deleteCandidate = function(index) {
    if(confirm('Are you sure you want to delete this candidate?')) {
        candidates.splice(index, 1);
        saveData();
        
        // Refresh view keeping search context
        if(searchInput.value !== '') {
            searchInput.dispatchEvent(new Event('keyup'));
        } else {
            renderCandidates();
        }
    }
}

// Utils
function saveData() {
    localStorage.setItem('candidates', JSON.stringify(candidates));
}

function toggleModal() {
    modal.style.display = (modal.style.display === 'flex') ? 'none' : 'flex';
}

// 4. Event Listeners
if(addBtn) addBtn.addEventListener('click', toggleModal);
if(closeBtn) closeBtn.addEventListener('click', toggleModal);
if(form) form.addEventListener('submit', addCandidate);
if(searchInput) searchInput.addEventListener('keyup', searchTable);

window.addEventListener('click', (e) => {
    if (e.target === modal) toggleModal();
});

// 5. Initial Start
renderCandidates();