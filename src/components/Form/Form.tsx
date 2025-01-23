import { Form, Input } from "antd";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";

const FormComponent: FC = () => {

    const [form] = Form.useForm();
    const router = useRouter();

    useEffect(() => {
        router.push('/dashboard');
    }, [router]);

    return (
        <Form
            layout="vertical"
            form={form}
        >
            <Form.Item label="Name" name='name'>
                <Input placeholder="Enter name" />
            </Form.Item>
        </Form>
    )
}

export default FormComponent;