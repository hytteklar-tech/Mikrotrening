export default function Logo({ size = 64 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logo-bg" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#ea580c" />
        </linearGradient>
        <linearGradient id="logo-shine" x1="0" y1="0" x2="0" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="white" stopOpacity="0.15" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Rounded square background */}
      <rect width="64" height="64" rx="16" fill="url(#logo-bg)" />
      <rect width="64" height="32" rx="16" fill="url(#logo-shine)" />

      {/* Bold M — two diagonal strokes meeting in a V, flanked by verticals */}
      <path
        d="M13 46 L13 20 L23 20 L32 36 L41 20 L51 20 L51 46 L44 46 L44 30 L34 46 L30 46 L20 30 L20 46 Z"
        fill="white"
      />
    </svg>
  )
}
