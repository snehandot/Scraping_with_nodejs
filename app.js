const feedDisplay = document.querySelector('#feed');

fetch('http://localhost:8000/results')
    .then(response => response.json())
    .then(data => {
        data.forEach(doctor => {
            const doctorCard = `
                <div class="doctor-card">
                    <img src="${doctor.imageUrl}" alt="${doctor.title}">
                    <h3>${doctor.title}</h3>
                    <p>${doctor.url}</p>
                </div>`;
            feedDisplay.insertAdjacentHTML("beforeend", doctorCard);
        });
    })
    .catch(err => console.log(err));
