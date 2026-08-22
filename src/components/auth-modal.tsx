"use client";

import { useEffect, useRef, useState } from "react";
import { AlertCircle, CheckCircle2, Eye, EyeOff, KeyRound, Loader2, Lock, X } from "lucide-react";
import { apiRequest } from "@/lib/api-client";

export function AuthModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleAuthRequired = (event: Event) => {
      const customEvent = event as CustomEvent<{ message?: string }>;
      setMessage(customEvent.detail?.message || "Phiên học cần xác thực mật khẩu để lưu tiến độ.");
      setError("");
      setSuccess(false);
      setIsOpen(true);
    };

    const handleOpenModal = (event: Event) => {
      const customEvent = event as CustomEvent<{ message?: string }>;
      setMessage(customEvent.detail?.message || "Nhập mật khẩu để xác thực quyền quản trị viên.");
      setError("");
      setSuccess(false);
      setIsOpen(true);
    };

    window.addEventListener("auth:required", handleAuthRequired);
    window.addEventListener("open-auth-modal", handleOpenModal);

    return () => {
      window.removeEventListener("auth:required", handleAuthRequired);
      window.removeEventListener("open-auth-modal", handleOpenModal);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape" && !isLoading) {
          setIsOpen(false);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        clearTimeout(timer);
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim() || isLoading) return;

    setIsLoading(true);
    setError("");

    try {
      const res = await apiRequest<{ success: boolean }>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ password }),
      });

      if (res?.success) {
        setSuccess(true);
        window.dispatchEvent(new CustomEvent("auth:success"));
        setTimeout(() => {
          setIsOpen(false);
          setPassword("");
          setSuccess(false);
        }, 600);
      } else {
        setError("Mật khẩu không đúng. Vui lòng kiểm tra lại.");
      }
    } catch (err) {
      if (err instanceof Error && err.message.includes("401")) {
        setError("Mật khẩu không đúng. Vui lòng thử lại.");
      } else {
        setError(err instanceof Error ? err.message : "Đăng nhập không thành công.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm transition-all"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isLoading) {
          setIsOpen(false);
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--panel)] p-6 shadow-2xl transition-all sm:p-8">
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          disabled={isLoading}
          className="absolute right-4 top-4 rounded-full p-2 text-[var(--muted)] hover:bg-[var(--panel-soft)] hover:text-[var(--foreground)] disabled:opacity-50"
          aria-label="Đóng popup"
        >
          <X className="size-5" />
        </button>

        <div className="mb-6 flex flex-col items-center text-center">
          <div className="mb-4 grid size-14 place-items-center rounded-2xl bg-[var(--surface)] text-[var(--primary)] ring-1 ring-[var(--border)] shadow-[var(--shadow-low)]">
            <Lock className="size-7" />
          </div>
          <h2 id="auth-modal-title" className="text-xl font-extrabold text-[var(--foreground)]">
            Xác thực phiên học
          </h2>
          <p className="mt-1.5 text-xs text-[var(--muted)]">
            {message || "Nhập mật khẩu quản trị viên để tiếp tục lưu dữ liệu."}
          </p>
        </div>

        {success ? (
          <div className="flex flex-col items-center justify-center py-4 text-center">
            <CheckCircle2 className="size-12 text-[var(--success)] animate-bounce" />
            <p className="mt-3 font-bold text-[var(--success)]">Xác thực thành công!</p>
            <p className="text-xs text-[var(--muted)]">Đang tiếp tục phiên học của bạn...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="auth-password-input" className="block text-xs font-bold uppercase tracking-wider text-[var(--muted)] mb-2">
                Mật khẩu
              </label>
              <div className="relative">
                <input
                  ref={inputRef}
                  id="auth-password-input"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu..."
                  disabled={isLoading}
                  required
                  className="study-input pr-11 py-3 text-base"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)] hover:text-[var(--foreground)] p-1 rounded"
                  tabIndex={-1}
                  aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 rounded-xl border border-[var(--danger)]/30 bg-[rgba(166,87,87,0.08)] p-3 text-xs font-semibold text-[var(--danger)]">
                <AlertCircle className="size-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                disabled={isLoading}
                className="btn-quiet flex-1 py-3 text-sm font-bold disabled:opacity-50"
              >
                Hủy
              </button>
              <button
                type="submit"
                disabled={isLoading || !password.trim()}
                className="btn-primary flex-1 py-3 text-sm font-bold disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    <span>Đang kiểm tra...</span>
                  </>
                ) : (
                  <>
                    <KeyRound className="size-4" />
                    <span>Đăng nhập</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
