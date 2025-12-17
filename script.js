// JavaScript para la página de XV años - Camila Reyes Sánchez

// Cambiar color del header al hacer scroll
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Menú móvil
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('nav ul li a');

mobileMenuBtn.addEventListener('click', function() {
    nav.querySelector('ul').classList.toggle('active');
    mobileMenuBtn.innerHTML = nav.querySelector('ul').classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Cerrar menú al hacer clic en un enlace
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        nav.querySelector('ul').classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Contador en cuenta regresiva
function updateCountdown() {
    const targetDate = new Date('December 27, 2025 13:00:00').getTime();
    const now = new Date().getTime();
    const timeLeft = targetDate - now;

    if (timeLeft < 0) {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days < 10 ? '0' + days : days;
    document.getElementById('hours').textContent = hours < 10 ? '0' + hours : hours;
    document.getElementById('minutes').textContent = minutes < 10 ? '0' + minutes : minutes;
    document.getElementById('seconds').textContent = seconds < 10 ? '0' + seconds : seconds;
}

// Inicializar contador y actualizar cada segundo
updateCountdown();
setInterval(updateCountdown, 1000);

// Smooth scroll para los enlaces del menú
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Efecto de carga inicial
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});