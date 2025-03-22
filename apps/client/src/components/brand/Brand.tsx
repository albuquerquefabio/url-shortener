import { Typography } from 'antd';
import { LinkOutlined } from '@ant-design/icons';

import styles from './brand.module.scss';

const { Title } = Typography;

export const Brand = ({ local }: { local?: 'navbar' | 'login' }) => {
  return (
    <Title level={3} className={styles[local ?? 'navbar']}>
      URL Shortener <LinkOutlined />
    </Title>
  );
};

export default Brand;
