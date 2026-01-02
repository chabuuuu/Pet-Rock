import React, { ReactNode } from 'react';
import { Toaster } from 'sonner';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full bg-stone-100 flex items-center justify-center p-4">
      {/* Mobile-first container: constrained width on desktop */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden p-6 relative flex flex-col items-center">
        {/* Header/Title */}
        <header className="mb-6 text-center">
          <h1 className="text-3xl font-black text-stone-800 tracking-tight">
            The Pet Rock
          </h1>
          <p className="text-stone-500 text-sm font-medium">Nuôi đá, luyện tâm</p>
        </header>

        {children}

        {/* Footer/Signature */}
        <footer className="mt-8 text-center text-xs text-stone-400">
          <p>© 2024 The Vibe Inc.</p>
        </footer>
      </div>

      <Toaster position="top-center" richColors />
    </div>
  );
};
