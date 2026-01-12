/* JavaScript Document

Elite Limo Service Website

Based on TemplateMo 604 Christmas Piano Template

*/

// ===== NAVIGATION =====
function initNavigation() {
   const navToggle = document.getElementById('navToggle');
   const navLinks = document.getElementById('navLinks');

   if (navToggle && navLinks) {
      navToggle.addEventListener('click', () => {
         navToggle.classList.toggle('active');
         navLinks.classList.toggle('active');
      });

      document.querySelectorAll('.nav-links a').forEach(link => {
         link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
         });
      });
   }
}

// ===== GALLERY LIGHTBOX =====
function initGallery() {
   const lightbox = document.getElementById('lightbox');
   const lightboxImg = document.getElementById('lightboxImg');
   const lightboxClose = document.getElementById('lightboxClose');
   const lightboxPrev = document.getElementById('lightboxPrev');
   const lightboxNext = document.getElementById('lightboxNext');
   const galleryItems = document.querySelectorAll('.gallery-item');

   if (!lightbox || !galleryItems.length) return;

   let currentIndex = 0;
   const images = Array.from(galleryItems).map(item => item.querySelector('img').src);

   function openLightbox(index) {
      currentIndex = index;
      lightboxImg.src = images[currentIndex];
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
   }

   function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
   }

   function showPrev() {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      lightboxImg.src = images[currentIndex];
   }

   function showNext() {
      currentIndex = (currentIndex + 1) % images.length;
      lightboxImg.src = images[currentIndex];
   }

   galleryItems.forEach((item, index) => {
      item.addEventListener('click', () => openLightbox(index));
   });

   if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
   if (lightboxPrev) lightboxPrev.addEventListener('click', showPrev);
   if (lightboxNext) lightboxNext.addEventListener('click', showNext);

   lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
   });

   document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
   });
}

// ===== PHONE CLICK HANDLERS =====
function initPhoneHandlers() {
   // Add click-to-call functionality
   document.querySelectorAll('a[href^="tel:"]').forEach(link => {
      link.addEventListener('click', (e) => {
         // Analytics or tracking could be added here
         console.log('Phone number clicked:', link.href);
      });
   });

   // Add hover effects to quote buttons
   document.querySelectorAll('.quote-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
         e.preventDefault();
         // Scroll to contact section or trigger phone call
         const contactSection = document.getElementById('contact');
         if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
         }
      });
   });
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
   document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
         e.preventDefault();
         const target = document.querySelector(this.getAttribute('href'));
         if (target) {
            target.scrollIntoView({
               behavior: 'smooth',
               block: 'start'
            });
         }
      });
   });
}

// ===== CARD HOVER EFFECTS =====
function initCardEffects() {
   // Add subtle animation to service cards
   document.querySelectorAll('.song-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
         card.style.transform = 'translateX(10px)';
      });
      
      card.addEventListener('mouseleave', () => {
         card.style.transform = 'translateX(0)';
      });
   });

   // Add hover effects to fleet cards
   document.querySelectorAll('.feature-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
         card.style.transform = 'translateY(-15px)';
      });
      
      card.addEventListener('mouseleave', () => {
         card.style.transform = 'translateY(0)';
      });
   });
}

// ===== VEHICLE MODAL =====
function initVehicleModal() {
   const vehicleModal = document.getElementById('vehicleModal');
   const vehicleModalClose = document.getElementById('vehicleModalClose');
   const vehicleTitle = document.getElementById('vehicleTitle');
   const vehicleMainImage = document.getElementById('vehicleMainImage');
   const vehicleThumbnails = document.getElementById('vehicleThumbnails');
   const vehiclePrev = document.getElementById('vehiclePrev');
   const vehicleNext = document.getElementById('vehicleNext');
   const clickableCars = document.querySelectorAll('.clickable-car');

   if (!vehicleModal) return;

   // Vehicle data with multiple images for each vehicle
   const vehicleData = {
      'stretch-limo': {
         title: 'Stretch Limousine Gallery',
         images: [
            { src: 'images/stretch-limo.jpg', alt: 'Stretch Limousine Exterior' },
            { src: 'images/stretch-limo-interior.jpg', alt: 'Stretch Limousine Interior' },
            { src: 'images/stretch-limo-side.jpg', alt: 'Stretch Limousine Side View' },
            { src: 'images/stretch-limo-night.jpg', alt: 'Stretch Limousine at Night' }
         ]
      },
      'suv-limo': {
         title: 'SUV Limousine Gallery',
         images: [
            { src: 'images/suv-limo.jpg', alt: 'SUV Limousine Exterior' },
            { src: 'images/suv-limo-interior.jpg', alt: 'SUV Limousine Interior' },
            { src: 'images/suv-limo-seats.jpg', alt: 'SUV Limousine Seating' },
            { src: 'images/suv-limo-bar.jpg', alt: 'SUV Limousine Bar Area' }
         ]
      },
      'party-bus': {
         title: 'Party Bus Gallery',
         images: [
            { src: 'images/party-bus.jpg', alt: 'Party Bus Exterior' },
            { src: 'images/party-bus-interior.jpg', alt: 'Party Bus Interior' },
            { src: 'images/party-bus-dance.jpg', alt: 'Party Bus Dance Floor' },
            { src: 'images/party-bus-lights.jpg', alt: 'Party Bus LED Lights' }
         ]
      },
      'executive-sedan': {
         title: 'Executive Sedan Gallery',
         images: [
            { src: 'images/executive-sedan.jpg', alt: 'Executive Sedan Exterior' },
            { src: 'images/executive-sedan-interior.jpg', alt: 'Executive Sedan Interior' },
            { src: 'images/executive-sedan-business.jpg', alt: 'Executive Sedan Business Setup' },
            { src: 'images/executive-sedan-luxury.jpg', alt: 'Executive Sedan Luxury Features' }
         ]
      },
      'classic-limo': {
         title: 'Classic Limousine Gallery',
         images: [
            { src: 'images/classic-limo.jpg', alt: 'Classic Limousine Exterior' },
            { src: 'images/classic-limo-interior.jpg', alt: 'Classic Limousine Interior' },
            { src: 'images/classic-limo-elegance.jpg', alt: 'Classic Limousine Elegance' },
            { src: 'images/classic-limo-wedding.jpg', alt: 'Classic Limousine for Weddings' }
         ]
      },
      'luxury-van': {
         title: 'Luxury Van Gallery',
         images: [
            { src: 'images/luxury-van.jpg', alt: 'Luxury Van Exterior' },
            { src: 'images/luxury-van-interior.jpg', alt: 'Luxury Van Interior' },
            { src: 'images/luxury-van-seating.jpg', alt: 'Luxury Van Seating' },
            { src: 'images/luxury-van-group.jpg', alt: 'Luxury Van Group Transport' }
         ]
      }
   };

   let currentVehicle = '';
   let currentImageIndex = 0;

   function openVehicleModal(vehicleType) {
      const vehicleInfo = vehicleData[vehicleType];
      if (!vehicleInfo) return;

      currentVehicle = vehicleType;
      currentImageIndex = 0;

      vehicleTitle.textContent = vehicleInfo.title;
      updateMainImage();
      updateThumbnails();
      vehicleModal.classList.add('active');
      document.body.style.overflow = 'hidden';
   }

   function closeVehicleModal() {
      vehicleModal.classList.remove('active');
      document.body.style.overflow = '';
   }

   function updateMainImage() {
      const vehicleInfo = vehicleData[currentVehicle];
      if (!vehicleInfo || !vehicleInfo.images[currentImageIndex]) return;

      const currentImage = vehicleInfo.images[currentImageIndex];
      vehicleMainImage.src = currentImage.src;
      vehicleMainImage.alt = currentImage.alt;
   }

   function updateThumbnails() {
      const vehicleInfo = vehicleData[currentVehicle];
      if (!vehicleInfo) return;

      vehicleThumbnails.innerHTML = '';
      
      vehicleInfo.images.forEach((image, index) => {
         const thumb = document.createElement('img');
         thumb.src = image.src;
         thumb.alt = image.alt;
         thumb.className = 'vehicle-thumb';
         if (index === currentImageIndex) {
            thumb.classList.add('active');
         }
         
         thumb.addEventListener('click', () => {
            currentImageIndex = index;
            updateMainImage();
            updateThumbnailsActive();
         });
         
         vehicleThumbnails.appendChild(thumb);
      });
   }

   function updateThumbnailsActive() {
      document.querySelectorAll('.vehicle-thumb').forEach((thumb, index) => {
         thumb.classList.toggle('active', index === currentImageIndex);
      });
   }

   function showPrevImage() {
      const vehicleInfo = vehicleData[currentVehicle];
      if (!vehicleInfo) return;

      currentImageIndex = (currentImageIndex - 1 + vehicleInfo.images.length) % vehicleInfo.images.length;
      updateMainImage();
      updateThumbnailsActive();
   }

   function showNextImage() {
      const vehicleInfo = vehicleData[currentVehicle];
      if (!vehicleInfo) return;

      currentImageIndex = (currentImageIndex + 1) % vehicleInfo.images.length;
      updateMainImage();
      updateThumbnailsActive();
   }

   // Event listeners
   clickableCars.forEach(car => {
      car.addEventListener('click', (e) => {
         e.preventDefault();
         const vehicleType = car.dataset.vehicle;
         openVehicleModal(vehicleType);
      });
   });

   if (vehicleModalClose) {
      vehicleModalClose.addEventListener('click', closeVehicleModal);
   }

   if (vehiclePrev) {
      vehiclePrev.addEventListener('click', showPrevImage);
   }

   if (vehicleNext) {
      vehicleNext.addEventListener('click', showNextImage);
   }

   vehicleModal.addEventListener('click', (e) => {
      if (e.target === vehicleModal) {
         closeVehicleModal();
      }
   });

   document.addEventListener('keydown', (e) => {
      if (!vehicleModal.classList.contains('active')) return;
      
      if (e.key === 'Escape') closeVehicleModal();
      if (e.key === 'ArrowLeft') showPrevImage();
      if (e.key === 'ArrowRight') showNextImage();
   });
}

// ===== CONTACT FORM (if needed later) =====
function initContactForm() {
   const form = document.getElementById('contactForm');
   if (form) {
      form.addEventListener('submit', (e) => {
         e.preventDefault();
         alert('Thank you for your interest! Please call (999) 999-9999 to make a reservation.');
         form.reset();
      });
   }
}

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
   initNavigation();
   initGallery();
   initVehicleModal();
   initPhoneHandlers();
   initSmoothScrolling();
   initCardEffects();
   initContactForm();
   
   console.log('Elite Limo Service website initialized');
});