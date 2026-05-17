import { useEffect } from 'react';

export default function AdSenseBanner() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
  }, []);

  return (
    <div className="flex justify-center my-4">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-8093490837210586"
        data-ad-slot="9029750733"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
