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
      src: "/images/modern-home-pool.jpg",
      alt: "Modern home pool with artistic floating arrangements"
    },
    {
      src: "/images/corporate-event-colorful.jpg",
      alt: "Corporate event with colorful floating arrangements"
    },
    {
      src: "/images/evening-party-elegant.jpg",
      alt: "Evening party with elegant floating centerpieces"
    },
    {
      src: "/images/daytime-lily-arrangements.jpg",
      alt: "Daytime pool with beautiful lily arrangements"
    },
    {
      src: "/images/party-artistic-pieces.jpg",
      alt: "Party with artistic floating pieces and gold accents"
    },
    {
      src: "/images/evening-wreath-arrangements.jpg",
      alt: "Evening pool with elegant wreath arrangements"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative">
      {/* Main Image Container */}
      <div className="relative h-[500px] md:h-[600px] rounded-lg overflow-hidden shadow-2xl">
        <Image
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          fill
          className="object-cover"
          priority
        />
        
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
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Navigation */}
      <nav className="fixed w-full bg-stone-50/98 backdrop-blur-sm z-50 shadow-sm border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <a href="#" className="flex items-center">
              <Image
                src="/images/Main_Logo.png"
                alt="Floating Arrangements - Elevate Your Waterscape"
                width={200}
                height={60}
                className="h-16 w-auto"
                priority
              />
            </a>
            <div className="hidden md:flex space-x-8">
              <a href="#services" className="text-stone-600 hover:text-stone-900 transition">Services</a>
              <a href="#portfolio" className="text-stone-600 hover:text-stone-900 transition">Portfolio</a>
              <a href="#testimonials" className="text-stone-600 hover:text-stone-900 transition">Testimonials</a>
              <a href="#contact" className="text-stone-600 hover:text-stone-900 transition">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-party-artistic.jpg"
            alt="Elegant event with floating arrangements and artistic pieces"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif mb-6 leading-tight">
            Elevate Your Event with Exquisite<br />Floating Arrangements
          </h2>
          <p className="text-lg sm:text-xl mb-10 max-w-3xl mx-auto font-light tracking-wide">
            Specializing in stunning floral and artistic installations for pools, ponds, and water features
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#portfolio"
              className="inline-block bg-amber-700 text-white px-8 py-4 rounded text-lg font-medium hover:bg-amber-800 transition shadow-lg"
            >
              Explore Our Designs
            </a>
            <a
              href="#contact"
              className="inline-block bg-white/95 text-stone-800 px-8 py-4 rounded text-lg font-medium hover:bg-white transition shadow-lg"
            >
              Request a Consultation
            </a>
          </div>
        </div>
      </section>

      {/* Signature Experiences Section */}
      <section id="services" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-4xl sm:text-5xl font-serif text-center mb-16 text-stone-800">
            Our Signature Floating Experiences
          </h3>
          <div className="grid md:grid-cols-3 gap-10">
            {/* Event Decor */}
            <div className="bg-stone-50 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition group">
              <div className="relative h-72 overflow-hidden">
                <Image
                  src="/images/corporate-event-colorful.jpg"
                  alt="Event decor with floating arrangements"
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="p-8">
                <h4 className="text-2xl font-serif mb-4 text-stone-800">Event Decor</h4>
                <p className="text-stone-600 mb-6 leading-relaxed">
                  Weddings, private parties, corporate events – make a statement with our custom-designed
                  floral and artistic floating centerpieces. We create the perfect ambiance for any occasion.
                </p>
                <a href="#portfolio" className="text-amber-700 font-medium hover:text-amber-800 transition">
                  View Event Gallery →
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
                <h4 className="text-2xl font-serif mb-4 text-stone-800">Home & Garden</h4>
                <p className="text-stone-600 mb-6 leading-relaxed">
                  Enhance your backyard oasis, pond, or water feature with our elegant and low-maintenance
                  floating decor. Enjoy year-round beauty and tranquility.
                </p>
                <a href="#portfolio" className="text-amber-700 font-medium hover:text-amber-800 transition">
                  Discover Home Collections →
                </a>
              </div>
            </div>

            {/* Seasonal & Bespoke */}
            <div className="bg-stone-50 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition group">
              <div className="relative h-72 overflow-hidden">
                <Image
                  src="/images/party-artistic-pieces.jpg"
                  alt="Bespoke custom floating arrangements"
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="p-8">
                <h4 className="text-2xl font-serif mb-4 text-stone-800">Seasonal & Bespoke</h4>
                <p className="text-stone-600 mb-6 leading-relaxed">
                  Looking for something truly unique? Our bespoke design service brings your vision to life,
                  crafting one-of-a-kind installations for any theme or season.
                </p>
                <a href="#contact" className="text-amber-700 font-medium hover:text-amber-800 transition">
                  Get a Custom Quote →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-4 bg-stone-50">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl sm:text-5xl font-serif text-center mb-16 text-stone-800">
            Experience the Art of Waterborne Beauty
          </h3>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-amber-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="text-xl font-serif mb-3 text-stone-800">Expert Craftsmanship</h4>
              <p className="text-stone-600 leading-relaxed">
                Each arrangement is meticulously designed and handcrafted by expert florists and artisans,
                ensuring breathtaking beauty and durability.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-amber-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h4 className="text-xl font-serif mb-3 text-stone-800">Seamless Execution</h4>
              <p className="text-stone-600 leading-relaxed">
                From concept to installation, our dedicated team handles every detail, providing a stress-free
                and spectacular experience for your event or property.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-amber-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-serif mb-3 text-stone-800">Personalized Service</h4>
              <p className="text-stone-600 leading-relaxed">
                Your vision is our inspiration. We work closely with you to create arrangements that perfectly
                reflect your style and event&apos;s theme.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl sm:text-5xl font-serif text-center mb-16 text-stone-800">
            What Our Clients Say
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-stone-50 p-8 rounded-lg shadow-md">
              <div className="mb-4">
                <svg className="w-10 h-10 text-amber-700" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-stone-700 mb-6 italic leading-relaxed">
                &ldquo;Floating Arrangements transformed our wedding reception into a fairytale! The pool was absolutely stunning.
                Every guest was in awe.&rdquo;
              </p>
              <p className="text-stone-900 font-medium">— Sarah & Michael</p>
              <p className="text-stone-500 text-sm">Wedding Reception</p>
            </div>

            <div className="bg-stone-50 p-8 rounded-lg shadow-md">
              <div className="mb-4">
                <svg className="w-10 h-10 text-amber-700" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-stone-700 mb-6 italic leading-relaxed">
                &ldquo;Our annual garden party has never looked so elegant. The floating florals were the talk of the evening.
                Simply exquisite!&rdquo;
              </p>
              <p className="text-stone-900 font-medium">— Jennifer Thompson</p>
              <p className="text-stone-500 text-sm">Private Event</p>
            </div>

            <div className="bg-stone-50 p-8 rounded-lg shadow-md">
              <div className="mb-4">
                <svg className="w-10 h-10 text-amber-700" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-stone-700 mb-6 italic leading-relaxed">
                &ldquo;Professional, creative, and utterly beautiful. Highly recommend for anyone looking to add that &lsquo;wow&rsquo; factor
                to their event.&rdquo;
              </p>
              <p className="text-stone-900 font-medium">— Robert Chen</p>
              <p className="text-stone-500 text-sm">Corporate Event</p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Preview Section */}
      <section id="portfolio" className="py-20 px-4 bg-stone-50">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-4xl sm:text-5xl font-serif text-center mb-16 text-stone-800">
            A Glimpse of Our Creations
          </h3>
          <ImageGallery />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-4xl sm:text-5xl font-serif text-center mb-6 text-stone-800">
            Ready to Create Something Beautiful?
          </h3>
          <p className="text-center text-stone-600 text-lg mb-12 max-w-2xl mx-auto">
            Contact us today for a personalized consultation and let us bring your floating vision to life.
          </p>
          <div className="bg-stone-50 rounded-lg p-8 shadow-lg border border-stone-200">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
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
                  rows={5}
                  className="w-full px-4 py-3 rounded border border-stone-300 focus:ring-2 focus:ring-amber-600 focus:border-transparent outline-none bg-white"
                  placeholder="Tell us about your vision..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-amber-700 text-white px-8 py-4 rounded text-lg font-medium hover:bg-amber-800 transition shadow-lg"
              >
                Send Inquiry
              </button>
            </form>
          </div>
          <div className="mt-12 text-center space-y-2">
            <p className="text-stone-700 font-medium">Contact Information</p>
            <p className="text-stone-600">Based in San Diego, California</p>
            <p className="text-stone-600">Serving clients nationwide</p>
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
                  src="/images/Main_Logo.png"
                  alt="Floating Arrangements"
                  width={180}
                  height={54}
                  className="h-14 w-auto brightness-0 invert"
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
