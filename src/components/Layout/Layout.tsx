import React, { useState, ReactNode, useEffect } from 'react';
import { Layout, Input, Button, Avatar, Dropdown, Space } from 'antd';
import styles from "./Layout.module.css";
import type { MenuProps } from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    SearchOutlined,
} from '@ant-design/icons';
import MenuComponent from '../Menu/Menu';
import { useRouter } from 'next/router';
import { getLocalStorageItem } from '@/utils/localStorageMethods';

const { Header, Sider, Content } = Layout;

interface AppLayoutProps {
    children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {

    const router = useRouter();
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        if (getLocalStorageItem('name') === null) {
            router.push('/');
        }
    }, [router]);

    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth <= 1200;
            setIsMobile(mobile);
            setCollapsed(mobile);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const profileMenuItems: MenuProps['items'] = [
        {
            key: 'profile',
            label: 'Profile'
        },
        {
            key: 'settings',
            label: 'Settings'
        },
        {
            key: 'logout',
            label: 'Logout'
        }
    ];

    const handleMenuClick: MenuProps['onClick'] = (e) => {
        switch (e.key) {
            case 'logout':
                localStorage.removeItem('name');
                router.push('/');
                break;
            case 'profile':
                router.push('/profile');
                break;
            case 'settings':
                router.push('/settings');
                break;
        }
    };

    return (
        <Layout className={styles.layout}>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                className={`${styles.sider} ${isMobile ? styles.fixed : styles.sticky} ${isMobile && collapsed ? styles.collapsed : styles.expanded}`}
                width={250}
                collapsedWidth={80}
            >
                <div className={styles.logo} onClick={() => router.push('/dashboard')}>
                    <h1 style={{ color: "#ffffff" }}>Z2</h1>
                </div>
                <MenuComponent />
            </Sider>
            <Layout>
                <Header className={styles.header}>
                    <Button
                        type='text'
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        className={styles.menubutton}
                    />
                    {!isMobile && (
                        <div className={styles.search}>
                            <Input
                                placeholder='Search...'
                                prefix={<SearchOutlined style={{ color: 'black' }} />}
                                style={{ maxWidth: 400 }}
                            />
                        </div>
                    )}
                    <div style={{ marginRight: 20 }}>
                        <Dropdown
                            menu={{
                                items: profileMenuItems,
                                onClick: handleMenuClick
                            }}
                            trigger={['click']}
                        >
                            <Space style={{ cursor: 'pointer' }}>
                                <Avatar icon={<UserOutlined />} />
                                {!isMobile && <span style={{ color: 'white' }}>{getLocalStorageItem('name')}</span>}
                            </Space>
                        </Dropdown>
                    </div>
                </Header>
                <Content style={{ padding: '10px', backgroundColor: 'white' }}>
                    {children}
                </Content>
            </Layout>
            {isMobile && !collapsed && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.45)',
                        zIndex: 1000,
                    }}
                    onClick={() => setCollapsed(true)}
                />
            )}
        </Layout>
    );
};

export default AppLayout;