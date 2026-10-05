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
      },
      {
        id: "med-mock-1",
        title: "Clinical Medicine Comprehensive Paper 1",
        subjectId: "medicine",
        subjectName: "Medicine",
        description: "High-yield internal medicine scenarios covering acute coronary syndromes, stroke, acute kidney injury, and endocrine emergencies.",
        negativeMark: 0.5,
        questions: [
          {
            id: "med-q1",
            question: "A 58-year-old male with a history of hypertension presents with sudden onset crushing retrosternal chest pain radiating to the left arm for 45 minutes. ECG shows ST-segment elevation in leads II, III, and aVF with reciprocal depression in leads I and aVL. Which coronary artery is most likely occluded?",
            options: [
              "Left anterior descending artery (LAD)",
              "Right coronary artery (RCA)",
              "Left circumflex artery (LCx)",
              "Left main coronary artery (LMCA)"
            ],
            correctAnswer: 1,
            explanation: "ST-segment elevation in leads II, III, and aVF indicates an acute inferior wall myocardial infarction. In approximately 85-90% of individuals (right-dominant circulation), the inferior wall is supplied by the posterior descending artery (PDA), which arises from the Right Coronary Artery (RCA). LAD occlusion typically causes anterior wall MI (V1-V4), while LCx occlusion produces lateral wall MI (I, aVL, V5-V6).",
            subject: "Medicine",
            topic: "Cardiology"
          },
          {
            id: "med-q2",
            question: "A 32-year-old female presents with heat intolerance, weight loss despite increased appetite, fine resting tremors, and palpitations. On examination, diffuse nontender goiter with an audible vascular bruit is detected. What is the most specific diagnostic antibody for her condition?",
            options: [
              "Anti-thyroid peroxidase (anti-TPO) antibodies",
              "Anti-thyroglobulin (anti-Tg) antibodies",
              "Thyroid-stimulating immunoglobulin (TSI / TRAb)",
              "Thyroid-blocking immunoglobulin"
            ],
            correctAnswer: 2,
            explanation: "The clinical presentation (hyperthyroidism with diffuse goiter and thyroid bruit) is classic for Graves' disease. Thyroid-stimulating immunoglobulins (TSI) or TSH receptor antibodies (TRAb) stimulate the TSH receptor directly and are the hallmark pathogenic and diagnostic antibodies specific to Graves' disease. Anti-TPO and anti-Tg antibodies can be elevated in Graves', but they are more characteristic of Hashimoto thyroiditis.",
            subject: "Medicine",
            topic: "Endocrinology"
          }
        ]
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
      },
      {
        id: "surg-mock-1",
        title: "General & Operative Surgery Mock Test 1",
        subjectId: "surgery",
        subjectName: "Surgery",
        description: "Essential surgical dilemmas covering acute abdomen, trauma resuscitation, hernias, and post-operative complications.",
        negativeMark: 0.5,
        questions: [
          {
            id: "surg-q1",
            question: "A 24-year-old male presents with periumbilical colicky abdominal pain that shifted to the right iliac fossa over 12 hours. On examination, localized tenderness, guarding, and rebound tenderness at McBurney's point are found. What is the most appropriate next step in management?",
            options: [
              "Abdominal ultrasound with urgent surgical consultation for appendectomy",
              "Barium enema examination",
              "Discharge on oral broad-spectrum antibiotics and analgesics",
              "Colonoscopy with mucosal biopsy"
            ],
            correctAnswer: 0,
            explanation: "The clinical presentation is classic for acute appendicitis (visceral pain starting at T10 dermatome due to luminal obstruction, later shifting to somatic parietal peritoneal tenderness at McBurney's point). Prompt surgical exploration/appendectomy prevents perforation and peritonitis.",
            subject: "Surgery",
            topic: "Acute Abdomen"
          }
        ]
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
      },
      {
        id: "obgyn-mock-1",
        title: "Obstetrics & Gynecology Clinical Paper 1",
        subjectId: "obs-gynae",
        subjectName: "OBS and Gynae",
        description: "Essential obstetric emergencies, preeclampsia, postpartum hemorrhage, ectopic pregnancy, and gynecologic oncology.",
        negativeMark: 0.5,
        questions: [
          {
            id: "obgyn-q1",
            question: "A 26-year-old primigravida at 34 weeks gestation presents with persistent headaches, visual blurriness, and epigastric pain. Blood pressure is 165/110 mmHg, and urine dipstick reveals 3+ protein. What is the drug of choice for the prevention and control of seizures in this patient?",
            options: [
              "Phenytoin sodium",
              "Diazepam",
              "Magnesium sulfate",
              "Sodium valproate"
            ],
            correctAnswer: 2,
            explanation: "Magnesium sulfate is the recognized drug of choice for the prevention and management of eclamptic convulsions in severe preeclampsia.",
            subject: "OBS and Gynae",
            topic: "High-Risk Obstetrics"
          }
        ]
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
      },
      {
        id: "anat-mock-1",
        title: "Medical Anatomy & Embryology Mock 1",
        subjectId: "anatomy",
        subjectName: "Anatomy",
        description: "High-yield anatomical questions covering neurovascular bundles, triangles of neck, cranial nerves, and embryological arches.",
        negativeMark: 0.5,
        questions: [
          {
            id: "anat-q1",
            question: "A patient sustains a fracture of the surgical neck of the humerus. Which nerve and accompanying blood vessel running closely against this region are at highest risk of injury?",
            options: [
              "Radial nerve and profunda brachii artery",
              "Axillary nerve and posterior circumflex humeral artery",
              "Median nerve and brachial artery",
              "Ulnar nerve and superior ulnar collateral artery"
            ],
            correctAnswer: 1,
            explanation: "The axillary nerve and posterior circumflex humeral artery wind around the surgical neck of the humerus in the quadrangular space.",
            subject: "Anatomy",
            topic: "Upper Limb"
          }
        ]
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
      },
      {
        id: "phys-mock-1",
        title: "Medical Systemic Physiology Mock 1",
        subjectId: "physiology",
        subjectName: "Physiology",
        description: "Core physiological principles including Frank-Starling mechanism, countercurrent multiplication, oxygen-hemoglobin curve, and acid-base homeostasis.",
        negativeMark: 0.5,
        questions: [
          {
            id: "phys-q1",
            question: "Which of the following factors causes a shift of the oxygen-hemoglobin dissociation curve to the RIGHT (Bohr effect), thereby facilitating oxygen unloading to active metabolic tissues?",
            options: [
              "Decreased temperature and alkalosis",
              "Increased 2,3-bisphosphoglycerate (2,3-BPG), acidosis (low pH), and hypercapnia",
              "Decreased partial pressure of CO2 (PCO2)",
              "Presence of fetal hemoglobin (HbF)"
            ],
            correctAnswer: 1,
            explanation: "Factors shifting curve right (mnemonic 'CADET, face Right'): CO2 elevation, Acidity/Acidosis (low pH), 2,3-DPG/BPG elevation, Exercise, and Temperature elevation.",
            subject: "Physiology",
            topic: "Respiratory Physiology"
          }
        ]
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
      },
      {
        id: "biochem-mock-1",
        title: "Medical Biochemistry & Clinical Genetics Mock 1",
        subjectId: "biochemistry",
        subjectName: "Biochemistry",
        description: "Key metabolic pathways, enzyme kinetics, inborn errors of amino acid and carbohydrate metabolism, and molecular biology.",
        negativeMark: 0.5,
        questions: [
          {
            id: "biochem-q1",
            question: "Which rate-limiting and committed enzyme of glycolysis is allosterically inhibited by high levels of ATP and citrate, and activated by AMP and fructose-2,6-bisphosphate?",
            options: [
              "Hexokinase",
              "Phosphofructokinase-1 (PFK-1)",
              "Pyruvate kinase",
              "Glyceraldehyde-3-phosphate dehydrogenase"
            ],
            correctAnswer: 1,
            explanation: "Phosphofructokinase-1 (PFK-1) is the main rate-limiting and committed regulatory step of glycolysis.",
            subject: "Biochemistry",
            topic: "Carbohydrate Metabolism"
          }
        ]
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
      },
      {
        id: "cm-mock-1",
        title: "Public Health & Epidemiology Mock 1",
        subjectId: "community-medicine",
        subjectName: "Community Medicine",
        description: "Study designs, incidence vs prevalence, screening test metrics (sensitivity/specificity), vaccine schedules, and disease eradication.",
        negativeMark: 0.5,
        questions: [
          {
            id: "cm-q1",
            question: "An epidemiological study selects 500 patients diagnosed with lung cancer and 500 matched control subjects without lung cancer, and investigates past smoking exposure in both groups. Which study design is this?",
            options: [
              "Prospective cohort study",
              "Case-control study",
              "Cross-sectional survey",
              "Randomized controlled trial"
            ],
            correctAnswer: 1,
            explanation: "A study that starts by identifying cases with a disease and controls without disease, then looks back retrospectively to compare previous exposures, is a Case-Control study.",
            subject: "Community Medicine",
            topic: "Epidemiological Studies"
          }
        ]
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
      },
      {
        id: "fmt-mock-1",
        title: "Forensic Medicine & Toxicology Mock 1",
        subjectId: "forensic-medicine",
        subjectName: "Forensic Medicine",
        description: "Post-mortem changes, mechanical injuries, firearm wounds, asphyxial deaths, and clinical toxicology.",
        negativeMark: 0.5,
        questions: [
          {
            id: "fmt-q1",
            question: "Which of the following early post-mortem phenomena is characterized by the physical stiffening of muscles caused by the progressive depletion of adenosine triphosphate (ATP) preventing actin-myosin detachment?",
            options: [
              "Algor mortis",
              "Livor mortis (hypostasis)",
              "Rigor mortis",
              "Cadaveric spasm"
            ],
            correctAnswer: 2,
            explanation: "Rigor mortis is the postmortem hardening and stiffening of voluntary and involuntary muscles caused by lack of ATP preventing actin-myosin crossbridge detachment.",
            subject: "Forensic Medicine",
            topic: "Thanatology"
          }
        ]
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
      },
      {
        id: "patho-mock-1",
        title: "Pathophysiology & General Pathology Mock 1",
        subjectId: "pathophysiology",
        subjectName: "Pathophysiology",
        description: "Mechanisms of cell death (necrosis vs apoptosis), vascular and cellular events of inflammation, shock, and oncogenesis.",
        negativeMark: 0.5,
        questions: [
          {
            id: "patho-q1",
            question: "Which form of necrosis is characteristic of ischemic brain infarcts and central nervous system parenchyma, as well as bacterial and fungal abscess cavities?",
            options: [
              "Coagulative necrosis",
              "Liquefactive necrosis",
              "Caseous necrosis",
              "Fibrinoid necrosis"
            ],
            correctAnswer: 1,
            explanation: "Liquefactive necrosis is characterized by complete enzymatic digestion of dead cells, transforming the tissue into a liquid viscous mass (pus or cerebral cyst).",
            subject: "Pathophysiology",
            topic: "Cell Injury & Necrosis"
          }
        ]
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
      },
      {
        id: "pharm-mock-1",
        title: "Clinical Pharmacology Comprehensive Mock 1",
        subjectId: "pharmacology",
        subjectName: "Pharmacology",
        description: "Drug receptor interactions, autonomic pharmacology, anti-hypertensives, antibiotics mechanism of action, and toxicities.",
        negativeMark: 0.5,
        questions: [
          {
            id: "pharm-q1",
            question: "A 54-year-old diabetic patient with hypertension is started on an ACE inhibitor (Enalapril). Two weeks later, he develops a dry, hacking, nonproductive cough. Accumulation of which bioactive substance in the bronchial mucosa is responsible for this adverse effect?",
            options: [
              "Angiotensin I",
              "Bradykinin and Substance P",
              "Aldosterone",
              "Endothelin-1"
            ],
            correctAnswer: 1,
            explanation: "Angiotensin-Converting Enzyme (ACE) degrades bradykinin and substance P. Inhibition by ACE inhibitors leads to bradykinin accumulation causing cough.",
            subject: "Pharmacology",
            topic: "Cardiovascular Pharmacology"
          }
        ]
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
      },
      {
        id: "micro-mock-1",
        title: "Medical Microbiology & Parasitology Mock 1",
        subjectId: "microbiology",
        subjectName: "Microbiology",
        description: "Gram-positive and negative bacteria, spore-formers, viral hepatitis, malaria lifecycle, and fungal diagnostics.",
        negativeMark: 0.5,
        questions: [
          {
            id: "micro-q1",
            question: "A 19-year-old military recruit develops sudden fever, neck stiffness, petechial purpuric skin rash, and altered sensorium. Lumbar puncture demonstrates turbid CSF with abundant polymorphonuclear leukocytes, elevated protein, and low glucose. Gram stain reveals Gram-negative kidney-bean shaped diplococci inside neutrophils. What is the organism?",
            options: [
              "Streptococcus pneumoniae",
              "Neisseria meningitidis",
              "Haemophilus influenzae",
              "Listeria monocytogenes"
            ],
            correctAnswer: 1,
            explanation: "Gram-negative kidney-bean shaped diplococci within neutrophils alongside purpuric rash is diagnostic of Neisseria meningitidis.",
            subject: "Microbiology",
            topic: "Bacteriology"
          }
        ]
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
