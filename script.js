// Add interactivity if needed
document.addEventListener('DOMContentLoaded', function () {
    console.log('Website loaded!');
});


// Event Registration Form
function openRegistration(eventName) {
    const registrationForm = document.getElementById('event-registration');
    const eventNameSpan = document.getElementById('event-name');
    eventNameSpan.textContent = eventName;
    registrationForm.style.display = 'block';
}

function closeRegistration() {
    document.getElementById("event-registration").style.display = "none";
}

// Carecell Contact Button
function callCarecell(phoneNumber) {
    navigator.clipboard.writeText(phoneNumber).then(() => {
        window.location.href = `tel:${phoneNumber}`;
    });
}

// Slideshow Logic
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Start slideshow
setInterval(nextSlide, 3000);

// Event Registration Form
function openRegistration(eventName) {
    const registrationForm = document.getElementById('event-registration');
    const eventNameSpan = document.getElementById('event-name');
    eventNameSpan.textContent = eventName;
    registrationForm.style.display = 'block';
}



// script.js
document.addEventListener('DOMContentLoaded', function () {
    console.log('Website loaded!');

    // Disable right-click
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        alert('Right-click is disabled.');
    });

    // Disable drag-and-drop
    document.addEventListener('dragstart', (e) => {
        e.preventDefault();
    });

    // Disable keyboard shortcuts (Ctrl+S, Ctrl+Shift+I, etc.)
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && (e.key === 's' || e.key === 'S')) {
            e.preventDefault();
            alert('Saving is disabled.');
        }
        if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i')) {
            e.preventDefault();
            alert('Developer tools are disabled.');
        }
    });
});





//login credentials

// Hardcoded gallery credentials
const galleryUsers = [
    { mobile: "9000000000", password: "bfgc2024" },
    { mobile: "8888888888", password: "bfgc2024" }
];

// Called when a gallery card is clicked
function requestGalleryAccess(eventId) {
    document.getElementById("gallery-login").style.display = "block";
    document.getElementById("requestedGalleryId").value = eventId;
}

// Validate gallery login
function validateGalleryLogin(e) {
    e.preventDefault();
    const mobile = document.getElementById("gallery-mobile").value.trim();
    const password = document.getElementById("gallery-password").value.trim();
    const eventId = document.getElementById("requestedGalleryId").value;

    const user = galleryUsers.find(user => user.mobile === mobile && user.password === password);

    if (user) {
        document.getElementById("gallery-login").style.display = "none";
        openEventModal(eventId); // Now open gallery
    } else {
        document.getElementById("login-error").style.display = "block";
    }
}

function closeLoginModal() {
    document.getElementById("gallery-login").style.display = "none";
    document.getElementById("login-error").style.display = "none";
    document.getElementById("gallery-mobile").value = "";
    document.getElementById("gallery-password").value = "";
}


// header

function toggleMenu() {
    const navbar = document.getElementById('navbar').querySelector('ul');
    navbar.classList.toggle('show');
}

// Scroll-triggered Reveal Animation
const revealElements = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.1
});

revealElements.forEach(el => observer.observe(el));

function openImageModal(src) {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    modal.style.display = "flex";
    modalImg.src = src;
}

function closeImageModal() {
    document.getElementById("imageModal").style.display = "none";
}


//Ministries
const learnMoreBtn = document.querySelector(".learn-more-btn");
const moreInfo = document.getElementById("moreInfo");
const collapseBtn = document.querySelector(".collapse-btn");

learnMoreBtn.addEventListener("click", function () {
  moreInfo.style.display = "block";
  learnMoreBtn.style.display = "none";
});

collapseBtn.addEventListener("click", function () {
  moreInfo.style.display = "none";
  learnMoreBtn.style.display = "inline-block";
});

  

// changes made by Rathna 16/05/2025

const mediaData = {
  youthCamp: {
    images: [
      'videos/youth camp 2023/YOUTH3.jpg',
      'videos/youth camp 2023/youth2.jpg',
      'videos/youth camp 2023/youth7.jpg',
      'videos/youth camp 2023/Youth1.jpg',
    
      
    ],
    videos: [
      'videos/youthcamp2.mp4',
      'videos/youthcamp3.mp4'
    ]
  },
  christmas: {
    images: [
       'videos/christmas_2024/VBC2024.jpeg',
      'videos/christmas_2024/VBC2025_1.jpeg',
       'videos/christmas_2024/VBC2025.jpeg',
      'videos/christmas_2024/VBC2.jpeg',
      'videos/christmas_2024/VBC3.jpeg',
      'videos/christmas_2024/VBC4.jpeg',
    ],
    videos: [
      'videos/VBC2023.mp4',
      'videos/christmas_2024/VBC7.jpeg',
      'videos/christmas_2024/VBC6.jpeg',
    ]
  }
};

let currentEvent = '';
let imagePage = 1;
let videoPage = 1;
const imageItemsPerPage = 3;
const videoItemsPerPage = 3;

function openEventModal(eventKey) {
  currentEvent = eventKey;
  imagePage = 1;
  videoPage = 1;

  document.getElementById('eventModalTitle').textContent =
    eventKey === 'youthCamp' ? 'Youth Camp 2023' : 'Christmas Celebration';

  loadImagePage();
  loadVideoPage();

  document.getElementById('eventModal').style.display = 'flex';
}

function closeEventModal() {
  document.getElementById('eventModal').style.display = 'none';
}

function loadImagePage() {
  const gallery = document.getElementById('imageGallery');
  const pageInfo = document.getElementById('imagePageInfo');
  const images = mediaData[currentEvent].images;
  const total = Math.ceil(images.length / imageItemsPerPage);

  const start = (imagePage - 1) * imageItemsPerPage;
  const end = start + imageItemsPerPage;
  gallery.innerHTML = '';

  images.slice(start, end).forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    img.onclick = () => openLightbox(src, 'image');
    gallery.appendChild(img);
  });

  pageInfo.textContent = `Page ${imagePage} of ${total}`;
  document.querySelectorAll('.pagination button')[0].disabled = imagePage === 1;
  document.querySelectorAll('.pagination button')[2].disabled = imagePage === total;
}

function loadVideoPage() {
  const gallery = document.getElementById('videoGallery');
  const pageInfo = document.getElementById('videoPageInfo');
  const videos = mediaData[currentEvent].videos;
  const total = Math.ceil(videos.length / videoItemsPerPage);

  const start = (videoPage - 1) * videoItemsPerPage;
  const end = start + videoItemsPerPage;
  gallery.innerHTML = '';

  videos.slice(start, end).forEach(src => {
    const vid = document.createElement('video');
    vid.src = src;
    vid.muted = true;
    vid.autoplay = false;
    vid.loop = true;
    vid.controls = true;
    vid.onclick = () => openLightbox(src, 'video');
    gallery.appendChild(vid);
  });

  pageInfo.textContent = `Page ${videoPage} of ${total}`;
  document.querySelectorAll('.pagination button')[3].disabled = videoPage === 1;
  document.querySelectorAll('.pagination button')[5].disabled = videoPage === total;
}

function changePage(type, direction) {
  if (type === 'image') {
    imagePage += direction;
    loadImagePage();
  } else if (type === 'video') {
    videoPage += direction;
    loadVideoPage();
  }
}

function openLightbox(src, type) {
  const img = document.getElementById('lightbox-img');
  const vid = document.getElementById('lightbox-video');
  const box = document.getElementById('lightbox');

  if (type === 'image') {
    img.src = src;
    img.style.display = 'block';
    vid.style.display = 'none';
  } else {
    vid.src = src;
    vid.style.display = 'block';
    img.style.display = 'none';
    vid.autoplay = true;
    vid.controls = true;
    vid.style.controls = true;
  }

  box.style.display = 'flex';
}

function closeLightbox() {
  document.getElementById('lightbox').style.display = 'none';
  document.getElementById('lightbox-video').pause();
}

window.onclick = function (e) {
  if (e.target.classList.contains('event-modal')) closeEventModal();
  if (e.target.classList.contains('lightbox')) closeLightbox();
};


// ministries

function showMinistry(ministryId) {
  // Hide all detail sections
  document.querySelectorAll('.ministry-detail').forEach(section => {
    section.style.display = 'none';
  });

  // Show selected one
  const detail = document.getElementById(`${ministryId}-detail`);
  if (detail) {
    detail.style.display = 'block';
    detail.scrollIntoView({ behavior: 'smooth' });
  }
}

function hideMinistries() {
  document.querySelectorAll('.ministry-detail').forEach(section => {
    section.style.display = 'none';
  });
}


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    const offset = 60; // height of your fixed header
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = target.getBoundingClientRect().top;
    const position = elementRect - bodyRect - offset;

    window.scrollTo({
      top: position,
      behavior: 'smooth'
    });
  });
});


