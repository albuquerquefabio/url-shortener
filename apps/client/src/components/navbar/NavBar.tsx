import { Layout, Button, Menu, Avatar } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { LinkOutlined, MenuOutlined, CloseOutlined } from '@ant-design/icons';
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
    if (!token && window.location.pathname !== '/signup') {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    // Add body scroll lock when mobile menu is open
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
              <Avatar
                style={{
                  backgroundColor: '#1890ff',
                  verticalAlign: 'middle',
                }}
              >
                {getInitials(user.name)}
              </Avatar>
              {/* <Link to="/panel">Panel</Link> */}
              <Button onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
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
                  <Avatar
                    style={{
                      backgroundColor: '#1890ff',
                      verticalAlign: 'middle',
                      marginBottom: '10px',
                    }}
                  >
                    {getInitials(user.name)}
                  </Avatar>
                  <Link to="/panel" onClick={handleNav}>
                    Panel
                  </Link>
                  <Button onClick={handleLogout}>Logout</Button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={handleNav}>
                    Login
                  </Link>
                  <Link to="/signup" onClick={handleNav}>
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </Header>
  );
};
