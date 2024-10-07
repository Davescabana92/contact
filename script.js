// script.js

let contacts = [];

// Fonction pour gérer le changement de photo de profil
document.getElementById('changePhotoBtn').addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('profileImage').src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    input.click();
});

// Fonction pour enregistrer le contact
document.getElementById('saveContactBtn').addEventListener('click', () => {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const company = document.getElementById('company').value;
    const position = document.getElementById('position').value;
    const email = document.getElementById('email').value;

    const additionalEmails = Array.from(document.querySelectorAll('#additionalEmails input[type="email"]'))
                                  .map(input => input.value)
                                  .filter(email => email);

    const phoneNumber = document.getElementById('phoneNumber').value;
    const countryCode = document.getElementById('countryCode').value;

    const contact = {
        firstName,
        lastName,
        company,
        position,
        emails: [email, ...additionalEmails],
        phone: {
            countryCode,
            number: phoneNumber
        },
        profileImage: document.getElementById('profileImage').src
    };

    contacts.push(contact);
    displayContacts(); // Afficher la liste des contacts
    resetForm();
});

// Fonction pour afficher la liste des contacts
function displayContacts() {
    const contactListBody = document.querySelector('#contactList tbody');
    contactListBody.innerHTML = ''; // Réinitialiser le corps du tableau avant d'afficher

    contacts.forEach(contact => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${contact.profileImage}" alt="Photo de Profil" class="small-profile-pic"></td>
            <td>${contact.firstName} ${contact.lastName}</td>
            <td>${contact.company}</td>
            <td>${contact.position}</td>
            <td>${contact.emails.join(', ')}</td>
            <td>${contact.phone.countryCode} ${contact.phone.number}</td>
        `;
        contactListBody.appendChild(row);
    });
}

// Fonction pour réinitialiser le formulaire
function resetForm() {
    document.getElementById('contactForm').reset();
    document.getElementById('additionalEmails').innerHTML = '';
    document.getElementById('profileImage').src = 'default-profile.png'; // Réinitialiser l'image par défaut
}

// Fonction pour ajouter une nouvelle adresse email
document.getElementById('addEmailBtn').addEventListener('click', () => {
    const additionalEmails = document.getElementById('additionalEmails');
    const newEmailInput = document.createElement('input');
    newEmailInput.type = 'email';
    newEmailInput.placeholder = 'Nouvelle adresse email';
    additionalEmails.appendChild(newEmailInput);
});
