# Modern Medical & BCS Exam Web Application - Implementation Plan

A modern, responsive, high-performance examination web application tailored for medical postgraduate and BCS examinations. Designed for seamless one-click zero-configuration deployment to **Vercel (Free Tier)**, operating completely on the **D: drive** (`D:\Study\BCS\Exam App`).

---

## 1. Goal Description
The objective is to build an interactive, production-ready exam portal with:
1. **11 Core Medical Subjects**: Medicine, Surgery, OBS and Gynae, Anatomy, Physiology, Biochemistry, Community Medicine, Forensic Medicine, Pathophysiology, Pharmacology, Microbiology.
2. **Subject & Exam Hierarchy**: Each subject contains multiple categorized exams/mock tests with question banks.
3. **Adaptive Time Limit Setting**: Default exam time is set strictly to **(Total MCQs ÷ 2) minutes** (e.g. 50 MCQs = 25 minutes, 20 MCQs = 10 minutes), with customizable options.
4. **Non-paginated Single-Page Question Flow**: All questions are rendered together on a single, easily scrollable page with a smooth question-navigator palette (no tedious "Next" button pagination).
5. **Sticky Top Countdown Timer**: A pinned, static header displaying the remaining time, answered questions count, and submit button that stays in place during full-page scrolling.
6. **Dynamic Randomization**: Every attempt dynamically shuffles the question sequence (and options) so no two attempts share the same order.
7. **Negative Marking & Scoring System**:
   - Correct answer: **+1.0**
   - Incorrect answer: **-0.5**
   - Unattempted: **0.0**
8. **Instant Evaluation & In-Depth Explanations**: On submission, immediate breakdown showing student's choices, correct answers with green/red badges, and comprehensive clinical explanations.
9. **Attempt Comparison Engine**: Compares the current exam result against all previous attempts on the same exam (Score difference $\Delta$, accuracy changes, time reduction, and attempt-by-attempt progress charts).
10. **Vercel Free Tier Optimized**: Built with Next.js (App Router), Tailwind CSS, Lucide icons, and client-side offline-first persistence (LocalStorage/IndexedDB) with zero database fees or cold starts.

---

## 2. Technical Architecture & Component Design

### 2.1 Technology Stack
- **Framework**: Next.js 14+ (App Router, React 18/19, TypeScript)
- **Styling**: Tailwind CSS (Clean medical slate / emerald / indigo styling, high contrast, mobile responsive)
- **Icons**: Lucide React
- **Animations & Interactivity**: Canvas-confetti (for score celebration), smooth scrolling
- **Storage**: IndexedDB & LocalStorage repository for storing attempts, score history, user bookmarks, and custom exams with zero external database cost.

### 2.2 User Journey & Workflow
```
[11 Subjects Dashboard]
       │
       ▼
[Subject Page: List of Exam Papers]
       │
       ▼
[Exam Launch Modal / Config: Default (Total Questions / 2) Mins]
       │
       ▼
[Exam Room: Sticky Timer Header, All Questions on 1 Scrollable Page, Quick Palette]
       │
       ▼
[Instant Result Hub: Net Score (+1 / -0.5), Detailed Explanations]
       │
       ▼
[Attempt Comparison: Current Attempt vs Previous Attempt 1, 2, ... (Score Delta & Trend)]
```

---

## 3. Project Structure (D:\Study\BCS\Exam App)

```
D:\Study\BCS\Exam App\
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── next.config.mjs
├── src/
│   ├── app/
│   │   ├── layout.tsx                      # Root layout, Header, Font setup
│   │   ├── page.tsx                        # 11 Subjects dashboard & quick stats
│   │   ├── subject/[slug]/page.tsx         # Subject exams directory
│   │   ├── exam/[id]/page.tsx              # Single-page exam room with sticky countdown
│   │   ├── result/[attemptId]/page.tsx     # Result, review, explanations & attempt comparison
│   │   ├── history/page.tsx                # Global performance history & past attempts
│   │   └── manage/page.tsx                 # Question & Exam manager (Add / Import JSON)
│   ├── components/
│   │   ├── Header.tsx                      # Main navigation header
│   │   ├── StickyExamHeader.tsx            # Pinned countdown timer & live progress bar
│   │   ├── QuestionCard.tsx                # Single question view with responsive radio options
│   │   ├── QuestionPalette.tsx             # Floating/collapsible question jump grid (1..N)
│   │   ├── AttemptComparisonCard.tsx       # Comparison card (Attempt 1 vs 2 vs 3, score delta)
│   │   ├── ReviewQuestionCard.tsx          # Review card with color highlights & explanations
│   │   ├── ScoreSummaryCard.tsx            # Graphical score breakdown (+, -, net score)
│   │   └── ConfirmSubmitModal.tsx          # Review answered/unanswered counts before submit
│   ├── data/
│   │   └── questions/                      # Built-in question banks for all 11 subjects
│   │       ├── medicine.json
│   │       ├── surgery.json
│   │       ├── obsGynae.json
│   │       ├── anatomy.json
│   │       ├── physiology.json
│   │       ├── biochemistry.json
│   │       ├── communityMedicine.json
│   │       ├── forensicMedicine.json
│   │       ├── pathophysiology.json
│   │       ├── pharmacology.json
│   │       └── microbiology.json
│   ├── lib/
│   │   ├── types.ts                        # TypeScript interfaces (Subject, Exam, Question, Attempt)
│   │   ├── storage.ts                      # LocalStorage / IndexedDB repository for attempts
│   │   ├── shuffle.ts                      # Fisher-Yates randomization algorithm
│   │   └── evaluation.ts                   # Scoring engine (+1, -0.5, metrics calculation)
│   └── styles/
│       └── globals.css                     # Custom styles, smooth scrolling, print layout
```

---

## 4. Key Feature Details

### 4.1 The 11 Subjects
1. **Medicine**
2. **Surgery**
3. **OBS and Gynae**
4. **Anatomy**
5. **Physiology**
6. **Biochemistry**
7. **Community Medicine**
8. **Forensic Medicine**
9. **Pathophysiology**
10. **Pharmacology**
11. **Microbiology**

### 4.2 Dynamic Question Shuffling
- Uses the **Fisher-Yates Shuffle** algorithm before every exam attempt.
- Questions appear in an entirely new random sequence on retakes.
- Option order is also randomized while preserving the exact answer key and explanation mapping.

### 4.3 Static / Sticky Countdown Timer
- Fixed header pinned at the top (`position: sticky` or `fixed`, `top: 0`, `z-index: 50`).
- Shows:
  - Subject and Exam title.
  - Live Countdown Timer formatted `MM:SS`.
  - Color cues: Emerald/Blue normally, Amber under 5 minutes, Red flashing under 1 minute.
  - Live progress: Answered X / Total Y questions.
  - Submit Button with confirmation dialog.
- Automatically triggers evaluation when timer reaches `00:00`.

### 4.4 Single-Page All-Questions Layout
- All questions are displayed sequentially on one easily scrollable page.
- Smooth scrolling enabled.
- A quick jump palette allows clicking Question # to scroll directly to it.
- Badges show which questions are answered, unanswered, or marked for review.

### 4.5 Scoring & Negative Marking
- Correct: **+1.0**
- Incorrect: **-0.5**
- Skipped: **0.0**
- Detailed summary showing Positive Marks, Negative Deduction, Net Score, and Accuracy %.

### 4.6 Instant Review & Explanations
- Every question clearly indicates:
  - User's selected choice.
  - Correct answer with green badge.
  - Wrong answers marked with red badge.
  - Detailed clinical explanation for why the answer is correct and clinical context.
  - Filter by: `All`, `Incorrect Only`, `Correct Only`, `Skipped Only`.

### 4.7 Multi-Attempt Comparison Engine
- When an exam is taken more than once:
  - Compares the latest score against previous attempts.
  - Shows score difference ($\Delta$), accuracy improvement %, reduction in negative marks, and time comparison.
  - Visual comparison table showing Attempt 1, Attempt 2, ..., Attempt N.

---

## 5. Verification Plan

### 5.1 Automated Testing & Build
- `npm run build` executed in `D:\Study\BCS\Exam App` to verify zero TypeScript errors, valid App Router routes, and optimized bundle.
- Verify negative marking calculation formula: $(1.0 \times \text{correct}) - (0.5 \times \text{wrong})$.

### 5.2 Manual Verification
- Verify all 11 subjects appear with exam sets.
- Verify countdown timer calculates $\text{Questions} / 2$ minutes by default.
- Verify sticky timer stays fixed at top when scrolling through 20+ questions.
- Verify random question order changes on each retake.
- Verify instant explanation and negative mark deduction (-0.5).
- Verify comparison report displays difference between multiple attempts.
