"use client";

import Link from "next/link";
import { BookOpen, BrainCircuit, Target, Flame, ChevronRight, Sparkles, AlertCircle, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalWords: 0,
    wordsToReview: 0,
    masteredWords: 0,
    learningWords: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
      const res = await fetch(`${apiUrl}/api/dashboard`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setStats({
        totalWords: data.totalWords || 0,
        wordsToReview: data.wordsToReview || 0,
        masteredWords: data.masteredWords || 0,
        learningWords: data.learningWords || 0,
      });
    } catch (error) {
      console.error("Dashboard fetch error:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (isError) {
    return (
      <div className="p-8 max-w-6xl mx-auto flex flex-col gap-8 items-center justify-center min-h-[70vh]">
        <div className="bg-rose-50 dark:bg-rose-950/30 p-8 rounded-3xl border border-rose-100 dark:border-rose-900 shadow-sm text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-rose-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-rose-700 dark:text-rose-400 mb-2">Backend không chạy</h1>
          <p className="text-rose-600 dark:text-rose-300 mb-6">
            Không thể kết nối với cơ sở dữ liệu và AI cục bộ. Vui lòng kiểm tra lại backend.
          </p>
          <button 
            onClick={fetchStats}
            className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-xl font-bold transition-colors"
          >
            <RefreshCw className="w-5 h-5" /> Thử lại
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-8 max-w-6xl mx-auto flex items-center justify-center min-h-[70vh]">
        <RefreshCw className="w-10 h-10 text-indigo-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            Welcome back! 👋
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg">
            Ready to expand your vocabulary today?
          </p>
        </div>
        <div className="flex items-center gap-3 bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 px-5 py-3 rounded-2xl border border-orange-100 dark:border-orange-500/20 shadow-sm">
          <Flame className="w-6 h-6 fill-orange-500" />
          <div>
            <p className="text-xs font-bold uppercase tracking-wider opacity-80">Current Streak</p>
            <p className="text-xl font-bold leading-none">3 Days</p>
          </div>
        </div>
      </div>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-8 rounded-3xl text-white shadow-lg relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-20 transform group-hover:scale-110 transition-transform duration-500">
            <Target className="w-32 h-32" />
          </div>
          <div className="relative z-10">
            <h3 className="text-indigo-100 font-medium mb-2 text-lg">Due for Review</h3>
            <p className="text-6xl font-bold mb-6">{stats.wordsToReview}</p>
            <Link 
              href="/practice" 
              className="inline-flex items-center gap-2 bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-colors shadow-sm"
            >
              Start Review Session
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl w-fit mb-4">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-gray-500 dark:text-gray-400 font-medium mb-1">Total Vocabulary</h3>
            <p className="text-4xl font-bold text-gray-900 dark:text-white">{stats.totalWords}</p>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-100 dark:border-zinc-800">
            <Link 
              href="/vocabulary" 
              className="text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center gap-1"
            >
              Manage Words <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-2xl w-fit mb-4">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <h3 className="text-gray-500 dark:text-gray-400 font-medium mb-1">Mastered Words</h3>
            <p className="text-4xl font-bold text-gray-900 dark:text-white">{stats.masteredWords}</p>
            <p className="text-sm text-gray-400 mt-2">{stats.learningWords} still learning</p>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-100 dark:border-zinc-800 w-full bg-gray-100 dark:bg-zinc-800 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-emerald-500 h-full rounded-full" 
              style={{ width: `${stats.totalWords > 0 ? (stats.masteredWords / stats.totalWords) * 100 : 0}%` }}
            />
          </div>
        </div>
      </div>

      {/* Suggested Actions */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-indigo-500" />
          Recommended for you
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/practice" className="group bg-gradient-to-br from-gray-50 to-white dark:from-zinc-900 dark:to-zinc-800/50 p-6 rounded-3xl border border-gray-200 dark:border-zinc-700 hover:border-indigo-400 dark:hover:border-indigo-500 transition-all shadow-sm hover:shadow-md">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Practice with AI</h3>
            <p className="text-gray-600 dark:text-gray-400">Generate dynamic sentences or play Flashcards to strengthen your memory using Active Recall.</p>
          </Link>
          <Link href="/vocabulary" className="group bg-gradient-to-br from-gray-50 to-white dark:from-zinc-900 dark:to-zinc-800/50 p-6 rounded-3xl border border-gray-200 dark:border-zinc-700 hover:border-indigo-400 dark:hover:border-indigo-500 transition-all shadow-sm hover:shadow-md">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Add New Vocabulary</h3>
            <p className="text-gray-600 dark:text-gray-400">Encountered a new word today? Add it to your collection and let the SRS system schedule your reviews.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
