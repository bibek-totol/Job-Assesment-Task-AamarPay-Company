"use client";

import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-neutral-300 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand Section */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">YourBrand</h2>
          <p className="text-sm text-neutral-400 leading-relaxed">
            Empowering people with technology and innovation.  
            We build solutions for a smarter tomorrow.
          </p>
          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-indigo-400 transition">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="hover:text-indigo-400 transition">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="hover:text-indigo-400 transition">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="#" className="hover:text-indigo-400 transition">
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-indigo-400 transition">About Us</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition">Services</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition">Careers</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition">Contact</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-indigo-400 transition">Blog</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition">Case Studies</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition">Help Center</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Get in Touch</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-indigo-400" />
              support@yourbrand.com
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-indigo-400" />
              +880 1234 567 890
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-indigo-400" />
              Dhaka, Bangladesh
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-800 mt-8">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center text-sm text-neutral-500">
          <p>© {new Date().getFullYear()} YourBrand. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Designed & Developed with ❤️ by YourBrand</p>
        </div>
      </div>
    </footer>
  );
}
