document.addEventListener('DOMContentLoaded', () => {
    // Yeni elementler
    const introContainer = document.querySelector('.intro-container');
    const startButton = document.getElementById('startButton');
    const countdownContainer = document.querySelector('.countdown-container');
    const countdownNumber = document.getElementById('countdownNumber');

    // Mevcut elementler
    const container = document.querySelector('.container');
    const noButton = document.getElementById('noButton');
    const yesButton = document.getElementById('yesButton');
    const surpriseMessage = document.getElementById('surpriseMessage');
    const body = document.body;

    // Başlangıçtaki kalplerin referansları (gizlemek için)
    const bodyBefore = document.querySelector('body::before');
    const bodyAfter = document.querySelector('body::after');


    // 1. Giriş Ekranı: "EVET" butonuna basıldığında
    startButton.addEventListener('click', () => {
        introContainer.classList.add('hidden'); // Giriş ekranını gizle

        // Arka planı siyah yap ve kalpleri gizle
        body.style.backgroundImage = 'none';
        body.style.backgroundColor = 'black';
        body.style.setProperty('--before-opacity', '0'); // Kalpleri gizlemek için CSS değişkeni kullan
        body.style.setProperty('--after-opacity', '0'); // Kalpleri gizlemek için CSS değişkeni kullan

        countdownContainer.classList.remove('hidden'); // Sayaç ekranını göster
        startCountdown(3); // 3'ten geriye sayımı başlat
    });

    // Sayacı başlatan fonksiyon
    function startCountdown(count) {
        countdownNumber.textContent = count;
        countdownNumber.style.animation = 'none'; // Animasyonu sıfırla
        void countdownNumber.offsetWidth; // Reflow'u tetikle
        countdownNumber.style.animation = 'countdownFade 1s linear forwards'; // Animasyonu tekrar başlat

        if (count > 0) {
            setTimeout(() => {
                startCountdown(count - 1);
            }, 1000);
        } else {
            // Sayaç bittiğinde (0 olduğunda)
            setTimeout(() => {
                countdownContainer.classList.add('hidden'); // Sayaç ekranını gizle

                // Ana ekranın arka planını geri getir ve kalpleri göster
                body.style.backgroundImage = 'url("arkaplan.jpg")';
                body.style.backgroundColor = 'transparent';
                body.style.setProperty('--before-opacity', '1');
                body.style.setProperty('--after-opacity', '1');

                container.classList.remove('hidden'); // Ana soru ekranını göster
                container.style.animation = 'fadeIn 1s ease-out forwards'; // Ana ekran için görünüm animasyonu
            }, 1000); // 0'ın animasyonunu bitirmesi için biraz bekle
        }
    }


    // 2. Ana Soru Ekranı: "Hayır" butonuna fare ile yaklaşıldığında veya tıklandığında hareket etme
    noButton.addEventListener('mouseover', () => moveNoButton());
    noButton.addEventListener('click', (e) => {
        e.preventDefault(); // Tıklama olayını engeller, böylece sayfayı yenilemez
        moveNoButton();
    });

    function moveNoButton() {
        // Not: Container'ın kendisi hidden'dan çıktığında görünür hale gelecek.
        // Amaç "Hayır" butonunun container içinde kaçması olduğu için
        // container'ın boyutlarına ihtiyacımız var.
        const currentContainer = document.querySelector('.container:not(.hidden)');
        if (!currentContainer) return; // Eğer ana container henüz görünür değilse işlem yapma

        const containerRect = currentContainer.getBoundingClientRect();
        const buttonRect = noButton.getBoundingClientRect();

        // Butonun container içinde kalmasını sağlamak için sınırlar
        const maxX = containerRect.width - buttonRect.width - 20;
        const maxY = containerRect.height - buttonRect.height - 20;

        // Rastgele yeni pozisyonlar oluştur
        const newX = Math.random() * maxX;
        const newY = Math.random() * maxY;

        // Butonun konumunu ayarla
        noButton.style.position = 'absolute';
        noButton.style.left = `${newX}px`;
        noButton.style.top = `${newY}px`;
        noButton.style.transform = 'translate(0, 0)';
    }

    // 3. Ana Soru Ekranı: "Evet" butonuna tıklandığında yapılacaklar
    yesButton.addEventListener('click', () => {
        noButton.style.display = 'none';
        yesButton.style.display = 'none';

        surpriseMessage.classList.remove('hidden');
        
        container.style.justifyContent = 'center';
        container.style.alignItems = 'center';
        container.style.minHeight = 'auto';
        container.style.height = 'fit-content';
    });
});