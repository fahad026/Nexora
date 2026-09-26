import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, X, AlertTriangle } from 'lucide-react';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const addToast = useCallback(({ title, message, type = 'success', duration = 3500 }) => {
    const id = Date.now() + Math.random().toString(36).substr(2, 9);
    const newToast = { id, title, message, type };

    setToasts(prev => [...prev, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      {/* Toast container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-md w-full px-4 pointer-events-none">
        {toasts.map(toast => {
          const icons = {
            success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />,
            error: <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />,
            warning: <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />,
            info: <Info className="w-5 h-5 text-cyan-500 shrink-0 mt-0.5" />,
          };

          const borders = {
            success: 'border-emerald-500/30 dark:border-emerald-500/20',
            error: 'border-rose-500/30 dark:border-rose-500/20',
            warning: 'border-amber-500/30 dark:border-amber-500/20',
            info: 'border-cyan-500/30 dark:border-cyan-500/20',
          };

          return (
            <div
              key={toast.id}
              className={`pointer-events-auto flex items-start gap-3 p-4 rounded-2xl shadow-xl bg-white/95 dark:bg-dark-card/95 backdrop-blur-md border ${borders[toast.type] || 'border-slate-200 dark:border-slate-800'} text-slate-800 dark:text-slate-100 transition-all duration-300 transform translate-y-0 opacity-100 animate-in slide-in-from-bottom-5`}
            >
              {icons[toast.type] || icons.success}
              <div className="flex-1 text-sm">
                {toast.title && <h4 className="font-semibold text-slate-900 dark:text-white mb-0.5">{toast.title}</h4>}
                {toast.message && <p className="text-slate-600 dark:text-slate-300 leading-snug">{toast.message}</p>}
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition p-1"
                aria-label="Close notification"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
