import { usePWAInstall } from "../hooks/usePWAInstall";

export const InstallButton = () => {
  const { handleInstall } = usePWAInstall();

  // Nếu không đủ điều kiện PWA (hoặc đã cài rồi), không hiện nút
//   if (!isInstallable) return null;

  return (
    <div className="install-banner">
      <p>Trải nghiệm "Master Your Mind" tốt hơn với ứng dụng!</p>
      <button onClick={handleInstall} >
        Cài đặt ngay
      </button>
    </div>
  );
};
