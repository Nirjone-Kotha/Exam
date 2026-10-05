import { Subject, Exam } from "../lib/types";

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
          },
          {
            id: "med-q3",
            question: "A 45-year-old chronic alcoholic is brought to the emergency department confused, with horizontal nystagmus, bilateral lateral rectus palsy, and severe ataxia. Which treatment should be administered immediately before any intravenous glucose?",
            options: [
              "Intravenous thiamine (Vitamin B1)",
              "Intravenous pyridoxine (Vitamin B6)",
              "Intravenous magnesium sulfate",
              "Oral cyanocobalamin (Vitamin B12)"
            ],
            correctAnswer: 0,
            explanation: "The triad of encephalopathy (confusion), oculomotor dysfunction (nystagmus, 6th nerve palsy), and gait ataxia is diagnostic of Wernicke encephalopathy due to thiamine (B1) deficiency. Thiamine is an essential cofactor for pyruvate dehydrogenase and alpha-ketoglutarate dehydrogenase. Giving glucose before thiamine can rapidly deplete the remaining thiamine stores, precipitating irreversible brain damage or Korsakoff syndrome.",
            subject: "Medicine",
            topic: "Neurology"
          },
          {
            id: "med-q4",
            question: "A 65-year-old man with severe community-acquired pneumonia develops acute hypoxemic respiratory failure requiring intubation. Arterial blood gas shows PaO2/FiO2 ratio of 140 mmHg with bilateral alveolar infiltrates on chest X-ray and normal pulmonary capillary wedge pressure (12 mmHg). What is the diagnosis?",
            options: [
              "Congestive heart failure",
              "Moderate Acute Respiratory Distress Syndrome (ARDS)",
              "Severe Acute Respiratory Distress Syndrome (ARDS)",
              "Acute pulmonary embolism"
            ],
            correctAnswer: 1,
            explanation: "According to the Berlin Definition of ARDS: onset within 1 week of clinical insult, bilateral opacities not fully explained by heart failure/volume overload, and hypoxemia with PEEP >= 5 cmH2O. ARDS severity is graded by PaO2/FiO2: Mild (200-300 mmHg), Moderate (100-200 mmHg), and Severe (<100 mmHg). Here, PaO2/FiO2 = 140 mmHg, classifying it as Moderate ARDS.",
            subject: "Medicine",
            topic: "Pulmonology"
          },
          {
            id: "med-q5",
            question: "Which of the following anti-hypertensive medication classes is specifically contraindicated in patients with bilateral renal artery stenosis due to the risk of precipitating acute renal failure?",
            options: [
              "Calcium channel blockers",
              "ACE inhibitors / ARBs",
              "Beta-blockers",
              "Thiazide diuretics"
            ],
            correctAnswer: 1,
            explanation: "In bilateral renal artery stenosis, renal perfusion pressure is markedly reduced. Glomerular filtration rate (GFR) is maintained by angiotensin II-mediated vasoconstriction of the efferent arteriole. Blocking angiotensin II with ACE inhibitors or ARBs causes efferent arteriolar vasodilation, resulting in a precipitous drop in intraglomerular pressure and acute renal failure.",
            subject: "Medicine",
            topic: "Nephrology"
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
            explanation: "The clinical presentation is classic for acute appendicitis (visceral pain starting at T10 dermatome due to luminal obstruction, later shifting to somatic parietal peritoneal tenderness at McBurney's point). In a young male, a typical clinical picture and confirmation by ultrasound or clinical score warrant prompt surgical exploration/appendectomy to prevent perforation and peritonitis.",
            subject: "Surgery",
            topic: "Acute Abdomen"
          },
          {
            id: "surg-q2",
            question: "In a patient suffering from hypovolemic shock following a blunt motor vehicle trauma, which of the following is the earliest physiological indicator of acute blood loss?",
            options: [
              "Significant drop in systolic blood pressure",
              "Tachycardia and decreased pulse pressure",
              "Profound drop in hematocrit concentration",
              "Coma and fixed dilated pupils"
            ],
            correctAnswer: 1,
            explanation: "Tachycardia and narrowed pulse pressure are early compensatory sympathetic responses in hypovolemic shock (Class II hemorrhage, 15-30% blood loss). Systolic blood pressure is maintained by compensatory vasoconstriction until Class III shock (>30-40% blood loss). Hematocrit remains deceptively normal initially because both plasma and red cells are lost proportionally until compensatory fluid shifts occur.",
            subject: "Surgery",
            topic: "Trauma & Resuscitation"
          },
          {
            id: "surg-q3",
            question: "Which anatomical boundary forms the medial margin of Hesselbach's triangle, the anatomical landmark for direct inguinal hernias?",
            options: [
              "Inferior epigastric vessels",
              "Lateral border of the rectus abdominis muscle",
              "Inguinal ligament (Poupart's ligament)",
              "Pectineal ligament (Cooper's ligament)"
            ],
            correctAnswer: 1,
            explanation: "Hesselbach's triangle boundaries are: Medial border: Lateral border of the rectus abdominis muscle; Superolateral border: Inferior epigastric vessels; Inferior border: Inguinal ligament. Direct inguinal hernias protrude through the posterior wall of the inguinal canal inside Hesselbach's triangle, medial to the inferior epigastric artery.",
            subject: "Surgery",
            topic: "Hernias"
          },
          {
            id: "surg-q4",
            question: "On the 5th postoperative day following an open sigmoid colectomy, a 62-year-old patient develops a spike in fever, productive cough, and tachypnea. Chest auscultation reveals bronchial breath sounds and crackles at the right lung base. Which complication is most likely?",
            options: [
              "Atelectasis",
              "Hospital-acquired pneumonia",
              "Deep vein thrombosis",
              "Wound dehiscence"
            ],
            correctAnswer: 1,
            explanation: "The surgical '5 Ws' of postoperative fever: Wind (Atelectasis, Days 1-2), Water (UTI, Day 3), Wound (Infection, Day 5+), Walking (DVT/PE, Day 7+), Wonder drugs (Any time). Fever on Day 5 with focal pulmonary consolidation findings (bronchial breathing, crackles) points to postoperative hospital-acquired pneumonia rather than early atelectasis.",
            subject: "Surgery",
            topic: "Postoperative Care"
          },
          {
            id: "surg-q5",
            question: "A 40-year-old obese female presents with severe right upper quadrant pain radiating to the right infrascapular area after eating fried chicken. She has positive Murphy's sign and fever. Which diagnostic imaging modality is the gold standard first-line test for acute cholecystitis?",
            options: [
              "Abdominal Ultrasonography",
              "Plain abdominal radiograph (KUB)",
              "Oral cholecystogram",
              "Magnetic Resonance Cholangiopancreatography (MRCP)"
            ],
            correctAnswer: 0,
            explanation: "Transabdominal ultrasonography is the preferred first-line imaging modality for acute cholecystitis (sensitivity ~88%, specificity ~80%). Findings include gallstones, gallbladder wall thickening (>3-4 mm), pericholecystic fluid, and sonographic Murphy's sign.",
            subject: "Surgery",
            topic: "Hepatobiliary Surgery"
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
            explanation: "Magnesium sulfate (Pritchard or Zuspan regimen) is the recognized drug of choice for the prevention and management of eclamptic convulsions in severe preeclampsia. Multiple large randomized trials (e.g., Magpie Trial) proved it is significantly superior to diazepam, phenytoin, or lytic cocktails with half the risk of seizures and lower maternal mortality.",
            subject: "OBS and Gynae",
            topic: "High-Risk Obstetrics"
          },
          {
            id: "obgyn-q2",
            question: "A 28-year-old woman with 7 weeks of amenorrhea presents with acute severe right lower abdominal pain, vaginal spotting, and shoulder tip pain. Her blood pressure is 85/50 mmHg with marked tachycardia. Which condition must be immediately suspected?",
            options: [
              "Ruptured ectopic tubal pregnancy",
              "Ovarian cyst torsion",
              "Threatened abortion",
              "Pelvic inflammatory disease"
            ],
            correctAnswer: 0,
            explanation: "Amenorrhea, unilateral pelvic pain, vaginal bleeding, and hemodynamic shock with shoulder tip pain (Kehr's sign due to subdiaphragmatic blood irritating the phrenic nerve C3-C5) is a classical presentation of ruptured ectopic pregnancy until proven otherwise. Immediate fluid resuscitation and urgent exploratory laparoscopy or laparotomy are indicated.",
            subject: "OBS and Gynae",
            topic: "Early Pregnancy Emergencies"
          },
          {
            id: "obgyn-q3",
            question: "What is the single most common cause of primary postpartum hemorrhage (PPH) occurring within the first 24 hours of delivery?",
            options: [
              "Retained placenta cotyledon",
              "Uterine atony",
              "Cervical laceration",
              "Coagulopathy (DIC)"
            ],
            correctAnswer: 1,
            explanation: "Uterine atony (failure of the myometrium to contract and compress spiral arterioles) accounts for 70-80% of all primary postpartum hemorrhage cases. The 4 'T's of PPH are Tone (atony - 70%), Trauma (lacerations - 20%), Tissue (retained placenta - 10%), and Thrombin (coagulopathy - 1%).",
            subject: "OBS and Gynae",
            topic: "Obstetric Emergencies"
          },
          {
            id: "obgyn-q4",
            question: "Which human papillomavirus (HPV) genotypes are responsible for approximately 70% of all cases of cervical cancer worldwide?",
            options: [
              "HPV types 6 and 11",
              "HPV types 16 and 18",
              "HPV types 31 and 33",
              "HPV types 45 and 52"
            ],
            correctAnswer: 1,
            explanation: "High-risk HPV types 16 and 18 cause approximately 70% of all invasive cervical squamous cell carcinomas and adenocarcinomas globally. Types 6 and 11 are low-risk types responsible for 90% of genital warts (condylomata acuminata).",
            subject: "OBS and Gynae",
            topic: "Gynecologic Oncology"
          },
          {
            id: "obgyn-q5",
            question: "A 30-year-old woman presents with severe dysmenorrhea, deep dyspareunia, and chronic pelvic pain that worsens right before menstruation. Bimanual examination demonstrates fixed retroverted uterus with painful nodularity in the pouch of Douglas. What is the gold standard diagnostic procedure?",
            options: [
              "Transvaginal ultrasound",
              "Diagnostic laparoscopy with direct visualization and biopsy",
              "Serum CA-125 measurement",
              "Abdominal computed tomography (CT)"
            ],
            correctAnswer: 1,
            explanation: "Laparoscopy with histological confirmation of endometriotic implants (powder-burn lesions, chocolate cysts, peritoneal defects) is the definitive gold standard for the diagnosis and staging of pelvic endometriosis.",
            subject: "OBS and Gynae",
            topic: "Benign Gynecology"
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
            explanation: "The axillary nerve and posterior circumflex humeral artery wind around the surgical neck of the humerus in the quadrangular space. Fractures of the surgical neck can damage the axillary nerve, resulting in paralysis of the deltoid and teres minor muscles with loss of sensation over the upper lateral arm ('sergeant's patch').",
            subject: "Anatomy",
            topic: "Upper Limb"
          },
          {
            id: "anat-q2",
            question: "During a radical neck dissection, a surgeon identifies the carotid sheath. Which nerve is located in the posterior groove between the internal jugular vein laterally and the common/internal carotid artery medially?",
            options: [
              "Vagus nerve (CN X)",
              "Glossopharyngeal nerve (CN IX)",
              "Hypoglossal nerve (CN XII)",
              "Sympathetic trunk"
            ],
            correctAnswer: 0,
            explanation: "The carotid sheath encloses: common and internal carotid arteries (medially), internal jugular vein (laterally), and the Vagus nerve (CN X) lying posteriorly between them in the groove. The cervical sympathetic trunk lies posterior to the sheath embedded in prevertebral fascia, not inside the sheath.",
            subject: "Anatomy",
            topic: "Head and Neck"
          },
          {
            id: "anat-q3",
            question: "A laceration at the wrist in the carpal tunnel compromises the median nerve. Which intrinsic hand muscle will NOT be paralyzed by this injury?",
            options: [
              "Abductor pollicis brevis",
              "Opponens pollicis",
              "Adductor pollicis",
              "First lumbrical muscle"
            ],
            correctAnswer: 2,
            explanation: "The median nerve supplies the 'LOAF' muscles of the hand: Lumbricals 1 and 2, Opponens pollicis, Abductor pollicis brevis, and Flexor pollicis brevis (superficial head). The Adductor pollicis is innervated by the deep branch of the Ulnar nerve (C8, T1), so it remains intact.",
            subject: "Anatomy",
            topic: "Upper Limb"
          },
          {
            id: "anat-q4",
            question: "The inferior parathyroid glands and the thymus gland both embryologically originate from which pharyngeal pouch?",
            options: [
              "First pharyngeal pouch",
              "Second pharyngeal pouch",
              "Third pharyngeal pouch",
              "Fourth pharyngeal pouch"
            ],
            correctAnswer: 2,
            explanation: "The 3rd pharyngeal pouch dorsal wing forms the inferior parathyroid gland, and its ventral wing forms the thymus. Because the thymus migrates caudally into the anterior mediastinum, it pulls the inferior parathyroids lower than the superior parathyroids (which develop from the 4th pouch).",
            subject: "Anatomy",
            topic: "Embryology"
          },
          {
            id: "anat-q5",
            question: "Which structure traverses through the foramen spinosum in the floor of the middle cranial fossa?",
            options: [
              "Middle meningeal artery",
              "Mandibular division of trigeminal nerve (CN V3)",
              "Maxillary division of trigeminal nerve (CN V2)",
              "Internal carotid artery"
            ],
            correctAnswer: 0,
            explanation: "The foramen spinosum transmits the middle meningeal artery (a branch of the maxillary artery) and the nervus spinosus. Fracture of the pterion can rupture this artery, causing an epidural (extradural) hematoma.",
            subject: "Anatomy",
            topic: "Neuroanatomy"
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
            explanation: "A shift of the oxy-hemoglobin curve to the RIGHT decreases Hb affinity for O2, promoting unloading at tissues. Factors shifting curve right (mnemonic 'CADET, face Right'): CO2 elevation, Acidity/Acidosis (low pH), 2,3-DPG/BPG elevation, Exercise, and Temperature elevation.",
            subject: "Physiology",
            topic: "Respiratory Physiology"
          },
          {
            id: "phys-q2",
            question: "In the cardiac conduction system, which structure has the slowest conduction velocity, creating a critical intrinsic delay that allows atria to empty into the ventricles before ventricular systole?",
            options: [
              "Purkinje fibers",
              "Atrioventricular (AV) node",
              "Bundle of His",
              "Sinoatrial (SA) node"
            ],
            correctAnswer: 1,
            explanation: "AV nodal conduction velocity is the slowest in the heart (~0.05 m/s) due to small diameter fibers and few gap junctions. This creates a ~0.1 second delay (PR interval) essential for ventricular filling before contraction. In contrast, Purkinje fibers have the fastest conduction velocity (~4 m/s).",
            subject: "Physiology",
            topic: "Cardiovascular Physiology"
          },
          {
            id: "phys-q3",
            question: "What is the primary site of action of aldosterone in the nephron, promoting sodium reabsorption and potassium excretion?",
            options: [
              "Proximal convoluted tubule",
              "Thick ascending limb of Henle",
              "Principal cells of the late distal tubule and cortical collecting duct",
              "Intercalated cells of the collecting duct"
            ],
            correctAnswer: 2,
            explanation: "Aldosterone acts on mineralocorticoid receptors in the principal cells of the late distal tubule and cortical collecting duct. It increases the expression and activity of basolateral Na+/K+-ATPase pumps and apical epithelial sodium channels (ENaC), leading to Na+ reabsorption and K+ excretion.",
            subject: "Physiology",
            topic: "Renal Physiology"
          },
          {
            id: "phys-q4",
            question: "During a strenuous marathon, how does the gastrointestinal blood flow change as a result of autonomic sympathetic tone?",
            options: [
              "Significant vasoconstriction via alpha-1 adrenergic receptors reducing splanchnic blood flow",
              "Marked vasodilation via beta-2 receptors increasing mesenteric perfusion",
              "Unchanged due to absolute local autoregulation",
              "Increased blood flow via vagal stimulation"
            ],
            correctAnswer: 0,
            explanation: "During maximal exercise, intense sympathetic activation stimulates alpha-1 adrenergic receptors on splanchnic arterioles, causing profound vasoconstriction. This shunts blood away from the gastrointestinal and renal beds toward skeletal muscles, heart, and skin.",
            subject: "Physiology",
            topic: "Gastrointestinal Physiology"
          },
          {
            id: "phys-q5",
            question: "In the central nervous system, what is the primary inhibitory neurotransmitter in the brain, functioning predominantly by increasing chloride ion conductance?",
            options: [
              "Glutamate",
              "Gamma-aminobutyric acid (GABA)",
              "Acetylcholine",
              "Dopamine"
            ],
            correctAnswer: 1,
            explanation: "GABA (gamma-aminobutyric acid) is the main inhibitory neurotransmitter in the brain. GABA-A receptors are ligand-gated chloride ion channels; their activation causes chloride influx, hyperpolarizing the postsynaptic neuronal membrane and inhibiting action potentials. Glycine serves a similar primary inhibitory role in the spinal cord.",
            subject: "Physiology",
            topic: "Neurophysiology"
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
            explanation: "Phosphofructokinase-1 (PFK-1) is the main rate-limiting and committed regulatory step of glycolysis. It converts fructose-6-phosphate to fructose-1,6-bisphosphate. It is strongly inhibited by cellular energy signals (ATP, citrate) and allosterically stimulated by low energy indicators (AMP) and the potent regulator fructose-2,6-bisphosphate.",
            subject: "Biochemistry",
            topic: "Carbohydrate Metabolism"
          },
          {
            id: "biochem-q2",
            question: "A 4-month-old infant presents with hepatomegaly, severe fasting hypoglycemia, lactic acidosis, hyperlipidemia, and hyperuricemia ('doll-like' face). A deficiency of which enzyme is responsible for this condition (Von Gierke disease / Glycogen Storage Disease Type I)?",
            options: [
              "Glucose-6-phosphatase",
              "Alpha-1,4-glucosidase (acid maltase)",
              "Debranching enzyme",
              "Muscle glycogen phosphorylase"
            ],
            correctAnswer: 0,
            explanation: "Von Gierke disease (GSD Type Ia) is caused by deficiency of glucose-6-phosphatase in the liver and kidneys. Glucose-6-phosphate cannot be dephosphorylated to free glucose, blocking both glycogenolysis and gluconeogenesis. This leads to profound fasting hypoglycemia, glycogen accumulation in liver/kidneys, lactic acidosis, and gout.",
            subject: "Biochemistry",
            topic: "Inborn Errors of Metabolism"
          },
          {
            id: "biochem-q3",
            question: "Which apolipoprotein acts as an essential cofactor for lipoprotein lipase (LPL) to facilitate the hydrolytic breakdown of triglycerides from circulating chylomicrons and VLDLs?",
            options: [
              "Apo B-100",
              "Apo B-48",
              "Apo C-II",
              "Apo A-I"
            ],
            correctAnswer: 2,
            explanation: "Apolipoprotein C-II (Apo C-II) is a cofactor required for activating endothelial lipoprotein lipase (LPL). Absence or defect of Apo C-II leads to familial hyperchylomicronemia (Type I hyperlipoproteinemia), characterized by massive hypertriglyceridemia, eruptive xanthomas, and recurrent pancreatitis.",
            subject: "Biochemistry",
            topic: "Lipid Metabolism"
          },
          {
            id: "biochem-q4",
            question: "A deficiency of Vitamin C (ascorbic acid) causes scurvy with bleeding gums, impaired wound healing, and perifollicular hemorrhages because Vitamin C is a critical cofactor for which enzyme during collagen synthesis?",
            options: [
              "Lysyl oxidase",
              "Prolyl and lysyl hydroxylase",
              "Collagen peptidase",
              "Protein kinase C"
            ],
            correctAnswer: 1,
            explanation: "Vitamin C is an essential cofactor that maintains iron in its reduced Fe2+ state for prolyl and lysyl hydroxylase enzymes inside the rough endoplasmic reticulum. These enzymes hydroxylate proline and lysine residues, enabling triple helix hydrogen bonding in procollagen. Defective hydroxylation causes unstable collagen fibrils and capillary fragility (scurvy).",
            subject: "Biochemistry",
            topic: "Vitamins & Micronutrients"
          },
          {
            id: "biochem-q5",
            question: "In competitive enzyme inhibition, how do the Michaelis constant (Km) and maximal reaction velocity (Vmax) change in the presence of the inhibitor?",
            options: [
              "Km increases, Vmax remains unchanged",
              "Km remains unchanged, Vmax decreases",
              "Both Km and Vmax decrease proportionally",
              "Both Km and Vmax increase"
            ],
            correctAnswer: 0,
            explanation: "A competitive inhibitor binds reversibly to the active site, competing directly with the substrate. Therefore, higher substrate concentrations can outcompete the inhibitor: Vmax remains unchanged, but the apparent affinity decreases, which is reflected as an increased Km.",
            subject: "Biochemistry",
            topic: "Enzymology"
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
            explanation: "A study that starts by identifying cases with a disease and controls without disease, then looks back retrospectively to compare previous exposures, is a Case-Control study. The primary measure of association calculated is the Odds Ratio (OR).",
            subject: "Community Medicine",
            topic: "Epidemiological Studies"
          },
          {
            id: "cm-q2",
            question: "The ability of a diagnostic screening test to correctly identify all individuals who TRULY HAVE the disease is defined as the test's:",
            options: [
              "Specificity",
              "Sensitivity",
              "Positive predictive value (PPV)",
              "Negative predictive value (NPV)"
            ],
            correctAnswer: 1,
            explanation: "Sensitivity = True Positives / (True Positives + False Negatives). It measures the proportion of people with the condition who test positive. A highly sensitive test is chosen when ruling OUT a disease (mnemonic: SnNOut - Sensitive test, Negative result, rules OUT).",
            subject: "Community Medicine",
            topic: "Biostatistics & Screening"
          },
          {
            id: "cm-q3",
            question: "Which level of disease prevention is illustrated by administering immunization vaccines (e.g., Hepatitis B, Measles) or providing chlorination of municipal drinking water?",
            options: [
              "Primordial prevention",
              "Primary prevention",
              "Secondary prevention",
              "Tertiary prevention"
            ],
            correctAnswer: 1,
            explanation: "Primary prevention intervenes before biological onset of disease to prevent occurrence by eliminating hazards or increasing resistance (e.g., vaccination, sanitation, lifestyle modification). Secondary prevention focuses on early detection (screening/mammography), and tertiary on disability limitation/rehabilitation.",
            subject: "Community Medicine",
            topic: "Levels of Prevention"
          },
          {
            id: "cm-q4",
            question: "In an outbreak investigation of a foodborne illness at a social banquet, what metric is calculated to determine which specific food item had the highest association with illness among attendees?",
            options: [
              "Case fatality rate",
              "Food-specific attack rate",
              "Standardized mortality ratio",
              "Proportional mortality rate"
            ],
            correctAnswer: 1,
            explanation: "The food-specific attack rate is calculated as: (Number of people who ate a specific food and became ill) / (Total number of people who ate that specific food). Comparing attack rates between those who ate and did not eat each item pinpoints the vehicle of infection.",
            subject: "Community Medicine",
            topic: "Infectious Disease Epidemiology"
          },
          {
            id: "cm-q5",
            question: "In the Expanded Program on Immunization (EPI), what is the optimal recommended temperature range maintained in cold-chain refrigerators for storing heat-sensitive vaccines?",
            options: [
              "-20°C to -10°C",
              "+2°C to +8°C",
              "+10°C to +15°C",
              "Room temperature (20°C-25°C)"
            ],
            correctAnswer: 1,
            explanation: "The standard cold-chain storage temperature for refrigerated vaccines (e.g., Pentavalent, PCV, BCG, Td, Hepatitis B) is strictly +2°C to +8°C. Freezing temperatures below 0°C destroy aluminum-adjuvanted vaccines.",
            subject: "Community Medicine",
            topic: "Immunization & Cold Chain"
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
            explanation: "Rigor mortis is the postmortem hardening and stiffening of voluntary and involuntary muscles. After somatic death, lack of oxygen stops ATP generation. Without ATP, myosin heads remain irreversibly locked to actin filaments in a rigid crossbridge state. In temperate climates, it generally appears in 1-2 hours, is complete by 12 hours, persists for 12 hours, and passes off in the next 12 hours.",
            subject: "Forensic Medicine",
            topic: "Thanatology"
          },
          {
            id: "fmt-q2",
            question: "What characteristic cherry-red post-mortem discoloration of the skin, mucous membranes, blood, and internal viscera is pathognomonic of fatal poisoning by which substance?",
            options: [
              "Hydrogen cyanide",
              "Carbon monoxide",
              "Organophosphates",
              "Phosphorus"
            ],
            correctAnswer: 1,
            explanation: "Carbon monoxide (CO) binds avidly to hemoglobin to form carboxyhemoglobin (affinity ~200-250 times higher than oxygen), which gives a bright, distinctive cherry-red appearance to postmortem hypostasis, blood, and tissues. Cyanide produces a brick-red or pinkish discoloration due to histotoxic anoxia.",
            subject: "Forensic Medicine",
            topic: "Forensic Toxicology"
          },
          {
            id: "fmt-q3",
            question: "In medicolegal jurisprudence, which type of mechanical wound is characterized by tissue bridging (intact nerves and vessels spanning the wound gap), irregular contused margins, and abraded edges?",
            options: [
              "Incised wound",
              "Lacerated wound",
              "Stab wound",
              "Chop wound"
            ],
            correctAnswer: 1,
            explanation: "Lacerations are produced by blunt force impacts that crush and tear the skin and subcutaneous tissues. Because tissues tear at points of maximum mechanical stress, stronger fibrous bands, nerves, and elastic blood vessels remain intact across the gap ('tissue bridging'). In contrast, sharp cutting instruments in incised wounds slice cleanly through all tissues without bridging.",
            subject: "Forensic Medicine",
            topic: "Mechanical Injuries"
          },
          {
            id: "fmt-q4",
            question: "An agricultural laborer is rushed to the emergency department salivating profusely, with pinpoint pupils (miosis), lacrimation, bradycardia, bronchospasm, and muscle fasciculations. What is the definitive pharmacological antidote to reverse the nicotinic and muscarinic neuromuscular paralysis?",
            options: [
              "Atropine sulfate alone",
              "Pralidoxime (2-PAM) combined with Atropine",
              "N-acetylcysteine",
              "Flumazenil"
            ],
            correctAnswer: 1,
            explanation: "This is acute organophosphate poisoning (cholinergic toxidrome caused by acetylcholinesterase inhibition). Atropine blocks muscarinic manifestations (salivation, bronchospasm, bradycardia) but does not reverse nicotinic receptor stimulation or muscle paralysis. Pralidoxime (2-PAM) is an oxime that reactivates phosphorylated acetylcholinesterase at both muscarinic and nicotinic junctions if given before aging.",
            subject: "Forensic Medicine",
            topic: "Clinical Toxicology"
          },
          {
            id: "fmt-q5",
            question: "In firearm injuries, the presence of powder tattooing (stippling) and soot deposition around an entrance wound indicates that the firearm was discharged from which approximate range?",
            options: [
              "Contact or close range (within 30 to 60 cm)",
              "Distant range (greater than 2 meters)",
              "Indeterminate ricochet",
              "Exit wound trajectory"
            ],
            correctAnswer: 0,
            explanation: "Powder tattooing (unburnt and partially burnt gunpowder grains embedded in the epidermis) and soot deposition are definitive physical indicators of close-range fire (typically within 30-60 cm or 1-2 feet depending on the firearm and propellant). In distant shots beyond 1 meter, only the mechanical bullet hole with an abrasion collar is seen.",
            subject: "Forensic Medicine",
            topic: "Ballistics"
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
            explanation: "Liquefactive necrosis is characterized by complete enzymatic digestion of dead cells, transforming the tissue into a liquid viscous mass (pus or cerebral cyst). It is the characteristic pattern of ischemic necrosis in the brain because the CNS contains abundant hydrolytic enzymes and minimal supportive fibrous connective stroma. In contrast, solid organs like the heart, kidney, and spleen undergo coagulative necrosis.",
            subject: "Pathophysiology",
            topic: "Cell Injury & Necrosis"
          },
          {
            id: "patho-q2",
            question: "Which tumor suppressor gene, frequently referred to as the 'guardian of the genome', senses DNA damage, arrests cell cycle in the G1 phase via p21 induction, and activates apoptosis via BAX if repair fails?",
            options: [
              "TP53",
              "RB1",
              "BRCA1",
              "APC"
            ],
            correctAnswer: 0,
            explanation: "TP53 encodes the p53 protein, a critical tumor suppressor mutated in >50% of all human malignancies. In response to DNA damage, p53 upregulates p21 (inhibiting CDK-cyclin complexes and arresting cells at the G1/S checkpoint). If DNA repair fails, p53 triggers programmed cell death by transcriptionally activating pro-apoptotic BAX and PUMA.",
            subject: "Pathophysiology",
            topic: "Neoplasia & Genetics"
          },
          {
            id: "patho-q3",
            question: "In the acute inflammatory response, which leukocyte adhesion molecule family mediates the initial weak, transient 'rolling' interaction of neutrophils along the activated vascular endothelial wall?",
            options: [
              "Integrins (e.g., LFA-1, Mac-1)",
              "Selectins (E-selectin, P-selectin, L-selectin)",
              "Immunoglobulin superfamily (ICAM-1, VCAM-1)",
              "Cadherins"
            ],
            correctAnswer: 1,
            explanation: "The multistep cascade of leukocyte recruitment begins with rolling, mediated by selectins (E-selectin, P-selectin on endothelium and L-selectin on leukocytes) binding to sialyl-Lewis X glycoproteins. Tight adhesion and arrest are subsequently mediated by integrins (LFA-1, Mac-1) interacting with endothelial ICAM-1 and VCAM-1.",
            subject: "Pathophysiology",
            topic: "Inflammation"
          },
          {
            id: "patho-q4",
            question: "In septic shock caused by Gram-negative bacteremia, which bacterial cell wall component is the primary trigger that binds to TLR4 on macrophages to cause massive cytokine release (TNF-alpha, IL-1)?",
            options: [
              "Lipopolysaccharide (Endotoxin / Lipid A)",
              "Peptidoglycan monomer",
              "Teichoic acid",
              "Exotoxin A"
            ],
            correctAnswer: 0,
            explanation: "Lipopolysaccharide (LPS), specifically the Lipid A core moiety in the outer membrane of Gram-negative bacteria, binds CD14 and Toll-like receptor 4 (TLR4) on monocytes and macrophages. This initiates massive NF-kB activation and systemic transcription of inflammatory cytokines (TNF-alpha, IL-1, IL-6), leading to profound vasodilation, endothelial injury, and septic shock.",
            subject: "Pathophysiology",
            topic: "Hemodynamic Disorders & Shock"
          },
          {
            id: "patho-q5",
            question: "What type of cellular adaptation is characterized by the reversible replacement of one adult cell type (epithelial or mesenchymal) by another adult cell type better suited to endure chronic environmental irritation?",
            options: [
              "Hypertrophy",
              "Hyperplasia",
              "Metaplasia",
              "Dysplasia"
            ],
            correctAnswer: 2,
            explanation: "Metaplasia is a reversible change in which one differentiated adult cell type is replaced by another adult cell type (e.g., in habitual smokers, ciliated pseudostratified columnar bronchial epithelium is replaced by tough stratified squamous epithelium; in Barrett esophagus, esophageal squamous epithelium changes to columnar).",
            subject: "Pathophysiology",
            topic: "Cellular Adaptation"
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
            explanation: "Angiotensin-Converting Enzyme (ACE), also known as kininase II, is the primary enzyme responsible for the physiological degradation of bradykinin and substance P. Inhibition of ACE by lisinopril or enalapril leads to local accumulation of bradykinin and prostaglandins in the upper respiratory tract, irritating pulmonary C-fibers and causing cough in 5-20% of patients. Switching to an ARB (which does not inhibit kininase II) resolves the cough.",
            subject: "Pharmacology",
            topic: "Cardiovascular Pharmacology"
          },
          {
            id: "pharm-q2",
            question: "Which class of broad-spectrum antibacterial agents inhibits bacterial topoisomerase II (DNA gyrase) and topoisomerase IV, and carries a black box warning for tendonitis and Achilles tendon rupture?",
            options: [
              "Aminoglycosides",
              "Fluoroquinolones (e.g., Ciprofloxacin, Levofloxacin)",
              "Macrolides",
              "Tetracyclines"
            ],
            correctAnswer: 1,
            explanation: "Fluoroquinolones (ciprofloxacin, levofloxacin, moxifloxacin) interfere with bacterial DNA replication by blocking DNA gyrase and topoisomerase IV. Significant adverse reactions include cartilage damage in growing children, QT-prolongation, and tendinopathy/Achilles tendon rupture (especially in elderly patients and those taking concurrent corticosteroids).",
            subject: "Pharmacology",
            topic: "Antimicrobial Chemotherapy"
          },
          {
            id: "pharm-q3",
            question: "A patient with acute heparin-induced severe bleeding requires rapid reversal of anticoagulation. What is the specific chemical antidote that binds and neutralizes unfractionated heparin via ionic complexation?",
            options: [
              "Protamine sulfate",
              "Vitamin K1 (Phytonadione)",
              "Idarucizumab",
              "Andexanet alfa"
            ],
            correctAnswer: 0,
            explanation: "Protamine sulfate is a strongly basic, positively charged polycationic protein that electrostatically binds negatively charged acidic heparin molecules to form a stable, inactive salt complex with zero anticoagulant activity.",
            subject: "Pharmacology",
            topic: "Hematological Drugs"
          },
          {
            id: "pharm-q4",
            question: "In emergency treatment of acute anaphylactic shock, why is intramuscular epinephrine (adrenaline) the single most essential drug?",
            options: [
              "It blocks H1 histamine receptors competitively",
              "It produces alpha-1 vasoconstriction (reversing shock/edema) and beta-2 bronchodilation while inhibiting mast cell degranulation",
              "It slows the heart rate to reduce myocardial oxygen consumption",
              "It activates parasympathetic tone"
            ],
            correctAnswer: 1,
            explanation: "Epinephrine is the physiological antagonist of anaphylaxis: alpha-1 receptor stimulation causes intense vasoconstriction, increasing systemic vascular resistance and relieving mucosal laryngeal edema; beta-2 stimulation produces rapid bronchodilation and suppresses further mast cell degranulation; beta-1 stimulation provides inotropic and chronotropic cardiac support.",
            subject: "Pharmacology",
            topic: "Autonomic Pharmacology"
          },
          {
            id: "pharm-q5",
            question: "Which diuretic agent inhibits the Na+/K+/2Cl- cotransporter in the thick ascending limb of the loop of Henle and has the highest efficacy (high-ceiling diuretic) for acute pulmonary edema?",
            options: [
              "Hydrochlorothiazide",
              "Furosemide",
              "Spironolactone",
              "Acetazolamide"
            ],
            correctAnswer: 1,
            explanation: "Furosemide is a loop diuretic that blocks the luminal Na+/K+/2Cl- cotransporter (NKCC2) in the thick ascending limb of Henle's loop. Because this segment reabsorbs 25% of the filtered sodium load, loop diuretics produce profound diuresis and rapid venodilation, making IV furosemide ideal for acute cardiogenic pulmonary edema.",
            subject: "Pharmacology",
            topic: "Renal Pharmacology"
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
            explanation: "Gram-negative kidney-bean shaped diplococci found within polymorphonuclear leukocytes alongside purpuric rash is diagnostic of Neisseria meningitidis (meningococcus). Streptococcus pneumoniae is a Gram-positive lancet-shaped diplococcus; Haemophilus influenzae is a pleomorphic Gram-negative coccobacillus.",
            subject: "Microbiology",
            topic: "Bacteriology"
          },
          {
            id: "micro-q2",
            question: "Which serological marker in viral hepatitis B is the first detectable antigen appearing in serum during acute infection and signifies ongoing viral presence and infectivity?",
            options: [
              "Hepatitis B surface antibody (anti-HBs)",
              "Hepatitis B surface antigen (HBsAg)",
              "Hepatitis B core antibody IgG (anti-HBc IgG)",
              "Hepatitis B core antigen (HBcAg)"
            ],
            correctAnswer: 1,
            explanation: "HBsAg is the first serological marker to appear in the serum (detectable 1-10 weeks after infection) before clinical symptoms and transaminase rise. Persistence of HBsAg for greater than 6 months defines chronic Hepatitis B infection. Anti-HBs appears after recovery and confers protective immunity.",
            subject: "Microbiology",
            topic: "Virology"
          },
          {
            id: "micro-q3",
            question: "Which species of human malaria parasite is responsible for malignant tertian malaria, microvascular sequestration, cerebral malaria, and blackwater fever due to widespread cytoadherence of parasitized erythrocytes?",
            options: [
              "Plasmodium vivax",
              "Plasmodium falciparum",
              "Plasmodium malariae",
              "Plasmodium ovale"
            ],
            correctAnswer: 1,
            explanation: "Plasmodium falciparum causes the most severe and life-threatening form of human malaria. It expresses PfEMP1 on the surface of infected RBCs (knobs), causing them to adhere to endothelial receptors (ICAM-1, CD36) in cerebral and renal microcirculation. This microvascular sequestration leads to tissue ischemia, cerebral malaria, and massive intravascular hemolysis with dark urine (blackwater fever).",
            subject: "Microbiology",
            topic: "Parasitology"
          },
          {
            id: "micro-q4",
            question: "A puncture wound from a rusty garden nail leads to lockjaw (trismus), risus sardonicus, and severe painful muscle spasms. The offending pathogen produces an AB-toxin (tetanospasmin) that cleaves which SNARE protein to prevent glycine and GABA release from Renshaw cells?",
            options: [
              "Synaptobrevin (VAMP)",
              "Syntaxin",
              "SNAP-25",
              "Calmodulin"
            ],
            correctAnswer: 0,
            explanation: "Clostridium tetani releases tetanospasmin, an AB neurotoxin that travels via retrograde axonal transport to spinal inhibitory Renshaw interneurons. Its light chain zinc-endopeptidase cleaves synaptobrevin (VAMP), preventing vesicular exocytosis of inhibitory neurotransmitters (glycine and GABA). Without inhibition, motor neurons fire uncontrollably, producing spastic tetanic paralysis.",
            subject: "Microbiology",
            topic: "Bacteriology"
          },
          {
            id: "micro-q5",
            question: "In India ink preparation of cerebrospinal fluid, thick gelatinous polysaccharide capsules appearing as translucent halos surrounding budding yeast cells are characteristic of which opportunistic fungal pathogen in immunocompromised patients?",
            options: [
              "Candida albicans",
              "Cryptococcus neoformans",
              "Aspergillus fumigatus",
              "Histoplasma capsulatum"
            ],
            correctAnswer: 1,
            explanation: "Cryptococcus neoformans is an encapsulated, budding yeast found in pigeon droppings. On negative India ink staining of CSF, the wide glucuronoxylomannan polysaccharide capsule repels the ink particles, creating a distinct luminous clear halo around the yeast cell. It is a major cause of opportunistic meningoencephalitis in HIV/AIDS patients.",
            subject: "Microbiology",
            topic: "Mycology"
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
