import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0b131d] text-[#8e9ba7] pt-20 font-sans">
      <div className="max-w-[1340px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16 pb-16">
        
        {/* Column 1: Brand */}
        <div>
          <Link href="/" className="inline-block mb-6" aria-label="Vacations to Morocco home">
            <Image
              src="/picture/vacations-to-morocco.webp"
              alt="Vacations to Morocco"
              width={200}
              height={70}
              priority
              style={{ height: "65px", width: "auto", objectFit: "contain", filter: "brightness(0) invert(1)" }}
            />
          </Link>
          <p className="text-[15px] leading-relaxed pr-4 text-[#a3b1c2]">
            Vacations to Morocco is a local travel company based in Morocco. We put together real, private trips across the country with a passionate local team.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-white text-sm font-bold tracking-widest uppercase mb-8">Quick Links</h3>
          <ul className="flex flex-col gap-4">
            {[
              { label: "Home", href: "/" },
              { label: "Morocco Trips", href: "/morocco-tours" },
              { label: "About Us", href: "/about-us" },
              { label: "Blog", href: "/blog" },
              { label: "Contact Us", href: "/contact" },
            ].map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="text-[15px] text-[#a3b1c2] hover:text-white hover:pl-1 transition-all">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Contact Info */}
        <div>
          <h3 className="text-white text-sm font-bold tracking-widest uppercase mb-8">Contact Info</h3>
          <ul className="flex flex-col gap-5">
            {/* Phone */}
            <li className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full border border-[#d96c27] flex items-center justify-center shrink-0">
                <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.2" stroke="#d96c27" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.25-3.95-6.847-6.847l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
              </div>
              <a href="tel:+212668422869" className="text-[15px] text-[#a3b1c2] hover:text-[#d96c27] transition-colors">+212 668 422 869</a>
            </li>
            
            {/* WhatsApp */}
            <li className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full border border-[#d96c27] flex items-center justify-center shrink-0">
                <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.2" stroke="#d96c27" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 14.5c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5C8.3 8.1 7.7 6.6 7.5 6c-.2-.6-.4-.5-.6-.5h-.5c-.2 0-.6.1-.9.4-.3.3-1.1 1-1.1 2.5s1.2 2.9 1.3 3.1c.2.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.4z"/>
                </svg>
              </div>
              <a href="https://wa.me/212668422869" target="_blank" rel="noreferrer" className="text-[15px] text-[#a3b1c2] hover:text-[#d96c27] transition-colors">+212 668 422 869</a>
            </li>

            {/* Email */}
            <li className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full border border-[#d96c27] flex items-center justify-center shrink-0">
                <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.2" stroke="#d96c27" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
              </div>
              <a href="mailto:vacationstomorocco@gmail.com" className="text-[15px] text-[#a3b1c2] hover:text-[#d96c27] transition-colors">vacationstomorocco@gmail.com</a>
            </li>

            {/* Location */}
            <li className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full border border-[#d96c27] flex items-center justify-center shrink-0">
                <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.2" stroke="#d96c27" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
              </div>
              <span className="text-[15px] text-[#a3b1c2]">Marrakech, Morocco 40000</span>
            </li>

            {/* Hours */}
            <li className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full border border-[#d96c27] flex items-center justify-center shrink-0">
                <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.2" stroke="#d96c27" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </div>
              <span className="text-[15px] text-[#a3b1c2]">Monday - Sunday: 24/7</span>
            </li>
          </ul>
        </div>

        {/* Column 4: Payment Methods */}
        <div>
          <h3 className="text-white text-sm font-bold tracking-widest uppercase mb-8">Payment Methods</h3>
          
          <div className="flex items-center gap-4 mb-8">
            <svg viewBox="0 0 36 24" width="48" height="32">
              <rect width="36" height="24" rx="3" fill="#ffffff"/>
              <circle cx="13" cy="12" r="7" fill="#eb001b" opacity="0.9" />
              <circle cx="23" cy="12" r="7" fill="#f79e1b" opacity="0.9" />
            </svg>
            <svg viewBox="0 0 36 24" width="48" height="32">
              <rect width="36" height="24" rx="3" fill="#ffffff"/>
              <text x="5" y="17" fontFamily="Arial" fontStyle="italic" fontWeight="bold" fontSize="12" fill="#1434cb">VISA</text>
            </svg>
            <svg viewBox="0 0 45 24" width="60" height="32">
              <rect width="45" height="24" rx="3" fill="#ffffff"/>
              <text x="5" y="16" fontFamily="Arial" fontStyle="italic" fontWeight="bold" fontSize="11" fill="#003087">PayPal</text>
            </svg>
          </div>

          <p className="text-[14px] text-[#a3b1c2] mb-4">
            We accept secure payments worldwide
          </p>
          
          <div className="flex items-center gap-2 text-[#d96c27] text-sm font-medium">
            <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
            100% Secure Payment
          </div>
        </div>
      </div>

      {/* Full Width Divider Line */}
      <div className="w-full h-[1px] bg-[#1e2936]"></div>

      {/* Follow Us Section */}
      <div className="flex flex-col items-center pt-10 pb-4">
        <h3 className="text-white text-[15px] font-serif tracking-[0.15em] uppercase">FOLLOW US</h3>
        <div className="w-8 h-[2px] bg-[#d96c27] mt-3 mb-8"></div>
        
        <div className="flex gap-5">
          {/* Instagram */}
          <a href="https://www.instagram.com/vacationstomorocco" target="_blank" rel="noopener noreferrer" className="w-[52px] h-[52px] rounded-full border-2 border-[#d96c27] flex items-center justify-center text-white hover:bg-[#d96c27] transition-all duration-300" aria-label="Instagram">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
          </a>

{/* Tripadvisor */}
<a
  href="https://www.tripadvisor.com"
  target="_blank"
  rel="noopener noreferrer"
  className="w-[52px] h-[52px] rounded-full border-2 border-[#d96c27] flex items-center justify-center text-white hover:bg-[#d96c27] transition-all duration-300"
  aria-label="Tripadvisor"
>
  <svg
    viewBox="0 0 24 24"
    width="26"
    height="26"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Left eye */}
    <circle cx="8.5" cy="11.5" r="3.8" />
    {/* Right eye */}
    <circle cx="15.5" cy="11.5" r="3.8" />
    {/* Left pupil */}
    <circle cx="8.5" cy="11.5" r="1.15" fill="currentColor" stroke="none" />
    {/* Right pupil */}
    <circle cx="15.5" cy="11.5" r="1.15" fill="currentColor" stroke="none" />
    {/* Beak */}
    <path
      d="M12 15.2 L10.2 17.6 L13.8 17.6 Z"
      fill="currentColor"
      stroke="none"
    />
  </svg>
</a>

          {/* WhatsApp */}
          <a href="https://wa.me/212668422869" target="_blank" rel="noopener noreferrer" className="w-[52px] h-[52px] rounded-full border-2 border-[#d96c27] flex items-center justify-center text-white hover:bg-[#d96c27] transition-all duration-300" aria-label="WhatsApp">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M12.031 0A12.031 12.031 0 000 12.031c0 2.126.556 4.148 1.559 5.926L.078 23.364l5.589-1.464A11.968 11.968 0 0012.031 24c6.634 0 12.031-5.397 12.031-12.031S18.665 0 12.031 0zm0 22.016a9.92 9.92 0 01-5.076-1.39l-.364-.216-3.766.988.988-3.66c-.244-.39-.47-.8-.674-1.23A9.976 9.976 0 012.016 12.03C2.016 6.505 6.505 2.016 12.031 2.016c5.526 0 10.015 4.489 10.015 10.015 0 5.526-4.489 10.015-10.015 10.015zm5.498-7.514c-.301-.151-1.785-.88-2.062-.979-.278-.1-.478-.151-.678.151-.2.301-.78 1-.955 1.2-.175.201-.351.226-.653.075-1.306-.653-2.31-1.129-3.239-2.712-.2-.351.2-.326.5-.93.151-.301.075-.552-.025-.753-.1-.201-.678-1.632-.93-2.235-.251-.603-.502-.527-.678-.527-.175 0-.376 0-.577 0-.2 0-.527.075-.804.376-.276.301-1.054 1.03-1.054 2.51 0 1.48 1.079 2.911 1.23 3.112.151.2 2.108 3.212 5.111 4.542.703.326 1.255.502 1.682.653.703.226 1.33.175 1.832.1.552-.075 1.785-.728 2.036-1.431.251-.703.251-1.305.175-1.431-.075-.125-.276-.2-.577-.35z"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-[#080d12] w-full mt-6 py-6 border-t border-[#111c26] text-center text-[13px] text-[#5b6a7a]">
        <p>© {new Date().getFullYear()} Vacations to Morocco. All Rights Reserved.</p>
      </div>
    </footer>
  );
}