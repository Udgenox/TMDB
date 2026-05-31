import s from './Footer.module.css'

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={s.footer}>
            <div className={s.container}>
                <div className={s.content}>
                    <p className={s.copyright}>
                        © {currentYear} Kinopoisk Demo · Data courtesy of TMDB
                    </p>
                    <div className={s.socialLinks}>
                        <a
                            href="https://github.com/Udgenox"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={s.socialLink}
                            aria-label="GitHub"
                        >
                            GitHub
                        </a>
                        <a
                            href="https://linkedin.com/in/your-username"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={s.socialLink}
                            aria-label="LinkedIn"
                        >
                            LinkedIn
                        </a>
                        <a
                            href="https://t.me/@udgenox"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={s.socialLink}
                            aria-label="Telegram"
                        >
                            Telegram
                        </a>
                        <a
                            href="https://www.instagram.com/udgen.kovalev"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={s.socialLink}
                            aria-label="Instagram"
                        >
                            Instagram
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}