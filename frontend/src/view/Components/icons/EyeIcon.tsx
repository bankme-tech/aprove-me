interface EyeIconProps {
  open: boolean;
}

export function EyeIcon({ open }: EyeIconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {!open && (
        <path d="M3.99902 7.47656C7.19902 14.4096 16.799 14.4096 19.999 7.47656M6.86194 11.0156L4.00293 14.9446M17.1436 11.0156L20.0016 14.9446M11.999 12.6797V16.5457" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      )}

      {open && (
        <path d="M4 12.7474C7.2 5.81337 16.8 5.81337 20 12.7474M12.0034 16.4776C10.7314 16.4776 9.69141 15.4426 9.69141 14.1646C9.69141 12.8876 10.7314 11.8516 12.0034 11.8516C13.2764 11.8516 14.3164 12.8876 14.3164 14.1646C14.3164 15.4426 13.2764 16.4776 12.0034 16.4776Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  );
}
