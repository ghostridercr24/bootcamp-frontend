// --- S.I.T.O. ATS Logic ---

// 1. Select DOM Elements
const modal = document.getElementById('modal');
const addBtn = document.getElementById('add-btn');
const closeBtn = document.querySelector('.close-btn');
const form = document.getElementById('ats-form');
const tableBody = document.getElementById('candidate-list');
const totalCount = document.getElementById('total-count');

// 2. Initialize Data (Load from LocalStorage or start empty)
let candidates = JSON.parse(localStorage.getItem('candidates')) || [];

// 3. Functions

// Update the UI (Table & Counters)
function renderCandidates() {
    tableBody.innerHTML = ''; // Clear table
    
    // Update Stats
    totalCount.innerText = candidates.length;
    // (Here you could add logic to count 'Hired' or 'Interview' for other cards)

    // Show/Hide "Empty State" message
    const emptyState = document.getElementById('empty-state');
    if (candidates.length === 0) {
        emptyState.style.display = 'block';
    } else {
        emptyState.style.display = 'none';
        
        // Loop through candidates and create rows
        candidates.forEach((candidate, index) => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>
                    <div style="font-weight:bold;">${candidate.name}</div>
                    <div style="font-size:0.8rem; color:#94a3b8;">${candidate.email || 'No email'}</div>
                </td>
                <td>${candidate.position}</td>
                <td><span class="status ${candidate.status}">${candidate.status}</span></td>
                <td>
                    <button class="delete-btn" onclick="deleteCandidate(${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }
}

// Add New Candidate
function addCandidate(e) {
    e.preventDefault(); // Stop form from refreshing page

    const newCandidate = {
        name: document.getElementById('name').value,
        position: document.getElementById('position').value,
        status: document.getElementById('status').value,
        email: `candidate${candidates.length + 1}@example.com` // Fake email generator
    };

    candidates.push(newCandidate); // Add to array
    saveData(); // Save to LocalStorage
    renderCandidates(); // Update screen
    toggleModal(); // Close modal
    form.reset(); // Clear form
}

// Delete Candidate
window.deleteCandidate = function(index) {
    if(confirm('Are you sure you want to delete this candidate?')) {
        candidates.splice(index, 1); // Remove from array
        saveData();
        renderCandidates();
    }
}

// Save to Browser Memory
function saveData() {
    localStorage.setItem('candidates', JSON.stringify(candidates));
}

// Toggle Modal (Open/Close)
function toggleModal() {
    if (modal.style.display === 'flex') {
        modal.style.display = 'none';
    } else {
        modal.style.display = 'flex';
    }
}

// 4. Event Listeners
addBtn.addEventListener('click', toggleModal);
closeBtn.addEventListener('click', toggleModal);
form.addEventListener('submit', addCandidate);

// Close modal if clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        toggleModal();
    }
});

// 5. Initial Render
renderCandidates();