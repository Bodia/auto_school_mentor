import Link from 'next/link';
import './Navbar.css';

export default function Navbar() {
  return (
    <header className="navbar glass">
      <div className="container nav-container">
        <Link href="/" className="logo">
          Авто<span>Ментор</span>
        </Link>
        <nav className="nav-links">
          <Link href="/about">Про мене</Link>
          <Link href="/pricing">Послуги та ціни</Link>
          <Link href="/reviews">Відгуки</Link>
          <Link href="/blog">Блог</Link>
        </nav>
        <div className="nav-cta">
          <Link href="/booking" className="btn btn-primary">
            Безкоштовний урок
          </Link>
        </div>
      </div>
    </header>
  );
}
