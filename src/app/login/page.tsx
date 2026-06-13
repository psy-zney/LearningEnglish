"use client";

import { useState } from "react";
import { Lock, Loader2, LogIn, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
      const res = await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem("admin_token", data.token);
        router.push("/");
      } else {
        setError(data.error || "Mật khẩu không đúng.");
      }
    } catch {
      setError("Không thể kết nối đến máy chủ.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="study-panel p-8 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-[rgba(99,102,241,0.12)] rounded-2xl text-[var(--primary)] ring-1 ring-[var(--primary)]/30">
            <Lock className="w-8 h-8" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-center text-[var(--foreground)] mb-2">
          Đăng nhập hệ thống
        </h1>
        <p className="text-center text-[var(--muted)] mb-8">
          Vui lòng nhập mật khẩu quản trị viên để tiếp tục
        </p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[var(--muted)] mb-2">
              Mật khẩu
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="study-input"
              placeholder="Nhập mật khẩu..."
              required
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-[var(--danger)] text-sm bg-[rgba(239,68,68,0.1)] p-3 rounded-xl border border-[var(--danger)]/20">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          <button
            type="submit"
            suppressHydrationWarning
            disabled={isLoading || !password}
            className="btn-primary w-full py-3 disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <LogIn className="w-5 h-5" />}
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
}
