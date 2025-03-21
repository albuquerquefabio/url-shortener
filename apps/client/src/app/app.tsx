// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';

import { Route, Routes, Link } from 'react-router-dom';

import { Shortener } from '../shorterner/shortener';
import { Flex, Layout } from 'antd';
import { Redirect } from '../redirect/redirect';

const { Header, Content } = Layout;

export function App() {
  return (
    <Flex justify="center" align="middle" style={{ minHeight: '100vh' }}>
      <Layout className={styles.layoutStyle}>
        <Header className={styles.headerStyle}>
          <Link to="/">
            <h1 className={styles.appTitle}>URL Shortener</h1>
          </Link>
        </Header>
        <Content className={styles.contentStyle}>
          {/* <Flex justify="center" align="center"> */}
          <Routes>
            <Route path="/" element={<Shortener />} />
            <Route path="/:shortUrl" element={<Redirect />} />
          </Routes>
          {/* </Flex> */}
        </Content>
      </Layout>
    </Flex>
  );
}

export default App;
