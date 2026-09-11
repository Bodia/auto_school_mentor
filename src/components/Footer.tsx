import Link from 'next/link';
import { getContactsData, formatPhoneForTel, getActiveSocials, ContactsData } from '@/lib/contacts';
import {
  PhoneIcon,
  MailIcon,
  LocationIcon,
  ClockIcon,
  renderSocialIcon,
} from './SocialIcons';
import './Footer.css';

type FooterProps = {
  contacts?: ContactsData;
};

export default function Footer({ contacts: propContacts }: FooterProps) {
  const contacts = propContacts || getContactsData();
  const activeSocials = getActiveSocials(contacts.socials);

  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <Link href="/" className="logo">
            <span className="logo-text">Авто<span>Ментор</span></span>
          </Link>
          <p className="footer-desc">
            Професійне навчання правилам дорожнього руху з індивідуальним підходом.
          </p>
          {activeSocials.length > 0 && (
            <div className="footer-socials">
              {activeSocials.map((social) => (
                <a
                  key={social.key}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`social-badge social-${social.key}`}
                  aria-label={social.name}
                  title={social.name}
                >
                  {renderSocialIcon(social.key, 18)}
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="footer-links">
          <h4>Швидкі посилання</h4>
          <Link href="/about">Про мене</Link>
          <Link href="/pricing">Ціни</Link>
          <Link href="/reviews">Відгуки</Link>
          <Link href="/blog">Блог</Link>
          <Link href="/quiz">Пройти тест ПДР</Link>
        </div>

        <div className="footer-contact">
          <h4>Контакти</h4>
          {contacts.phone && (
            <a
              href={`tel:${formatPhoneForTel(contacts.phone)}`}
              className="contact-row-link"
              title="Зателефонувати зараз"
            >
              <PhoneIcon size={17} className="contact-icon phone-icon-pulse" />
              <span className="contact-label">Телефон:</span>
              <span className="contact-value contact-phone">{contacts.phone}</span>
            </a>
          )}
          {contacts.phoneSecondary && (
            <a
              href={`tel:${formatPhoneForTel(contacts.phoneSecondary)}`}
              className="contact-row-link"
              title="Зателефонувати зараз"
            >
              <PhoneIcon size={17} className="contact-icon" />
              <span className="contact-label">Телефон:</span>
              <span className="contact-value contact-phone">{contacts.phoneSecondary}</span>
            </a>
          )}
          {contacts.email && (
            <a
              href={`mailto:${contacts.email}`}
              className="contact-row-link"
              title="Написати листа"
            >
              <MailIcon size={17} className="contact-icon" />
              <span className="contact-label">Email:</span>
              <span className="contact-value contact-email">{contacts.email}</span>
            </a>
          )}
          {contacts.address && (
            <div className="contact-row-static">
              <LocationIcon size={17} className="contact-icon" />
              <span className="contact-label">Локація:</span>
              <span className="contact-value">{contacts.address}</span>
            </div>
          )}
          {contacts.workingHours && (
            <div className="contact-row-static">
              <ClockIcon size={17} className="contact-icon" />
              <span className="contact-label">Графік:</span>
              <span className="contact-value">{contacts.workingHours}</span>
            </div>
          )}

          <Link href="/booking" className="btn btn-outline footer-btn">
            Забронювати урок
          </Link>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} АвтоМентор. Всі права захищено.</p>
      </div>
    </footer>
  );
}
