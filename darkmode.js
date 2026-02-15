/*darkmode*/
const themeSwitch = document.getElementById('theme-switch');
const body = document.body;


if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('darkmode');
}

themeSwitch.addEventListener('click', () => {
    body.classList.toggle('darkmode');
    
    
    if (body.classList.contains('darkmode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});
/*form*/
const contactForm = document.getElementById('contact-form');
const formResponse = document.getElementById('form-response');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const userName = document.getElementById('contact-name').value;
    formResponse.innerText = `Halo ${userName}, pesan Anda berhasil terkirim!`;
    formResponse.style.color = document.body.classList.contains('darkmode') ? "#ffffff" : "#000000";

    
    contactForm.reset();
});

/*smooth*/
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});