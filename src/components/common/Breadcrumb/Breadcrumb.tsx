import { Breadcrumb } from "antd";
import { useRouter } from "next/router";
import { FC } from "react";
import styles from "./Breadcrumb.module.css";
import getBreadcrumbItems from "@/utils/getBreadcrumbItems";
import { HomeFilled } from "@ant-design/icons";
import Link from "next/link";

const BreadcrumbComponent: FC = () => {

    const router = useRouter();

    const generateBreadcrumbItems = () => {
        const pathSegments = getBreadcrumbItems(router.asPath);
        const homeAddedSegments = ['home', ...pathSegments];
        return homeAddedSegments.map((segment, index) => {
            if (index === 0) {
                return {
                    title: <Link href="/dashboard"><HomeFilled /></Link>
                }
            } else if (index === homeAddedSegments.length - 1) {
                return {
                    title: segment,
                };
            } else {
                return {
                    title: <Link href="">{segment}</Link>
                }
            }
        });
    };

    return (
        <Breadcrumb
            className={styles.breadcrumb}
            items={generateBreadcrumbItems().map((item) => ({
                ...item,
                onClick: () => { }
            }))}
        />
    )
}

export default BreadcrumbComponent;