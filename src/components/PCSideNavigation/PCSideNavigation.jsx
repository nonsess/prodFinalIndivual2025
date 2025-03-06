import { Menu } from 'antd';

import { useLocation, useNavigate } from 'react-router-dom';

import {navItems} from '../../constants/menu.constants';

import styles from './PCSideNavigation.module.css';


export default function PCSideNavigation() {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <div className={styles.sideNav}>
            <Menu
                mode="inline"
                selectedKeys={[location.pathname]}
                items={navItems}
                onClick={({ key }) => navigate(key)}
                className={styles.menu}
            />
        </div>
    );
} 