import { ReactNode } from "react";
import { FaPlus } from "react-icons/fa";

interface FloatingActionButtonProps {
  onClick: () => void;
  children?: ReactNode;
}

export default function FloatingActionButton({
  onClick,
  children,
}: FloatingActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-8 right-8 bg-blue-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors z-50"
    >
      {children || <FaPlus size={24} />}
    </button>
  );
}