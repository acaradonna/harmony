import { ProChat } from '@ant-design/pro-chat';
import { useTheme } from 'antd-style';

const ChatPage = () => {
  const theme = useTheme();
  return (
    <div style={{ background: theme.colorBgLayout }}>
      <ProChat
        helloMessage={
          'O hai'
        }
        request={async (messages) => {
          return [{
            content: `something something${messages.length}`,
            role: 'assistant',
            id: '1',
            createAt: Date.now(),
            updateAt: Date.now()
          }];
        }}
      />
    </div>
  );
};

export default ChatPage;