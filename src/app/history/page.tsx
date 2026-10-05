"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getAllAttempts } from "../../lib/storage";
import { ExamAttempt } from "../../lib/types";
import { formatTimeLong } from "../../lib/evaluation";
import {
  History,
  Award,
  Target,
  Clock,
  ArrowRight,
  TrendingUp,
  Trash2,
  Download,
  Layers,
  ArrowLeft
} from "lucide-react";

export default function HistoryPage() {
  const [attempts, setAttempts] = useState<ExamAttempt[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>("all");

  useEffect(() => {
    setAttempts(getAllAttempts());
  }, []);

  const totalExams = attempts.length;
  const avgAccuracy =
    totalExams > 0
      ? Math.round(attempts.reduce((acc, a) => acc + a.accuracy, 0) / totalExams)
      : 0;
  const totalCorrect = attempts.reduce((acc, a) => acc + a.correctCount, 0);
  const totalWrong = attempts.reduce((acc, a) => acc + a.wrongCount, 0);

  const filteredAttempts =
    selectedSubject === "all"
      ? attempts
      : attempts.filter(
          (a) => a.subjectName.toLowerCase() === selectedSubject.toLowerCase()
        );

  const uniqueSubjects = Array.from(new Set(attempts.map((a) => a.subjectName)));

  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(attempts, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `medexam_history_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleClearHistory = () => {
    if (confirm("Are you sure you want to clear all exam history? This action cannot be undone.")) {
      localStorage.removeItem("bcs_exam_attempts_v1");
      setAttempts([]);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            href="/"
            className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Home Dashboard
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            My Exam History & Progress Analytics
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Track your performance improvements across all medical subjects and attempts
          </p>
        </div>

        {totalExams > 0 && (
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={handleExportData}
              className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export History</span>
            </button>
            <button
              type="button"
              onClick={handleClearHistory}
              className="inline-flex items-center space-x-1 px-3 py-2 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
              title="Clear all saved attempts"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          </div>
        )}
      </div>

      {/* Aggregate Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Tests Taken</span>
            <History className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {totalExams}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Avg. Accuracy</span>
            <Target className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {avgAccuracy}%
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Total Correct</span>
            <Award className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600">
            {totalCorrect}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Total Mistakes</span>
            <TrendingUp className="w-4 h-4 text-red-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-red-600">
            {totalWrong}
          </div>
        </div>
      </div>

      {/* Attempts List */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            All Recorded Attempts
          </h2>

          {/* Subject Filter */}
          {uniqueSubjects.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-xs text-slate-500">Filter:</span>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none"
              >
                <option value="all">All Subjects</option>
                {uniqueSubjects.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {filteredAttempts.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center space-y-4">
            <History className="w-12 h-12 mx-auto text-slate-400" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              No Exam Attempts Yet
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
              You haven't completed any exams yet. Choose any medical subject from the dashboard and test your knowledge!
            </p>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs sm:text-sm"
            >
              Explore 11 Subjects
            </Link>
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="py-3.5 px-4 sm:px-6">Subject & Exam</th>
                    <th className="py-3.5 px-4">Date</th>
                    <th className="py-3.5 px-4">Score</th>
                    <th className="py-3.5 px-4">Accuracy</th>
                    <th className="py-3.5 px-4">Time Spent</th>
                    <th className="py-3.5 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredAttempts.map((att) => (
                    <tr
                      key={att.id}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="py-4 px-4 sm:px-6">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block mb-0.5">
                          {att.subjectName}
                        </span>
                        <span className="font-bold text-slate-900 dark:text-white">
                          {att.examTitle}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-slate-500">
                        {new Date(att.timestamp).toLocaleDateString([], {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="py-4 px-4 font-black text-slate-900 dark:text-white">
                        {att.netScore} <span className="text-xs text-slate-500 font-normal">/ {att.totalQuestions}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                          {att.accuracy}%
                        </span>
                      </td>
                      <td className="py-4 px-4 text-slate-500">
                        {formatTimeLong(att.timeSpentSeconds)}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <Link
                          href={`/result/${att.id}`}
                          className="inline-flex items-center text-xs font-bold text-emerald-600 hover:text-emerald-700 hover:underline"
                        >
                          View Review <ArrowRight className="w-3.5 h-3.5 ml-1" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
