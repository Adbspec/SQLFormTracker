const baseUrl = 'http://localhost:8086';

function generateUniqueId() {
    const now = Date.now();
    let sessionId = getCookie('sessionId');
    if (!sessionId) {
        sessionId = `${now}-${Math.random().toString().slice(2)}`;
        setCookie('sessionId', sessionId, 365); // set cookie to expire in 365 days
    }
    return sessionId;
}

function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = `; expires=${date.toUTCString()}`;
    }
    document.cookie = `${name}=${value}${expires}; path=/`;
}

function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(`${name}=`)) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}

const form = document.getElementById('example-form');
form.addEventListener('change', (event) => {
    event.preventDefault();
    const now = new Date();
    const year = now.getUTCFullYear();
    const month = now.getUTCMonth() + 1;
    const day = now.getUTCDate();
    const hours = now.getUTCHours();
    const minutes = now.getUTCMinutes();
    const seconds = now.getUTCSeconds();
    const milliseconds = now.getUTCMilliseconds();
    const datePart = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    const timePart = `${hours.toString().padStart(2, '0')}${minutes.toString().padStart(2, '0')}${seconds.toString().padStart(2, '0')}${milliseconds.toString().padStart(3, '0')}`;
    const sessionId = generateUniqueId();
    localStorage.setItem('sessionId', sessionId);
    const form = document.querySelector('form');

    // create a new FormData object
    const formData = new FormData(form);
    const data = {
        formdata: Object.fromEntries(formData.entries()),
        date: new Date().toISOString().slice(0, 10),
        sessionId: sessionId
    };
    fetch(`${baseUrl}/api/setFormData`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});


window.addEventListener("DOMContentLoaded", () => {
    sessionId = localStorage.getItem('sessionId');
    console.log(sessionId);

    fetch(`${baseUrl}/api/getFormData`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ sessionId: sessionId })
        }
    )
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);

            if (data.formdata) {

                const form = document.querySelector('form');


                Object.keys(data.formdata).forEach(key => {
                    const value = data.formdata[key];
                    if (form.elements[key]) {
                        form.elements[key].value = value;
                    }
                });

                form.firstName.value = data.formdata.name.split(' ')[0];
                form.lastName.value = data.formdata.name.split(' ')[1];
                form.country.value = data.formdata.country;
            }

        })
        .catch((error) => {
            console.error('Error:', error);
        });

})