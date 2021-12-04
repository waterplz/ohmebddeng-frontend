import { ThemeProvider } from '@emotion/react';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import ErrorBoundary from '@/components/Common/ErrorBoundary';
import GTMBody from '@/components/Common/GTMBody';
import GTMHead from '@/components/Common/GTMHead';
import DefaultHead from '@/components/Head';
import Layout from '@/components/Layout';
import { initMSW } from '@/lib/msw';
import { GlobalStyle } from '@/styles';
import theme from '@/styles/theme';

initMSW();
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GTMHead />
      <GTMBody />
      <DefaultHead />
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Layout>
            <ErrorBoundary>
              <Component {...pageProps} />
            </ErrorBoundary>
          </Layout>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}
export default MyApp;
