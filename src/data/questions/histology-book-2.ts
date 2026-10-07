import { Question } from "../../lib/types";

export const HISTOLOGY_BOOK_2_QUESTIONS: Question[] = [
  // ==========================================
  // CELL BIOLOGY & ORGANELLES (Pages 1 - 4)
  // ==========================================
  {
    id: "histo-b2-1",
    question: "According to the fluid mosaic model, what is the approximate chemical composition of the human cell membrane?",
    options: [
      "Protein 55%, Lipid 42%, Oligosaccharide 3%",
      "Protein 42%, Lipid 55%, Carbohydrate 3%",
      "Protein 70%, Lipid 25%, Carbohydrate 5%",
      "Protein 30%, Lipid 65%, Oligosaccharide 5%"
    ],
    correctAnswer: 0,
    explanation: "The plasma membrane chemically consists of approximately 55% proteins (integral and peripheral), 42% lipids (phospholipids, cholesterol, and glycolipids), and 3% carbohydrates (glycoproteins and glycolipids forming the glycocalyx). Candidates frequently confuse the proportions of protein and lipid.",
    subject: "Histology and Embryology",
    topic: "Cell Biology & Organelles"
  },
  {
    id: "histo-b2-2",
    question: "Which of the following is classified as a NON-MEMBRANOUS cellular organelle?",
    options: [
      "Centrosome",
      "Peroxisome",
      "Lysosome",
      "Endoplasmic reticulum"
    ],
    correctAnswer: 0,
    explanation: "Cellular organelles are classified into membranous and non-membranous: Non-membranous organelles include ribosomes, centrosomes, proteasomes, nucleolus, microtubules, and microfilaments. Membranous organelles include mitochondria, endoplasmic reticulum, Golgi complex, lysosomes, and peroxisomes.",
    subject: "Histology and Embryology",
    topic: "Cell Biology & Organelles"
  },
  {
    id: "histo-b2-3",
    question: "Which of the following statements regarding human mitochondria is FALSE?",
    options: [
      "They are abundant in mature erythrocytes and terminal keratinocytes",
      "They contain their own circular double-stranded DNA",
      "Mitochondrial DNA is inherited strictly from the mother",
      "They release Cytochrome C to initiate the intrinsic pathway of apoptosis"
    ],
    correctAnswer: 0,
    explanation: "Mitochondria are completely absent in mature mammalian red blood cells (erythrocytes) and terminal keratinocytes, as mature RBCs derive energy solely from anaerobic glycolysis. Mitochondria have self-replicating maternal DNA, inner membrane cristae with ATP synthase, and play a crucial role in intrinsic apoptosis via cytochrome c release.",
    subject: "Histology and Embryology",
    topic: "Cell Biology & Organelles"
  },
  {
    id: "histo-b2-4",
    question: "Smooth endoplasmic reticulum (SER) is predominantly developed and abundant in which of the following cell types?",
    options: [
      "Leydig cells of testis and adrenal cortical cells",
      "Pancreatic acinar cells",
      "Plasma cells secreting immunoglobulins",
      "Fibroblasts actively synthesizing collagen"
    ],
    correctAnswer: 0,
    explanation: "Smooth endoplasmic reticulum (SER) is specialized for lipid and steroid hormone synthesis, glycogen breakdown, and detoxification of drugs (cytochrome P450). It is heavily concentrated in steroid-producing cells (Leydig cells, adrenal cortex) and hepatocytes. In contrast, protein-secreting cells (pancreatic acini, plasma cells, fibroblasts) are packed with Rough Endoplasmic Reticulum (RER).",
    subject: "Histology and Embryology",
    topic: "Cell Biology & Organelles"
  },
  {
    id: "histo-b2-5",
    question: "Which organelle is directly responsible for the synthesis of the acrosomal cap in developing spermatozoa?",
    options: [
      "Golgi apparatus",
      "Rough endoplasmic reticulum",
      "Peroxisome",
      "Centriole"
    ],
    correctAnswer: 0,
    explanation: "The acrosome of a mature spermatozoon is a specialized lysosome-like organelle derived directly from the Golgi complex during spermiogenesis. It stores hydrolytic enzymes (hyaluronidase, acrosin) essential for penetrating the ovum's corona radiata and zona pellucida.",
    subject: "Histology and Embryology",
    topic: "Cell Biology & Organelles"
  },
  {
    id: "histo-b2-6",
    question: "What is the primary marker hydrolytic enzyme characteristically localized inside lysosomes?",
    options: [
      "Acid phosphatase",
      "Alkaline phosphatase",
      "Catalase",
      "Succinate dehydrogenase"
    ],
    correctAnswer: 0,
    explanation: "Lysosomes contain over 40 acid hydrolases with an optimum acidic pH (~4.5–5.0) maintained by a vacuolar H+ ATPase. Acid phosphatase is the histochemical marker enzyme for lysosomes. Catalase is the marker for peroxisomes, and succinate dehydrogenase marks the inner mitochondrial membrane.",
    subject: "Histology and Embryology",
    topic: "Cell Biology & Organelles"
  },
  {
    id: "histo-b2-7",
    question: "Which of the following statements correctly differentiates eukaryotic ribosomal subunits?",
    options: [
      "Eukaryotic 80S ribosome consists of 60S and 40S subunits",
      "Eukaryotic 80S ribosome consists of 50S and 30S subunits",
      "Prokaryotic 70S ribosome consists of 60S and 40S subunits",
      "Mitochondrial ribosomes are identical in size to cytosolic 80S ribosomes"
    ],
    correctAnswer: 0,
    explanation: "Eukaryotic cytosolic ribosomes are 80S, composed of a 60S large subunit and a 40S small subunit. Prokaryotes (and eukaryotic mitochondria) possess 70S ribosomes made of 50S and 30S subunits. Svedberg (S) units are sedimentation coefficients and are non-additive.",
    subject: "Histology and Embryology",
    topic: "Cell Biology & Organelles"
  },
  {
    id: "histo-b2-8",
    question: "According to Chargaff's rules of DNA base pairing, which relationship is strictly conserved in double-stranded DNA?",
    options: [
      "Adenine equals Thymine (A = T) and Guanine equals Cytosine (G = C)",
      "Adenine equals Uracil (A = U) and Guanine equals Cytosine (G = C)",
      "Adenine + Guanine equals Thymine only",
      "Purine content is always lower than Pyrimidine content"
    ],
    correctAnswer: 0,
    explanation: "Chargaff's rules apply to double-stranded DNA: Adenine pairs with Thymine via 2 hydrogen bonds (A = T), and Guanine pairs with Cytosine via 3 hydrogen bonds (G = C). Therefore, total purines (A + G) equals total pyrimidines (T + C). Uracil is present only in RNA instead of Thymine.",
    subject: "Histology and Embryology",
    topic: "Cell Biology & Organelles"
  },

  // ==========================================
  // CELL CYCLE & DIVISION (Pages 5 - 7)
  // ==========================================
  {
    id: "histo-b2-9",
    question: "During which phase of the eukaryotic cell cycle does DNA replication and duplication of the centrosome occur?",
    options: [
      "S phase (Synthesis)",
      "G1 phase (Gap 1)",
      "G2 phase (Gap 2)",
      "M phase (Mitosis)"
    ],
    correctAnswer: 0,
    explanation: "Centrosome duplication and genomic DNA replication occur concurrently during the S phase (Synthesis phase) of interphase, converting the DNA content from 2N to 4N. G1 is the interval of cell growth, RNA and protein synthesis, while G2 prepares tubulin and spindle components for mitosis.",
    subject: "Histology and Embryology",
    topic: "Cell Cycle & Division"
  },
  {
    id: "histo-b2-10",
    question: "Crossing over and genetic recombination between non-sister chromatids of homologous chromosomes occur during which specific stage of Meiosis I?",
    options: [
      "Pachytene",
      "Zygotene",
      "Leptotene",
      "Diplotene"
    ],
    correctAnswer: 0,
    explanation: "Meiosis I prophase stages: 1) Leptotene: chromatin condensation; 2) Zygotene: synapsis and formation of synaptonemal complex; 3) Pachytene: crossing over and chiasma formation; 4) Diplotene: synaptonemal complex dissolves, chiasmata become visible; 5) Diakinesis: terminalization of chiasmata.",
    subject: "Histology and Embryology",
    topic: "Cell Cycle & Division"
  },
  {
    id: "histo-b2-11",
    question: "Primary oocytes in the human female ovary are arrested from fetal development until puberty at which meiotic stage?",
    options: [
      "Diplotene stage of Prophase I",
      "Metaphase II",
      "Pachytene stage of Prophase I",
      "Anaphase I"
    ],
    correctAnswer: 0,
    explanation: "Primary oocytes enter meiosis I during fetal life and become arrested in the diplotene stage of Prophase I (also known as dictyotene) under the influence of oocyte maturation inhibitor (OMI). They remain arrested until puberty, when LH surges trigger completion of Meiosis I just prior to ovulation.",
    subject: "Histology and Embryology",
    topic: "Gametogenesis & Fertilization"
  },
  {
    id: "histo-b2-12",
    question: "The secondary oocyte released during ovulation is arrested in which phase of division until fertilization takes place?",
    options: [
      "Metaphase II",
      "Prophase I",
      "Anaphase II",
      "Telophase I"
    ],
    correctAnswer: 0,
    explanation: "At ovulation, the cell released from the graafian follicle is a secondary oocyte arrested in Metaphase II. It completes the second meiotic division ONLY if fertilized by a spermatozoon in the ampulla of the fallopian tube. If fertilization does not occur, it degenerates within 24 hours.",
    subject: "Histology and Embryology",
    topic: "Gametogenesis & Fertilization"
  },

  // ==========================================
  // CELL SURFACE & JUNCTIONS (Pages 7 - 8)
  // ==========================================
  {
    id: "histo-b2-13",
    question: "Stereocilia are specialized, non-motile, long microvilli with an actin filament core found in which anatomical location?",
    options: [
      "Epididymis and ductus deferens",
      "Trachea and bronchi",
      "Fallopian tube",
      "Small intestine mucosa"
    ],
    correctAnswer: 0,
    explanation: "Stereocilia are extremely long, branched, non-motile microvilli with actin microfilament cores located in the male genital tract (epididymis and ductus deferens, for fluid absorption) and hair cells of the internal ear (sensory mechanoreceptors). Cilia (in trachea and fallopian tube) are motile and contain a 9+2 microtubule axoneme.",
    subject: "Histology and Embryology",
    topic: "Cell Surface & Junctions"
  },
  {
    id: "histo-b2-14",
    question: "Which intercellular junction allows direct ionic and metabolic communication between adjacent cells via connexons?",
    options: [
      "Gap junction (Nexus)",
      "Zonula occludens (Tight junction)",
      "Zonula adherens (Anchoring junction)",
      "Macula adherens (Desmosome)"
    ],
    correctAnswer: 0,
    explanation: "Gap junctions (nexus) are composed of hexameric ring complexes called connexons (made of connexin proteins) forming a central aqueous pore. They allow direct passage of ions, cAMP, and molecules (<1.5 kDa) between neighboring cells, mediating electrical syncytium in cardiac and visceral smooth muscle.",
    subject: "Histology and Embryology",
    topic: "Cell Surface & Junctions"
  },
  {
    id: "histo-b2-15",
    question: "The blood-brain barrier and blood-testis barrier primarily depend on the integrity of which intercellular junctional complex?",
    options: [
      "Zonula occludens (Tight junction)",
      "Macula adherens (Desmosome)",
      "Hemidesmosome",
      "Nexus (Gap junction)"
    ],
    correctAnswer: 0,
    explanation: "Zonula occludens (tight junctions) seal adjacent plasma membranes together via transmembrane proteins claudin and occludin. They completely occlude the intercellular space, establishing cell polarity and forming physiological permeability barriers such as the blood-brain, blood-retinal, and blood-testis barriers.",
    subject: "Histology and Embryology",
    topic: "Cell Surface & Junctions"
  },

  // ==========================================
  // LINING EPITHELIUM & SYSTEMIC HISTOLOGY (Pages 8 - 10)
  // ==========================================
  {
    id: "histo-b2-16",
    question: "What is the lining epithelium of the true vocal cords (vocal folds)?",
    options: [
      "Stratified squamous non-keratinized epithelium",
      "Pseudostratified ciliated columnar epithelium",
      "Simple columnar epithelium",
      "Transitional epithelium"
    ],
    correctAnswer: 0,
    explanation: "Examiner Trap: Most of the respiratory tract (including false vocal cords, larynx, and trachea) is lined by pseudostratified ciliated columnar epithelium. However, true vocal cords undergo significant mechanical stress and air friction, hence they are protected by stratified squamous non-keratinized epithelium.",
    subject: "Histology and Embryology",
    topic: "Epithelial Tissue"
  },
  {
    id: "histo-b2-17",
    question: "The anal canal exhibits important epithelial transitions. What type of epithelium lines the anal canal between the pectinate line and Hilton's white line?",
    options: [
      "Stratified squamous non-keratinized epithelium",
      "Simple columnar epithelium with goblet cells",
      "Stratified squamous keratinized epithelium with hair follicles",
      "Transitional epithelium"
    ],
    correctAnswer: 0,
    explanation: "Anal canal epithelial transitions: 1) Above the pectinate line (endodermal hindgut): Simple columnar epithelium; 2) Between pectinate line and Hilton's white line / intersphincteric groove (pecten, ectodermal proctodaeum): Stratified squamous non-keratinized epithelium; 3) Below the white line (perianal skin): Stratified squamous keratinized epithelium with hairs, sweat, and sebaceous glands.",
    subject: "Histology and Embryology",
    topic: "Epithelial Tissue"
  },
  {
    id: "histo-b2-18",
    question: "Which segment of the human male urethra is lined by transitional epithelium (urothelium)?",
    options: [
      "Prostatic urethra",
      "Membranous urethra",
      "Penile (spongy) urethra",
      "Navicular fossa"
    ],
    correctAnswer: 0,
    explanation: "Male urethra epithelial changes: Prostatic urethra is lined by transitional epithelium (urothelium). Membranous and penile (spongy) urethra are lined by pseudostratified or stratified columnar epithelium. The navicular fossa is lined by stratified squamous non-keratinized epithelium, and the external urethral meatus is stratified squamous keratinized.",
    subject: "Histology and Embryology",
    topic: "Epithelial Tissue"
  },
  {
    id: "histo-b2-19",
    question: "What is the characteristic lining epithelium of the mucosal surface of the human stomach?",
    options: [
      "Simple columnar epithelium without goblet cells",
      "Simple columnar epithelium with brush border and goblet cells",
      "Stratified squamous non-keratinized epithelium",
      "Pseudostratified ciliated columnar epithelium"
    ],
    correctAnswer: 0,
    explanation: "Examiner Trap: The stomach mucosa is lined by simple columnar epithelium consisting of surface mucous cells (which secrete protective alkaline mucus) and contains NO goblet cells. The small and large intestines, by contrast, possess abundant goblet cells interspersed with absorptive columnar cells.",
    subject: "Histology and Embryology",
    topic: "Epithelial Tissue"
  },
  {
    id: "histo-b2-20",
    question: "Which of the following segments of the nephron and collecting system is lined by simple squamous epithelium?",
    options: [
      "Thin segment of the loop of Henle",
      "Proximal convoluted tubule",
      "Distal convoluted tubule",
      "Cortical collecting duct"
    ],
    correctAnswer: 0,
    explanation: "Nephron histology: Parietal layer of Bowman's capsule and the thin descending/ascending limb of the loop of Henle are lined by simple squamous epithelium. Proximal convoluted tubules (PCT) have simple cuboidal epithelium with a dense, tall brush border (microvilli). Distal convoluted tubules (DCT) have simple cuboidal without brush border. Collecting ducts are lined by simple cuboidal to columnar epithelium.",
    subject: "Histology and Embryology",
    topic: "Epithelial Tissue"
  },
  {
    id: "histo-b2-21",
    question: "The uterine tube (fallopian tube) is lined by which type of epithelium?",
    options: [
      "Simple columnar ciliated epithelium with non-ciliated peg cells",
      "Stratified squamous non-keratinized epithelium",
      "Pseudostratified ciliated columnar epithelium",
      "Transitional epithelium"
    ],
    correctAnswer: 0,
    explanation: "The mucosa of the fallopian tube is lined by simple columnar epithelium composed of two distinct cell types: ciliated cells (which beat towards the uterus to transport the ovum/zygote) and non-ciliated secretory Peg cells (which secrete nutrient-rich fluid for the gametes and preimplantation embryo).",
    subject: "Histology and Embryology",
    topic: "Epithelial Tissue"
  },

  // ==========================================
  // GLANDS & SECRETIONS (Page 10)
  // ==========================================
  {
    id: "histo-b2-22",
    question: "Sebaceous glands release their oily secretion (sebum) by which mode of exocrine secretion?",
    options: [
      "Holocrine secretion",
      "Merocrine (eccrine) secretion",
      "Apocrine secretion",
      "Paracrine secretion"
    ],
    correctAnswer: 0,
    explanation: "Modes of exocrine secretion: 1) Holocrine: the entire secretory cell disintegrates and its cell contents form the secretion (e.g., Sebaceous glands, Meibomian/Tarsal glands); 2) Apocrine: apical cytoplasm is pinched off with the secretory product (e.g., lactating mammary glands, axillary apocrine sweat glands); 3) Merocrine/Eccrine: secretion released via exocytosis with no loss of cytoplasm (e.g., salivary glands, pancreas, ordinary eccrine sweat glands).",
    subject: "Histology and Embryology",
    topic: "Glands"
  },
  {
    id: "histo-b2-23",
    question: "Which of the following glands develops embryologically from surface ectoderm?",
    options: [
      "Parotid salivary gland",
      "Submandibular salivary gland",
      "Sublingual salivary gland",
      "Thyroid gland"
    ],
    correctAnswer: 0,
    explanation: "Major salivary gland origins: The Parotid gland is derived from ectoderm (mnemonic: PALS = Parotid, Anterior pituitary, Lacrimal, Sweat/Sebaceous). Submandibular and sublingual glands are derived from endoderm of the primitive oral cavity floor. The thyroid gland is also endodermal.",
    subject: "Histology and Embryology",
    topic: "Glands"
  },
  {
    id: "histo-b2-24",
    question: "Which of the following anatomical structures is completely AVASCULAR in the normal adult body?",
    options: [
      "Articular cartilage and cornea",
      "Thyroid gland and adrenal gland",
      "Dermis of the skin and nail bed",
      "Periosteum and dura mater"
    ],
    correctAnswer: 0,
    explanation: "Avascular structures in the human body receive nutrients strictly by diffusion from surrounding tissue fluid or synovial fluid: Examples include the Cornea, Lens of the eye, Epidermis of the skin, Enamel of teeth, and Articular cartilage (including epiphyseal cartilage plate).",
    subject: "Histology and Embryology",
    topic: "Epithelial Tissue"
  },

  // ==========================================
  // CONNECTIVE TISSUE & FIBERS (Pages 11 - 12)
  // ==========================================
  {
    id: "histo-b2-25",
    question: "Which type of collagen is the principal structural component of the basement membrane and lens capsule?",
    options: [
      "Type IV collagen",
      "Type I collagen",
      "Type II collagen",
      "Type III collagen"
    ],
    correctAnswer: 0,
    explanation: "Collagen distribution: Type I (90% of body collagen): Bone, skin, tendon, dentin, fascia; Type II: Hyaline and elastic cartilage, vitreous body; Type III: Reticular fibers, blood vessel walls, embryonic/fetal skin; Type IV: Basement membrane and lens capsule (mnemonic: 'Type IV is under the floor').",
    subject: "Histology and Embryology",
    topic: "Connective Tissue"
  },
  {
    id: "histo-b2-26",
    question: "Reticular fibers that provide the delicate framework (stroma) of the spleen, lymph nodes, and liver are primarily composed of which collagen type?",
    options: [
      "Type III collagen",
      "Type I collagen",
      "Type II collagen",
      "Type IV collagen"
    ],
    correctAnswer: 0,
    explanation: "Reticular fibers are composed predominantly of Type III collagen. They form a loose, delicate meshwork in lymphoid organs, bone marrow, and the liver stroma. They are argyrophilic (stain black with silver impregnation) and PAS-positive due to high carbohydrate content.",
    subject: "Histology and Embryology",
    topic: "Connective Tissue"
  },
  {
    id: "histo-b2-27",
    question: "Which cell is the tissue-resident macrophage of the central nervous system belonging to the Mononuclear Phagocyte System?",
    options: [
      "Microglia",
      "Kupffer cell",
      "Langerhans cell",
      "Osteoclast"
    ],
    correctAnswer: 0,
    explanation: "Mononuclear Phagocyte System (MPS) cells: Microglia in CNS, Kupffer cells in liver sinusoids, Alveolar macrophages (dust cells) in lungs, Osteoclasts in bone, Langerhans cells in skin epidermis, and Histiocytes in connective tissue. Microglia originate from mesodermal monocytes/yolk sac, unlike neuroectodermal macroglia.",
    subject: "Histology and Embryology",
    topic: "Connective Tissue"
  },
  {
    id: "histo-b2-28",
    question: "Which connective tissue fiber is characterized by branching, high stretchability (elasticity), and special affinity for Verhoeff's or Orcein stain?",
    options: [
      "Elastic fiber",
      "Collagen fiber",
      "Reticular fiber",
      "Sharpey's fiber"
    ],
    correctAnswer: 0,
    explanation: "Elastic fibers consist of an amorphous core of elastin enveloped by a sheath of fibrillin microfibrils. They branch, can stretch up to 150% of their resting length without tearing, appear yellowish in fresh tissue, and selectively stain with Orcein, Resorcin-fuchsin, or Verhoeff's stain.",
    subject: "Histology and Embryology",
    topic: "Connective Tissue"
  },

  // ==========================================
  // CARTILAGE & BONE (Pages 13 - 16)
  // ==========================================
  {
    id: "histo-b2-29",
    question: "Which of the following cartilages is classified as ELASTIC cartilage and DOES NOT undergo calcification with age?",
    options: [
      "Epiglottis and pinna of the ear",
      "Thyroid and cricoid cartilages",
      "Intervertebral disc and pubic symphysis",
      "Tracheal rings and articular cartilage"
    ],
    correctAnswer: 0,
    explanation: "Elastic cartilage contains an abundant network of elastic fibers along with type II collagen. Locations: Pinna of ear, external auditory meatus, auditory (Eustachian) tube, epiglottis, corniculate and cuneiform cartilages. Unlike hyaline cartilage, elastic cartilage NEVER calcifies with aging.",
    subject: "Histology and Embryology",
    topic: "Cartilage & Bone"
  },
  {
    id: "histo-b2-30",
    question: "Perichondrium is completely ABSENT over which of the following cartilaginous structures?",
    options: [
      "Articular hyaline cartilage and fibrocartilage",
      "Tracheal cartilaginous rings",
      "Auricular (pinna) cartilage",
      "Thyroid and cricoid cartilages"
    ],
    correctAnswer: 0,
    explanation: "Perichondrium (vascular fibrous covering) is absent over: 1) Articular cartilage covering the ends of bones in synovial joints (receives nutrition from synovial fluid); 2) Epiphyseal growth plate; and 3) All fibrocartilage structures (e.g., intervertebral discs, menisci, pubic symphysis).",
    subject: "Histology and Embryology",
    topic: "Cartilage & Bone"
  },
  {
    id: "histo-b2-31",
    question: "Osteoclasts are multinucleated giant cells responsible for bone resorption. In which shallow depressions on bone surfaces are they located?",
    options: [
      "Howship's lacunae (resorption bays)",
      "Haversian canals",
      "Canaliculi",
      "Volkmann's canals"
    ],
    correctAnswer: 0,
    explanation: "Active osteoclasts reside within enzymatic shallow depressions on the bone surface known as Howship's lacunae (or resorption bays). They possess a ruffled border that pumps H+ and secretes cathepsin K. Osteocytes reside within regular lacunae, communicating via canaliculi.",
    subject: "Histology and Embryology",
    topic: "Cartilage & Bone"
  },
  {
    id: "histo-b2-32",
    question: "In compact bone, transverse or oblique channels connecting adjacent Haversian canals and conveying neurovascular bundles from the periosteum are called:",
    options: [
      "Volkmann's canals (perforating canals)",
      "Central Haversian canals",
      "Canaliculi",
      "Interstitial lamellae"
    ],
    correctAnswer: 0,
    explanation: "Haversian canals run longitudinally at the center of each osteon. Volkmann's (perforating) canals run perpendicular or obliquely to the long axis, connecting osteonal canals with one another and with the periosteal and endosteal blood supplies. Unlike Haversian canals, Volkmann's canals are NOT surrounded by concentric lamellae.",
    subject: "Histology and Embryology",
    topic: "Cartilage & Bone"
  },
  {
    id: "histo-b2-33",
    question: "In a developing growing long bone, which anatomical zone is the most vascular and represents the commonest site of hematogenous acute osteomyelitis in children?",
    options: [
      "Metaphysis",
      "Epiphysis",
      "Diaphysis",
      "Epiphyseal plate"
    ],
    correctAnswer: 0,
    explanation: "The metaphysis is the transitional zone between the diaphysis and epiphyseal growth plate. It contains end-arterial hair-pin loops of nutrient vessels with sluggish blood flow and scarce phagocytic cells, making it the most vulnerable and commonest primary site for acute hematogenous osteomyelitis in children.",
    subject: "Histology and Embryology",
    topic: "Cartilage & Bone"
  },
  {
    id: "histo-b2-34",
    question: "Which of the following bones is a sesamoid bone developed inside the tendon of the flexor carpi ulnaris muscle?",
    options: [
      "Pisiform",
      "Patella",
      "Fabella",
      "Navicular"
    ],
    correctAnswer: 0,
    explanation: "Sesamoid bones develop within muscle tendons: 1) Patella develops within the tendon of the quadriceps femoris (largest sesamoid bone in the body); 2) Pisiform develops in the tendon of the flexor carpi ulnaris; 3) Fabella develops in the lateral head of the gastrocnemius muscle.",
    subject: "Histology and Embryology",
    topic: "Cartilage & Bone"
  },
  {
    id: "histo-b2-35",
    question: "Secondary cartilaginous joints (symphyses) occur strictly in which anatomical orientation and have which characteristic feature?",
    options: [
      "Midline of the body, lined with fibrocartilage, permanently persistent",
      "Lateral limbs, lined with hyaline cartilage, synostose in early childhood",
      "Cranial vault, lined with suture ligament, immovable",
      "Appendicular skeleton, freely movable with synovial cavity"
    ],
    correctAnswer: 0,
    explanation: "Secondary cartilaginous joints (symphyses) occur exclusively in the median sagittal plane of the body (e.g., symphysis pubis, intervertebral discs, manubriosternal joint). The intervening connecting tissue is fibrocartilage, they allow limited movement, and they never ossify (synostose) under normal physiological conditions.",
    subject: "Histology and Embryology",
    topic: "Cartilage & Bone"
  },

  // ==========================================
  // MUSCLE HISTOLOGY (Page 17)
  // ==========================================
  {
    id: "histo-b2-36",
    question: "In skeletal muscle fibers, a 'triad' consists of a central transverse T-tubule flanked by two terminal cisternae of the sarcoplasmic reticulum. Where is this triad located?",
    options: [
      "At the junction of the A-band and I-band (A-I junction)",
      "Directly at the Z-line",
      "Directly at the M-line",
      "At the center of the H-zone"
    ],
    correctAnswer: 0,
    explanation: "Examiner Trap: In mammalian skeletal muscle, each sarcomere contains TWO triads located at the A-I band junctions. In contrast, in cardiac muscle, T-tubules are wider and form 'diads' (one T-tubule + one terminal cistern) located precisely at the Z-line.",
    subject: "Histology and Embryology",
    topic: "Muscular Tissue"
  },
  {
    id: "histo-b2-37",
    question: "Which of the following histological characteristics is unique to CARDIAC muscle compared to skeletal and smooth muscles?",
    options: [
      "Intercalated discs and branching fibers with single central nuclei",
      "Multinucleated peripheral syncytium with no cell boundaries",
      "Absence of cross-striations with spindle-shaped fibers",
      "High regenerative capacity via active satellite cells"
    ],
    correctAnswer: 0,
    explanation: "Cardiac muscle features: Mononucleated (or binucleated) cells with centrally positioned nuclei, branched cylindrical fibers, cross-striations, and diagnostic intercalated discs (containing fascia adherens, desmosomes, and gap junctions). Unlike skeletal muscle, cardiac myocytes completely lack satellite cells and cannot regenerate after infarction.",
    subject: "Histology and Embryology",
    topic: "Muscular Tissue"
  },
  {
    id: "histo-b2-38",
    question: "In smooth muscle cells, what functional structural elements serve as anchoring sites for thin actin filaments, acting as functional equivalents of Z-discs?",
    options: [
      "Dense bodies",
      "Caveolae",
      "T-tubules",
      "Intercalated discs"
    ],
    correctAnswer: 0,
    explanation: "Smooth muscle cells lack sarcomeres and Z-lines. Instead, actin filaments are anchored to cytoplasmic and submembranous 'dense bodies' containing alpha-actinin. Caveolae are rudimentary surface invaginations that sequester extracellular Ca2+ (compensating for the absence of an organized T-tubule system).",
    subject: "Histology and Embryology",
    topic: "Muscular Tissue"
  },

  // ==========================================
  // LYMPHOID SYSTEM, VESSELS & SKIN (Pages 18 - 20)
  // ==========================================
  {
    id: "histo-b2-39",
    question: "Which of the following lymphoid organs is unique in possessing AFFERENT lymphatic vessels?",
    options: [
      "Lymph node",
      "Spleen",
      "Thymus",
      "Palatine tonsil"
    ],
    correctAnswer: 0,
    explanation: "Examiner Trap: The lymph node is the ONLY lymphoid organ that possesses afferent lymphatic vessels (which pierce the capsule to empty lymph into the subcapsular sinus). The spleen, thymus, and tonsils have only efferent lymphatic vessels and do not filter lymph; the spleen filters blood.",
    subject: "Histology and Embryology",
    topic: "Lymphoid System"
  },
  {
    id: "histo-b2-40",
    question: "In the spleen, T-lymphocytes are predominantly concentrated in which histological compartment?",
    options: [
      "Periarteriolar lymphoid sheath (PALS) around central arterioles",
      "Germinal centers of splenic nodules (Malpighian corpuscles)",
      "Splenic cords of Billroth",
      "Marginal zone of the red pulp"
    ],
    correctAnswer: 0,
    explanation: "White pulp organization: The Periarteriolar Lymphoid Sheath (PALS) surrounds the central artery/arteriole and contains primarily T-lymphocytes (thymus-dependent zone). The splenic follicles (Malpighian corpuscles) contain B-lymphocytes. Red pulp consists of splenic cords of Billroth and sinusoids for RBC clearance.",
    subject: "Histology and Embryology",
    topic: "Lymphoid System"
  },
  {
    id: "histo-b2-41",
    question: "Sinusoidal (discontinuous) capillaries with an incomplete basement membrane and wide intercellular gaps are found in which organs?",
    options: [
      "Liver, spleen, and bone marrow",
      "Brain, skeletal muscle, and lungs",
      "Renal glomerulus and intestinal villi",
      "Skin and exocrine glands"
    ],
    correctAnswer: 0,
    explanation: "Capillary types: 1) Continuous: complete basement membrane, tight junctions (brain, muscle, skin, lung); 2) Fenestrated: pores with diaphragms (endocrine glands, intestinal mucosa, kidney glomerulus); 3) Sinusoidal/Discontinuous: large gaps and discontinuous/absent basement membrane (Liver, Spleen, Bone Marrow - allows whole cells and large proteins to pass).",
    subject: "Histology and Embryology",
    topic: "Vascular Histology"
  },
  {
    id: "histo-b2-42",
    question: "Stratum lucidum is a clear, homogenous epidermal layer found exclusively in which type of skin?",
    options: [
      "Thick skin of palms and soles",
      "Thin skin of eyelids and abdomen",
      "Scalp and forehead",
      "Axillary and pubic skin"
    ],
    correctAnswer: 0,
    explanation: "Stratum lucidum contains flattened, anucleated eosinophilic cells packed with eleidin (an intermediate form of keratin). It is present ONLY in the thick, hairless skin of the palms of hands and soles of feet. Thin skin lacks both a distinct stratum lucidum and a prominent stratum granulosum.",
    subject: "Histology and Embryology",
    topic: "Skin & Neuroglia"
  },
  {
    id: "histo-b2-43",
    question: "Which of the following neuroglial cells is derived embryologically from the MESODERM (monocyte-macrophage lineage)?",
    options: [
      "Microglia",
      "Astrocytes",
      "Oligodendrocytes",
      "Ependymal cells"
    ],
    correctAnswer: 0,
    explanation: "Examiner Trap: Microglia are the resident macrophages of the central nervous system and arise from mesodermal hematopoietic/monocytic progenitors in the yolk sac. In contrast, Astrocytes, Oligodendrocytes, and Ependymal cells are derived from neuroectoderm (neural tube). Schwann cells and satellite cells derive from neural crest.",
    subject: "Histology and Embryology",
    topic: "Skin & Neuroglia"
  },

  // ==========================================
  // GENERAL EMBRYOLOGY: PLACENTA & CIRCULATION (Pages 21 - 22)
  // ==========================================
  {
    id: "histo-b2-44",
    question: "At term, what is the normal feto-placental weight ratio in a healthy pregnancy?",
    options: [
      "6:1",
      "1:1",
      "3:1",
      "10:1"
    ],
    correctAnswer: 0,
    explanation: "At term, a full-term placenta weighs approximately 500 grams, while a normal fetus weighs approximately 3000 to 3500 grams. Thus, the normal feto-placental weight ratio is approximately 6:1 (3000g : 500g).",
    subject: "Histology and Embryology",
    topic: "General Embryology"
  },
  {
    id: "histo-b2-45",
    question: "The normal umbilical cord at term contains which of the following vascular arrangements embedded in Wharton's jelly?",
    options: [
      "Two umbilical arteries and one umbilical vein",
      "One umbilical artery and two umbilical veins",
      "Two umbilical arteries and two umbilical veins",
      "One umbilical artery and one umbilical vein"
    ],
    correctAnswer: 0,
    explanation: "The normal mature human umbilical cord (length ~55-60 cm) contains TWO umbilical arteries (which carry deoxygenated blood from the internal iliac arteries of the fetus to the placenta) and ONE umbilical vein (which carries oxygenated blood from the placenta to the fetus). The right umbilical vein regresses early.",
    subject: "Histology and Embryology",
    topic: "General Embryology"
  },
  {
    id: "histo-b2-46",
    question: "Which class of maternal immunoglobulin is actively transported across the syncytiotrophoblast of the placenta to provide passive immunity to the fetus?",
    options: [
      "IgG",
      "IgM",
      "IgA",
      "IgE"
    ],
    correctAnswer: 0,
    explanation: "Only maternal Immunoglobulin G (IgG) crosses the placental barrier, mediated by specific neonatal Fc receptors (FcRn) on syncytiotrophoblasts starting at ~14 weeks of gestation. Maternal IgM, IgA, IgD, and IgE do not cross the placenta due to their larger size and lack of receptor transport.",
    subject: "Histology and Embryology",
    topic: "General Embryology"
  },
  {
    id: "histo-b2-47",
    question: "In fetal circulation, what anatomical remnant does the obliterated umbilical vein become in the adult?",
    options: [
      "Ligamentum teres hepatis (round ligament of liver)",
      "Ligamentum venosum",
      "Ligamentum arteriosum",
      "Medial umbilical ligament"
    ],
    correctAnswer: 0,
    explanation: "Adult remnants of fetal circulation: 1) Umbilical vein -> Ligamentum teres hepatis (in free margin of falciform ligament); 2) Ductus venosus -> Ligamentum venosum; 3) Ductus arteriosus -> Ligamentum arteriosum; 4) Umbilical arteries -> Medial umbilical ligaments; 5) Foramen ovale -> Fossa ovalis.",
    subject: "Histology and Embryology",
    topic: "General Embryology"
  },
  {
    id: "histo-b2-48",
    question: "In fetal circulation, which vessel carries blood with the HIGHEST oxygen saturation (~80%)?",
    options: [
      "Umbilical vein",
      "Umbilical artery",
      "Descending aorta",
      "Pulmonary trunk"
    ],
    correctAnswer: 0,
    explanation: "In the fetus, gas exchange occurs in the placenta, not the lungs. The Umbilical vein carries freshly oxygenated blood (~80% O2 saturation) from the placenta to the fetus. The umbilical arteries carry deoxygenated blood (~58% saturation) from the internal iliac arteries back to the placenta.",
    subject: "Histology and Embryology",
    topic: "General Embryology"
  },
  {
    id: "histo-b2-49",
    question: "The ductus venosus shunts oxygen-rich umbilical venous blood directly into which vessel, bypassing the liver sinusoids?",
    options: [
      "Inferior vena cava (IVC)",
      "Portal vein",
      "Superior vena cava (SVC)",
      "Right ventricle"
    ],
    correctAnswer: 0,
    explanation: "The ductus venosus connects the umbilical vein directly to the Inferior Vena Cava (IVC), bypassing the capillary network and sinusoids of the fetal liver. This allows high-oxygen blood to stream directly through the IVC and across the foramen ovale into the left atrium for delivery to the fetal brain and coronary vessels.",
    subject: "Histology and Embryology",
    topic: "General Embryology"
  },

  // ==========================================
  // GAMETOGENESIS, FERTILIZATION & IMPLANTATION (Pages 22 - 23)
  // ==========================================
  {
    id: "histo-b2-50",
    question: "Fertilization of the human ovum normally takes place in which specific anatomical region of the fallopian tube?",
    options: [
      "Ampulla",
      "Isthmus",
      "Infundibulum",
      "Intramural (interstitial) part"
    ],
    correctAnswer: 0,
    explanation: "Normal fertilization occurs in the ampulla of the uterine (fallopian) tube within 24 hours after ovulation. The ampulla is the widest and longest section of the tube. It is also the most common site for tubal ectopic pregnancy (~80%).",
    subject: "Histology and Embryology",
    topic: "Gametogenesis & Fertilization"
  },
  {
    id: "histo-b2-51",
    question: "Which sperm enzyme is essential for penetrating through the corona radiata during Phase I of fertilization?",
    options: [
      "Hyaluronidase",
      "Acrosin (trypsin-like protease)",
      "Neuraminidase",
      "Acid phosphatase"
    ],
    correctAnswer: 0,
    explanation: "Phases of fertilization: Phase I: Penetration of corona radiata by release of hyaluronidase from the acrosome; Phase II: Penetration of the zona pellucida mediated by acrosin and zona lysins; Phase III: Fusion of sperm and oocyte cell membranes, triggering cortical granule release to prevent polyspermy.",
    subject: "Histology and Embryology",
    topic: "Gametogenesis & Fertilization"
  },
  {
    id: "histo-b2-52",
    question: "Implantation of the human embryo normally begins on which day following fertilization, and at which developmental stage?",
    options: [
      "Day 6–7 at blastocyst stage",
      "Day 1–2 at zygote stage",
      "Day 3–4 at morula stage",
      "Day 14 at gastrula stage"
    ],
    correctAnswer: 0,
    explanation: "Implantation normally begins on day 6 or 7 post-fertilization at the blastocyst stage (specifically by attachment of the syncytiotrophoblast to the posterior wall of the uterine fundus). Implantation is completed by day 11 to 12 when the blastocyst is fully embedded within the endometrium.",
    subject: "Histology and Embryology",
    topic: "General Embryology"
  },
  {
    id: "histo-b2-53",
    question: "During late gestation, what is the primary source contributing to the volume of amniotic fluid?",
    options: [
      "Fetal urine excretion (~500 mL/day)",
      "Maternal transudate across uterine wall",
      "Fetal lung liquid secretion only",
      "Umbilical cord transudation"
    ],
    correctAnswer: 0,
    explanation: "In the second half of pregnancy, fetal urine is the primary contributor to amniotic fluid (producing ~500–800 mL/day at term). The fetus also swallows approximately 400 mL/day. Impairment of fetal urination (e.g., bilateral renal agenesis) results in severe oligohydramnios (<400 mL).",
    subject: "Histology and Embryology",
    topic: "General Embryology"
  },

  // ==========================================
  // GERM LAYER DERIVATIVES (Pages 23 - 25)
  // ==========================================
  {
    id: "histo-b2-54",
    question: "Which of the following endocrine structures is derived embryologically from NEURAL CREST cells?",
    options: [
      "Adrenal medulla (chromaffin cells)",
      "Adrenal cortex",
      "Anterior pituitary gland (adenohypophysis)",
      "Posterior pituitary gland (neurohypophysis)"
    ],
    correctAnswer: 0,
    explanation: "Examiner Trap: The Adrenal medulla consists of chromaffin cells derived from neural crest cells. The Adrenal cortex is derived from coelomic mesoderm (intermediate/lateral plate mesoderm). Anterior pituitary is from surface ectoderm (Rathke's pouch), and Posterior pituitary is from neural tube (diencephalon neuroectoderm).",
    subject: "Histology and Embryology",
    topic: "Germ Layer Derivatives"
  },
  {
    id: "histo-b2-55",
    question: "Which of the following structures is an intermediate mesoderm derivative?",
    options: [
      "Kidneys, ureters, and ductus deferens",
      "Axial skeleton and ribs",
      "Dermis of the back",
      "Endothelial lining of the heart"
    ],
    correctAnswer: 0,
    explanation: "Mesoderm subdivisions: 1) Paraxial mesoderm: somites forming sclerotome (vertebrae, ribs), dermatome (dermis), myotome (skeletal muscles); 2) Intermediate mesoderm: urogenital system including kidneys (pronephros, mesonephros, metanephros), ureteric bud (calyces, ureter), and male genital ducts (Wolffian duct); 3) Lateral plate mesoderm: heart, blood vessels, adrenal cortex, serous membranes.",
    subject: "Histology and Embryology",
    topic: "Germ Layer Derivatives"
  },
  {
    id: "histo-b2-56",
    question: "The epithelial lining of the trigone of the urinary bladder is initially derived embryologically from which structure?",
    options: [
      "Mesonephric ducts (intermediate mesoderm)",
      "Allantois (endoderm)",
      "Paramesonephric ducts",
      "Cloacal membrane (ectoderm)"
    ],
    correctAnswer: 0,
    explanation: "The trigone of the urinary bladder is embryologically derived from the caudal portions of the mesonephric (Wolffian) ducts, which are of intermediate mesodermal origin. With development, the mesodermal lining of the trigone is eventually overgrown and replaced by endodermal urothelium from the urogenital sinus.",
    subject: "Histology and Embryology",
    topic: "Germ Layer Derivatives"
  },
  {
    id: "histo-b2-57",
    question: "Which of the following structures is derived embryologically from the PARAMESONEPHRIC (Müllerian) duct in females?",
    options: [
      "Uterine tubes, uterus, and upper 1/3 of the vagina",
      "Lower 2/3 of the vagina and vestibule",
      "Ovaries and ovarian follicles",
      "Trigone of the bladder and ureters"
    ],
    correctAnswer: 0,
    explanation: "Paramesonephric (Müllerian) ducts develop in the lateral plate mesoderm. In females (in the absence of Anti-Müllerian Hormone), they fuse and develop into the Fallopian tubes, uterus, and upper part of the vagina. The lower vagina is derived from the sinovaginal bulbs (urogenital sinus). In males, the prostatic utricle is the remnant.",
    subject: "Histology and Embryology",
    topic: "Germ Layer Derivatives"
  },
  {
    id: "histo-b2-58",
    question: "Dura mater (pachymeninx) and leptomeninges (arachnoid and pia mater) arise from different embryonic origins. Which statement is correct?",
    options: [
      "Dura mater arises from paraxial mesenchyme; Pia and arachnoid arise from neural crest",
      "Dura mater arises from neural crest; Pia and arachnoid arise from neural tube",
      "All three meningeal layers arise exclusively from the neural tube",
      "All three meningeal layers arise exclusively from endoderm"
    ],
    correctAnswer: 0,
    explanation: "Pachymeninx (dura mater) develops from the paraxial mesoderm surrounding the neural tube. In contrast, the leptomeninges (pia mater and arachnoid mater) are formed by migrating neural crest cells.",
    subject: "Histology and Embryology",
    topic: "Germ Layer Derivatives"
  },

  // ==========================================
  // PHARYNGEAL ARCHES & POUCHES (Pages 26 - 27)
  // ==========================================
  {
    id: "histo-b2-59",
    question: "The INFERIOR parathyroid glands (Parathyroid III) and thymus develop from which pharyngeal pouch?",
    options: [
      "3rd pharyngeal pouch",
      "4th pharyngeal pouch",
      "2nd pharyngeal pouch",
      "1st pharyngeal pouch"
    ],
    correctAnswer: 0,
    explanation: "Examiner Trap: Candidates often assume inferior parathyroids come from the 4th pouch because it is lower down. However, the Inferior parathyroid glands (along with the thymus) develop from the 3RD pharyngeal pouch! As the thymus migrates caudally into the anterior mediastinum, it pulls parathyroid III with it, leaving it inferior to parathyroid IV (which arises from the 4th pouch).",
    subject: "Histology and Embryology",
    topic: "Pharyngeal Arches & Pouches"
  },
  {
    id: "histo-b2-60",
    question: "Which skeletal structure develops from Meckel's cartilage of the FIRST pharyngeal arch?",
    options: [
      "Malleus and Incus",
      "Stapes and Styloid process",
      "Greater horn of hyoid bone",
      "Thyroid cartilage"
    ],
    correctAnswer: 0,
    explanation: "1st arch cartilage (Meckel's cartilage) gives rise to the Malleus, Incus, anterior ligament of malleus, and sphenomandibular ligament. 2nd arch cartilage (Reichert's) gives rise to the Stapes, Styloid process, stylohyoid ligament, and lesser horn of hyoid. 3rd arch forms the greater horn of the hyoid. 4th and 6th arches form laryngeal cartilages.",
    subject: "Histology and Embryology",
    topic: "Pharyngeal Arches & Pouches"
  },
  {
    id: "histo-b2-61",
    question: "The muscles of mastication (temporalis, masseter, medial & lateral pterygoids) and tensor tympani are innervated by CN V3 because they develop from which arch?",
    options: [
      "1st pharyngeal arch",
      "2nd pharyngeal arch",
      "3rd pharyngeal arch",
      "4th pharyngeal arch"
    ],
    correctAnswer: 0,
    explanation: "Derivatives of the 1st pharyngeal arch (mandibular arch) are innervated by the mandibular division of the trigeminal nerve (CN V3). Muscles include: muscles of mastication, mylohyoid, anterior belly of digastric, tensor tympani, and tensor veli palatini.",
    subject: "Histology and Embryology",
    topic: "Pharyngeal Arches & Pouches"
  },
  {
    id: "histo-b2-62",
    question: "Which muscle is derived from the FOURTH pharyngeal arch and is innervated by the superior laryngeal nerve (CN X)?",
    options: [
      "Cricothyroid muscle",
      "Posterior cricoarytenoid muscle",
      "Stylopharyngeus muscle",
      "Stapedius muscle"
    ],
    correctAnswer: 0,
    explanation: "Examiner Trap: The cricothyroid muscle is the ONLY laryngeal muscle derived from the 4th pharyngeal arch (innervated by the superior laryngeal nerve). All other intrinsic muscles of the larynx are derived from the 6th pharyngeal arch and innervated by the recurrent laryngeal nerve. Stylopharyngeus is 3rd arch (CN IX). Stapedius is 2nd arch (CN VII).",
    subject: "Histology and Embryology",
    topic: "Pharyngeal Arches & Pouches"
  },
  {
    id: "histo-b2-63",
    question: "The philtrum of the upper lip is formed embryologically by the fusion of which pair of facial prominences?",
    options: [
      "Medial nasal prominences",
      "Lateral nasal and maxillary prominences",
      "Maxillary and mandibular prominences",
      "Frontonasal and lateral nasal prominences"
    ],
    correctAnswer: 0,
    explanation: "Face development: Fusion of the two medial nasal prominences forms the intermaxillary segment, which gives rise to the philtrum of the upper lip, crest/tip of the nose, and primary palate. The lateral portions of the upper lip are formed by the maxillary prominences. Failure of fusion of the maxillary and medial nasal prominences results in cleft lip.",
    subject: "Histology and Embryology",
    topic: "Pharyngeal Arches & Pouches"
  },

  // ==========================================
  // CONGENITAL ANOMALIES (Pages 27 - 28)
  // ==========================================
  {
    id: "histo-b2-64",
    question: "Neural tube defects such as Spina bifida cystica and Anencephaly result from failure of closure of which structures, respectively?",
    options: [
      "Caudal neuropore and cranial neuropore",
      "Cranial neuropore and caudal neuropore",
      "Lateral body folds and umbilical ring",
      "First and second pharyngeal arches"
    ],
    correctAnswer: 0,
    explanation: "The anterior (cranial) neuropore normally closes around day 25; failure of closure results in anencephaly. The posterior (caudal) neuropore normally closes around day 27–28; failure of closure results in spina bifida (occulta, meningocele, or myelomeningocele). Maternal folic acid supplementation prevents over 70% of these defects.",
    subject: "Histology and Embryology",
    topic: "Congenital Anomalies"
  },
  {
    id: "histo-b2-65",
    question: "Hirschsprung disease (congenital aganglionic megacolon) is caused by the embryological failure of which cell population to migrate into the distal bowel wall?",
    options: [
      "Neural crest cells",
      "Endodermal stem cells",
      "Lateral plate mesodermal cells",
      "Paraxial sclerotome cells"
    ],
    correctAnswer: 0,
    explanation: "Hirschsprung disease is a neurocristopathy caused by failure of neural crest cells to migrate craniocaudally into the submucosa (Meissner plexus) and myenteric layer (Auerbach plexus) of the rectosigmoid colon. The aganglionic segment remains permanently contracted, causing proximal functional intestinal obstruction and megacolon.",
    subject: "Histology and Embryology",
    topic: "Congenital Anomalies"
  },
  {
    id: "histo-b2-66",
    question: "DiGeorge syndrome (22q11.2 deletion) manifests with thymic hypoplasia, severe hypocalcemia, and outflow tract cardiac anomalies due to defective development of which pharyngeal pouches?",
    options: [
      "3rd and 4th pharyngeal pouches",
      "1st and 2nd pharyngeal pouches",
      "2nd and 3rd pharyngeal pouches",
      "5th and 6th pharyngeal pouches"
    ],
    correctAnswer: 0,
    explanation: "DiGeorge syndrome results from defective neural crest cell migration into the 3rd and 4th pharyngeal pouches. This leads to absent/hypoplastic thymus (impaired cell-mediated T-cell immunity), absent parathyroid glands (hypocalcemic tetany), and conotruncal cardiac malformations (e.g., Tetralogy of Fallot, truncus arteriosus).",
    subject: "Histology and Embryology",
    topic: "Congenital Anomalies"
  },
  {
    id: "histo-b2-67",
    question: "Meckel's diverticulum is the most common congenital anomaly of the GI tract, resulting from the persistence of which embryological structure?",
    options: [
      "Vitellointestinal (omphalomesenteric) duct",
      "Allantois (urachus)",
      "Ventral pancreatic bud",
      "Left vitelline vein"
    ],
    correctAnswer: 0,
    explanation: "Meckel's diverticulum results from partial failure of obliteration of the vitellointestinal (omphalomesenteric) duct. Rule of 2s: 2% of population, within 2 feet of ileocecal valve, 2 inches long, presents by 2 years of age, and often contains 2 ectopic mucosa types (gastric and pancreatic).",
    subject: "Histology and Embryology",
    topic: "Congenital Anomalies"
  },
  {
    id: "histo-b2-68",
    question: "In horseshoe kidney, the kidneys fuse across the midline (usually at their lower poles). Normal ascent to the lumbar region is arrested by which arterial obstacle?",
    options: [
      "Inferior mesenteric artery (IMA)",
      "Superior mesenteric artery (SMA)",
      "Celiac trunk",
      "Common iliac artery"
    ],
    correctAnswer: 0,
    explanation: "In horseshoe kidney (1 in 400 births), metanephric blastemas fuse at their lower poles while in the pelvis. During embryonic ascent, the isthmus of the horseshoe kidney gets trapped beneath the root of the Inferior Mesenteric Artery (IMA) at the level of L3, preventing ascent to normal suprarenal positions.",
    subject: "Histology and Embryology",
    topic: "Congenital Anomalies"
  },
  {
    id: "histo-b2-69",
    question: "A newborn infant presents with continuous leakage of clear urine from the umbilicus. What is the most likely embryological diagnosis?",
    options: [
      "Urachal fistula (patent urachus)",
      "Persistent vitelline duct fistula",
      "Urachal cyst",
      "Meckel diverticulum"
    ],
    correctAnswer: 0,
    explanation: "Urachal fistula (patent urachus) occurs when the lumen of the intra-embryonic portion of the allantois fails to obliterate into the median umbilical ligament. This leaves a direct patent communication between the apex of the urinary bladder and the umbilicus, causing continuous leakage of urine. A persistent vitelline duct leaks fecal matter, not urine.",
    subject: "Histology and Embryology",
    topic: "Congenital Anomalies"
  },
  {
    id: "histo-b2-70",
    question: "Hypospadias is a congenital anomaly where the external urethral orifice opens on the ventral surface of the penis. It is caused by failure of fusion of which embryonic structures?",
    options: [
      "Urethral (urogenital) folds",
      "Genital tubercle",
      "Labioscrotal swellings",
      "Gubernaculum testis"
    ],
    correctAnswer: 0,
    explanation: "Hypospadias results from failure of complete fusion of the urethral (urogenital) folds over the urethral groove on the ventral aspect of the phallus. Epispadias, by contrast, is an opening on the dorsal aspect of the penis caused by abnormal, posterior positioning of the genital tubercle.",
    subject: "Histology and Embryology",
    topic: "Congenital Anomalies"
  }
];
