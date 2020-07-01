import React from 'react';
import { Layout } from 'antd';
import { Header, LayoutContent } from '@components';
import { AppContextProvider } from '@context/AppContextProvider';
import { Routing } from '@routing';

export function App() {
  return (
    <AppContextProvider>
      <Layout>
        <Header />
        <LayoutContent>
          <Routing />
        </LayoutContent>
      </Layout>
    </AppContextProvider>
  );
}
