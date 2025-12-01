import React from 'react';

export interface CustomIconProps {
  className?: string;
  size?: number;
}

// Target Icon - For mission/precision
export function CustomTargetIcon({ className = '', size = 24 }: CustomIconProps) {
  const id = React.useId();
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Target icon"
    >
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--chart-1))" stopOpacity="0.9" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="10" stroke={`url(#${id})`} strokeWidth="2.5" fill="none" opacity="0.9" />
      <circle cx="12" cy="12" r="6" stroke={`url(#${id})`} strokeWidth="2.5" fill="none" opacity="0.9" />
      <circle cx="12" cy="12" r="2.5" fill={`url(#${id})`} opacity="0.95" />
    </svg>
  );
}

// Zap Icon - For innovation/energy
export function CustomZapIcon({ className = '', size = 24 }: CustomIconProps) {
  const id = React.useId();
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Energy icon"
    >
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.95" />
          <stop offset="100%" stopColor="hsl(var(--chart-2))" stopOpacity="0.95" />
        </linearGradient>
      </defs>
      <path
        d="M13 2L3 14h8l-1 8 10-12h-8l1-8z"
        fill={`url(#${id})`}
        opacity="0.95"
      />
    </svg>
  );
}

// Users Icon - For collaboration/team
export function CustomUsersIcon({ className = '', size = 24 }: CustomIconProps) {
  const id = React.useId();
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Users icon"
    >
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--chart-1))" stopOpacity="0.95" />
          <stop offset="100%" stopColor="hsl(var(--chart-2))" stopOpacity="0.95" />
        </linearGradient>
      </defs>
      <circle cx="9" cy="7" r="3" fill={`url(#${id})`} opacity="0.95" />
      <circle cx="15" cy="7" r="3" fill={`url(#${id})`} opacity="0.85" />
      <path
        d="M3 18c0-2.5 2.5-4 6-4s6 1.5 6 4v2H3v-2z"
        fill={`url(#${id})`}
        opacity="0.95"
      />
      <path
        d="M15 18c0-1.5 0.5-2.8 1.5-3.7 1-0.9 2.3-1.3 3.5-1.3 2.5 0 4 1.5 4 4v2h-9v-1z"
        fill={`url(#${id})`}
        opacity="0.85"
      />
    </svg>
  );
}

// Globe Icon - For global impact
export function CustomGlobeIcon({ className = '', size = 24 }: CustomIconProps) {
  const id = React.useId();
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Globe icon"
    >
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.95" />
          <stop offset="100%" stopColor="hsl(var(--chart-2))" stopOpacity="0.95" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="10" stroke={`url(#${id})`} strokeWidth="2.5" fill="none" opacity="0.9" />
      <path
        d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
        stroke={`url(#${id})`}
        strokeWidth="2.5"
        opacity="0.9"
      />
    </svg>
  );
}

// CPU Icon - For embedded systems
export function CustomCpuIcon({ className = '', size = 24 }: CustomIconProps) {
  const id = React.useId();
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="CPU icon"
    >
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--chart-1))" stopOpacity="0.95" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.95" />
        </linearGradient>
      </defs>
      <rect x="6" y="6" width="12" height="12" rx="2" stroke={`url(#${id})`} strokeWidth="2.5" fill="none" opacity="0.9" />
      <rect x="9" y="9" width="6" height="6" rx="1" fill={`url(#${id})`} opacity="0.95" />
      <path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" stroke={`url(#${id})`} strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
    </svg>
  );
}

// Brain Icon - For AI/intelligence
export function CustomBrainIcon({ className = '', size = 24 }: CustomIconProps) {
  const id = React.useId();
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Brain icon"
    >
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--chart-2))" stopOpacity="0.95" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.95" />
        </linearGradient>
      </defs>
      <path
        d="M9.5 2a2.5 2.5 0 0 1 5 0c1.5 0 2.5 1 2.5 2.5S17 7 17 7s1 0 1 2.5-1 2.5-1 2.5 1 0 1 2.5-1 3.5-3 3.5h-2v4h-2v-4H9c-2 0-3-1-3-3.5s1-2.5 1-2.5-1 0-1-2.5S7 7 7 7s0-1.5 0-2.5S8 2 9.5 2z"
        fill={`url(#${id})`}
        opacity="0.95"
      />
      <circle cx="9" cy="9" r="1" fill="white" opacity="0.95" />
      <circle cx="15" cy="9" r="1" fill="white" opacity="0.95" />
    </svg>
  );
}

// Rocket Icon - For future/innovation
export function CustomRocketIcon({ className = '', size = 24 }: CustomIconProps) {
  const id = React.useId();
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Rocket icon"
    >
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--chart-3))" stopOpacity="0.95" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.95" />
        </linearGradient>
      </defs>
      <path
        d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"
        fill={`url(#${id})`}
        opacity="0.85"
      />
      <path
        d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"
        fill={`url(#${id})`}
        opacity="0.95"
      />
      <circle cx="15" cy="9" r="2" fill="white" opacity="0.95" />
      <path d="M9 12l-2 2M5 8l-2 2" stroke={`url(#${id})`} strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
    </svg>
  );
}

// Shield Icon - For security
export function CustomShieldIcon({ className = '', size = 24 }: CustomIconProps) {
  const id = React.useId();
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Shield icon"
    >
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--chart-1))" stopOpacity="0.95" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.95" />
        </linearGradient>
      </defs>
      <path
        d="M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4z"
        fill={`url(#${id})`}
        opacity="0.95"
      />
      <path
        d="M9 12l2 2 4-4"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.95"
      />
    </svg>
  );
}

// WiFi Icon - For connectivity
export function CustomWifiIcon({ className = '', size = 24 }: CustomIconProps) {
  const id = React.useId();
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="WiFi icon"
    >
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.95" />
          <stop offset="100%" stopColor="hsl(var(--chart-2))" stopOpacity="0.95" />
        </linearGradient>
      </defs>
      <path
        d="M5 12.55a11 11 0 0 1 14.08 0"
        stroke={`url(#${id})`}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      />
      <path
        d="M1.42 9a16 16 0 0 1 21.16 0"
        stroke={`url(#${id})`}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.75"
      />
      <path
        d="M8.53 16.11a6 6 0 0 1 6.95 0"
        stroke={`url(#${id})`}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      />
      <circle cx="12" cy="20" r="1.5" fill={`url(#${id})`} opacity="0.95" />
    </svg>
  );
}

// Database Icon - For storage
export function CustomDatabaseIcon({ className = '', size = 24 }: CustomIconProps) {
  const id = React.useId();
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Database icon"
    >
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--chart-1))" stopOpacity="0.95" />
          <stop offset="100%" stopColor="hsl(var(--chart-2))" stopOpacity="0.95" />
        </linearGradient>
      </defs>
      <ellipse cx="12" cy="5" rx="9" ry="3" fill={`url(#${id})`} opacity="0.95" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" stroke={`url(#${id})`} strokeWidth="2.5" fill="none" opacity="0.9" />
      <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" stroke={`url(#${id})`} strokeWidth="2.5" opacity="0.9" />
    </svg>
  );
}

// Thermometer Icon - For industrial grade
export function CustomThermometerIcon({ className = '', size = 24 }: CustomIconProps) {
  const id = React.useId();
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Thermometer icon"
    >
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--chart-2))" stopOpacity="0.95" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.95" />
        </linearGradient>
      </defs>
      <path
        d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0z"
        fill={`url(#${id})`}
        opacity="0.95"
      />
      <circle cx="12" cy="17" r="2" fill="white" opacity="0.95" />
      <path d="M12 6v6" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.95" />
    </svg>
  );
}

// Award Icon - For values/excellence
export function CustomAwardIcon({ className = '', size = 24 }: CustomIconProps) {
  const id = React.useId();
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Award icon"
    >
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--chart-2))" stopOpacity="0.95" />
          <stop offset="100%" stopColor="hsl(var(--chart-1))" stopOpacity="0.95" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="8" r="6" fill={`url(#${id})`} opacity="0.95" />
      <path
        d="M8.21 13.89L7 23l5-3 5 3-1.21-9.11"
        fill={`url(#${id})`}
        opacity="0.9"
      />
      <circle cx="12" cy="8" r="3" fill="white" opacity="0.95" />
    </svg>
  );
}
