import { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from './useMediaQuery';

export default function AdSenseBanner({ slot = '9029750733' }: { slot?: string }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const insRef = useRef<HTMLModElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [unfilled, setUnfilled] = useState(false);
  const isMobile = useMediaQuery('(max-width: 900px)');

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

  useEffect(() => {
    if (!loaded) return;

    let script = document.querySelector('script[src*="adsbygoogle.js"]') as HTMLScriptElement;

    if (!script) {
      script = document.createElement('script');
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8093490837210586';
      script.async = true;
      script.crossOrigin = 'anonymous';
      script.onerror = () => setUnfilled(true);
      document.head.appendChild(script);
    }

    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('AdSense initialization error: ', e);
    }
  }, [loaded]);

  useEffect(() => {
    if (!loaded || !insRef.current) return;

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-ad-status') {
          const status = (mutation.target as HTMLElement).getAttribute('data-ad-status');
          if (status === 'unfilled') {
            setUnfilled(true);
          }
        }
      });
    });

    observer.observe(insRef.current, { attributes: true });
    return () => observer.disconnect();
  }, [loaded]);

  if (unfilled) return null;

  return (
    <div ref={wrapperRef} className="w-full flex justify-center">
      {loaded && (
        <ins
          ref={insRef}
          className="adsbygoogle my-4"
          style={
            isMobile
              ? { display: 'inline-block', width: '100%', height: '100px', textAlign: 'center' }
              : { display: 'block', width: '100%', textAlign: 'center' }
          }
          data-ad-client="ca-pub-8093490837210586"
          data-ad-slot={slot}
          data-ad-format={isMobile ? undefined : 'auto'}
          data-full-width-responsive={isMobile ? undefined : 'true'}
        />
      )}
    </div>
  );
}
