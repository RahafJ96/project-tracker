import { useEffect } from "react";

interface ModalProps {
  open: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
  maxWidthClass?: string;
}

export default function Modal({
  open,
  title,
  onClose,
  children,
  maxWidthClass = "max-w-xl",
}: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={`relative w-full ${maxWidthClass} mx-4 transition duration-200`}
      >
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl border border-white/60 shadow-xl shadow-black/5 animate-[pop_150ms_ease-out]">
          {title && (
            <div className="px-5 py-4 border-b border-gray-200/70">
              <h3 className="text-lg font-semibold">{title}</h3>
            </div>
          )}
          <div className="p-5">{children}</div>
        </div>
      </div>
      <style>{`@keyframes pop { from { transform: scale(.98); opacity: 0 } to { transform: scale(1); opacity: 1 } }`}</style>
    </div>
  );
}
