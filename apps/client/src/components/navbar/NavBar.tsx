import { Layout, Button, Avatar } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import {
  LinkOutlined,
  MenuOutlined,
  CloseOutlined,
  LogoutOutlined,
  LinkOutlined as LinkIcon,
} from '@ant-design/icons';
import { useState, useEffect } from 'react';
import styles from './navbar.module.scss';
import { useTheme } from '../../theme-switcher/theme-switcher';
import { useUser } from '../../context/UserContext';
import { ApiService } from '../../services/apiService';
import { getInitials } from '../../utils/getInitials';

const { Header } = Layout;
const apiService = new ApiService();

export const NavBar = () => {
  const [nav, setNav] = useState(false);
  const { theme } = useTheme();
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleNav = () => {
    setNav(!nav);
  };

  const handleLogout = async () => {
    await apiService.logout();
    if (nav) handleNav();
    setUser(null);
    navigate('/');
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (
      !token &&
      window.location.pathname !== '/signup' &&
      window.location.pathname !== '/'
    ) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    if (nav) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [nav]);

  return (
    <Header
      className={styles.headerStyle}
      style={{
        backgroundColor: theme === 'light' ? '#e3e3e3' : '#1a1a1a',
        color: theme === 'light' ? '#333' : '#fff',
      }}
    >
      <div className={styles.navContainer}>
        <Link to="/" style={{ color: theme === 'light' ? '#333' : '#fff' }}>
          <h1 className={styles.appTitle}>
            URL Shortener <LinkOutlined />
          </h1>
        </Link>

        <div className={styles.navLinks}>
          {user?.name ? (
            <>
              <div className={styles.userControlsLine}>
                <Avatar
                  style={{
                    backgroundColor: '#1890ff',
                    verticalAlign: 'middle',
                    marginBottom: '8px',
                  }}
                >
                  {getInitials(user.name)}
                </Avatar>
                <Button
                  type="primary"
                  onClick={() => navigate('/panel')}
                  icon={<LinkIcon />}
                  style={{
                    background: theme === 'light' ? '#1890ff' : '#177ddc',
                  }}
                  className={styles.urlButton}
                >
                  My URLs
                </Button>
                <LogoutOutlined
                  onClick={handleLogout}
                  style={{
                    fontSize: '18px',
                    cursor: 'pointer',
                    marginTop: '8px',
                    minHeight: '32px',
                  }}
                  title="Logout"
                />
              </div>
            </>
          ) : (
            <>
              <Button type="link" onClick={() => navigate('/login')}>
                Login
              </Button>
              <Button type="primary" onClick={() => navigate('/signup')}>
                Sign Up
              </Button>
            </>
          )}
        </div>

        <div className={styles.mobileBtn} onClick={handleNav}>
          {nav ? <CloseOutlined /> : <MenuOutlined />}
        </div>

        {nav && (
          <>
            <div className={styles.mobileOverlay} onClick={handleNav} />
            <div
              className={styles.mobileNav}
              style={{
                backgroundColor: theme === 'light' ? '#e3e3e3' : '#1a1a1a',
              }}
            >
              {user?.username ? (
                <>
                  <div className={styles.userControls}>
                    <div className={styles.userDetails}>
                      <Avatar
                        style={{
                          backgroundColor: '#1890ff',
                          verticalAlign: 'middle',
                          marginBottom: '10px',
                        }}
                      >
                        {getInitials(user.name)}
                      </Avatar>
                      <span style={{ marginLeft: '8px' }}>{user.username}</span>
                    </div>
                    <Button
                      type="primary"
                      icon={<LinkIcon />}
                      onClick={() => navigate('/panel')}
                      style={{
                        background: theme === 'light' ? '#1890ff' : '#177ddc',
                      }}
                      className={styles.urlButton}
                    >
                      My URLs
                    </Button>

                    <Button onClick={handleLogout} icon={<LogoutOutlined />}>
                      Logout
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <Button type="link" onClick={() => navigate('/login')}>
                    Login
                  </Button>
                  <Button type="primary" onClick={() => navigate('/signup')}>
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </Header>
  );
};
