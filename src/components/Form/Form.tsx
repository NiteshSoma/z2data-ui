import { Button, Card, Form, FormProps, Input, message } from "antd";
import { FC } from "react";
import styles from "./Form.module.css";
import { useRouter } from "next/router";

type FieldType = {
    name: string;
    email: string;
};

const FormComponent: FC = () => {

    const [form] = Form.useForm();
    const router = useRouter();

    const handleSubmit: FormProps<FieldType>['onFinish'] = async (values) => {
        try {
            const res = await fetch('/api/set-session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: values.name }),
            });

            const data = await res.json();
            if (res.ok) {
                console.log('Session set successfully:', data);
                router.push('/dashboard');
            } else {
                console.log('Error setting session:', data.error);
                message.error('Something went wrong, please try again');
            }
        } catch (error) {
            console.error('Failed to set session:', error);
            message.error('Something went wrong, please try again');
        }
    }

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
                onFinish={handleSubmit}
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