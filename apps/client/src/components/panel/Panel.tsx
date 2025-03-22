import { useEffect, useState } from 'react';
import { Table, Space, Button, message, Popconfirm } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DeleteOutlined, EditOutlined, CopyOutlined } from '@ant-design/icons';
import {
  allCustomUrl,
  deleteCustomUrl,
  updateCustomUrl,
} from '../../services/urlCustomService';
import { UrlShortener } from '../../interface/UrlShortenerInterface';
import { EditUrlModal } from './EditUrlModal';
import { UrlShortenerForm } from './UrlShortenerForm';

export const Panel = () => {
  const [urls, setUrls] = useState<UrlShortener[]>([]);
  const [loading, setLoading] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState<UrlShortener | null>(null);

  const fetchUrls = async () => {
    try {
      setLoading(true);
      const response = await allCustomUrl();
      setUrls(response.data);
    } catch (error) {
      message.error('Failed to load URLs');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCustomUrl(id);
      message.success('URL deleted successfully');
      fetchUrls();
    } catch (error) {
      message.error('Failed to delete URL');
    }
  };

  const handleCopy = async (shortUrl: string) => {
    const fullUrl = `${window.location.origin}/${shortUrl}`;
    try {
      await navigator.clipboard.writeText(fullUrl);
      message.success('URL copied to clipboard');
    } catch (error) {
      message.error('Failed to copy URL');
    }
  };

  const handleEdit = async (shortUrl: string) => {
    try {
      if (selectedUrl) {
        await updateCustomUrl(selectedUrl._id, shortUrl);
        message.success('URL updated successfully');
        setEditModalVisible(false);
        fetchUrls();
      }
    } catch (error) {
      message.error('Failed to update URL');
    }
  };

  const columns: ColumnsType<UrlShortener> = [
    {
      title: 'Original URL',
      dataIndex: 'original',
      key: 'original',
      ellipsis: true,
      render: (text: string) => (
        <a
          href={text}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: '#1890ff',
            textDecoration: 'none',
            transition: 'color 0.3s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#40a9ff';
            e.currentTarget.style.textDecoration = 'underline';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#1890ff';
            e.currentTarget.style.textDecoration = 'none';
          }}
        >
          {text}
        </a>
      ),
    },
    {
      title: 'Short URL',
      dataIndex: 'short',
      key: 'short',
      render: (shortUrl: string) => (
        <Space>
          <span>{shortUrl}</span>
          <Button
            icon={<CopyOutlined />}
            type="link"
            onClick={() => handleCopy(shortUrl)}
          />
        </Space>
      ),
    },
    {
      title: 'Clicks',
      dataIndex: 'clicks',
      key: 'clicks',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            type="link"
            onClick={() => {
              setSelectedUrl(record);
              setEditModalVisible(true);
            }}
          />
          <Popconfirm
            title="Are you sure you want to delete this URL?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} type="link" danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    fetchUrls();
  }, []);

  return (
    <div style={{ padding: '24px' }}>
      <UrlShortenerForm onSuccess={fetchUrls} />
      <div style={{ margin: '16px 0' }}>
        <h1>My URLs</h1>
      </div>
      <Table
        columns={columns}
        dataSource={urls}
        loading={loading}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
      <EditUrlModal
        visible={editModalVisible}
        onCancel={() => {
          setEditModalVisible(false);
          setSelectedUrl(null);
        }}
        onOk={handleEdit}
        url={selectedUrl}
      />
    </div>
  );
};

export default Panel;
