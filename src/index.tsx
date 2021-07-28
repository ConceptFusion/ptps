import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { PartsServiceProvider } from './PartsServiceContext';

ReactDOM.render(
  <MantineProvider>
    <NotificationsProvider position='top-right'>
      <PartsServiceProvider>
        <App />
      </PartsServiceProvider>
    </NotificationsProvider>
  </MantineProvider>,
  document.getElementById('root')
);
