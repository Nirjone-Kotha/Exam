"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AppUser } from "@/lib/types";
import { clientSignOut, setCurrentUser } from "@/lib/auth";
import { getAllAttempts } from "@/lib/storage";
import { getAllNotesLocal } from "@/lib/notesStorage";
import { getAllCollectedNotesLocal } from "@/lib/collectedNotesStorage";
import {
  X,
  User,
  Mail,
  Phone,
  Calendar,
  Award,
  History,
  NotebookPen,
  FolderOpen,
  LogOut,
  Edit2,
  Check,
  ShieldCheck,
  CheckCircle2,
  Activity
} from "lucide-react";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: AppUser | null;
  onUserUpdate?: (updated: AppUser) => void;
}

export default function ProfileModal({
  isOpen,
  onClose,
  user,
  onUserUpdate,
}: ProfileModalProps) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(user?.name || "");
  const [stats, setStats] = useState({
    attemptsCount: 0,
    importantNotesCount: 0,
    collectedNotesCount: 0,
  });

  useEffect(() => {
    if (user) {
      setEditedName(user.name);
    }
    if (isOpen) {
      const attempts = getAllAttempts();
      const impNotes = getAllNotesLocal();
      const colNotes = getAllCollectedNotesLocal();
      setStats({
        attemptsCount: attempts.length,
        importantNotesCount: impNotes.length,
        collectedNotesCount: colNotes.length,
      });
    }
  }, [user, isOpen]);

  if (!isOpen || !user) return null;

  const handleSaveName = () => {
    const trimmed = editedName.trim();
    if (!trimmed) return;
    const updatedUser: AppUser = {
      ...user,
      name: trimmed,
    };
    setCurrentUser(updatedUser);
    if (onUserUpdate) onUserUpdate(updatedUser);
    setIsEditingName(false);
  };

  const handleSignOut = async () => {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(20);
    }
    await clientSignOut();
    onClose();
    window.location.href = "/auth/signin";
  };

  const isEmail = user.identifier.includes("@");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      {/* Modal Container */}
      <div
        className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white p-5 sm:p-6 pb-8">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center space-x-3.5">
            <div className="w-14 h-14 rounded-2xl bg-white text-emerald-700 font-black text-xl flex items-center justify-center shadow-lg shadow-black/10 flex-shrink-0">
              {user.name.charAt(0).toUpperCase()}
            </div>

            <div className="min-w-0 flex-1">
              {isEditingName ? (
                <div className="flex items-center space-x-1.5">
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="px-2.5 py-1 rounded-lg text-xs font-bold text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-white w-full"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={handleSaveName}
                    className="p-1 rounded-lg bg-emerald-800 text-white hover:bg-emerald-900"
                  >
                    <Check className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-black tracking-tight truncate">
                    {user.name}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsEditingName(true)}
                    className="p-1 text-white/70 hover:text-white transition-colors"
                    title="Edit Name"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              <div className="flex items-center space-x-1.5 text-xs text-emerald-100 font-mono mt-0.5 truncate">
                {isEmail ? <Mail className="w-3 h-3 flex-shrink-0" /> : <Phone className="w-3 h-3 flex-shrink-0" />}
                <span className="truncate">{user.identifier}</span>
              </div>

              <div className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-semibold text-white">
                <ShieldCheck className="w-3 h-3 text-emerald-200" />
                <span>Verified Medical Candidate</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5 overflow-y-auto">
          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-2.5 text-center">
            <div className="bg-slate-50 dark:bg-slate-800/80 p-3 rounded-2xl border border-slate-200 dark:border-slate-700">
              <span className="text-[10px] text-slate-500 font-semibold block">Exams Taken</span>
              <span className="text-lg font-black text-emerald-600 dark:text-emerald-400 font-mono">
                {stats.attemptsCount}
              </span>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/80 p-3 rounded-2xl border border-slate-200 dark:border-slate-700">
              <span className="text-[10px] text-slate-500 font-semibold block">Imp Notes</span>
              <span className="text-lg font-black text-indigo-600 dark:text-indigo-400 font-mono">
                {stats.importantNotesCount}
              </span>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/80 p-3 rounded-2xl border border-slate-200 dark:border-slate-700">
              <span className="text-[10px] text-slate-500 font-semibold block">Collected</span>
              <span className="text-lg font-black text-teal-600 dark:text-teal-400 font-mono">
                {stats.collectedNotesCount}
              </span>
            </div>
          </div>

          {/* Quick Access Links */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Quick Shortcuts
            </span>

            <Link
              href="/history"
              onClick={onClose}
              className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/60 dark:hover:bg-slate-800 transition-colors text-xs font-bold text-slate-800 dark:text-slate-200"
            >
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
                  <History className="w-4 h-4" />
                </div>
                <span>My Exam Analytics & Comparisons</span>
              </div>
              <span className="text-emerald-600 font-semibold">View</span>
            </Link>

            <Link
              href="/notes"
              onClick={onClose}
              className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/60 dark:hover:bg-slate-800 transition-colors text-xs font-bold text-slate-800 dark:text-slate-200"
            >
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center">
                  <NotebookPen className="w-4 h-4" />
                </div>
                <span>Subject Notes & PDF Downloads</span>
              </div>
              <span className="text-indigo-600 font-semibold">Open</span>
            </Link>
          </div>

          {/* Account Details */}
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-[11px] space-y-1.5 text-slate-500">
            <div className="flex items-center justify-between">
              <span>Account Type:</span>
              <span className="font-bold text-slate-700 dark:text-slate-300">BCS & Post-Grad Student</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Session Mode:</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Active & Synced
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>User ID:</span>
              <span className="font-mono text-[10px] text-slate-400">{user.id}</span>
            </div>
          </div>

          {/* Sign Out Action Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleSignOut}
              className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-950/70 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 font-bold text-xs sm:text-sm transition-all active:scale-[0.98] shadow-sm min-h-[44px]"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out (লগআউট করুন)</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
