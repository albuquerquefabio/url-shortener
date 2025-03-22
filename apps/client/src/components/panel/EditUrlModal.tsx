import { Modal, Input, Form } from 'antd';
import { useState, useCallback } from 'react';
import debounce from 'lodash/debounce';
import { UrlShortener } from '../../interface/UrlShortenerInterface';
import { urlChecker } from '../../services/urlCheckerService';

interface EditUrlModalProps {
  visible: boolean;
  onCancel: () => void;
  onOk: (shortUrl: string) => Promise<void>;
  url: UrlShortener | null;
}

export const EditUrlModal = ({
  visible,
  onCancel,
  onOk,
  url,
}: EditUrlModalProps) => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const debouncedValidation = useCallback(
    debounce(async (value: string) => {
      try {
        if (value && url?.short !== value) {
          const { data } = await urlChecker(value);
          if (data.has) {
            throw new Error('This short URL already exists');
          }
        }
        setIsValid(true);
      } catch (error) {
        setIsValid(false);
        throw error;
      }
    }, 500),
    [url]
  );

  return (
    <Modal
      title="Edit Short URL"
      open={visible}
      onCancel={onCancel}
      okButtonProps={{ disabled: !isValid || isSubmitting }}
      onOk={() => {
        setIsSubmitting(true);
        form
          .validateFields()
          .then((values) => {
            onOk(values.shortUrl).finally(() => {
              setIsSubmitting(false);
              form.resetFields();
            });
          })
          .catch((error) => {
            setIsSubmitting(false);
            console.error('Validation failed:', error);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{ shortUrl: url?.short }}
        onValuesChange={() => {
          form
            .validateFields(['shortUrl'])
            .then(() => setIsValid(true))
            .catch(() => setIsValid(false));
        }}
      >
        <Form.Item
          name="shortUrl"
          label="Short URL"
          hasFeedback
          validateStatus={isValid ? 'success' : undefined}
          rules={[
            { required: true, message: 'Please input the short URL!' },
            {
              pattern: /^[a-zA-Z0-9-_]+$/,
              message:
                'Only letters, numbers, hyphens and underscores are allowed',
            },
            {
              validator: async (_, value) => {
                if (value && value.length < 3) {
                  throw new Error(
                    'Short URL must be at least 3 characters long'
                  );
                }
                if (value && value.length > 50) {
                  throw new Error('Short URL must not exceed 50 characters');
                }
                await debouncedValidation(value);
              },
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
