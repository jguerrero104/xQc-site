import { useEffect, useRef, useState } from 'react';

export default function AdSenseBanner({ slot }: { slot: string }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  // 1. Observe when the ad slot is about to enter the viewport
  useEffect(() => {
    if (!wrapperRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          setLoaded(true);
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, []);

  // 2. Inject script and initialize the ad slot
  useEffect(() => {
    if (!loaded) return;

    let script = document.querySelector('script[src*="adsbygoogle.js"]') as HTMLScriptElement;
    
    if (!script) {
      script = document.createElement('script');
      script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8093490837210586";
      script.async = true;
      script.crossOrigin = "anonymous";
      document.head.appendChild(script);
    }

    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense initialization error: ", e);
    }
  }, [loaded]);

  return (
    // Removed min-h-[100px] and moved my-4 to the <ins> tag
    <div ref={wrapperRef} className="flex justify-center w-full">
      {loaded && (
        <ins
          className="adsbygoogle my-4" 
          style={{ display: 'block', textAlign: 'center' }} // Fix: centered the internal iframe!
          data-ad-client="ca-pub-8093490837210586"
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      )}
    </div>
  );
}
