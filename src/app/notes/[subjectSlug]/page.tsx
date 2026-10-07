"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getSubjectBySlug } from "@/data/subjects";
import {
  getNotesForSubject,
  saveSubjectNote,
  deleteSubjectNote,
  syncNotesWithServer
} from "@/lib/notesStorage";
import { SubjectNote, NoteCategory } from "@/lib/types";
import {
  ArrowLeft,
  NotebookPen,
  Save,
  Trash2,
  Filter,
  Search,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Flame,
  FileText,
  SortAsc,
  Sparkles,
  Info,
  Check,
  Copy,
  Printer,
  Edit2,
  XCircle,
  TrendingUp,
  Share2
} from "lucide-react";

export default function SubjectImportantNotesPage() {
  const params = useParams();
  const slug = params.slug as string;
  const subject = getSubjectBySlug(slug);

  // Form State (3 Columns)
  const [topicName, setTopicName] = useState("");
  const [pageNumber, setPageNumber] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<NoteCategory>("Important to read");
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);

  // Notes & UI State
  const [notes, setNotes] = useState<SubjectNote[]>([]);
  const [filterCategory, setFilterCategory] = useState<"All" | NoteCategory>("All");
  const [searchFilter, setSearchFilter] = useState("");
  const [saveSuccessMsg, setSaveSuccessMsg] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Smart Interactive Revision Tracker
  const [reviewedIds, setReviewedIds] = useState<string[]>([]);

  const topicInputRef = useRef<HTMLInputElement>(null);

  // Load notes and reviewed status on mount
  useEffect(() => {
    if (!subject) return;

    // Load local notes
    const local = getNotesForSubject(subject.id);
    setNotes(local);

    // Load reviewed checklist
    try {
      const storedReviewed = localStorage.getItem(`bcs_reviewed_${subject.id}`);
      if (storedReviewed) {
        setReviewedIds(JSON.parse(storedReviewed));
      }
    } catch {}

    // Sync with Neon / Upstash if configured
    syncNotesWithServer(subject.id).then((synced) => {
      setNotes(synced);
    });
  }, [subject]);

  // Toggle Reviewed status with Haptic Feedback
  const handleToggleReviewed = (noteId: string) => {
    if (!subject) return;
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(12);
    }
    const updated = reviewedIds.includes(noteId)
      ? reviewedIds.filter((id) => id !== noteId)
      : [...reviewedIds, noteId];
    setReviewedIds(updated);
    try {
      localStorage.setItem(`bcs_reviewed_${subject.id}`, JSON.stringify(updated));
    } catch {}
  };

  // Handle Form Submission (Save or Update)
  const handleSaveNote = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!subject) return;

    const trimmedTopic = topicName.trim();
    const parsedPage = parseInt(pageNumber.trim(), 10);

    // Validation: at least first two columns must be filled
    if (!trimmedTopic) {
      setErrorMessage("Please enter a Topic Name (টপিক্স নেম দিন)।");
      topicInputRef.current?.focus();
      return;
    }

    if (isNaN(parsedPage) || parsedPage <= 0) {
      setErrorMessage("Please enter a valid Page Number (সঠিক পেজ নাম্বার দিন)।");
      return;
    }

    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(15);
    }

    const noteToSave: SubjectNote = {
      id: editingNoteId || `note_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      subjectId: subject.id,
      subjectName: subject.name,
      topic: trimmedTopic,
      pageNumber: parsedPage,
      category: selectedCategory,
      createdAt: editingNoteId
        ? notes.find((n) => n.id === editingNoteId)?.createdAt || Date.now()
        : Date.now(),
    };

    const updated = await saveSubjectNote(noteToSave);
    setNotes(updated);

    // Reset inputs for rapid sequential entry
    setTopicName("");
    setPageNumber("");
    setEditingNoteId(null);
    setSaveSuccessMsg(true);
    setTimeout(() => setSaveSuccessMsg(false), 2500);

    // Re-focus topic input for next note
    topicInputRef.current?.focus();
  };

  // Start Editing Note
  const handleStartEdit = (note: SubjectNote) => {
    setEditingNoteId(note.id);
    setTopicName(note.topic);
    setPageNumber(note.pageNumber.toString());
    setSelectedCategory(note.category);
    topicInputRef.current?.focus();
    window.scrollTo({ top: 180, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingNoteId(null);
    setTopicName("");
    setPageNumber("");
  };

  // Handle Delete
  const handleDeleteNote = async (id: string) => {
    if (!subject) return;
    if (confirm("Are you sure you want to delete this note? (আপনি কি এই নোটটি মুছে ফেলতে চান?)")) {
      const updated = await deleteSubjectNote(id, subject.id);
      setNotes(updated);
      setReviewedIds((prev) => prev.filter((rId) => rId !== id));
    }
  };

  // Copy Note to Clipboard
  const handleCopyNote = (note: SubjectNote) => {
    const text = `[${subject?.name}] Page ${note.pageNumber}: ${note.topic} (${note.category})`;
    navigator.clipboard.writeText(text);
    setCopiedId(note.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filtered & Sorted Notes: strictly sorted ascending by pageNumber
  const filteredNotes = useMemo(() => {
    return notes
      .filter((note) => {
        // Category filter
        if (filterCategory !== "All" && note.category !== filterCategory) {
          return false;
        }
        // Search filter
        if (searchFilter.trim()) {
          const query = searchFilter.toLowerCase();
          return (
            note.topic.toLowerCase().includes(query) ||
            note.pageNumber.toString().includes(query)
          );
        }
        return true;
      })
      .sort((a, b) => a.pageNumber - b.pageNumber || a.createdAt - b.createdAt);
  }, [notes, filterCategory, searchFilter]);

  // Category counts
  const counts = useMemo(() => {
    return {
      all: notes.length,
      difficult: notes.filter((n) => n.category === "Difficult").length,
      important: notes.filter((n) => n.category === "Important to read").length,
      frequent: notes.filter((n) => n.category === "Frequently coming question").length,
    };
  }, [notes]);

  // Revision Progress calculation
  const revisionProgress = useMemo(() => {
    if (notes.length === 0) return 0;
    const reviewedCount = notes.filter((n) => reviewedIds.includes(n.id)).length;
    return Math.round((reviewedCount / notes.length) * 100);
  }, [notes, reviewedIds]);

  if (!subject) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Subject Not Found</h2>
        <p className="text-sm text-slate-500">The requested medical subject was not found.</p>
        <Link
          href="/notes"
          className="inline-flex items-center px-4 py-2 rounded-xl bg-indigo-600 text-white font-semibold text-sm"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Notes Directory
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-6 sm:space-y-8 overflow-x-hidden">
      
      {/* Top Navigation & Actions */}
      <div className="print:hidden">
        <div className="flex items-center justify-between mb-3">
          <Link
            href="/notes"
            className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors touch-manipulation min-h-[32px]"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to All Subjects Notes
          </Link>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => window.print()}
              title="Print high-yield notes sheet"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print Sheet</span>
            </button>

            <Link
              href={`/subject/${subject.slug}`}
              className="inline-flex items-center text-xs font-semibold px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950 dark:hover:bg-emerald-900 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5 mr-1" /> View Exams
            </Link>
          </div>
        </div>

        {/* Prominent Header Requested by User: "Important note" */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border border-slate-800 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-lg relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
            <div>
              <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[11px] font-bold border border-indigo-500/30 mb-2">
                <NotebookPen className="w-3 h-3 text-indigo-400" />
                <span>{subject.name} Subject</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
                Important note
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                Add high-yield textbook topics with page numbers. Notes are ordered by page number in ascending order with interactive revision tracking.
              </p>
            </div>

            {/* Smart Stats & Interactive Revision Bar */}
            <div className="flex items-center gap-3">
              <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10 text-center min-w-[120px]">
                <div className="flex items-center justify-between text-[11px] text-indigo-200 mb-1 font-semibold">
                  <span>Revision</span>
                  <span>{revisionProgress}%</span>
                </div>
                <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${revisionProgress}%` }}
                  />
                </div>
                <span className="text-[10px] text-slate-300 mt-1 block">
                  {notes.filter((n) => reviewedIds.includes(n.id)).length} of {notes.length} reviewed
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3-Column Input Row Card Requested by User */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm space-y-4 print:hidden">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
              {editingNoteId ? "Edit Note (নোট সম্পাদনা করুন)" : "Add New Note (নতুন নোট যোগ করুন)"}
            </h2>
          </div>
          <span className="text-[11px] text-slate-500">
            * অন্তত টপিক্স নেম ও পেজ নাম্বার পূরণ করুন
          </span>
        </div>

        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-50 text-rose-800 border border-rose-200 text-xs font-medium flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 flex-shrink-0 text-rose-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        {saveSuccessMsg && (
          <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold flex items-center gap-2 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-600" />
            <span>সফলভাবে পেজ নাম্বার অনুযায়ী সেভ করা হয়েছে! (Saved successfully)</span>
          </div>
        )}

        <form onSubmit={handleSaveNote} className="space-y-4">
          {/* 3-Column Input Row */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-end">
            
            {/* Column 1: Topic Name (টপিক্স নেম) */}
            <div className="md:col-span-5 space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                1. Topic Name (টপিক্স নেম) <span className="text-rose-500">*</span>
              </label>
              <input
                ref={topicInputRef}
                type="text"
                value={topicName}
                onChange={(e) => setTopicName(e.target.value)}
                placeholder="e.g. Types of Epithelium & Locations"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-slate-900 transition-all shadow-inner"
              />
            </div>

            {/* Column 2: Page Number (পেজ নাম্বার) */}
            <div className="md:col-span-3 space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                2. Page Number (পেজ নাম্বার) <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                min="1"
                step="1"
                value={pageNumber}
                onChange={(e) => setPageNumber(e.target.value)}
                placeholder="e.g. 54"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-slate-900 transition-all font-mono font-bold shadow-inner"
              />
            </div>

            {/* Column 3: Category Selection (Difficult, Important to read, Frequently coming question) */}
            <div className="md:col-span-4 space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                3. Category (ক্যাটাগরি সিলেক্ট করুন)
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {/* Option: Difficult */}
                <button
                  type="button"
                  onClick={() => setSelectedCategory("Difficult")}
                  className={`px-2 py-2.5 rounded-xl text-[11px] font-bold border transition-all flex flex-col items-center justify-center text-center touch-manipulation ${
                    selectedCategory === "Difficult"
                      ? "bg-rose-100 text-rose-800 border-rose-400 dark:bg-rose-950 dark:text-rose-200 dark:border-rose-600 shadow-sm ring-2 ring-rose-400/30"
                      : "bg-slate-50 text-slate-600 border-slate-200 hover:border-rose-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700"
                  }`}
                >
                  <Flame className={`w-3.5 h-3.5 mb-0.5 ${selectedCategory === "Difficult" ? "text-rose-600" : "text-slate-400"}`} />
                  <span className="leading-tight">Difficult</span>
                </button>

                {/* Option: Important to read */}
                <button
                  type="button"
                  onClick={() => setSelectedCategory("Important to read")}
                  className={`px-2 py-2.5 rounded-xl text-[11px] font-bold border transition-all flex flex-col items-center justify-center text-center touch-manipulation ${
                    selectedCategory === "Important to read"
                      ? "bg-amber-100 text-amber-800 border-amber-400 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-600 shadow-sm ring-2 ring-amber-400/30"
                      : "bg-slate-50 text-slate-600 border-slate-200 hover:border-amber-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700"
                  }`}
                >
                  <AlertTriangle className={`w-3.5 h-3.5 mb-0.5 ${selectedCategory === "Important to read" ? "text-amber-600" : "text-slate-400"}`} />
                  <span className="leading-tight">Important</span>
                </button>

                {/* Option: Frequently coming question */}
                <button
                  type="button"
                  onClick={() => setSelectedCategory("Frequently coming question")}
                  className={`px-2 py-2.5 rounded-xl text-[11px] font-bold border transition-all flex flex-col items-center justify-center text-center touch-manipulation ${
                    selectedCategory === "Frequently coming question"
                      ? "bg-emerald-100 text-emerald-800 border-emerald-400 dark:bg-emerald-950 dark:text-emerald-200 dark:border-emerald-600 shadow-sm ring-2 ring-emerald-400/30"
                      : "bg-slate-50 text-slate-600 border-slate-200 hover:border-emerald-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700"
                  }`}
                >
                  <CheckCircle2 className={`w-3.5 h-3.5 mb-0.5 ${selectedCategory === "Frequently coming question" ? "text-emerald-600" : "text-slate-400"}`} />
                  <span className="leading-tight">Frequent</span>
                </button>
              </div>
            </div>

          </div>

          {/* Submit / Save Button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <span className="text-[11px] text-slate-400 hidden sm:inline flex items-center gap-1">
              <Info className="w-3.5 h-3.5 inline mr-1 text-slate-400" />
              পেজ নাম্বার ও টপিক লিখে Enter চাপলেই স্বয়ংক্রিয়ভাবে সেভ হবে।
            </span>

            <div className="flex items-center space-x-2 w-full sm:w-auto">
              {editingNoteId && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all min-h-[42px]"
                >
                  Cancel Edit
                </button>
              )}

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-600/20 active:scale-95 transition-all touch-manipulation min-h-[42px]"
              >
                <Save className="w-4 h-4" />
                <span>{editingNoteId ? "Update Note" : "Save Note (সেভ করুন)"}</span>
              </button>
            </div>
          </div>
        </form>
      </section>

      {/* Saved Notes Section: Filter & Ascending Sequential List */}
      <section className="space-y-4">
        
        {/* Filter Bar & Controls Requested by User */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm space-y-3 print:hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            
            {/* Filter Buttons */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-400 mr-1 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5 text-indigo-500" />
                <span>Filter:</span>
              </span>

              {/* All */}
              <button
                type="button"
                onClick={() => setFilterCategory("All")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  filterCategory === "All"
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                }`}
              >
                <span>All (সকল)</span>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20 dark:bg-black/20 font-mono">
                  {counts.all}
                </span>
              </button>

              {/* Difficult */}
              <button
                type="button"
                onClick={() => setFilterCategory("Difficult")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  filterCategory === "Difficult"
                    ? "bg-rose-600 text-white shadow-sm"
                    : "bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-900"
                }`}
              >
                <Flame className="w-3 h-3" />
                <span>Difficult</span>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-rose-200/50 dark:bg-rose-800/50 font-mono">
                  {counts.difficult}
                </span>
              </button>

              {/* Important to read */}
              <button
                type="button"
                onClick={() => setFilterCategory("Important to read")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  filterCategory === "Important to read"
                    ? "bg-amber-600 text-white shadow-sm"
                    : "bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-900"
                }`}
              >
                <AlertTriangle className="w-3 h-3" />
                <span>Important to read</span>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-200/50 dark:bg-amber-800/50 font-mono">
                  {counts.important}
                </span>
              </button>

              {/* Frequently coming question */}
              <button
                type="button"
                onClick={() => setFilterCategory("Frequently coming question")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  filterCategory === "Frequently coming question"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-900"
                }`}
              >
                <CheckCircle2 className="w-3 h-3" />
                <span>Frequently coming</span>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-200/50 dark:bg-emerald-800/50 font-mono">
                  {counts.frequent}
                </span>
              </button>
            </div>

            {/* Quick Search */}
            <div className="relative w-full md:w-56">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search topics or pages..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100 dark:border-slate-800 pt-2">
            <span className="flex items-center gap-1 font-semibold text-indigo-600 dark:text-indigo-400">
              <SortAsc className="w-3.5 h-3.5" />
              <span>পেজ নাম্বার এর উর্ধ্বক্রমানুসারে সজ্জিত (Sorted: Page Ascending)</span>
            </span>
            <span>
              Showing {filteredNotes.length} of {notes.length} notes
            </span>
          </div>
        </div>

        {/* Notes Sequential List / Cards */}
        {filteredNotes.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-8 sm:p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-500 flex items-center justify-center mx-auto">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {notes.length === 0
                ? "No notes added yet for " + subject.name
                : "No notes matching the selected filter"}
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {notes.length === 0
                ? "উপরের ফর্মটিতে টপিক্স নেম, পেজ নাম্বার এবং ক্যাটাগরি সিলেক্ট করে সেভ করুন।"
                : "অন্য কোনো ফিল্টারে ক্লিক করুন অথবা সার্চ টেক্সট পরিবর্তন করুন।"}
            </p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {filteredNotes.map((note) => {
              const isDifficult = note.category === "Difficult";
              const isImportant = note.category === "Important to read";
              const isFrequent = note.category === "Frequently coming question";
              const isReviewed = reviewedIds.includes(note.id);
              const isCopied = copiedId === note.id;

              return (
                <div
                  key={note.id}
                  className={`group bg-white dark:bg-slate-900 border rounded-xl sm:rounded-2xl p-3.5 sm:p-4 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isReviewed
                      ? "border-emerald-200/80 bg-emerald-50/20 dark:border-emerald-900/50"
                      : "border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-600"
                  }`}
                >
                  {/* Left: Revision Checkbox, Page Number Badge & Topic Name */}
                  <div className="flex items-start sm:items-center space-x-3 flex-1 min-w-0">
                    
                    {/* Smart Interactive Revision Checkbox */}
                    <button
                      type="button"
                      onClick={() => handleToggleReviewed(note.id)}
                      title={isReviewed ? "Marked as Revised" : "Click to mark as Revised"}
                      className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all flex-shrink-0 mt-1 sm:mt-0 ${
                        isReviewed
                          ? "bg-emerald-600 text-white shadow-sm"
                          : "border-2 border-slate-300 dark:border-slate-600 hover:border-emerald-500 text-transparent"
                      }`}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </button>

                    {/* Prominent Page Number Badge */}
                    <div className="flex-shrink-0 flex flex-col items-center justify-center min-w-[58px] sm:min-w-[64px] px-2 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Page
                      </span>
                      <span className="text-base sm:text-lg font-black font-mono text-indigo-600 dark:text-indigo-400">
                        {note.pageNumber}
                      </span>
                    </div>

                    {/* Topic Name */}
                    <div className="min-w-0 flex-1">
                      <h4
                        className={`text-xs sm:text-sm font-bold leading-snug break-words transition-all ${
                          isReviewed
                            ? "line-through text-slate-400 dark:text-slate-500"
                            : "text-slate-900 dark:text-white"
                        }`}
                      >
                        {note.topic}
                      </h4>
                      <div className="flex items-center space-x-2 text-[10px] text-slate-400 mt-0.5">
                        <span>Added: {new Date(note.createdAt).toLocaleDateString()}</span>
                        {isReviewed && (
                          <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-0.5">
                            <Check className="w-3 h-3" /> Revised
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: Category Badge & Smart Action Buttons */}
                  <div className="flex items-center justify-between sm:justify-end space-x-1.5 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                    
                    {/* Category Badge */}
                    {isDifficult && (
                      <span className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-900 text-[11px] font-bold flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5 text-rose-500" />
                        <span>Difficult</span>
                      </span>
                    )}

                    {isImportant && (
                      <span className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-900 text-[11px] font-bold flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                        <span>Important to read</span>
                      </span>
                    )}

                    {isFrequent && (
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-900 text-[11px] font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Frequently coming</span>
                      </span>
                    )}

                    {/* Copy button */}
                    <button
                      type="button"
                      onClick={() => handleCopyNote(note)}
                      title="Copy note text"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-colors touch-manipulation print:hidden"
                    >
                      {isCopied ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>

                    {/* Edit button */}
                    <button
                      type="button"
                      onClick={() => handleStartEdit(note)}
                      title="Edit note"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-colors touch-manipulation print:hidden"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>

                    {/* Delete button */}
                    <button
                      type="button"
                      onClick={() => handleDeleteNote(note.id)}
                      title="Delete note"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors touch-manipulation print:hidden"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

    </div>
  );
}
