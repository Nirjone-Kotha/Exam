"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SUBJECTS_DATA } from "../../data/subjects";
import { ArrowLeft, PlusCircle, Upload, CheckCircle2, FileText, Code2, AlertCircle } from "lucide-react";

export default function QuestionManagerPage() {
  const [jsonInput, setJsonInput] = useState("");
  const [importStatus, setImportStatus] = useState<{ success: boolean; message: string } | null>(null);

  const sampleJSON = JSON.stringify(
    [
      {
        id: "custom-q1",
        question: "A 45-year-old male with polyuria and polydipsia has fasting plasma glucose of 145 mg/dL on two occasions. What is the diagnosis?",
        options: [
          "Impaired fasting glucose",
          "Diabetes Mellitus Type 2",
          "Diabetes Insipidus",
          "Normal glucose tolerance"
        ],
        correctAnswer: 1,
        explanation: "Fasting plasma glucose >= 126 mg/dL (7.0 mmol/L) confirmed on two separate occasions meets diagnostic criteria for Diabetes Mellitus.",
        subject: "Medicine",
        topic: "Endocrinology"
      }
    ],
    null,
    2
  );

  const handleValidateAndImport = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      if (!Array.isArray(parsed)) {
        throw new Error("Input JSON must be an array of Question objects.");
      }
      if (parsed.length === 0) {
        throw new Error("Question array cannot be empty.");
      }
      for (const q of parsed) {
        if (!q.question || !Array.isArray(q.options) || q.options.length < 2 || q.correctAnswer === undefined) {
          throw new Error(`Invalid question format: each item must have 'question', 'options' array, and 'correctAnswer' index (0-3).`);
        }
      }
      // Store custom questions in LocalStorage
      const existing = JSON.parse(localStorage.getItem("bcs_custom_questions") || "[]");
      const updated = [...existing, ...parsed];
      localStorage.setItem("bcs_custom_questions", JSON.stringify(updated));

      setImportStatus({
        success: true,
        message: `Successfully validated and imported ${parsed.length} custom medical questions into local storage!`,
      });
      setJsonInput("");
    } catch (err: any) {
      setImportStatus({
        success: false,
        message: err.message || "Invalid JSON syntax. Please verify question schema.",
      });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-10 space-y-6 sm:space-y-8 overflow-x-hidden">
      {/* Header */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white mb-3 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Home Dashboard
        </Link>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Question Manager & Custom Question Bank Importer
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Import your own high-yield question banks, past year BCS papers, or residency mock tests in JSON format
        </p>
      </div>

      {/* JSON Import Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center space-x-3 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 flex items-center justify-center">
            <Upload className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Import Questions via JSON
            </h2>
            <p className="text-xs text-slate-500">
              Paste your structured JSON question array below
            </p>
          </div>
        </div>

        {/* Status Message */}
        {importStatus && (
          <div
            className={`p-4 rounded-2xl text-xs sm:text-sm flex items-start gap-2.5 border ${
              importStatus.success
                ? "bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300"
                : "bg-red-50 text-red-800 border-red-300 dark:bg-red-950/60 dark:text-red-300"
            }`}
          >
            {importStatus.success ? (
              <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-600" />
            ) : (
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-600" />
            )}
            <span>{importStatus.message}</span>
          </div>
        )}

        {/* Text Area for JSON */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Paste JSON Question Array:
          </label>
          <textarea
            rows={8}
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder={sampleJSON}
            className="w-full font-mono text-xs p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => setJsonInput(sampleJSON)}
            className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 hover:underline inline-flex items-center gap-1"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Load Sample JSON Template</span>
          </button>

          <button
            type="button"
            onClick={handleValidateAndImport}
            disabled={!jsonInput.trim()}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 active:scale-95 transition-all"
          >
            Validate & Import Questions
          </button>
        </div>
      </div>

      {/* Schema Reference */}
      <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 text-xs text-slate-600 dark:text-slate-400 space-y-3">
        <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
          <FileText className="w-4 h-4 text-emerald-600" />
          JSON Question Format Guidelines:
        </h4>
        <ul className="list-disc list-inside space-y-1 pl-1">
          <li><strong>question</strong>: The stem / clinical vignette of the question (String).</li>
          <li><strong>options</strong>: Array of 4 options (Strings).</li>
          <li><strong>correctAnswer</strong>: 0-indexed number (0 for Option A, 1 for Option B, etc.).</li>
          <li><strong>explanation</strong>: Detailed clinical explanation displayed after exam submission.</li>
          <li><strong>subject</strong>: One of the 11 medical subjects (e.g. Medicine, Surgery, Anatomy, etc.).</li>
        </ul>
      </div>
    </div>
  );
}
