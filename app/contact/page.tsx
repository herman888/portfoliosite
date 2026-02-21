export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto py-16 px-4 text-center bg-[#f5f5dc] rounded-xl shadow border border-[#d6c9a5]">
      <h1 className="text-3xl font-bold mb-4 text-[#bfa94c]">Contact</h1>
      <p className="text-gray-700 mb-6">Let’s connect! Reach out for collaborations, questions, or opportunities.</p>
      <div className="mb-6 flex flex-col items-center gap-2">
        <a href="mailto:your@email.com" className="text-lg text-blue-700 hover:underline">your@email.com</a>
        <div className="flex gap-4 justify-center mt-2">
          <a href="https://www.linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="#0A66C2" d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8.98h5V24H0V8.98zm7.5 0h4.78v2.08h.07c.67-1.27 2.3-2.61 4.73-2.61 5.06 0 6 3.33 6 7.66V24h-5v-6.44c0-1.54-.03-3.52-2.15-3.52-2.16 0-2.49 1.68-2.49 3.41V24h-5V8.98z"/></svg>
          </a>
          <a href="https://github.com/herman888" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="#333" d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.17c-3.34.73-4.04-1.61-4.04-1.61-.54-1.37-1.32-1.74-1.32-1.74-1.08-.74.08-.73.08-.73 1.2.08 1.83 1.23 1.83 1.23 1.06 1.82 2.78 1.29 3.46.99.11-.77.42-1.29.76-1.59-2.67-.3-5.48-1.33-5.48-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.17 0 0 1-.32 3.28 1.23.95-.26 1.97-.39 2.98-.39s2.03.13 2.98.39c2.28-1.55 3.28-1.23 3.28-1.23.66 1.65.25 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.49 5.93.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.82.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>
          </a>
        </div>
      </div>
      <form className="bg-white rounded-lg shadow p-6 flex flex-col gap-4 max-w-md mx-auto">
        <input type="text" placeholder="Name" className="border border-[#d6c9a5] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#bfa94c]" />
        <input type="email" placeholder="Email" className="border border-[#d6c9a5] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#bfa94c]" />
        <textarea placeholder="Message" rows={4} className="border border-[#d6c9a5] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#bfa94c]" />
        <button type="submit" className="bg-[#bfa94c] text-white font-bold py-2 rounded hover:bg-[#a88c3c] transition">Send</button>
      </form>
    </div>
  );
}
