import Link from 'next/link';
import Image from 'next/image';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <Link href="/" className="logo">
            <span className="logo-icon">
              <Image
                src="/icon.png"
                alt="АвтоМентор логотип"
                width={36}
                height={36}
                className="logo-img"
              />
            </span>
            <span className="logo-text">Авто<span>Ментор</span></span>
          </Link>
          <p className="footer-desc">
            Професійне навчання правилам дорожнього руху з індивідуальним підходом.
          </p>
        </div>
        <div className="footer-links">
          <h4>Швидкі посилання</h4>
          <Link href="/about">Про мене</Link>
          <Link href="/pricing">Ціни</Link>
          <Link href="/reviews">Відгуки</Link>
          <Link href="/blog">Блог</Link>
        </div>
        <div className="footer-contact">
          <h4>Контакти</h4>
          <p>Email: info@automenter.example.com</p>
          <p>Телефон: +38 (000) 000-00-00</p>
          <Link href="/booking" className="btn btn-outline footer-btn">Забронювати урок</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} АвтоМентор. Всі права захищено.</p>
      </div>
    </footer>
  );
}
