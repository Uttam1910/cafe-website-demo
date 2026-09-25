/** Stylised, illustrative neighbourhood map — not a real map. */
export function MapIllustration() {
  return (
    <figure className="relative overflow-hidden rounded-3xl border border-line bg-[#efe6d6]">
      <svg viewBox="0 0 640 480" className="block h-auto w-full" role="img" aria-labelledby="map-title">
        <title id="map-title">Illustrative map of Bandra West showing the café near Pali Hill</title>
        <path d="M0 0h118c-12 60 8 110-6 170-16 70 22 120 4 190-10 42 6 80-2 120H0Z" fill="#c9d3c4" />
        <path d="M118 0c-12 60 8 110-6 170-16 70 22 120 4 190-10 42 6 80-2 120" fill="none" stroke="#b6c2b0" strokeWidth="3" />
        <text x="30" y="250" fill="#7d8f7a" fontSize="13" fontStyle="italic" transform="rotate(-90 30 250)" fontFamily="Georgia, serif">Arabian Sea</text>
        <rect x="360" y="70" width="120" height="86" rx="18" fill="#d6dcc6" />
        <text x="420" y="118" textAnchor="middle" fill="#6e7f64" fontSize="11" fontFamily="sans-serif">Joggers’ Park</text>
        <rect x="200" y="300" width="96" height="70" rx="14" fill="#d6dcc6" />
        <g stroke="#fbf8f2" strokeLinecap="round" fill="none">
          <path d="M130 90 C 260 110, 420 40, 640 60" strokeWidth="16" />
          <path d="M140 240 C 280 230, 420 260, 640 230" strokeWidth="18" />
          <path d="M130 400 C 260 380, 440 420, 640 400" strokeWidth="14" />
          <path d="M300 0 C 290 120, 330 260, 310 480" strokeWidth="14" />
          <path d="M520 0 C 540 140, 500 300, 540 480" strokeWidth="20" />
          <path d="M200 160 L 420 180" strokeWidth="8" />
          <path d="M380 300 L 600 320" strokeWidth="8" />
          <path d="M200 60 L 230 430" strokeWidth="7" />
        </g>
        <g fill="#8a7a6a" fontSize="11" fontFamily="sans-serif" letterSpacing="1">
          <text x="560" y="220" transform="rotate(-4 560 220)">LINKING RD</text>
          <text x="140" y="80" transform="rotate(4 140 80)">CARTER RD</text>
          <text x="318" y="470" transform="rotate(-86 318 470)">HILL RD</text>
          <text x="400" y="200">PALI HILL</text>
        </g>
        <g transform="translate(372 238)">
          <circle r="34" fill="#b65c3a" opacity="0.16" />
          <circle r="18" fill="#b65c3a" opacity="0.28" />
          <path d="M0 6c-10-12-16-19-16-28a16 16 0 1 1 32 0c0 9-6 16-16 28Z" fill="#b65c3a" transform="translate(0 -6)" />
          <circle cy="-28" r="6" fill="#fbf8f2" />
        </g>
        <g transform="translate(392 170)">
          <rect width="170" height="44" rx="22" fill="#3a2a20" />
          <text x="85" y="20" textAnchor="middle" fill="#fbf8f2" fontSize="12" fontFamily="Georgia, serif" letterSpacing="2">MORNING THEORY</text>
          <text x="85" y="34" textAnchor="middle" fill="#dccdb4" fontSize="9" fontFamily="sans-serif">Bandra West · demo</text>
        </g>
      </svg>
      <figcaption className="absolute bottom-3 left-3 rounded-full bg-paper/90 px-3 py-1 text-[11px] font-semibold text-muted">
        Illustrative map · not to scale
      </figcaption>
    </figure>
  )
}
