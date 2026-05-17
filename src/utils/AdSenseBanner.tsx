import { useEffect, useRef, useState } from 'react';

export default function AdSenseBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}

    const timer = setTimeout(() => {
      if (!ref.current) return;
      const iframe = ref.current.querySelector('iframe');
      if (!iframe) {
        setVisible(false);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div ref={ref} className="flex justify-center my-4">
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
