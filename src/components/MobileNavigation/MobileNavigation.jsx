import { useLocation, useNavigate } from 'react-router-dom';

import {navItems} from '../../constants/menu.constants';

import styles from './MobileNavigation.module.css';

export default function MobileNavigation() {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <nav className={styles.mobileNav}>
            <ul className={styles.navList}>
                {navItems.map(({ key, label, icon}) => (
                    <li key={key}>
                        <button
                            className={`${styles.navItem} ${location.pathname === key ? styles.active : ''}`}
                            onClick={() => navigate(key)}
                        >
                            {icon}
                            <span className={styles.label}>{label}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
} 