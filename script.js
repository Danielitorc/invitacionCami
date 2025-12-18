document.addEventListener('DOMContentLoaded', () => {
    // 1. MENÚ DE NAVEGACIÓN
    const menuBtn = document.getElementById('mobileMenuBtn');
    const navUl = document.querySelector('nav ul');
    if(menuBtn) {
        menuBtn.addEventListener('click', () => {
            navUl.classList.toggle('active');
        });
    }
    document.querySelectorAll('nav ul a').forEach(link => {
        link.addEventListener('click', () => navUl.classList.remove('active'));
    });

    // 2. CUENTA REGRESIVA
    const targetDate = new Date('December 27, 2025 15:00:00').getTime();
    function updateCountdown() {
        const now = new Date().getTime();
        const diff = targetDate - now;
        if (diff < 0) return;
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);
        document.getElementById('days').innerText = d < 10 ? '0'+d : d;
        document.getElementById('hours').innerText = h < 10 ? '0'+h : h;
        document.getElementById('minutes').innerText = m < 10 ? '0'+m : m;
        document.getElementById('seconds').innerText = s < 10 ? '0'+s : s;
    }
    setInterval(updateCountdown, 1000);
    updateCountdown();

    // 3. AUDIO (LÓGICA CORREGIDA)
    const audio = document.getElementById('bgMusic');
    const playBtns = [document.getElementById('menuPlayBtn'), document.getElementById('heroPlayBtn')];
    let isPlaying = false;

    const togglePlay = () => {
        if (isPlaying) {
            audio.pause();
        } else {
            // Intenta reproducir, si falla (por bloqueo del navegador) avisa en consola
            audio.play().catch(e => console.log("Esperando interacción para reproducir..."));
        }
        isPlaying = !isPlaying;
        updateIcons();
    };

    const updateIcons = () => {
        playBtns.forEach(btn => {
            if(!btn) return;
            const icon = btn.querySelector('i');
            if (isPlaying) {
                icon.classList.remove('fa-play', 'fa-music'); icon.classList.add('fa-pause');
            } else {
                icon.classList.remove('fa-pause'); icon.classList.add('fa-play');
                // Si es el botón del menú, devolvemos el icono de nota musical
                if(btn.id === 'menuPlayBtn') { icon.classList.remove('fa-play'); icon.classList.add('fa-music'); }
            }
        });
    };

    // Asignar clic a los botones
    playBtns.forEach(btn => { if(btn) btn.addEventListener('click', togglePlay); });

    // Configuración inicial de volumen
    audio.volume = 0.5;

    // INTENTO DE AUTOPLAY AL PRIMER TOQUE (SOLUCIÓN PARA CELULARES)
    const autoStart = () => {
        audio.play().then(() => {
            isPlaying = true;
            updateIcons();
            // Una vez que suena, dejamos de escuchar el clic para no reiniciarlo
            document.removeEventListener('click', autoStart);
            document.removeEventListener('touchstart', autoStart);
        }).catch(() => {
            // Si falla, sigue esperando al siguiente clic
        });
    };

    // Intentamos reproducir apenas cargue la página
    autoStart();

    // Si no funcionó al cargar (común en Chrome/Safari), esperamos al primer toque en cualquier lado
    document.addEventListener('click', autoStart, { once: true });
    document.addEventListener('touchstart', autoStart, { once: true });
});