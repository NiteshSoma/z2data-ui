import { Skeleton } from "antd";
import dynamic from 'next/dynamic';

const FormComponent = dynamic(
  () => import('@/components/Form/Form'),
  { ssr: false, loading: () => <Skeleton /> },
);

export default function App() {

  return (
    <FormComponent />
  );
}
