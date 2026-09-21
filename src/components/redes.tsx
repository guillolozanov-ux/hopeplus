/** Íconos de redes sociales (trazos propios, 24 × 24, heredan el color del texto). */
const iconos: Record<string, React.ReactNode> = {
  Instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.3" cy="6.7" r="1.2" fill="currentColor" />
    </>
  ),
  Facebook: (
    <path
      fill="currentColor"
      d="M12 2a10 10 0 0 0-1.56 19.88v-7H7.9V12h2.54V9.8c0-2.5 1.49-3.9 3.78-3.9 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 2.88h-2.33v7A10 10 0 0 0 12 2Z"
    />
  ),
  LinkedIn: (
    <path
      fill="currentColor"
      d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.8v1.5h.05c.53-1 1.83-1.8 3.77-1.8 4 0 4.88 2.4 4.88 5.6v5.7h-4v-5.05c0-1.2-.02-2.75-1.7-2.75-1.7 0-1.95 1.3-1.95 2.65v5.15H9.5v-11Z"
    />
  ),
  X: <path fill="currentColor" d="M17.5 3h3.2l-7 8 8.2 10H15.5l-5-6.3L4.8 21H1.6l7.5-8.6L1.2 3h6.5l4.5 5.8L17.5 3Zm-1.1 16.2h1.8L7 4.7H5.1l11.3 14.5Z" />,
};

export function IconoRed({ red, className }: { red: string; className?: string }) {
  const icono = iconos[red];
  if (!icono) return null;
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden focusable="false">
      {icono}
    </svg>
  );
}
