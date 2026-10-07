"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { getSubjectBySlug } from "@/data/subjects";
import {
  getNotesForSubject,
  saveSubjectNote,
  deleteSubjectNote,
  syncNotesWithServer
} from "@/lib/notesStorage";
import {
  getCollectedNotesForSubject,
  saveCollectedNote,
  deleteCollectedNote,
  syncCollectedNotesWithServer
} from "@/lib/collectedNotesStorage";
import { SubjectNote, CollectedNote, NoteCategory } from "@/lib/types";
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
  Download,
  FolderOpen,
  ChevronDown,
  Layers,
  Calendar,
  Clock
} from "lucide-react";

function SubjectNotesWorkspaceContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const rawSlug = (params?.subjectSlug as string) || (params?.slug as string) || "";
  const slug = decodeURIComponent(rawSlug);
  const subject = getSubjectBySlug(slug);

  // Active Main Tab: "important" or "collected"
  const initialTab = searchParams.get("tab") === "collected" ? "collected" : "important";
  const [activeTab, setActiveTab] = useState<"important" | "collected">(initialTab);

  // ----------------------------------------------------
  // PART 1: IMPORTANT NOTE STATE (3 Columns & Page Sort)
  // ----------------------------------------------------
  const [topicName, setTopicName] = useState("");
  const [pageNumber, setPageNumber] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<NoteCategory>("Important to read");
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);

  const [importantNotes, setImportantNotes] = useState<SubjectNote[]>([]);
  const [filterCategory, setFilterCategory] = useState<"All" | NoteCategory>("All");
  const [searchFilter, setSearchFilter] = useState("");
  const [saveSuccessMsg, setSaveSuccessMsg] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [reviewedIds, setReviewedIds] = useState<string[]>([]);

  // Smart Condensed Filter Dropdown State
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const filterDropdownRef = useRef<HTMLDivElement>(null);
  const topicInputRef = useRef<HTMLInputElement>(null);

  // ----------------------------------------------------
  // PART 2: COLLECTED NOTE STATE (Topic & Paragraph Text)
  // ----------------------------------------------------
  const [collectedTopic, setCollectedTopic] = useState("");
  const [collectedContent, setCollectedContent] = useState("");
  const [editingCollectedId, setEditingCollectedId] = useState<string | null>(null);
  const [collectedNotes, setCollectedNotes] = useState<CollectedNote[]>([]);
  const [collectedSearch, setCollectedSearch] = useState("");
  const [collectedSuccessMsg, setCollectedSuccessMsg] = useState(false);
  const [collectedErrorMsg, setCollectedErrorMsg] = useState("");
  const [copiedCollectedId, setCopiedCollectedId] = useState<string | null>(null);

  const collectedTopicRef = useRef<HTMLInputElement>(null);

  // Load both Important Notes and Collected Notes on mount
  useEffect(() => {
    if (!subject) return;

    // 1. Important Notes
    const localImportant = getNotesForSubject(subject.id);
    setImportantNotes(localImportant);

    try {
      const storedReviewed = localStorage.getItem(`bcs_reviewed_${subject.id}`);
      if (storedReviewed) {
        setReviewedIds(JSON.parse(storedReviewed));
      }
    } catch {}

    syncNotesWithServer(subject.id).then((synced) => {
      setImportantNotes(synced);
    });

    // 2. Collected Notes
    const localCollected = getCollectedNotesForSubject(subject.id);
    setCollectedNotes(localCollected);

    syncCollectedNotesWithServer(subject.id).then((synced) => {
      setCollectedNotes(synced);
    });

    // Close filter dropdown on outside click
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        filterDropdownRef.current &&
        !filterDropdownRef.current.contains(e.target as Node)
      ) {
        setIsFilterDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [subject]);

  // ----------------------------------------------------
  // IMPORTANT NOTE HANDLERS
  // ----------------------------------------------------
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

  const handleSaveImportantNote = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!subject) return;

    const trimmedTopic = topicName.trim();
    const parsedPage = parseInt(pageNumber.trim(), 10);

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
        ? importantNotes.find((n) => n.id === editingNoteId)?.createdAt || Date.now()
        : Date.now(),
    };

    const updated = await saveSubjectNote(noteToSave);
    setImportantNotes(updated);

    setTopicName("");
    setPageNumber("");
    setEditingNoteId(null);
    setSaveSuccessMsg(true);
    setTimeout(() => setSaveSuccessMsg(false), 2500);
    topicInputRef.current?.focus();
  };

  const handleStartEditImportant = (note: SubjectNote) => {
    setEditingNoteId(note.id);
    setTopicName(note.topic);
    setPageNumber(note.pageNumber.toString());
    setSelectedCategory(note.category);
    topicInputRef.current?.focus();
    window.scrollTo({ top: 180, behavior: "smooth" });
  };

  const handleCancelEditImportant = () => {
    setEditingNoteId(null);
    setTopicName("");
    setPageNumber("");
  };

  const handleDeleteImportantNote = async (id: string) => {
    if (!subject) return;
    if (confirm("Are you sure you want to delete this note? (আপনি কি এই নোটটি মুছে ফেলতে চান?)")) {
      const updated = await deleteSubjectNote(id, subject.id);
      setImportantNotes(updated);
      setReviewedIds((prev) => prev.filter((rId) => rId !== id));
    }
  };

  const handleCopyImportantNote = (note: SubjectNote) => {
    const text = `[${subject?.name}] Page ${note.pageNumber}: ${note.topic} (${note.category})`;
    navigator.clipboard.writeText(text);
    setCopiedId(note.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredImportantNotes = useMemo(() => {
    return importantNotes
      .filter((note) => {
        if (filterCategory !== "All" && note.category !== filterCategory) {
          return false;
        }
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
  }, [importantNotes, filterCategory, searchFilter]);

  const counts = useMemo(() => {
    return {
      all: importantNotes.length,
      difficult: importantNotes.filter((n) => n.category === "Difficult").length,
      important: importantNotes.filter((n) => n.category === "Important to read").length,
      frequent: importantNotes.filter((n) => n.category === "Frequently coming question").length,
    };
  }, [importantNotes]);

  const revisionProgress = useMemo(() => {
    if (importantNotes.length === 0) return 0;
    const reviewedCount = importantNotes.filter((n) => reviewedIds.includes(n.id)).length;
    return Math.round((reviewedCount / importantNotes.length) * 100);
  }, [importantNotes, reviewedIds]);

  // ----------------------------------------------------
  // COLLECTED NOTE HANDLERS
  // ----------------------------------------------------
  const handleSaveCollectedNote = async (e: React.FormEvent) => {
    e.preventDefault();
    setCollectedErrorMsg("");

    if (!subject) return;

    const trimmedTopic = collectedTopic.trim();
    const trimmedContent = collectedContent.trim();

    if (!trimmedTopic) {
      setCollectedErrorMsg("অনুগ্রহ করে টপিক নেম লিখুন (Please enter Topic Name)।");
      collectedTopicRef.current?.focus();
      return;
    }

    if (!trimmedContent) {
      setCollectedErrorMsg("অনুগ্রহ করে কালেক্টেড নোট লিখুন বা পেস্ট করুন (Please enter Collected Note)।");
      return;
    }

    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(15);
    }

    const noteToSave: CollectedNote = {
      id: editingCollectedId || `col_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      subjectId: subject.id,
      subjectName: subject.name,
      topic: trimmedTopic,
      content: trimmedContent,
      createdAt: editingCollectedId
        ? collectedNotes.find((n) => n.id === editingCollectedId)?.createdAt || Date.now()
        : Date.now(),
      updatedAt: Date.now(),
    };

    const updated = await saveCollectedNote(noteToSave);
    setCollectedNotes(updated);

    setCollectedTopic("");
    setCollectedContent("");
    setEditingCollectedId(null);
    setCollectedSuccessMsg(true);
    setTimeout(() => setCollectedSuccessMsg(false), 2500);
    collectedTopicRef.current?.focus();
  };

  const handleStartEditCollected = (note: CollectedNote) => {
    setEditingCollectedId(note.id);
    setCollectedTopic(note.topic);
    setCollectedContent(note.content);
    collectedTopicRef.current?.focus();
    window.scrollTo({ top: 180, behavior: "smooth" });
  };

  const handleCancelEditCollected = () => {
    setEditingCollectedId(null);
    setCollectedTopic("");
    setCollectedContent("");
  };

  const handleDeleteCollectedNote = async (id: string) => {
    if (!subject) return;
    if (confirm("Are you sure you want to delete this collected note? (আপনি কি এই সংগৃহীত নোটটি মুছে ফেলতে চান?)")) {
      const updated = await deleteCollectedNote(id, subject.id);
      setCollectedNotes(updated);
    }
  };

  const handleCopyCollectedNote = (note: CollectedNote) => {
    const text = `=== ${note.topic} (${subject?.name}) ===\n\n${note.content}`;
    navigator.clipboard.writeText(text);
    setCopiedCollectedId(note.id);
    setTimeout(() => setCopiedCollectedId(null), 2000);
  };

  const filteredCollectedNotes = useMemo(() => {
    return collectedNotes.filter((note) => {
      if (!collectedSearch.trim()) return true;
      const q = collectedSearch.toLowerCase();
      return note.topic.toLowerCase().includes(q) || note.content.toLowerCase().includes(q);
    });
  }, [collectedNotes, collectedSearch]);

  // PDF Download / Print Trigger
  const handleDownloadAllAsPdf = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

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
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-6 sm:space-y-8">
      
      {/* ---------------------------------------------------- */}
      {/* PRINT-ONLY VIEW FOR "COLLECTED NOTE" PDF EXPORT */}
      {/* ---------------------------------------------------- */}
      <div className="hidden print:block font-serif text-black p-4">
        <div className="border-b-2 border-black pb-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold uppercase tracking-wide">
                MedExam BCS — Collected Notes
              </h1>
              <h2 className="text-xl font-semibold text-gray-800 mt-1">
                Subject: {subject.name}
              </h2>
            </div>
            <div className="text-right text-xs text-gray-600">
              <p>Total Collected Notes: {collectedNotes.length}</p>
              <p>Printed: {new Date().toLocaleDateString("en-US", { dateStyle: "long" })}</p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {collectedNotes.map((note, idx) => (
            <div
              key={note.id}
              className="border-b border-gray-300 pb-6 break-inside-avoid"
              style={{ pageBreakInside: "avoid" }}
            >
              <div className="flex items-baseline justify-between mb-2">
                <h3 className="text-lg font-bold text-black">
                  {idx + 1}. {note.topic}
                </h3>
                <span className="text-xs text-gray-500 font-sans">
                  {new Date(note.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-gray-800 whitespace-pre-wrap">
                {note.content}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* SCREEN UI HEADER & CONTROLS */}
      {/* ---------------------------------------------------- */}
      <div className="print:hidden space-y-4">
        
        {/* Top Back & Quick Actions */}
        <div className="flex items-center justify-between">
          <Link
            href="/notes"
            className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors touch-manipulation min-h-[32px]"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Notes Directory
          </Link>

          <div className="flex items-center space-x-2">
            {activeTab === "collected" ? (
              <button
                type="button"
                onClick={handleDownloadAllAsPdf}
                title="Download all collected notes as PDF"
                className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm shadow-emerald-600/20 active:scale-95 touch-manipulation"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download All as PDF (পিডিএফ)</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => window.print()}
                title="Print high-yield notes sheet"
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all shadow-sm"
              >
                <Printer className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Print Sheet</span>
              </button>
            )}

            <Link
              href={`/subject/${subject.slug}`}
              className="inline-flex items-center text-xs font-semibold px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950 dark:hover:bg-emerald-900 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5 mr-1" /> View Exams
            </Link>
          </div>
        </div>

        {/* Prominent Subject Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border border-slate-800 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-lg relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
            <div>
              <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[11px] font-bold border border-indigo-500/30 mb-2">
                <NotebookPen className="w-3 h-3 text-indigo-400" />
                <span>{subject.name} Medical Subject</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
                {activeTab === "important" ? "Important note" : "Collected note"}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                {activeTab === "important"
                  ? "Add high-yield textbook topics with page numbers. Notes are ordered by page number in ascending order."
                  : "Collect study paragraphs and high-yield revision summaries. Download all notes together as a PDF anytime."}
              </p>
            </div>

            {/* Smart Stats Bar */}
            <div className="flex items-center gap-3">
              {activeTab === "important" ? (
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
                    {importantNotes.filter((n) => reviewedIds.includes(n.id)).length} of {importantNotes.length} reviewed
                  </span>
                </div>
              ) : (
                <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10 text-center min-w-[120px]">
                  <div className="text-[11px] text-emerald-200 font-semibold mb-0.5">
                    Total Collected
                  </div>
                  <div className="text-xl sm:text-2xl font-black font-mono text-emerald-300">
                    {collectedNotes.length}
                  </div>
                  <span className="text-[10px] text-slate-300 block">
                    Ready for PDF Export
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Two Part Main Switcher Pill Requested by User */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-1.5 shadow-sm flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 w-full sm:w-auto">
            {/* Tab 1: Important note */}
            <button
              type="button"
              onClick={() => setActiveTab("important")}
              className={`flex-1 sm:flex-none flex items-center justify-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all min-h-[38px] ${
                activeTab === "important"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <NotebookPen className="w-4 h-4" />
              <span>Important note ({importantNotes.length})</span>
            </button>

            {/* Tab 2: Collected note */}
            <button
              type="button"
              onClick={() => setActiveTab("collected")}
              className={`flex-1 sm:flex-none flex items-center justify-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all min-h-[38px] ${
                activeTab === "collected"
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/25"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <FolderOpen className="w-4 h-4" />
              <span>Collected note ({collectedNotes.length})</span>
            </button>
          </div>

          <span className="text-[11px] text-slate-400 hidden md:inline pr-2">
            {activeTab === "important" ? "3-Column Page Tracker" : "Paragraphs & PDF Exporter"}
          </span>
        </div>

      </div>

      {/* ==================================================== */}
      {/* SECTION 1: IMPORTANT NOTE TAB                        */}
      {/* ==================================================== */}
      {activeTab === "important" && (
        <div className="space-y-6 print:hidden">
          
          {/* 3-Column Input Row Card */}
          <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm space-y-4">
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

            <form onSubmit={handleSaveImportantNote} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-end">
                
                {/* Column 1: Topic Name */}
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

                {/* Column 2: Page Number */}
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

                {/* Column 3: Category Selection */}
                <div className="md:col-span-4 space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    3. Category (ক্যাটাগরি সিলেক্ট করুন)
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {/* Difficult */}
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

                    {/* Important to read */}
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

                    {/* Frequently coming question */}
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

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <span className="text-[11px] text-slate-400 hidden sm:inline flex items-center gap-1">
                  <Info className="w-3.5 h-3.5 inline mr-1 text-slate-400" />
                  পেজ নাম্বার ও টপিক লিখে Enter চাপলেই স্বয়ংক্রিয়ভাবে সেভ হবে।
                </span>

                <div className="flex items-center space-x-2 w-full sm:w-auto">
                  {editingNoteId && (
                    <button
                      type="button"
                      onClick={handleCancelEditImportant}
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

          {/* SMARTLY CONDENSED FILTER BAR REQUESTED BY USER */}
          <section className="space-y-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 sm:p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              
              {/* Condensed Filter Dropdown Trigger */}
              <div className="relative" ref={filterDropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                    filterCategory !== "All"
                      ? "bg-indigo-50 border-indigo-300 text-indigo-700 dark:bg-indigo-950 dark:border-indigo-700 dark:text-indigo-300 shadow-sm"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300"
                  }`}
                >
                  <Filter className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  <span>
                    Filter: {filterCategory === "All" ? "All Notes" : filterCategory}
                  </span>
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-indigo-100 dark:bg-indigo-900/60 font-mono text-indigo-800 dark:text-indigo-200">
                    {filterCategory === "All"
                      ? counts.all
                      : filterCategory === "Difficult"
                      ? counts.difficult
                      : filterCategory === "Important to read"
                      ? counts.important
                      : counts.frequent}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Popover / Dropdown Menu */}
                {isFilterDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-64 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-2 z-30 text-xs space-y-1">
                    <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Select Category Filter
                    </div>

                    {/* All */}
                    <button
                      type="button"
                      onClick={() => {
                        setFilterCategory("All");
                        setIsFilterDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-bold transition-colors ${
                        filterCategory === "All"
                          ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                          : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <Layers className="w-3.5 h-3.5 text-indigo-500" />
                        <span>All (সকল নোট)</span>
                      </span>
                      <span className="font-mono text-[10px] opacity-80">({counts.all})</span>
                    </button>

                    {/* Difficult */}
                    <button
                      type="button"
                      onClick={() => {
                        setFilterCategory("Difficult");
                        setIsFilterDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-bold transition-colors ${
                        filterCategory === "Difficult"
                          ? "bg-rose-600 text-white"
                          : "text-rose-700 dark:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <Flame className="w-3.5 h-3.5 text-rose-500" />
                        <span>Difficult</span>
                      </span>
                      <span className="font-mono text-[10px] opacity-80">({counts.difficult})</span>
                    </button>

                    {/* Important to read */}
                    <button
                      type="button"
                      onClick={() => {
                        setFilterCategory("Important to read");
                        setIsFilterDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-bold transition-colors ${
                        filterCategory === "Important to read"
                          ? "bg-amber-600 text-white"
                          : "text-amber-700 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-950/40"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                        <span>Important to read</span>
                      </span>
                      <span className="font-mono text-[10px] opacity-80">({counts.important})</span>
                    </button>

                    {/* Frequently coming question */}
                    <button
                      type="button"
                      onClick={() => {
                        setFilterCategory("Frequently coming question");
                        setIsFilterDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-bold transition-colors ${
                        filterCategory === "Frequently coming question"
                          ? "bg-emerald-600 text-white"
                          : "text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/40"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Frequently coming</span>
                      </span>
                      <span className="font-mono text-[10px] opacity-80">({counts.frequent})</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Quick Search & Sort indicator */}
              <div className="flex items-center space-x-2">
                <div className="relative w-full sm:w-56">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search topics or pages..."
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-2.5 py-1.5 rounded-xl whitespace-nowrap">
                  <SortAsc className="w-3.5 h-3.5" />
                  <span>Page Ascending</span>
                </span>
              </div>
            </div>

            {/* Important Notes List */}
            {filteredImportantNotes.length === 0 ? (
              <div className="bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-8 sm:p-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-500 flex items-center justify-center mx-auto">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {importantNotes.length === 0
                    ? "No notes added yet for " + subject.name
                    : "No notes matching the selected filter"}
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  {importantNotes.length === 0
                    ? "উপরের ফর্মটিতে টপিক্স নেম, পেজ নাম্বার এবং ক্যাটাগরি সিলেক্ট করে সেভ করুন।"
                    : "অন্য কোনো ফিল্টারে ক্লিক করুন অথবা সার্চ টেক্সট পরিবর্তন করুন।"}
                </p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {filteredImportantNotes.map((note) => {
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

                        <div className="flex-shrink-0 flex flex-col items-center justify-center min-w-[58px] sm:min-w-[64px] px-2 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            Page
                          </span>
                          <span className="text-base sm:text-lg font-black font-mono text-indigo-600 dark:text-indigo-400">
                            {note.pageNumber}
                          </span>
                        </div>

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

                      {/* Right: Category Badge & Action Buttons */}
                      <div className="flex items-center justify-between sm:justify-end space-x-1.5 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
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

                        <button
                          type="button"
                          onClick={() => handleCopyImportantNote(note)}
                          title="Copy note text"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-colors touch-manipulation"
                        >
                          {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleStartEditImportant(note)}
                          title="Edit note"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-colors touch-manipulation"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteImportantNote(note.id)}
                          title="Delete note"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors touch-manipulation"
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
      )}

      {/* ==================================================== */}
      {/* SECTION 2: COLLECTED NOTE TAB                        */}
      {/* ==================================================== */}
      {activeTab === "collected" && (
        <div className="space-y-6 sm:space-y-8 print:hidden">
          
          {/* 2-Input Form: Topic Name & Collected Note */}
          <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <FolderOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                  {editingCollectedId ? "Edit Collected Note (নোট সম্পাদনা করুন)" : "Collect New Note (নতুন নোট সংগ্রহ করুন)"}
                </h2>
              </div>
              <span className="text-[11px] text-slate-500">
                টপিক নেম ও বিস্তারিত প্যারাগ্রাফ নোট ইনপুট দিয়ে সেভ করুন
              </span>
            </div>

            {collectedErrorMsg && (
              <div className="p-3 rounded-xl bg-rose-50 text-rose-800 border border-rose-200 text-xs font-medium flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0 text-rose-600" />
                <span>{collectedErrorMsg}</span>
              </div>
            )}

            {collectedSuccessMsg && (
              <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold flex items-center gap-2 animate-fade-in">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-600" />
                <span>সফলভাবে সংগৃহীত নোট সেভ হয়েছে! (Collected note saved successfully)</span>
              </div>
            )}

            <form onSubmit={handleSaveCollectedNote} className="space-y-4">
              {/* Field 1: Topic Name */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  ১. টপিক নেম (Topic Name) <span className="text-rose-500">*</span>
                </label>
                <input
                  ref={collectedTopicRef}
                  type="text"
                  value={collectedTopic}
                  onChange={(e) => setCollectedTopic(e.target.value)}
                  placeholder="যেমন: Heart Sounds & Murmurs Differential Diagnosis"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white dark:focus:bg-slate-900 transition-all font-semibold shadow-inner"
                />
              </div>

              {/* Field 2: Collected Note (Textarea with good height) */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  ২. কালেক্টেড নোট (Collected Note Content) <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={6}
                  value={collectedContent}
                  onChange={(e) => setCollectedContent(e.target.value)}
                  placeholder="এখানে আপনার সম্পূর্ণ নোট, ক্লিনিক্যাল পয়েন্ট, হাই-ইল্ড টেবিল বা সারাংশ প্যারাগ্রাফ আকারে লিখুন বা পেস্ট করুন..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white dark:focus:bg-slate-900 transition-all leading-relaxed shadow-inner"
                />
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                <span className="text-[11px] text-slate-400 hidden sm:inline">
                  সেভ করা নোটগুলো নিচে সুন্দর প্যারাগ্রাফ স্টাইলে পড়ার সুবিধার জন্য সাজানো থাকবে।
                </span>

                <div className="flex items-center space-x-2 w-full sm:w-auto">
                  {editingCollectedId && (
                    <button
                      type="button"
                      onClick={handleCancelEditCollected}
                      className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all min-h-[42px]"
                    >
                      Cancel
                    </button>
                  )}

                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 active:scale-95 transition-all touch-manipulation min-h-[42px]"
                  >
                    <Save className="w-4 h-4" />
                    <span>{editingCollectedId ? "Update Collected Note" : "Save Collected Note (নোট সেভ করুন)"}</span>
                  </button>
                </div>
              </div>
            </form>
          </section>

          {/* Action Bar: Search & PDF Download */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 sm:p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                মোট সংগৃহীত নোট: <strong className="text-emerald-600 dark:text-emerald-400">{collectedNotes.length} টি</strong>
              </span>
            </div>

            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="নোট বা টপিক সার্চ করুন..."
                  value={collectedSearch}
                  onChange={(e) => setCollectedSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* PDF Download Button */}
              <button
                type="button"
                onClick={handleDownloadAllAsPdf}
                disabled={collectedNotes.length === 0}
                className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white text-xs font-bold transition-all shadow-sm shadow-emerald-600/20 active:scale-95 touch-manipulation min-h-[34px] flex-shrink-0"
              >
                <Download className="w-3.5 h-3.5" />
                <span>PDF Download</span>
              </button>
            </div>
          </div>

          {/* Sequential Paragraph-Style Notes with pleasant vertical gaps */}
          {filteredCollectedNotes.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-8 sm:p-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-500 flex items-center justify-center mx-auto">
                <FolderOpen className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {collectedNotes.length === 0
                  ? "No collected notes yet for " + subject.name
                  : "No notes matching your search"}
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                {collectedNotes.length === 0
                  ? "উপরের ফরমটিতে টপিক নেম ও বিস্তারিত প্যারাগ্রাফ নোট লিখে সেভ করুন।"
                  : "অন্য কোনো কি-ওয়ার্ড দিয়ে সার্চ করুন।"}
              </p>
            </div>
          ) : (
            <div className="space-y-6 sm:space-y-8">
              {filteredCollectedNotes.map((note, index) => {
                const isCopied = copiedCollectedId === note.id;
                const wordCount = note.content.trim().split(/\s+/).filter(Boolean).length;

                return (
                  <article
                    key={note.id}
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-sm hover:shadow-md transition-all space-y-4"
                  >
                    {/* Note Card Header: Topic & Controls */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                      <div className="flex items-center space-x-2.5">
                        <span className="flex-shrink-0 w-7 h-7 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 font-bold font-mono text-xs flex items-center justify-center">
                          #{index + 1}
                        </span>
                        <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight">
                          {note.topic}
                        </h3>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center space-x-1.5 self-end sm:self-auto">
                        <span className="text-[11px] text-slate-400 mr-2 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{wordCount} words</span>
                        </span>

                        <button
                          type="button"
                          onClick={() => handleCopyCollectedNote(note)}
                          title="নোট কপি করুন (Copy Note)"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 transition-colors"
                        >
                          {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleStartEditCollected(note)}
                          title="নোট সম্পাদনা করুন (Edit Note)"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteCollectedNote(note.id)}
                          title="নোট মুছে ফেলুন (Delete Note)"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Note Paragraph Body - Generous gap, comfortable typography for effortless reading */}
                    <div className="prose prose-slate dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 text-sm sm:text-base leading-relaxed sm:leading-loose whitespace-pre-wrap font-sans selection:bg-emerald-100 dark:selection:bg-emerald-950">
                      {note.content}
                    </div>

                    {/* Note Footer: Date */}
                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-3 border-t border-slate-50 dark:border-slate-800/60">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span>সংরক্ষিত: {new Date(note.createdAt).toLocaleDateString("bn-BD")} ({new Date(note.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })})</span>
                      </span>

                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                        {subject.name} Collected
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

        </div>
      )}

    </div>
  );
}

export default function SubjectNotesWorkspacePage() {
  return (
    <React.Suspense fallback={<div className="min-h-[85vh] flex items-center justify-center text-xs text-slate-400">Loading Subject Notes...</div>}>
      <SubjectNotesWorkspaceContent />
    </React.Suspense>
  );
}
