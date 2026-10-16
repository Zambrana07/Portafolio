const BadgeShell = ({ label, children }) => (
  <span className="relic-badge ornate-button" title={label} aria-label={label}>
    {children}
  </span>
);

export const CloudflareBadge = () => (
  <BadgeShell label="Cloudflare">
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
      <path
        fill="#F6821F"
        d="M16.5 16.2H5.1c-.9 0-1.7-.5-2.1-1.3-.4-.8-.3-1.7.3-2.3.5-.5 1.3-.8 2-.7l8.7 1.2c.2 0 .3.1.4.2.1.1.1.3 0 .4-.1.2-.3.3-.5.3H5.5c-.3 0-.5-.2-.5-.5s.2-.5.5-.5h8.4c1.1 0 2.1.7 2.4 1.7.1.4.1.8 0 1.2-.3.8-1.1 1.3-2 1.3h.2z"
      />
      <path
        fill="#FBAD41"
        d="M19.2 14.8c-.1-1.5-1.3-2.6-2.8-2.6-.3 0-.6 0-.9.1C14.8 10.2 13 9 10.9 9c-1.8 0-3.4.9-4.3 2.4-.4-.2-.8-.3-1.2-.3-.3 0-.5 0-.8.1C5.4 9.5 7.2 8 9.4 8c2.3 0 4.3 1.4 5.1 3.4.4-.2.8-.3 1.2-.3 1.5 0 2.8 1 3.2 2.4.2 0 .3 0 .5 0 1.1 0 2.1.6 2.6 1.5h-2.8z"
      />
    </svg>
  </BadgeShell>
);

export const HetznerBadge = () => (
  <BadgeShell label="Hetzner">
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
      <rect width="24" height="24" rx="3" fill="#D50C2D" />
      <path fill="#fff" d="M6 5h3.2v5.4H14.8V5H18v14h-3.2v-5.4H9.2V19H6z" />
    </svg>
  </BadgeShell>
);

export const ServerBadge = () => (
  <BadgeShell label="SSH / Server">
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
      <rect x="2" y="3" width="20" height="6" rx="1.2" fill="#2a2118" stroke="#e3c47f" strokeWidth="1.5" />
      <rect x="2" y="11" width="20" height="6" rx="1.2" fill="#2a2118" stroke="#e3c47f" strokeWidth="1.5" />
      <circle cx="6" cy="6" r="1.1" fill="#F6821F" />
      <circle cx="6" cy="14" r="1.1" fill="#b8954f" />
      <path d="M9.5 6h9M9.5 14h9" stroke="#dcae55" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M8 20h8M12 17v3" stroke="#e3c47f" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  </BadgeShell>
);

export const DomainBadge = () => (
  <BadgeShell label="DNS / Domain">
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="9" fill="#1a120c" stroke="#e3c47f" strokeWidth="1.5" />
      <ellipse cx="12" cy="12" rx="4" ry="9" fill="none" stroke="#b8954f" strokeWidth="1.2" />
      <path d="M3 12h18" stroke="#dcae55" strokeWidth="1.2" />
      <path d="M12 3c2.2 2.6 3.3 5.6 3.3 9S14.2 18.4 12 21M12 3C9.8 5.6 8.7 8.6 8.7 12S9.8 18.4 12 21" fill="none" stroke="#f7d98a" strokeWidth="1.1" />
      <circle cx="12" cy="12" r="1.6" fill="#F6821F" />
    </svg>
  </BadgeShell>
);

const BADGES = {
  cloudflare: CloudflareBadge,
  hetzner: HetznerBadge,
  server: ServerBadge,
  domain: DomainBadge
};

export const RelicBadges = ({ ids = [] }) => {
  if (!ids.length) return null;
  return (
    <div className="relic-badges" aria-hidden="true">
      {ids.map(id => {
        const Icon = BADGES[id];
        return Icon ? <Icon key={id} /> : null;
      })}
    </div>
  );
};
