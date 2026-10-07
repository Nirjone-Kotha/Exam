import { Subject, Exam } from "../lib/types";
import { ANATOMY_BCS_QUESTIONS } from "./questions/anatomy-bcs";
import { BIOCHEMISTRY_BCS_QUESTIONS } from "./questions/biochemistry-bcs";
import { COMMUNITY_MEDICINE_BCS_QUESTIONS } from "./questions/community-medicine-bcs";
import { FORENSIC_MEDICINE_BCS_QUESTIONS } from "./questions/forensic-medicine-bcs";
import { MEDICINE_BCS_QUESTIONS } from "./questions/medicine-bcs";
import { MICROBIOLOGY_BCS_QUESTIONS } from "./questions/microbiology-bcs";
import { OBS_GYNAE_BCS_QUESTIONS } from "./questions/obs-gynae-bcs";
import { PATHOLOGY_BCS_QUESTIONS } from "./questions/pathology-bcs";
import { PHARMACOLOGY_BCS_QUESTIONS } from "./questions/pharmacology-bcs";
import { PHYSIOLOGY_BCS_QUESTIONS } from "./questions/physiology-bcs";
import { SURGERY_BCS_QUESTIONS } from "./questions/surgery-bcs";
import { HISTOLOGY_BCS_QUESTIONS } from "./questions/histology-bcs";

export const SUBJECTS_DATA: Subject[] = [
  {
    id: "medicine",
    name: "Medicine",
    slug: "medicine",
    description: "Internal Medicine, Cardiology, Pulmonology, Nephrology, Neurology, and Rheumatology",
    icon: "Stethoscope",
    accentColor: "from-blue-600 to-indigo-700",
    exams: [
      {
        id: "medicine-bcs-prev",
        title: "Previous BCS Questions",
        subjectId: "medicine",
        subjectName: "Medicine",
        description: "All authentic Previous Special BCS questions (39th, 42nd, 48th BCS) for Medicine & Allied disciplines with verified answers and comprehensive clinical explanations.",
        negativeMark: 0.5,
        questions: MEDICINE_BCS_QUESTIONS
      }
    ]
  },
  {
    id: "surgery",
    name: "Surgery",
    slug: "surgery",
    description: "General Surgery, Trauma, GI Surgery, Urology, Orthopedics, and Surgical Oncology",
    icon: "Scissors",
    accentColor: "from-emerald-600 to-teal-700",
    exams: [
      {
        id: "surgery-bcs-prev",
        title: "Previous BCS Questions",
        subjectId: "surgery",
        subjectName: "Surgery",
        description: "All authentic Previous Special BCS questions for Surgery & Allied disciplines with verified answers and detailed operative explanations.",
        negativeMark: 0.5,
        questions: SURGERY_BCS_QUESTIONS
      }
    ]
  },
  {
    id: "obs-gynae",
    name: "OBS and Gynae",
    slug: "obs-and-gynae",
    description: "Obstetrics, Antenatal Care, High-Risk Pregnancy, Gynecology, and Reproductive Endocrinology",
    icon: "HeartHandshake",
    accentColor: "from-rose-600 to-pink-700",
    exams: [
      {
        id: "obs-gynae-bcs-prev",
        title: "Previous BCS Questions",
        subjectId: "obs-gynae",
        subjectName: "OBS and Gynae",
        description: "All authentic Previous Special BCS questions for Obstetrics & Gynaecology with verified answers and clinical explanations.",
        negativeMark: 0.5,
        questions: OBS_GYNAE_BCS_QUESTIONS
      }
    ]
  },
  {
    id: "anatomy",
    name: "Anatomy",
    slug: "anatomy",
    description: "Gross Anatomy, Histology, Neuroanatomy, Embryology, and Applied Surgical Anatomy",
    icon: "Bone",
    accentColor: "from-amber-600 to-orange-700",
    exams: [
      {
        id: "anatomy-bcs-prev",
        title: "Previous BCS Questions",
        subjectId: "anatomy",
        subjectName: "Anatomy",
        description: "All 50 authentic Previous Special BCS questions (39th, 42nd, 48th BCS) for Anatomy with verified answers and detailed anatomical rationales.",
        negativeMark: 0.5,
        questions: ANATOMY_BCS_QUESTIONS
      }
    ]
  },
  {
    id: "physiology",
    name: "Physiology",
    slug: "physiology",
    description: "Cardiovascular, Respiratory, Renal, Endocrine, Gastrointestinal, and Neurophysiology",
    icon: "Activity",
    accentColor: "from-red-600 to-rose-700",
    exams: [
      {
        id: "physiology-bcs-prev",
        title: "Previous BCS Questions",
        subjectId: "physiology",
        subjectName: "Physiology",
        description: "All 59 authentic Previous Special BCS questions for Medical Systemic Physiology with verified answers and physiological explanations.",
        negativeMark: 0.5,
        questions: PHYSIOLOGY_BCS_QUESTIONS
      }
    ]
  },
  {
    id: "biochemistry",
    name: "Biochemistry",
    slug: "biochemistry",
    description: "Metabolism, Enzymology, Molecular Genetics, Vitamins, Lipids, and Inborn Errors of Metabolism",
    icon: "Dna",
    accentColor: "from-cyan-600 to-blue-700",
    exams: [
      {
        id: "biochemistry-bcs-prev",
        title: "Previous BCS Questions",
        subjectId: "biochemistry",
        subjectName: "Biochemistry",
        description: "All authentic Previous Special BCS questions for Biochemistry with verified answers and biochemical explanations.",
        negativeMark: 0.5,
        questions: BIOCHEMISTRY_BCS_QUESTIONS
      }
    ]
  },
  {
    id: "community-medicine",
    name: "Community Medicine",
    slug: "community-medicine",
    description: "Public Health, Epidemiology, Biostatistics, Preventive Medicine, and Environmental Health",
    icon: "Users",
    accentColor: "from-teal-600 to-emerald-700",
    exams: [
      {
        id: "community-medicine-bcs-prev",
        title: "Previous BCS Questions",
        subjectId: "community-medicine",
        subjectName: "Community Medicine",
        description: "All authentic Previous Special BCS questions for Community Medicine & Public Health with verified answers and epidemiological explanations.",
        negativeMark: 0.5,
        questions: COMMUNITY_MEDICINE_BCS_QUESTIONS
      }
    ]
  },
  {
    id: "forensic-medicine",
    name: "Forensic Medicine",
    slug: "forensic-medicine",
    description: "Medical Jurisprudence, Thanatology, Forensic Pathology, Toxicology, and Legal Procedures",
    icon: "Scale",
    accentColor: "from-stone-600 to-zinc-800",
    exams: [
      {
        id: "forensic-medicine-bcs-prev",
        title: "Previous BCS Questions",
        subjectId: "forensic-medicine",
        subjectName: "Forensic Medicine",
        description: "All authentic Previous Special BCS questions for Forensic Medicine & Toxicology with verified answers and medicolegal explanations.",
        negativeMark: 0.5,
        questions: FORENSIC_MEDICINE_BCS_QUESTIONS
      }
    ]
  },
  {
    id: "pathophysiology",
    name: "Pathophysiology",
    slug: "pathophysiology",
    description: "General Pathology, Cellular Adaptation, Inflammation, Hemodynamics, and Neoplasia",
    icon: "Microscope",
    accentColor: "from-purple-600 to-indigo-800",
    exams: [
      {
        id: "pathophysiology-bcs-prev",
        title: "Previous BCS Questions",
        subjectId: "pathophysiology",
        subjectName: "Pathophysiology",
        description: "All 35 authentic Previous Special BCS questions for Pathology & Pathophysiology with verified answers and detailed pathological explanations.",
        negativeMark: 0.5,
        questions: PATHOLOGY_BCS_QUESTIONS
      }
    ]
  },
  {
    id: "pharmacology",
    name: "Pharmacology",
    slug: "pharmacology",
    description: "General Pharmacokinetics, Autonomic Drugs, Cardiovascular, Antimicrobials, and Toxicology",
    icon: "Pill",
    accentColor: "from-violet-600 to-purple-700",
    exams: [
      {
        id: "pharmacology-bcs-prev",
        title: "Previous BCS Questions",
        subjectId: "pharmacology",
        subjectName: "Pharmacology",
        description: "All 22 authentic Previous Special BCS questions for Pharmacology with verified answers and clinical pharmacological explanations.",
        negativeMark: 0.5,
        questions: PHARMACOLOGY_BCS_QUESTIONS
      }
    ]
  },
  {
    id: "microbiology",
    name: "Microbiology",
    slug: "microbiology",
    description: "Bacteriology, Virology, Mycology, Parasitology, and Clinical Immunology",
    icon: "Bug",
    accentColor: "from-emerald-600 to-green-700",
    exams: [
      {
        id: "microbiology-bcs-prev",
        title: "Previous BCS Questions",
        subjectId: "microbiology",
        subjectName: "Microbiology",
        description: "All 27 authentic Previous Special BCS questions for Microbiology & Immunology with verified answers and detailed microbiological explanations.",
        negativeMark: 0.5,
        questions: MICROBIOLOGY_BCS_QUESTIONS
      }
    ]
  },
  {
    id: "histology",
    name: "Histology",
    slug: "histology",
    description: "Microscopic Anatomy, Epithelial, Connective, Muscular & Nervous Tissues, and Organ Microarchitecture",
    icon: "Microscope",
    accentColor: "from-fuchsia-600 to-pink-700",
    exams: [
      {
        id: "histology-bcs-prev",
        title: "Previous BCS Questions",
        subjectId: "histology",
        subjectName: "Histology",
        description: "Authentic Previous Special BCS and residency microscopic anatomy questions with comprehensive tissue explanations.",
        negativeMark: 0.5,
        questions: HISTOLOGY_BCS_QUESTIONS
      }
    ]
  }
];

export function getSubjectBySlug(slug: string): Subject | undefined {
  return SUBJECTS_DATA.find((s) => s.slug.toLowerCase() === slug.toLowerCase() || s.id.toLowerCase() === slug.toLowerCase());
}

export function getExamById(examId: string): { exam: Exam; subject: Subject } | undefined {
  for (const subject of SUBJECTS_DATA) {
    const exam = subject.exams.find((e) => e.id === examId);
    if (exam) {
      return { exam, subject };
    }
  }
  return undefined;
}
