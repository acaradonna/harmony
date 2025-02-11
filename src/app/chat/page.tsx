'use client';  // Add this since we're using client-side hooks

import { ProChat } from '@ant-design/pro-chat';
import { useTheme } from 'antd-style';
import { ConfigProvider, Segmented } from 'antd';
import enUS from 'antd/locale/en_US';
import { useState } from 'react';

type Locale = 'en-US' | 'zh-CN';

const ChatPage = () => {
  const theme = useTheme();
  const [value, setValue] = useState('');
  const [language, setLanguage] = useState<Locale>('en-US');

  return (
    <div style={{ background: theme.colorBgLayout }}>
      <ConfigProvider locale={enUS}>
        <Segmented<Locale>
          options={['en-US', 'zh-CN']}
          value={language}
          onChange={(v) => setLanguage(v)}
        />
        <ProChat
          locale={language}
          helloMessage={'O hai'}
          inputAreaProps={{
            placeholder: 'Ask me anything',
            value: value,
            onChange: (e) => {
              setValue(e);
            },
          }}
          request={async (messages) => {
            return [{
              content: `something something ${messages.length}`,
              role: 'assistant',
              id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
              createAt: Date.now(),
              updateAt: Date.now()
            }];
          }}
        />
      </ConfigProvider>
    </div>
  );
};

export default ChatPage; 