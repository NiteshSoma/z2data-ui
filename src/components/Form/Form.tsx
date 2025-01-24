import { Button, Card, Form, FormProps, Input, message } from "antd";
import { FC, useEffect } from "react";
import styles from "./Form.module.css";
import { useRouter } from "next/router";
import { getLocalStorageItem, setLocalStorageItem } from "@/utils/localStorageMethods";

type FieldType = {
    name: string;
    email: string;
};

const FormComponent: FC = () => {

    const [form] = Form.useForm();
    const router = useRouter();

    useEffect(() => {
        if (getLocalStorageItem('name')) {
            router.push('/dashboard');
        }
    }, [router]);

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        setLocalStorageItem('name', values.name, 30);
        router.push('/dashboard');
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = () => {
        message.error('Something went wrong, please try again');
    };

    return (
        <Card className={styles.card}>
            <Form
                name='info'
                form={form}
                className={styles.form}
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Name"
                    name='name'
                    rules={[
                        {
                            required: true,
                            message: 'Please enter any name to display in avatar'
                        },
                        {
                            min: 5,
                            message: 'Name should be at least 5 characters'
                        },
                        {
                            max: 20,
                            message: 'Name cannot be more than 20 characters'
                        },
                        {
                            pattern: new RegExp('^[A-Za-z]+(?: [A-Za-z]+)*$'),
                            message: 'Name must only contain alphabets and single spaces between words, with no leading or trailing spaces.'
                        }
                    ]}
                >
                    <Input placeholder="Enter name" />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name='email'
                    rules={[
                        {
                            required: true,
                            type: 'email',
                            message: 'Please enter a valid email address'
                        }
                    ]}
                >
                    <Input placeholder="Enter email" />
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>
        </Card>
    )
}

export default FormComponent;