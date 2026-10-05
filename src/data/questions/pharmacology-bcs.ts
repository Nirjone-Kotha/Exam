import { Question } from "../../lib/types";

export const PHARMACOLOGY_BCS_QUESTIONS: Question[] = [
  {
    id: "pharm-bcs-104",
    question: "Glucocorticoid equivalent to 5mg prednisolone is:",
    options: ["Prednisone 5mg", "Hydrocortisone 20mg", "Dexamethasone 2mg", "Dexamethasone 8mg"],
    correctAnswer: 1,
    explanation: "Standard anti-inflammatory glucocorticoid equivalence ratios: Hydrocortisone 20 mg = Prednisolone 5 mg = Methylprednisolone 4 mg = Triamcinolone 4 mg = Dexamethasone 0.75 mg = Betamethasone 0.6 mg. Therefore, Hydrocortisone 20 mg is biologically equivalent to Prednisolone 5 mg.",
    subject: "Pharmacology",
    topic: "Corticosteroids",
    year: "39th Special BCS"
  },
  {
    id: "pharm-bcs-115",
    question: "Histamine causes:",
    options: ["Hypertension", "Vasoconstriction", "Vasodilatation", "Bradycardia"],
    correctAnswer: 2,
    explanation: "Histamine binds to H1 receptors on vascular endothelial cells, causing synthesis and release of Nitric Oxide (NO) and prostacyclin, which relaxes vascular smooth muscle and produces profound peripheral vasodilatation and flushing, accompanied by increased capillary permeability.",
    subject: "Pharmacology",
    topic: "Autacoids",
    year: "39th Special BCS"
  },
  {
    id: "pharm-bcs-143",
    question: "Heparin is:",
    options: ["A natural anticoagulant", "An enzyme", "Secreted by goblet cell", "Found in the bone marrow"],
    correctAnswer: 0,
    explanation: "Heparin is an endogenous, naturally occurring, highly sulfated glycosaminoglycan synthesized and stored predominantly within the secretory granules of tissue mast cells and circulating basophils. It acts as an indirect anticoagulant by accelerating the activity of antithrombin III.",
    subject: "Pharmacology",
    topic: "Anticoagulants",
    year: "39th Special BCS"
  },
  {
    id: "pharm-bcs-151",
    question: "Drug causing increased uric acid level is:",
    options: ["Pyrazinamide", "Steroid", "Colchicine", "Levofloxacin"],
    correctAnswer: 0,
    explanation: "Pyrazinamide and its active metabolite pyrazinoic acid inhibit renal tubular urate secretion via the URAT1 transporter in the proximal convoluted tubule, causing secondary hyperuricemia and acute non-gouty polyarthralgias or frank gouty attacks in a significant proportion of TB patients.",
    subject: "Pharmacology",
    topic: "Anti-TB Chemotherapy",
    year: "39th Special BCS"
  },
  {
    id: "pharm-bcs-170",
    question: "The drug of choice for cerebral malaria is:",
    options: ["Oral quinine", "Injectable artesunate", "Oral doxycycline", "Combination of sulfamethoxazole and pyrimethamine"],
    correctAnswer: 1,
    explanation: "According to WHO treatment guidelines and international landmark trials (AQUAMAT and SEAQUAMAT), intravenous Injectable Artesunate is the definitive drug of choice for severe and cerebral falciparum malaria, demonstrating significantly faster parasite clearance, lower risk of hypoglycemia, and lower mortality compared to intravenous quinine.",
    subject: "Pharmacology",
    topic: "Antimalarials",
    year: "39th Special BCS"
  },
  {
    id: "pharm-bcs-197",
    question: "Drug used in Scabies is:",
    options: ["Permethrin", "Streptomycin", "Sulfasalazine", "Ivermectin"],
    correctAnswer: 0,
    explanation: "Permethrin 5% dermal cream applied thoroughly from neck to toes for 8-12 hours is the first-line topical scabicide of choice worldwide, acting on sodium channel transport of the Sarcoptes scabiei mite to cause paralysis and death of both mites and ova.",
    subject: "Pharmacology",
    topic: "Dermatological Pharmacology",
    year: "39th Special BCS"
  },
  {
    id: "pharm-bcs-103",
    question: "Which anti-diabetic drug causes weight loss?",
    options: ["Pioglitazone", "Liraglutide", "Vildagliptin", "Repaglinide"],
    correctAnswer: 1,
    explanation: "Liraglutide (a GLP-1 receptor agonist) delays gastric emptying and directly stimulates hypothalamic satiety centers, causing significant reduction in food intake and progressive, sustained weight loss. In contrast, sulfonylureas, glinides, insulin, and thiazolidinediones (pioglitazone) cause weight gain.",
    subject: "Pharmacology",
    topic: "Endocrine Pharmacology",
    year: "42nd Special BCS"
  },
  {
    id: "pharm-bcs-126",
    question: "DNA synthesis is inhibited by:",
    options: ["Prednisolone", "Chloramphenicol", "Azathioprine", "Chloroquine"],
    correctAnswer: 2,
    explanation: "Azathioprine is a purine antimetabolite prodrug converted non-enzymatically to 6-mercaptopurine (6-MP). 6-MP is subsequently metabolized to thioinosinic acid, which incorporates into replicating DNA strands and inhibits de novo purine nucleotide biosynthesis, arresting cell proliferation in T- and B-lymphocytes.",
    subject: "Pharmacology",
    topic: "Immunosuppressants",
    year: "42nd Special BCS"
  },
  {
    id: "pharm-bcs-139a",
    question: "ACE inhibitors are contraindicated in:",
    options: ["Asthma", "Acute heart failure", "Pregnancy", "Diabetic nephropathy"],
    correctAnswer: 2,
    explanation: "Angiotensin Converting Enzyme (ACE) inhibitors are category X / strictly contraindicated in all trimesters of pregnancy due to fetotoxicity: renal dysgenesis, oligohydramnios, neonatal anuria and acute renal failure, pulmonary hypoplasia, and skull ossification defects.",
    subject: "Pharmacology",
    topic: "Cardiovascular Pharmacology",
    year: "42nd Special BCS"
  },
  {
    id: "pharm-bcs-148",
    question: "Clearance of drug depends on:",
    options: ["Plasma half life", "Bioavailability", "Diffusion co-efficient", "Rate of absorption"],
    correctAnswer: 0,
    explanation: "Systemic drug clearance (CL) is mathematically related to elimination rate constant (ke), apparent volume of distribution (Vd), and elimination plasma half-life (t1/2) by the formula: CL = (0.693 * Vd) / t1/2. Therefore, clearance is inversely proportional to plasma half-life.",
    subject: "Pharmacology",
    topic: "Pharmacokinetics",
    year: "42nd Special BCS"
  },
  {
    id: "pharm-bcs-149",
    question: "Normal saline is:",
    options: [
      "Capable to exert about 300 mosm/L osmotic pressure",
      "Hypertonic to plasma",
      "Synonymous with normal saline",
      "9 gm meq/L solution"
    ],
    correctAnswer: 2,
    explanation: "Normal saline (0.9% w/v sodium chloride in sterile water) contains 154 mmol/L of Na+ and 154 mmol/L of Cl-, exerting a calculated osmolarity of approximately 308 mOsm/L, which is practically isotonic to physiological human blood plasma (~285-295 mOsm/L).",
    subject: "Pharmacology",
    topic: "Intravenous Fluids",
    year: "42nd Special BCS"
  },
  {
    id: "pharm-bcs-187",
    question: "Mood stabilizer is:",
    options: ["Topiramate", "Lithium", "Dexamethasone", "Diazepam"],
    correctAnswer: 1,
    explanation: "Lithium carbonate is the prototypical gold-standard mood stabilizer used for the acute treatment of manic episodes and long-term maintenance prophylaxis against recurrences in Bipolar Affective Disorder, preventing both manic and depressive relapse and reducing suicide risk.",
    subject: "Pharmacology",
    topic: "Psychopharmacology",
    year: "42nd Special BCS"
  },
  {
    id: "pharm-bcs-139b",
    question: "Cephalosporin appropriate for renal impairment is:",
    options: ["Cefazolin", "Cefotetan", "Ceftriaxone", "Cefuroxime"],
    correctAnswer: 2,
    explanation: "Ceftriaxone (a 3rd generation cephalosporin) has a unique dual route of elimination: approximately 40-50% is excreted in the bile into feces, while the remainder is cleared by the kidneys. Therefore, in severe renal failure or uremia, biliary excretion compensates, and no dosage adjustment is required.",
    subject: "Pharmacology",
    topic: "Antimicrobial Agents",
    year: "48th Special BCS"
  },
  {
    id: "pharm-bcs-143b",
    question: "Which of the following drug can be used in a pregnant lady with Rheumatoid Arthritis?",
    options: ["Methotrexate", "Sulfasalazine", "Leflunomide", "Mycophenolate Mofetil"],
    correctAnswer: 1,
    explanation: "Sulfasalazine (along with supplemental folic acid) and hydroxychloroquine are considered safe DMARDs that can be maintained during pregnancy in patients with active Rheumatoid Arthritis. In stark contrast, Methotrexate, Leflunomide, and Mycophenolate Mofetil are highly teratogenic.",
    subject: "Pharmacology",
    topic: "Drugs in Pregnancy & Rheumatology",
    year: "48th Special BCS"
  },
  {
    id: "pharm-bcs-159",
    question: "Which of the following is a common complication of SGLT2 inhibitors?",
    options: ["Genital infection", "Lactic acidosis", "Fluid retention", "Peripheral neuropathy"],
    correctAnswer: 0,
    explanation: "Sodium-Glucose Cotransporter 2 (SGLT2) inhibitors (Dapagliflozin, Empagliflozin) lower blood glucose by promoting glucosuria (urinary excretion of glucose). The presence of glucose in the perineal region fosters fungal and bacterial growth, leading to genital mycotic infections (vulvovaginal candidiasis, balanitis).",
    subject: "Pharmacology",
    topic: "Adverse Drug Reactions",
    year: "48th Special BCS"
  },
  {
    id: "pharm-bcs-165",
    question: "Adverse drug reaction includes:",
    options: ["Synergism", "Antagonism", "Idiosyncrasy", "Enzyme induction"],
    correctAnswer: 2,
    explanation: "Adverse Drug Reactions (ADRs) are categorized into Type A (augmented/predictable) and Type B (bizarre/unpredictable). Idiosyncrasy is a classic genetically determined, abnormal, unpredictable Type B reaction that occurs upon drug exposure (e.g., primaquine-induced acute hemolysis in G6PD deficiency).",
    subject: "Pharmacology",
    topic: "General Pharmacology & ADRs",
    year: "48th Special BCS"
  },
  {
    id: "pharm-bcs-166",
    question: "Co-administration of Phenobarbital & warfarin shows:",
    options: ["Antiplatelet effect", "Fibrinolytic effect", "Increased bleeding tendency", "Thromboembolic episode"],
    correctAnswer: 3,
    explanation: "Phenobarbital is a potent inducer of hepatic cytochrome P450 enzymes (specifically CYP2C9). When administered concurrently with warfarin, it markedly accelerates the metabolic clearance of warfarin, lowering plasma warfarin concentrations, causing subtherapeutic anticoagulation, and precipitating thromboembolic episodes.",
    subject: "Pharmacology",
    topic: "Drug Interactions",
    year: "48th Special BCS"
  },
  {
    id: "pharm-bcs-178",
    question: "Ethambutol is rarely prescribed in young children because it causes:",
    options: ["Peripheral neuropathy", "Hepatitis", "Rash", "Retrobulbar neuritis"],
    correctAnswer: 3,
    explanation: "Ethambutol is well known to cause dose-dependent retrobulbar (optic) neuritis, resulting in reduced visual acuity, central scotomas, and red-green color blindness. In young children under 5 years of age, assessing visual acuity and red-green discrimination is exceedingly difficult, posing a grave risk of unnoticed permanent optic nerve damage.",
    subject: "Pharmacology",
    topic: "Anti-TB Chemotherapy",
    year: "48th Special BCS"
  },
  {
    id: "pharm-bcs-183",
    question: "Dose schedule of a drug with half life of 3 hours will be:",
    options: ["3 hourly", "6 hourly", "12 hourly", "Once daily"],
    correctAnswer: 1,
    explanation: "As a fundamental pharmacokinetic principle, drugs with short elimination half-lives (t1/2) around 2 to 4 hours are routinely administered at dosing intervals of roughly two half-lives (every 6 hours / QDS) to maintain steady-state serum concentrations above minimum effective concentration (MEC) without excessive peaks.",
    subject: "Pharmacology",
    topic: "Pharmacokinetics",
    year: "48th Special BCS"
  },
  {
    id: "pharm-bcs-185",
    question: "Multidrug resistant tuberculosis (MDR-TB) is treated by:",
    options: ["Amikacin", "Streptomycin", "Tazobactam", "Ethambutol"],
    correctAnswer: 0,
    explanation: "MDR-TB is defined as resistance to at least isoniazid and rifampicin. Management requires specialized second-line antitubercular regimens including fluoroquinolones (levofloxacin, moxifloxacin), bedaquiline, linezolid, and second-line injectable aminoglycosides such as Amikacin (or kanamycin).",
    subject: "Pharmacology",
    topic: "Antimycobacterial Chemotherapy",
    year: "48th Special BCS"
  },
  {
    id: "pharm-bcs-191",
    question: "Which of the following is a compelling indication of calcium channel blocker in the management of Hypertension?",
    options: ["Heart failure", "Secondary stroke prevention", "Older patient", "Left ventricular dysfunction"],
    correctAnswer: 2,
    explanation: "Dihydropyridine calcium channel blockers (Amlodipine) or thiazide diuretics are recognized by international hypertension guidelines (NICE, ESC) as the first-line antihypertensive agents of choice in older patients (>55 years) and individuals of African descent due to low-renin status and isolated systolic hypertension.",
    subject: "Pharmacology",
    topic: "Antihypertensive Drugs",
    year: "48th Special BCS"
  },
  {
    id: "pharm-bcs-194",
    question: "Which of the following antidepressants does not have any weight gain property?",
    options: ["Escitalopram", "Fluoxetine", "Paroxetine", "Sertraline"],
    correctAnswer: 1,
    explanation: "Fluoxetine is unique among SSRIs in being weight-neutral or causing mild, transient weight loss during acute and subacute therapy. In contrast, paroxetine and mirtazapine are notorious for provoking substantial appetite stimulation and weight gain.",
    subject: "Pharmacology",
    topic: "Psychopharmacology",
    year: "48th Special BCS"
  }
];
