const slides = document.querySelectorAll('.slide');
const blurBg = document.querySelector('.blur-bg');
const hindiText = document.getElementById('hindiText');
const englishText = document.getElementById('englishText');
const finalMessage = document.getElementById('finalMessage');
const birthdayMessages = document.getElementById('birthdayMessages');
const soundToggle = document.getElementById('soundToggle');
const audio = document.getElementById('backgroundMusic');

// Final message texts
const finalHindi = "🙏 धन्यवाद पापा, मेरे जीवन में आपके होने के लिए। आप मेरे लिए सब कुछ हैं!";
const finalEnglish = "🙏 Thank you Papa for everything. You mean the world to me! 💖";

// Hindi & English messages for each slide
const messages = [
  ["पापा, आप मेरे जीवन का वो आधार हैं जिस पर मेरा हर सपना बना है ", "Papa, you are the foundation upon which all my dreams are built "],
  ["मैं हमेशा आपकी बेटी बनकर गर्व महसूस करती हूँ 👧💖", "I’m always proud to be your daughter 👧💖"],
  ["आपका प्यार मेरी सबसे बड़ी ताकत है ❤️‍🔥", "Your love is my greatest strength ❤️‍🔥"],
  ["पापा, आपने मुझे चलना सिखाया, और अब मैं दुनिया का सामना कर सकती हूँ 👨‍👧‍👧", "Papa, you taught me how to walk — and now I can face the world 👨‍👧‍👧"],
  ["आपने न सिर्फ शिक्षा दी, बल्कि जीवन जीना भी सिखाया 🎓✨", "You taught me more than education — you taught me how to live 🎓✨"],
  ["आपने मुझे हमेशा प्रेरित किया है 🔥", "You’ve always inspired me 🔥"],
  ["आपका धैर्य और प्रेम अनमोल है 💞", "Your patience and love are priceless 💞"],
  ["आप मेरे आदर्श हैं 🏅", "You are my role model 🏅"],
  ["पापा, आप मेरे जीवन की शक्ति हैं 💪❤️", "Papa, you are my life’s strength 💪❤️"],
  ["आपने हमेशा मुझे जीवन की हर आंधी से बचाया है 🛡️🌪️", "You’ve always shielded me from life’s storms 🛡️🌪️"],
  ["हमेशा मेरे साथ रहने के लिए धन्यवाद 🙏🌸", "Thanks for always being with me 🙏🌸"],
  ["आपके हर त्याग के लिए दिल से शुक्रिया 💖🌷", "Thank you from my heart for every sacrifice you made 💖🌷"],
  ["आपके जैसा पिता मिलना सौभाग्य की बात है ✨🌟", "It’s a blessing to have a father like you ✨🌟"],
  ["आपका आशीर्वाद हमेशा बना रहे 🌼", "May your blessings always be with me 🌼"],
  ["प्रिय पापा, जन्मदिन की ढेरों शुभकामनाएँ 🎉🎂💐", "Happy Birthday Papa! Lots of love! 💖🎂💐"]
];

let index = 0;
let confettiInterval = null;
let slideshowInterval = null;

// 👨‍👧 Show each slide
function showSlide(i) {
  slides.forEach(slide => slide.classList.remove('active'));
  slides[i].classList.add('active');

  if (slides[i].tagName === "IMG") {
    blurBg.style.backgroundImage = `url('${slides[i].src}')`;
    hindiText.textContent = messages[i][0];
    englishText.textContent = messages[i][1];
    birthdayMessages.style.display = "flex";
    finalMessage.style.display = "none";
  } else {
    // 🎉 Final slide
    blurBg.style.backgroundImage = 'none';
    hindiText.textContent = finalHindi;
    englishText.textContent = finalEnglish;
    birthdayMessages.style.display = "flex";
    finalMessage.style.display = "block";

    // ✅ Stop music and confetti
    audio.pause();
    audio.currentTime = 0;
    clearInterval(confettiInterval);
  }
}

// 🎞️ Start slideshow
function startSlideshow() {
  showSlide(index);
  slideshowInterval = setInterval(() => {
    index++;
    if (index < slides.length) {
      showSlide(index);
    } else {
      clearInterval(slideshowInterval);
    }
  }, 3000);
}

// 🔊 Sound Setup
audio.volume = 0.5;
let isPlaying = false;

function playMusicOnce() {
  if (!isPlaying) {
    audio.play().then(() => {
      isPlaying = true;
      soundToggle.textContent = '🔊';
    }).catch(() => {});
  }
}
document.addEventListener("click", playMusicOnce);

soundToggle.addEventListener('click', () => {
  if (audio.paused || audio.muted) {
    audio.muted = false;
    audio.play();
    soundToggle.textContent = '🔊';
  } else {
    audio.muted = true;
    soundToggle.textContent = '🔈';
  }
});

// 🕒 Countdown Timer
const timer = document.getElementById('timer');
const birthdayDate = new Date(2025, 6, 5); // July 10, 2025

function updateCountdown() {
  const now = new Date();
  const diff = birthdayDate - now;
  if (diff <= 0) {
    timer.textContent = "🎂 It's your birthday! 🎉";
    return;
  }
  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);
  timer.textContent = `${d}d ${h}h ${m}m ${s}s`;
}
setInterval(updateCountdown, 1000);
updateCountdown();

// 🎊 Start Confetti
confettiInterval = setInterval(() => {
  confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
}, 3000);

// 🚀 Start Everything
startSlideshow();
