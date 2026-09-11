import fs from 'fs';
import path from 'path';

export interface SocialLinks {
  telegram?: string;
  viber?: string;
  instagram?: string;
  whatsapp?: string;
  youtube?: string;
  tiktok?: string;
  facebook?: string;
}

export interface ContactsData {
  phone: string;
  phoneSecondary?: string;
  email?: string;
  address?: string;
  workingHours?: string;
  socials?: SocialLinks;
}

export const defaultContacts: ContactsData = {
  phone: '+38 (097) 935-59-50',
  phoneSecondary: '',
  email: 'info@avtomentor.com',
  address: 'Онлайн по всій Україні',
  workingHours: 'Пн-Нд: 08:00 — 21:00',
  socials: {
    telegram: 'https://t.me/avtomentor',
    viber: '+380979355950',
    instagram: 'https://instagram.com/avtomentor',
    whatsapp: '',
    youtube: '',
    tiktok: '',
    facebook: '',
  },
};

/**
 * Reads contacts data from settings/contacts.json.
 * Falls back safely to defaultContacts if file is missing or invalid.
 */
export function getContactsData(): ContactsData {
  try {
    const filePath = path.join(process.cwd(), 'settings', 'contacts.json');
    if (!fs.existsSync(filePath)) {
      return defaultContacts;
    }
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const parsed = JSON.parse(fileContent);

    return {
      phone: parsed.phone || defaultContacts.phone,
      phoneSecondary: parsed.phoneSecondary || '',
      email: parsed.email || defaultContacts.email,
      address: parsed.address || defaultContacts.address,
      workingHours: parsed.workingHours || defaultContacts.workingHours,
      socials: {
        ...defaultContacts.socials,
        ...(parsed.socials || {}),
      },
    };
  } catch (error) {
    console.error('Помилка при читанні контактів:', error);
    return defaultContacts;
  }
}

/**
 * Formats a phone number for the standard `tel:` URI protocol.
 * Strips all non-digit and non-plus characters.
 * E.g. "+38 (097) 935-59-50" -> "+380979355950"
 * E.g. "097 935 59 50" -> "+380979355950"
 */
export function formatPhoneForTel(phone: string): string {
  if (!phone) return '';
  const cleaned = phone.replace(/[^\d+]/g, '');
  if (cleaned.startsWith('0') && cleaned.length === 10) {
    return `+38${cleaned}`;
  }
  if (!cleaned.startsWith('+') && cleaned.startsWith('380')) {
    return `+${cleaned}`;
  }
  return cleaned;
}

/**
 * Normalizes user-entered social media values into valid URLs.
 * Handles @handles, usernames, phone numbers, and full URLs.
 */
export function normalizeSocialUrl(platform: keyof SocialLinks, value?: string): string {
  if (!value) return '';
  const trimmed = value.trim();
  if (!trimmed) return '';

  if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('viber://')) {
    return trimmed;
  }

  const clean = trimmed.replace(/^@/, '');

  switch (platform) {
    case 'telegram':
      return `https://t.me/${clean}`;
    case 'instagram':
      return `https://instagram.com/${clean}`;
    case 'tiktok':
      return `https://www.tiktok.com/@${clean}`;
    case 'viber': {
      const digits = clean.replace(/[^\d+]/g, '');
      const numWithPlus = digits.startsWith('+') ? digits : `+${digits}`;
      return `viber://chat?number=${encodeURIComponent(numWithPlus)}`;
    }
    case 'whatsapp': {
      const digits = clean.replace(/[^\d]/g, '');
      return `https://wa.me/${digits}`;
    }
    case 'youtube':
      return clean.startsWith('@') ? `https://youtube.com/${clean}` : `https://youtube.com/@${clean}`;
    case 'facebook':
      return `https://facebook.com/${clean}`;
    default:
      return `https://${clean}`;
  }
}

export interface SocialItem {
  key: keyof SocialLinks;
  name: string;
  url: string;
}

/**
 * Returns a list of active social items that have a configured link.
 */
export function getActiveSocials(socials?: SocialLinks): SocialItem[] {
  if (!socials) return [];

  const labels: Record<keyof SocialLinks, string> = {
    telegram: 'Telegram',
    viber: 'Viber',
    instagram: 'Instagram',
    whatsapp: 'WhatsApp',
    youtube: 'YouTube',
    tiktok: 'TikTok',
    facebook: 'Facebook',
  };

  const keys: (keyof SocialLinks)[] = [
    'telegram',
    'viber',
    'instagram',
    'whatsapp',
    'youtube',
    'tiktok',
    'facebook',
  ];

  return keys
    .filter((k) => !!socials[k]?.trim())
    .map((k) => ({
      key: k,
      name: labels[k],
      url: normalizeSocialUrl(k, socials[k]),
    }));
}
