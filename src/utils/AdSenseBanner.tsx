import { useEffect, useRef, useState } from 'react';

export default function AdSenseBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          setLoaded(true);
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex justify-center my-4">
      {loaded && (
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-8093490837210586"
          data-ad-slot="9029750733"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      )}
    </div>
  );
}
