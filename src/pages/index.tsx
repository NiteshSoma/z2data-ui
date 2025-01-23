import { Skeleton } from "antd";
import dynamic from 'next/dynamic';

const LayoutComponent = dynamic(
  () => import('@/components/Layout/Layout'),
  { ssr: false, loading: () => <Skeleton /> }
)

const FormComponent = dynamic(
  () => import('@/components/Form/Form'),
  { ssr: false, loading: () => <Skeleton /> },
);

export default function App() {

  return (
    <LayoutComponent>
      <FormComponent />
    </LayoutComponent>
  );
}
