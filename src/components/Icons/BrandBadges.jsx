const BadgeShell = ({ label, children }) => (
  <span className="relic-badge ornate-button" title={label} aria-label={label}>
    {children}
  </span>
);

export const CloudflareBadge = () => (
  <BadgeShell label="Cloudflare">
    <svg viewBox="0 0 48 32" aria-hidden="true" focusable="false">
      <path
        fill="#F6821F"
        d="M33.6 20.4c.3-1 .2-1.9-.3-2.7-.5-.8-1.3-1.3-2.3-1.5l-16.2-2.2c-.3-.1-.5-.2-.6-.5-.1-.2-.1-.5 0-.8.2-.5.7-.8 1.2-.8l17.1.1c2.2.1 4.5-1.4 5.5-3.4.2-.5.4-1 .5-1.5C36.6 3.1 32.4 0 27.5 0 23.5 0 20 2.2 18.5 5.6c-1.3-.9-2.9-1.3-4.5-1-2.3.4-4.1 2-4.8 4.2-.3-.1-.5-.1-.8-.1-3.3 0-6 2.7-6 6 0 .2 0 .4.1.6C1.1 15.8 0 17.4 0 19.3c0 2.9 2.3 5.3 5.2 5.4h26.8c.1 0 .2 0 .3-.1 1.7-.2 3.1-1.5 3.5-3.1.1-.4.1-.8 0-1.1h-2.2z"
      />
      <path
        fill="#FBAD41"
        d="M40.1 14.2c-.3 0-.6 0-.9.1-.2-2.8-2.6-5-5.5-5-.5 0-1 .1-1.5.2C31 6.5 28 4.4 24.4 4.4c-3.2 0-6 1.7-7.6 4.2-1-.7-2.3-1.1-3.6-1.1-.5 0-1 .1-1.5.2C13.2 4.6 16.8 2 21.1 2c4.2 0 7.8 2.6 9.2 6.2.6-.3 1.3-.4 2-.4 2.6 0 4.8 1.9 5.3 4.4.4-.1.8-.1 1.2-.1 2.6 0 4.8 1.9 5.2 4.4h.1c-1.1-1.4-2.9-2.3-4-2.3z"
        opacity="0.85"
      />
    </svg>
  </BadgeShell>
);

export const HetznerBadge = () => (
  <BadgeShell label="Hetzner">
    <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <rect width="32" height="32" rx="3" fill="#D50C2D" />
      <path fill="#fff" d="M8 7h4.2v7.2H19.8V7H24v18h-4.2v-7.2H12.2V25H8z" />
    </svg>
  </BadgeShell>
);

export const ServerBadge = () => (
  <BadgeShell label="SSH / Server">
    <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <rect x="3" y="4" width="26" height="8" rx="1.5" fill="none" stroke="#e3c47f" strokeWidth="2" />
      <rect x="3" y="14" width="26" height="8" rx="1.5" fill="none" stroke="#e3c47f" strokeWidth="2" />
      <circle cx="8" cy="8" r="1.4" fill="#f6821f" />
      <circle cx="8" cy="18" r="1.4" fill="#7d5f28" />
      <path d="M12 8h12M12 18h12" stroke="#b8954f" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M10 26h12M16 22v4" stroke="#e3c47f" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  </BadgeShell>
);

export const DomainBadge = () => (
  <BadgeShell label="DNS / Domain">
    <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <circle cx="16" cy="16" r="12" fill="none" stroke="#e3c47f" strokeWidth="2" />
      <ellipse cx="16" cy="16" rx="6" ry="12" fill="none" stroke="#b8954f" strokeWidth="1.5" />
      <path d="M4 16h24M16 4c3 3.5 4.5 7.5 4.5 12S19 24.5 16 28M16 4c-3 3.5-4.5 7.5-4.5 12S13 24.5 16 28" fill="none" stroke="#dcae55" strokeWidth="1.4" />
      <circle cx="16" cy="16" r="2" fill="#f7d98a" />
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
