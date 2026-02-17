import { useEffect, useState } from 'react';

export const usePWAInstall = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      alert('✅ PWA đã sẵn sàng để install thủ công');
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      alert('❌ Chưa đủ điều kiện install hoặc đã install rồi');
      return;
    }
    
    // Hiện popup của trình duyệt
    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;
    alert(`User response: ${outcome}`);

    setDeferredPrompt(null);
  };

  return { isInstallable: !!deferredPrompt, handleInstall };
};