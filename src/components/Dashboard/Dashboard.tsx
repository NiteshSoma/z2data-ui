import { Col, Input, Menu, Row, Tabs, TabsProps } from "antd";
import BreadcrumbComponent from "../common/Breadcrumb/Breadcrumb";
import ButtonComponent, { ButtonType } from "../common/Button/Button";
import "./Dashboard.css";
import { CaretRightOutlined, DatabaseFilled, FolderFilled, SaveOutlined, SearchOutlined, SettingFilled } from "@ant-design/icons";
import { MenuItem } from "../Menu/Menu";
import TableComponent from "./Table/Table";

interface GroupMenuItem extends MenuItem {
    type: 'group';
}

const menuItems: GroupMenuItem[] = [
    {
        key: "1",
        label: "Sandbox",
        type: "group",
        children: [
            { key: "1-1", label: "Folders", icon: <FolderFilled /> },
            { key: "1-2", label: "BOMs", icon: <FolderFilled /> },
            { key: "1-3", label: "Sandbox Master", icon: <FolderFilled /> },
            { key: "1-4", label: "Settings", icon: <SettingFilled /> }
        ],
    },
    {
        key: "2",
        label: "PLM Vault",
        type: "group",
        children: [
            { key: "2-1", label: "Entire PLM Vault", icon: <DatabaseFilled /> },
            { key: "2-2", label: "PLM Master", icon: <DatabaseFilled /> },
            { key: "2-3", label: "Hierarchy", icon: <DatabaseFilled /> },
            { key: "2-4", label: "Suppliers", icon: <DatabaseFilled /> },
            { key: "2-5", label: "Settings", icon: <SettingFilled /> }
        ]
    },
    {
        key: "3",
        label: "Preferred",
        type: "group",
        children: [
            { key: '3-1', label: "Parts", icon: <DatabaseFilled /> },
            { key: '3-2', label: "Suppliers", icon: <DatabaseFilled /> },
        ]
    }
]

const items: TabsProps['items'] = [
    {
        key: '1',
        label: 'All Folders',
        children:
            <>
                <Input
                    placeholder='Search by folder name'
                    prefix={<SearchOutlined style={{ color: 'black' }} />}
                    style={{ maxWidth: 300, height: 'auto' }}
                />
                <TableComponent />
            </>
    },
    {
        key: '2',
        label: 'My Folders',
        children: "my Folders"
    },
    {
        key: '3',
        label: 'Favorites',
        children: "Favorites"
    },
];

export default function DashboardComponent() {

    const onChange = (key: string) => {
        console.log(key);
    };

    return (
        <Row className={'dashboard'}>
            <Col span={24}>
                <Row style={{ borderBottom: '1px solid black', marginRight: '10px' }}>
                    <Col span={12}>
                        <BreadcrumbComponent />
                    </Col>
                    <Col span={12} className={'buttongroup'}>
                        <Row gutter={{ xs: 8, sm: 8, md: 16, lg: 16 }}>
                            <Col>
                                <ButtonComponent type={ButtonType.NORMAL}>
                                    <SaveOutlined /> Saved Report
                                </ButtonComponent>
                            </Col>
                            <Col>
                                <ButtonComponent type={ButtonType.NORMAL}>
                                    <CaretRightOutlined /> Run Report
                                </ButtonComponent>
                            </Col>
                            <Col>
                                <ButtonComponent>
                                    + New BOM
                                </ButtonComponent>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{ marginRight: '0px' }}>
                    <Col span={5}>
                        <Menu
                            items={menuItems}
                            theme="light"
                            className={'dashboardmenu'}
                            mode='inline'
                        />
                    </Col>
                    <Col span={19}>
                        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}