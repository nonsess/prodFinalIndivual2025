import { Layout } from 'antd';

import classNames from 'classnames';

import MobileNavigation from '../MobileNavigation/MobileNavigation';
import PCSideNavigation from '../PCSideNavigation/PCSideNavigation';

import styles from './AppContent.module.css';

export default function AppContent({ children, intro }) {
    const contentClassName = classNames(styles.content, {
        [styles.introContent]: intro
    });

    return (
        <Layout hasSider>
            {!intro && <PCSideNavigation />}
            <Layout.Content className={contentClassName}>
                {children}
                <div className={styles.mobileBottomPadding} />
            </Layout.Content>
            {!intro && <MobileNavigation />}
        </Layout>
    );
}