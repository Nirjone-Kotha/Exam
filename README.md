# MedExam BCS - Modern Medical & BCS Examination Web Platform

A production-ready, modern examination web application tailored for medical postgraduate and BCS examinations. Designed for zero-cost deployment on **Vercel's Free Tier**, operating completely on the **D: drive** (`D:\Study\BCS\Exam App`).

---

## 🌟 Key Features

1. **11 Medical Subjects Pre-Configured**:
   - Medicine
   - Surgery
   - OBS and Gynae
   - Anatomy
   - Physiology
   - Biochemistry
   - Community Medicine
   - Forensic Medicine
   - Pathophysiology
   - Pharmacology
   - Microbiology

2. **Adaptive Countdown Timer & Limit Settings**:
   - **Default Formula**: Exactly **Total MCQs ÷ 2 minutes** (e.g. 50 MCQs = 25 minutes, 20 MCQs = 10 minutes).
   - **Sticky Top Bar**: The countdown timer stays pinned at the top of the viewport even when scrolling through questions.
   - Auto-submits exam when timer reaches 00:00.

3. **Dynamic Randomization Engine**:
   - Every time an exam is started or retaken, question sequence and options are freshly randomized using the Fisher-Yates algorithm.

4. **Single-Page Non-Paginated Question Layout**:
   - All questions are presented together on one smooth, easily scrollable page (no tedious "Next" button pagination).
   - Floating **Question Quick Jump Palette** to jump to any question (1...N) with color status indicators.

5. **Scoring & Negative Marking**:
   - Correct answer: **+1.0**
   - Wrong answer: **-0.5**
   - Skipped question: **0.0**
   - Instant calculation of Net Score, Positive Marks, Negative Marks, and Accuracy.

6. **Instant Answers & Comprehensive Clinical Explanations**:
   - As soon as the exam is submitted, view your chosen answer, the correct answer, and an in-depth medical explanation for each question.
   - Filter review by: *All*, *Mistakes Only*, *Correct Only*, *Skipped*.

7. **Multi-Attempt Result Comparison**:
   - When an exam is taken multiple times, it compares the current result against previous attempts on that specific exam (Score difference $\Delta$, accuracy improvements, reduction in negative marks, time changes).

8. **Vercel Free Tier Optimized**:
   - Built with **Next.js 14 (App Router)** and **Tailwind CSS**.
   - Completely free forever on Vercel without database limits or subscription fees.

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ☁️ Deploying to Vercel (Free Plan)

1. Push this project to GitHub (or GitLab/Bitbucket).
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your repository.
4. Framework preset: **Next.js** (detected automatically).
5. Click **Deploy**!
