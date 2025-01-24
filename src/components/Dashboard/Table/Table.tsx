import { message, Skeleton, Table } from "antd";
import { FC, useEffect, useState } from "react";
import { ColumnsType } from "antd/es/table";
import { FolderFilled } from "@ant-design/icons";
import "./Table.css";

interface TableData {
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}

const colors = ["#ddebfc", "#fbe6e5", "#feeac7", "#d1faec", "#f4e8ff", "#d4f2f9"];
const getColorStyles = (index: number) => {
    const color = colors[index % colors.length]; // Cyclic color selection
    const darkerColor = color
        .replace("#", "")
        .match(/.{1,2}/g)
        ?.map((c) => Math.max(0, parseInt(c, 16) - 30).toString(16).padStart(2, "0"))
        .join("");

    return {
        backgroundColor: color,
        color: `#${darkerColor}`,
    };
};

const TableComponent: FC = () => {

    const [data, setData] = useState<TableData[]>([]);
    const [selectedRows, setSelectedRows] = useState<React.Key[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 500,
    });

    const columns: ColumnsType<TableData> = [
        {
            title: 'Name',
            render(value) {
                return (
                    <p><FolderFilled />  {value.name}</p>
                )
            },
            sorter: (a, b) => a.name.localeCompare(b.name),
            width: 70
        },
        {
            title: 'Created By',
            dataIndex: "email",
            key: "email",
            render: (email: string, _: TableData, index: number) => {
                const firstLetter = email[0].toUpperCase();
                const styles = getColorStyles(index);

                return (
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div
                            style={{
                                ...styles,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "32px",
                                height: "32px",
                                borderRadius: "50%",
                                fontWeight: 600,
                                fontSize: "14px",
                            }}
                        >
                            {firstLetter}
                        </div>
                        <span style={{ fontSize: "14px", fontWeight: 400 }}>{email}</span>
                    </div>
                );
            },
            sorter: (a, b) => a.name.localeCompare(b.name),
            width: 120
        },
        {
            title: 'Modified',
            dataIndex: 'updatedAt',
            width: 50
        },
        {
            title: 'Created',
            dataIndex: 'createdAt',
            width: 50
        }
    ]

    useEffect(() => {
        fetchData(pagination.current, pagination.pageSize);
    }, [pagination]);

    const fetchData = async (page: number, pageSize: number) => {
        try {
            setLoading(true);
            const response = await fetch(
                `http://localhost:3001/test?_start=${(page - 1) * pageSize}&_limit=${pageSize}`,
            )
            const responseData = await response.json();
            setData(responseData);
        } catch (err) {
            console.log(err);
            message.error('Something went wrong, please try again later');
        } finally {
            setLoading(false);
        }
    }

    const onPageSizeChange = (current: number, size: number) => {
        setPagination((prev) => ({
            ...prev,
            current,
            pageSize: size,
        }));
    };

    const setPageNumber = (pageNumber: number) => {
        setPagination((prev) => ({
            ...prev,
            current: pageNumber,
        }));
    }

    if (loading) {
        return <Skeleton />;
    }

    return (
        <Table
            rowKey="id"
            className="table-wrapper"
            columns={columns}
            dataSource={data}
            scroll={{ y: 300 }}
            rowSelection={{
                selectedRowKeys: selectedRows,
                onChange: (selectedKeys) => setSelectedRows(selectedKeys)
            }}
            loading={loading}
            pagination={{
                current: pagination.current,
                pageSize: pagination.pageSize,
                total: pagination.total,
                showSizeChanger: true,
                pageSizeOptions: ['10', '20', '50', '100'],
                onShowSizeChange: (current: number, size: number) => onPageSizeChange(1, size),
                onChange: (pageNumber: number) => setPageNumber(pageNumber)
            }}
        />
    )
}

export default TableComponent;