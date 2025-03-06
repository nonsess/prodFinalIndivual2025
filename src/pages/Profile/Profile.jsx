import { Layout } from 'antd';

import ActiveLevel from '../../components/ActiveLevel/ActiveLevel';
import AppContent from '../../components/AppContent/AppContent';
import AppHeader from '../../components/AppHeader/AppHeader';
import PageHeader from '../../components/PageHeader/PageHeader';

export default function Profile() {
  return (
    <Layout>
      <AppHeader subtitle="Персонаж" />
      <AppContent>
        <PageHeader title="Профиль" subtitle="Помоги Посейдону достичь максимального уровня! Вся надежда на тебя!" />
        <ActiveLevel />
      </AppContent>
    </Layout>
  );
} 