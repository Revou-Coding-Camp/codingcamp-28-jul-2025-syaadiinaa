document.addEventListener('DOMContentLoaded', function() {
    const messageForm = document.querySelector('.message-form');
    const displayName = document.getElementById('display-name');
    const displayDob = document.getElementById('display-dob');
    const displayGender = document.getElementById('display-gender');
    const displayMessage = document.getElementById('display-message');
    const displayTime = document.getElementById('display-time');

    // Function to format date from 'YYYY-MM-DD' to 'DD/MM/YYYY'
    function formatDate(dateString) {
        if (!dateString) return '';
            const [year, month, day] = dateString.split('-');
            return `${day}/${month}/${year}`;
        }

    // Initialize display with current time
    function updateCurrentTime() {
        const now = new Date();
        // Format for Balikpapan, East Kalimantan, Indonesia (WITA)
        const options = {
            weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
            hour: '2-digit', minute: '2-digit', second: '2-digit',
            timeZoneName: 'short', timeZone: 'Asia/Makassar' // WITA timezone
        };
        displayTime.textContent = now.toLocaleString('en-US', options);
    }

    // Call once on load
    updateCurrentTime();
    // Update every second if desired (optional)
    // setInterval(updateCurrentTime, 1000);

    messageForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission (page reload)

        // Get values from form inputs
        const name = document.getElementById('name').value;
        const dob = document.getElementById('dob').value;
        const gender = document.querySelector('input[name="gender"]:checked'); // Get checked radio button
        const message = document.getElementById('message').value;

        // Update the display section
        displayName.textContent = name || '-'; // Use '-' if empty
        displayDob.textContent = formatDate(dob) || '-';
        displayGender.textContent = gender ? gender.value : '-'; // Use value of checked radio, or '-'
        displayMessage.textContent = message || '-';

        // Update current time on submission
        updateCurrentTime();

        // Optional: Clear the form fields after submission
        messageForm.reset();
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // --- Existing Contact Form JavaScript ---
    const messageForm = document.querySelector('.message-form');
    const displayName = document.getElementById('display-name');
    const displayDob = document.getElementById('display-dob');
    const displayGender = document.getElementById('display-gender');
    const displayMessage = document.getElementById('display-message');
    const displayTime = document.getElementById('display-time');

    function formatDate(dateString) {
        if (!dateString) return '';
        const [year, month, day] = dateString.split('-');
        const formattedMonth = String(month).padStart(2, '0');
        const formattedDay = String(day).padStart(2, '0');
        return `${formattedDay}/${formattedMonth}/${year}`;
    }

    function updateCurrentTime() {
        const now = new Date();
        const options = {
            weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
            hour: '2-digit', minute: '2-digit', second: '2-digit',
            timeZoneName: 'short', timeZone: 'Asia/Makassar' // Balikpapan time
        };
        displayTime.textContent = now.toLocaleString('en-US', options);
    }

    updateCurrentTime();

    if (messageForm) {
        messageForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const name = document.getElementById('name').value;
            const dob = document.getElementById('dob').value;
            const gender = document.querySelector('input[name="gender"]:checked');
            const message = document.getElementById('message').value;

            displayName.textContent = name || '-';
            displayDob.textContent = formatDate(dob) || '-';
            displayGender.textContent = gender ? gender.value : '-';
            displayMessage.textContent = message || '-';

            updateCurrentTime();
            messageForm.reset();
        });
    }

    // --- New/Modified Welcome Pop-up JavaScript ---
    const welcomeModal = document.getElementById('welcomeModal');
    const usernameInput = document.getElementById('usernameInput');
    const saveUsernameBtn = document.getElementById('saveUsernameBtn');
    const closeButton = document.querySelector('#welcomeModal .close-button');
    const topWelcomeMessage = document.getElementById('topWelcomeMessage'); // Get the new element

    const STORAGE_KEY = 'portfolioUsername';

    function showModal() {
        if (welcomeModal) {
            welcomeModal.classList.add('show');
            if (usernameInput) {
                setTimeout(() => {
                    usernameInput.focus();
                }, 100);
            }
        }
    }

    function hideModal() {
        if (welcomeModal) {
            welcomeModal.classList.remove('show');
        }
    }

    // Modified: Function to set the welcome message in the new top div
    function setWelcomeMessage(name) {
        if (topWelcomeMessage) {
            topWelcomeMessage.innerHTML = `Selamat datang kembali, <strong>${name}</strong>! 👋`;
            topWelcomeMessage.classList.add('show'); // Show the message with fade-in
        }
    }

    // Check if username already exists in localStorage
    const savedUsername = localStorage.getItem(STORAGE_KEY);

    if (savedUsername) {
        hideModal();
        setWelcomeMessage(savedUsername); // Set the welcome message at the top
    } else {
        showModal();
    }

    if (saveUsernameBtn) {
        saveUsernameBtn.addEventListener('click', function() {
            const username = usernameInput.value.trim();

            if (username) {
                localStorage.setItem(STORAGE_KEY, username);
                setWelcomeMessage(username); // Set the welcome message at the top
                hideModal();
            } else {
                alert('Silakan masukkan nama Anda!');
            }
        });
    }

    if (closeButton) {
        closeButton.addEventListener('click', function() {
            // Jika user menutup tanpa nama, Anda bisa memutuskan apakah akan tetap menampilkan modal
            // atau membiarkannya tertutup dan tidak menampilkan pesan selamat datang.
            // Untuk saat ini, kita akan menyembunyikannya.
            hideModal();
        });
    }

    if (welcomeModal) {
        welcomeModal.addEventListener('click', function(event) {
            if (event.target === welcomeModal) {
                hideModal();
            }
        });
    }
});