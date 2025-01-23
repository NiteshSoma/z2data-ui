import { Skeleton } from "antd";
import dynamic from 'next/dynamic';

const LayoutComponent = dynamic(
    () => import('@/components/Layout/Layout'),
    { ssr: false, loading: () => <Skeleton /> }
)

const Dashboard = dynamic(
    () => import('@/components/Dashboard/Dashboard'),
    { ssr: false, loading: () => <Skeleton /> }
)

const DashboardPage = () => (
    <LayoutComponent>
        <Dashboard />
    </LayoutComponent>
)

export default DashboardPage;