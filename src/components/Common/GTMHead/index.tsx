import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function GTMHead() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    //@ts-ignore
    window.dataLayer = window.dataLayer || [];
    //@ts-ignore
    window.dataLayer.push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js',
    });
    setMounted(true);
  }, []);

  if (mounted) {
    return (
      <Head>
        <script
          src="https://www.googletagmanager.com/gtm.js?id=GTM-KN4TD4L"
          defer
        ></script>
      </Head>
    );
  }

  return null;
}
