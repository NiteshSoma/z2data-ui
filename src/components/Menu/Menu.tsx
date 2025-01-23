import { FC, JSX, useEffect, useState } from "react";
import "./Menu.css";
import { Menu, MenuProps, Skeleton } from 'antd';
import { useRouter } from "next/router";
import { ClockCircleFilled, HomeFilled, SignalFilled, StockOutlined } from "@ant-design/icons";

export interface MenuItem {
    key: string;
    label: string;
    icon?: JSX.Element;
    link?: string;
    children?: MenuItem[];
}

const items: MenuItem[] = [
    {
        key: '1',
        label: 'Home',
        icon: <HomeFilled style={{ color: '#6e7585', fontSize: '18px' }} />,
        link: '/dashboard'
    },
    {
        key: '2',
        label: 'Part Risk Manager',
        icon: <StockOutlined style={{ color: '#3a80e8', fontSize: '18px' }} />,
        children: [
            {
                key: '2-1',
                label: 'My Data',
                link: '/part-risk-manager/my-data'
            },
            {
                key: '2-2',
                label: 'Basic',
                link: '/part-risk-manager/basic'
            },
            {
                key: '2-3',
                label: 'Strategic Sourcing',
                link: '/part-risk-manager/strategic-sourcing'
            },
            {
                key: '2-4',
                label: 'Environment Compliance',
                link: '/part-risk-manager/environmental-compliance'
            },
            {
                key: '2-5',
                label: 'Market',
                link: '/part-risk-manager/market'
            },
            {
                key: '2-6',
                label: 'One Risk',
                link: '/part-risk-manager/one-risk'
            },
            {
                key: '2-7',
                label: 'Alerts',
                link: '/part-risk-manager/alerts'
            }
        ]
    },
    {
        key: '3',
        label: 'Supply Chain Watch',
        icon: <ClockCircleFilled style={{ color: '#10b981', fontSize: '18px' }} />,
        children: [
            {
                key: '3-1',
                label: 'Supply Chain Watch 1',
                link: '/supply-chain-watch/supply-chain-watch-one'
            }
        ]
    },
    {
        key: '4',
        label: 'Supplier Insights',
        icon: <SignalFilled style={{ color: '#a855f7', fontSize: '18px' }} />,
        children: [
            {
                key: '4-1',
                label: 'Supplier Insights 1',
                link: '/supplier-insights/supplier-insights-one'
            }
        ]
    }
]

const MenuComponent: FC = () => {

    const router = useRouter();
    const { asPath } = router;
    const [activeKey, setActiveKey] = useState<string>('');
    const [openKeys, setOpenKeys] = useState<string[]>([]);

    useEffect(() => {
        if (items.length && asPath) {
            const currentPath = asPath.includes('?') ? asPath.substring(0, asPath.indexOf('?')) : asPath;

            const findSelectedKeys = (menuArray: MenuItem[]) => {
                for (const item of menuArray) {
                    if (item.link === currentPath) {
                        setActiveKey(item.key);
                        setOpenKeys((prevKeys) => [...prevKeys, item.key]);
                        return true;
                    }
                    if (item.children) {
                        if (findSelectedKeys(item.children)) {
                            setOpenKeys((prevKeys) => [...prevKeys, item.key]);
                        }
                    }
                }
                return false;
            };

            findSelectedKeys(items);
        }
    }, [asPath]);

    if (!activeKey && asPath !== '/') {
        return <Skeleton />
    }

    const onOpenChange: MenuProps['onOpenChange'] = (openKeys) => {
        if (openKeys[openKeys.length - 1]) {
            setOpenKeys([openKeys[openKeys.length - 1]])
        } else {
            setOpenKeys([]);
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleMenuClick = (info: any) => {
        router.push(info.item.props.link);
    }

    return (
        <Menu
            mode='inline'
            theme='dark'
            defaultSelectedKeys={[activeKey]}
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            onClick={handleMenuClick}
            className={'menuwrapper'}
            items={items}
        />
    )
}

export default MenuComponent;