import { TruckOutlined } from "@ant-design/icons";
import { Button, Result } from "antd";
import { useRouter } from "next/router";

export default function Custom404() {

    const router = useRouter();

    return (
        <Result
            icon={<TruckOutlined />}
            title="Patience, please! The good stuff is en route. 📦 Stay tuned!"
            extra={<Button type="primary" onClick={() => router.push('/dashboard')}>Back Home</Button>}
        />
    );
}