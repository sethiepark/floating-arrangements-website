"use client";

import Image from "next/image";
import { useState } from "react";

// Gallery component
function ImageGallery() {
  const images = [
    {
      src: "/images/wedding-rose-arrangement.jpg",
      alt: "Wedding ceremony with floating rose arrangement in pool"
    },
    {
      src: "/images/nice-event.jpg",
      alt: "Elegant event with floating arrangements"
    },
    {
      src: "/images/party-artistic-pieces.jpg",
      alt: "Party with artistic floating pieces and arrangements"
    },
    {
      src: "/images/daytime-lily-arrangements.jpg",
      alt: "Daytime pool with beautiful lily arrangements"
    },
    {
      src: "/images/poolside-pink-roses.jpg",
      alt: "Poolside luxury setting with pink rose arrangements"
    },
    {
      src: "/images/rose-halo-party.jpg",
      alt: "Party with rose halo floating arrangement"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToNext = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  const goToPrevious = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => 
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  const goToSlide = (index: number) => {
    if (!isTransitioning && index !== currentIndex) {
      setIsTransitioning(true);
      setCurrentIndex(index);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  return (
    <div className="relative">
      {/* Main Image Container */}
      <div className="relative h-[500px] md:h-[600px] rounded-lg overflow-hidden shadow-2xl">
        <div className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
          <Image
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            fill
            className="object-cover"
            style={{ objectPosition: 'center center' }}
            priority
          />
        </div>
        
        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-stone-800 p-3 rounded-full shadow-lg transition z-10"
          aria-label="Previous image"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-stone-800 p-3 rounded-full shadow-lg transition z-10"
          aria-label="Next image"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-3 rounded-full transition ${
              index === currentIndex
                ? "bg-amber-700 w-8"
                : "bg-stone-300 hover:bg-stone-400 w-3"
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>

      {/* Image Counter */}
      <div className="text-center mt-4 text-stone-600">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: 'Event Decor',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/xkgpjlbo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        // Clear the form
        setFormData({
          name: '',
          email: '',
          inquiryType: 'Event Decor',
          message: ''
        });
        alert('Thank you for your inquiry! We will get back to you soon.');
      } else {
        alert('There was an error sending your message. Please try again.');
      }
    } catch (error) {
      alert('There was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Navigation */}
      <nav className="fixed w-full bg-stone-50/98 backdrop-blur-sm z-50 shadow-sm border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            <a href="#" className="flex items-center">
              <Image
                src="/images/Main_Logo.png"
                alt="Floating Arrangements - Elevate Your Waterscape"
                width={1440}
                height={720}
                className="h-24 w-auto"
                priority
              />
            </a>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              <a href="#services" className="text-stone-600 hover:text-stone-900 transition">Services</a>
              <a href="#portfolio" className="text-stone-600 hover:text-stone-900 transition">Portfolio</a>
              <a href="#testimonials" className="text-stone-600 hover:text-stone-900 transition">Testimonials</a>
              <a href="#contact" className="text-stone-600 hover:text-stone-900 transition">Contact</a>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-stone-600 hover:text-stone-900 transition"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMenuOpen && (
            <div className="md:hidden pb-4">
              <div className="flex flex-col space-y-3">
                <a 
                  href="#services" 
                  className="text-stone-600 hover:text-stone-900 transition py-2 px-4 hover:bg-stone-100 rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Services
                </a>
                <a 
                  href="#portfolio" 
                  className="text-stone-600 hover:text-stone-900 transition py-2 px-4 hover:bg-stone-100 rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Portfolio
                </a>
                <a 
                  href="#testimonials" 
                  className="text-stone-600 hover:text-stone-900 transition py-2 px-4 hover:bg-stone-100 rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Testimonials
                </a>
                <a 
                  href="#contact" 
                  className="text-stone-600 hover:text-stone-900 transition py-2 px-4 hover:bg-stone-100 rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-event.jpg"
            alt="Elegant event with floating arrangements"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
          <div className="mb-4 text-sm tracking-[0.3em] uppercase text-amber-200 font-light">
            Bespoke Floral Artistry
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-serif mb-6 leading-tight tracking-tight">
            Transform Your Celebration Into<br />an Unforgettable Masterpiece
          </h2>
          <p className="text-lg sm:text-xl mb-10 max-w-3xl mx-auto font-light tracking-wide leading-relaxed">
            Premiere atelier specializing in exquisite floating installations for the world's most distinguished celebrations and private estates
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#portfolio"
              className="inline-block bg-gradient-to-r from-amber-600 to-amber-700 text-white px-10 py-4 rounded text-lg font-medium hover:from-amber-700 hover:to-amber-800 transition shadow-2xl transform hover:scale-105 duration-300"
            >
              View Our Portfolio
            </a>
            <a
              href="#contact"
              className="inline-block bg-white/95 text-stone-900 px-10 py-4 rounded text-lg font-medium hover:bg-white transition shadow-2xl border border-amber-200/30 transform hover:scale-105 duration-300"
            >
              Schedule Private Consultation
            </a>
          </div>
          <div className="mt-12 text-amber-100/90 text-sm tracking-wider">
            ★ Serving Discerning Clients Since 2020 ★
          </div>
        </div>
      </section>

      {/* Signature Experiences Section */}
      <section id="services" className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6 text-sm tracking-[0.3em] uppercase text-amber-700 font-light">
            Our Signature Collections
          </div>
          <h3 className="text-4xl sm:text-5xl font-serif text-center mb-6 text-stone-800">
            Curated Floating Experiences
          </h3>
          <p className="text-center text-stone-600 max-w-2xl mx-auto mb-16 text-lg leading-relaxed">
            Each installation is meticulously designed and handcrafted to transform your waterscape into an unforgettable work of art
          </p>
          <div className="grid md:grid-cols-3 gap-10">
            {/* Event Decor */}
            <div className="bg-stone-50 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition group">
              <div className="relative h-72 overflow-hidden">
                <Image
                  src="/images/evening-party-elegant.jpg"
                  alt="Event decor with elegant floating arrangements"
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="p-8">
                <h4 className="text-2xl font-serif mb-4 text-stone-800">Premier Events</h4>
                <p className="text-stone-600 mb-6 leading-relaxed">
                  Elevate weddings, galas, and corporate celebrations with our bespoke floating centerpieces. 
                  Each design is custom-crafted to reflect your unique vision and create an atmosphere of refined elegance.
                </p>
                <a href="#portfolio" className="text-amber-700 font-medium hover:text-amber-800 transition inline-flex items-center gap-2">
                  View Event Gallery 
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Home & Garden */}
            <div className="bg-stone-50 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition group">
              <div className="relative h-72 overflow-hidden">
                <Image
                  src="/images/modern-home-pool.jpg"
                  alt="Home and garden floating arrangements"
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="p-8">
                <h4 className="text-2xl font-serif mb-4 text-stone-800">Estate & Residence</h4>
                <p className="text-stone-600 mb-6 leading-relaxed">
                  Transform your private oasis with our signature floating installations. 
                  Meticulously curated designs that bring timeless beauty and sophistication to your pool, pond, or water feature.
                </p>
                <a href="#portfolio" className="text-amber-700 font-medium hover:text-amber-800 transition inline-flex items-center gap-2">
                  Discover Collections
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Seasonal & Bespoke */}
            <div className="bg-stone-50 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition group">
              <div className="relative h-72 overflow-hidden">
                <Image
                  src="/images/evening-sculpture-arrangements.jpg"
                  alt="Bespoke custom floating arrangements"
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="p-8">
                <h4 className="text-2xl font-serif mb-4 text-stone-800">Bespoke Couture</h4>
                <p className="text-stone-600 mb-6 leading-relaxed">
                  Commission an exclusive, one-of-a-kind masterpiece. Our artisans work intimately with you 
                  to bring your most ambitious vision to life with unparalleled craftsmanship and attention to detail.
                </p>
                <a href="#contact" className="text-amber-700 font-medium hover:text-amber-800 transition inline-flex items-center gap-2">
                  Begin Your Journey
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-stone-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6 text-sm tracking-[0.3em] uppercase text-amber-700 font-light">
            The Floating Arrangements Difference
          </div>
          <h3 className="text-4xl sm:text-5xl font-serif text-center mb-6 text-stone-800">
            Uncompromising Excellence
          </h3>
          <p className="text-center text-stone-600 max-w-2xl mx-auto mb-16 text-lg leading-relaxed">
            Every detail matters when creating moments that will be remembered for a lifetime
          </p>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-amber-100 to-amber-50 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-10 h-10 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="text-xl font-serif mb-3 text-stone-800">Artisan Craftsmanship</h4>
              <p className="text-stone-600 leading-relaxed">
                Each arrangement is a testament to exceptional skill and artistry. Our master florists hand-select 
                premium materials and craft every element with meticulous precision.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-amber-100 to-amber-50 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-10 h-10 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h4 className="text-xl font-serif mb-3 text-stone-800">White-Glove Service</h4>
              <p className="text-stone-600 leading-relaxed">
                From initial consultation to final installation, experience flawless execution. Our dedicated team 
                orchestrates every detail, ensuring a seamless and stress-free experience.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-amber-100 to-amber-50 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-10 h-10 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h4 className="text-xl font-serif mb-3 text-stone-800">Exclusive Designs</h4>
              <p className="text-stone-600 leading-relaxed">
                Your vision deserves to be singular. Every installation is uniquely created for you—never replicated, 
                always extraordinary, eternally memorable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Preview Section */}
      <section id="portfolio" className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-6 text-sm tracking-[0.3em] uppercase text-amber-700 font-light">
            Our Portfolio
          </div>
          <h3 className="text-4xl sm:text-5xl font-serif text-center mb-6 text-stone-800">
            Recent Masterpieces
          </h3>
          <p className="text-center text-stone-600 max-w-2xl mx-auto mb-16 text-lg leading-relaxed">
            Each creation tells a unique story of elegance, artistry, and unforgettable moments
          </p>
          <ImageGallery />
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 px-4 bg-gradient-to-b from-stone-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6 text-sm tracking-[0.3em] uppercase text-amber-700 font-light">
            Client Testimonials
          </div>
          <h3 className="text-4xl sm:text-5xl font-serif text-center mb-16 text-stone-800">
            Celebrated by Our Clients
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg border border-stone-100">
              <div className="mb-4">
                <svg className="w-10 h-10 text-amber-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-stone-700 mb-6 italic leading-relaxed text-lg">
                &ldquo;Floating Arrangements transformed our wedding into an absolute fairytale. The artistry was breathtaking, 
                and every guest was captivated by the beauty. Simply extraordinary.&rdquo;
              </p>
              <p className="text-stone-900 font-semibold">Sarah & Michael Thompson</p>
              <p className="text-amber-700 text-sm font-medium">The Grand Del Mar</p>
              <p className="text-stone-500 text-sm">San Diego, CA</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg border border-stone-100">
              <div className="mb-4">
                <svg className="w-10 h-10 text-amber-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-stone-700 mb-6 italic leading-relaxed text-lg">
                &ldquo;Our annual gala has never looked so spectacular. The floating installations were the epitome of elegance 
                and sophistication. An absolute masterclass in luxury design.&rdquo;
              </p>
              <p className="text-stone-900 font-semibold">Jennifer Ashford</p>
              <p className="text-amber-700 text-sm font-medium">Private Estate</p>
              <p className="text-stone-500 text-sm">Rancho Santa Fe, CA</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg border border-stone-100">
              <div className="mb-4">
                <svg className="w-10 h-10 text-amber-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-stone-700 mb-6 italic leading-relaxed text-lg">
                &ldquo;Impeccable artistry, flawless execution, and simply stunning results. The team's attention to detail 
                and commitment to perfection exceeded every expectation.&rdquo;
              </p>
              <p className="text-stone-900 font-semibold">Robert Chen</p>
              <p className="text-amber-700 text-sm font-medium">Corporate Event</p>
              <p className="text-stone-500 text-sm">La Jolla, CA</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6 text-sm tracking-[0.3em] uppercase text-amber-700 font-light">
            Begin Your Journey
          </div>
          <h3 className="text-4xl sm:text-5xl font-serif text-center mb-6 text-stone-800">
            Let's Create Something Extraordinary
          </h3>
          <p className="text-center text-stone-600 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
            Schedule a private consultation to discuss your vision. Our team will work closely with you 
            to craft a bespoke floating masterpiece that exceeds your expectations.
          </p>
          <div className="bg-stone-50 rounded-lg p-8 shadow-lg border border-stone-200">
            <form 
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* Hidden field for better email subject */}
              <input type="hidden" name="_subject" value="New Contact Form Inquiry - Floating Arrangements" />
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded border border-stone-300 focus:ring-2 focus:ring-amber-600 focus:border-transparent outline-none bg-white"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded border border-stone-300 focus:ring-2 focus:ring-amber-600 focus:border-transparent outline-none bg-white"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="inquiryType" className="block text-sm font-medium text-stone-700 mb-2">
                  Type of Inquiry
                </label>
                <select
                  id="inquiryType"
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded border border-stone-300 focus:ring-2 focus:ring-amber-600 focus:border-transparent outline-none bg-white"
                >
                  <option>Event Decor</option>
                  <option>Home & Garden</option>
                  <option>Custom/Bespoke Design</option>
                  <option>General Inquiry</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded border border-stone-300 focus:ring-2 focus:ring-amber-600 focus:border-transparent outline-none bg-white"
                  placeholder="Tell us about your vision..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white px-8 py-4 rounded text-lg font-medium hover:from-amber-700 hover:to-amber-800 transition shadow-2xl disabled:from-amber-400 disabled:to-amber-400 disabled:cursor-not-allowed transform hover:scale-[1.02] duration-300"
              >
                {isSubmitting ? 'Submitting...' : 'Request Private Consultation'}
              </button>
            </form>
          </div>
          <div className="mt-12 text-center space-y-3">
            <p className="text-stone-700 font-medium text-lg">Contact Information</p>
            <p className="text-stone-600">San Diego, California</p>
            <p className="text-sm text-amber-700 tracking-wide">★ Serving Southern California's Premier Venues & Estates ★</p>
            <p className="text-xs text-stone-500 mt-4">Limited availability • Advance booking recommended</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-800 text-stone-100 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="mb-4">
                <Image
                  src="/images/Main_Logo_white.png"
                  alt="Floating Arrangements"
                  width={324}
                  height={162}
                  className="h-27 w-auto"
                />
              </div>
              <p className="text-stone-300 leading-relaxed">
                Transforming water features into artistic focal points with sustainable,
                floating floral designs and art pieces.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#services" className="text-stone-300 hover:text-white transition">Services</a></li>
                <li><a href="#portfolio" className="text-stone-300 hover:text-white transition">Portfolio</a></li>
                <li><a href="#testimonials" className="text-stone-300 hover:text-white transition">Testimonials</a></li>
                <li><a href="#contact" className="text-stone-300 hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-stone-300 hover:text-white transition">
                  <span className="sr-only">Instagram</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="#" className="text-stone-300 hover:text-white transition">
                  <span className="sr-only">Pinterest</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="#" className="text-stone-300 hover:text-white transition">
                  <span className="sr-only">Facebook</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-stone-700 pt-8 text-center">
            <p className="text-stone-400 text-sm">
              &copy; {new Date().getFullYear()} Floating Arrangements. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
