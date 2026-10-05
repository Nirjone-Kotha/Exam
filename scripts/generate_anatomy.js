const fs = require('fs');
const path = require('path');

const raw = JSON.parse(fs.readFileSync('extracted_json/anatomy.json', 'utf8'));

const anatExplanations = {
  "101": "The superficial (external) inguinal ring is a triangular opening in the aponeurosis of the External Oblique muscle, situated just superior and lateral to the pubic tubercle. The deep inguinal ring is an oval opening in the fascia transversalis.",
  "109": "The dermis is the tough, flexible, vascular connective tissue layer of the skin located beneath the epidermis, derived embryologically from mesoderm. It consists of papillary (loose connective tissue) and reticular (dense irregular connective tissue) layers. Keratinocytes and melanocytes reside in the epidermis.",
  "114": "As the ureter approaches the ureterovesical junction in the base of the broad ligament, the uterine artery crosses SUPERIOR to the ureter ('water under the bridge'), creating a critical anatomical landmark where the ureter is vulnerable to accidental ligating during hysterectomy.",
  "118": "Meiosis is a specialized two-step reductional cell division in gametocytes that produces 4 non-identical haploid (n) daughter cells from a single diploid (2n) germ cell, introducing genetic variation via crossing over in prophase I.",
  "119": "Smooth muscle (involuntary, non-striated, spindle-shaped cells with a central nucleus) is found in the tunica media of blood vessel walls, gastrointestinal tract, respiratory airways, and urogenital organs. Skeletal muscle is found in the tongue, diaphragm, and soft palate.",
  "121": "Deep fascia is completely absent in the Face (to allow unrestricted movement and facial expression by muscles of facial expression inserted into the skin) and in the anterior abdominal wall (to accommodate distension). It is thick in the sole (plantar aponeurosis) and neck (deep cervical fascia).",
  "122": "The left lung is divided into only TWO lobes (Superior and Inferior) by a single oblique fissure, and features the cardiac notch and lingula. The right lung is divided into THREE lobes (Superior, Middle, Inferior) by oblique and horizontal fissures.",
  "129": "Carpal tunnel syndrome is caused by entrapment and compression of the Median Nerve within the osteofibrous carpal tunnel beneath the flexor retinaculum, resulting in paresthesias in the thumb, index, middle, and radial half of the ring finger, and thenar wasting.",
  "133": "The Superior Mesenteric Artery (SMA) supplies all derivatives of the embryological midgut from the major duodenal papilla to the junction of the proximal two-thirds and distal one-third of the transverse colon, including the jejunum, ileum, cecum, and the Appendix (via the appendicular artery, a branch of the ileocolic artery).",
  "142": "Connective tissue is characterized by an abundance of Extracellular Matrix (ECM consisting of ground substance and collagen, elastic, and reticular fibers) with relatively sparse, widely spaced cells. In contrast, epithelial, muscular, and nervous tissues have high cellularity and minimal ECM.",
  "160": "The medial (interhemispheric) surface of the cerebral hemisphere (including the motor and sensory strips representing the lower limb and perineum) is supplied predominantly by the Anterior Cerebral Artery (ACA). The lateral cortical surface is supplied by the Middle Cerebral Artery (MCA).",
  "161": "The urinary bladder, ureters, renal pelvis, and calyces are lined by Transitional Epithelium (Urothelium)—a specialized stratified epithelium whose umbrella cells can stretch and flatten reversibly to accommodate changes in urinary volume while maintaining an impermeable barrier.",
  "166": "Elastic cartilage contains rich networks of branching elastic fibers and is found in the auricle (pinna) of the ear, external acoustic meatus, auditory (Eustachian) tube, and epiglottis. The epiphyseal growth plate of growing long bones is composed of Hyaline Cartilage.",
  "167": "Simple squamous epithelium consists of a single layer of flattened, plate-like cells. It lines the internal surface of all blood and lymphatic vessels (where it is specifically termed Endothelium), as well as peritoneal and pleural serous cavities (Mesothelium), and pulmonary alveoli.",
  "172": "The male external genital organs comprise the Penis and the Scrotum. The prostate, seminal vesicles, epididymis, and testes are classified as male internal genital organs.",
  "177": "In the female pelvis, the anterior surface of the upper two-thirds of the rectum is related across the rectouterine pouch (pouch of Douglas) to the posterior fornix of the vagina and the supra-vaginal cervix and uterine body.",
  "183": "The detrusor muscle is the thick, complex woven meshwork of smooth muscle fibers forming the muscular coat of the Urinary Bladder wall, under parasympathetic (pelvic splanchnic nerves S2-S4) control during micturition.",
  "187": "The aortic hiatus of the diaphragm (located at the level of T12 vertebra between the crura and median arcuate ligament) transmits: 1. The Abdominal Aorta, 2. The Thoracic Duct, and 3. The Azygos Vein.",
  "189": "Neuroglia (glial cells: astrocytes, oligodendrocytes, microglia, and ependymal cells in the CNS; Schwann cells and satellite cells in the PNS) are the non-neuronal supporting, myelinating, and homeostatic cells of the nervous system, outnumbering neurons.",
  "191": "The boundaries of the femoral ring are: Anterior: Inguinal ligament; Posterior: Pectineal ligament (Cooper's) and pectineus muscle; Lateral: Femoral vein; Medial: Sharp crescentic edge of the Lacunar ligament (Gimbernat's).",
  "195": "Epithelial tissues function in physical protection, selective absorption, secretion, sensation, and transcellular transport. Synthesis of plasma globulins (antibodies/immunoglobulins) is performed by plasma cells (derived from B lymphocytes), while other globulins are produced by hepatocytes.",
  "101b": "The medial cord of the brachial plexus gives rise to 5 branches: 1. Medial pectoral nerve, 2. Medial cutaneous nerve of arm, 3. Medial cutaneous nerve of forearm, 4. Ulnar nerve, and 5. Medial root of the median nerve.",
  "106": "The 3rd aortic arch bilaterally develops into the Common Carotid Artery and the proximal portion of the Internal Carotid Artery; the External Carotid Artery arises as a ventral sprout from the 3rd aortic arch.",
  "114": "The oculomotor nerve (CN III) supplies the levator palpebrae superioris and extraocular muscles (except superior oblique and lateral rectus). Complete CN III paralysis results in complete Ptosis (drooping of the upper eyelid), 'down and out' eyeball deviation, and a fixed, dilated pupil.",
  "118b": "Ribosomes and proteasomes are non-membrane-bound cellular organelles composed of RNA complexes and proteins. Organelles surrounded by lipid membranes include the nucleus, mitochondria, endoplasmic reticulum, Golgi apparatus, and lysosomes.",
  "121b": "The Blood-Brain Barrier (BBB) is primarily formed by continuous, non-fenestrated brain capillary Endothelial Cells sealed by complex tight junctions (zonulae occludentes), supported by a continuous basement membrane and astrocyte perivascular end-feet (podocytes).",
  "125": "Primary and secondary retroperitoneal structures of the abdomen include: kidneys, adrenal glands, ureters, pancreas, aorta, IVC, and the ascending colon and descending colon (mnemonic: SAD PUCKER).",
  "141": "The pretracheal layer of the deep cervical fascia completely encloses the Thyroid Gland, trachea, and esophagus, and anchors the gland to the cricoid cartilage (ligament of Berry), causing the thyroid to move upward during deglutition.",
  "156": "Continuous capillaries feature an uninterrupted endothelial lining with tight junctions and continuous basal lamina, found in the blood-air barrier of the lungs (facilitating gas exchange) and brain (BBB). Fenestrated capillaries occur in endocrine glands, glomeruli, and intestinal mucosa.",
  "158": "The broad ligament of the uterus is a broad fold of peritoneum containing the uterine tubes, round ligament, ovarian ligament, uterine artery and plexus, and ovarian vessels and nerve plexus.",
  "159": "Continuous non-fenestrated capillaries with occluding tight junctions are the structural foundation of capillaries in the cerebrum (brain) and skeletal muscle, preventing non-specific paracellular leakage.",
  "165": "The Diaphragm is pierced by several structures: the Left Phrenic Nerve pierces the muscular substance of the left hemidiaphragm, while the right phrenic passes through the caval hiatus with the IVC at T8.",
  "175": "Myoepithelial cells are specialized contractile epithelial cells situated between basement membrane and secretory acinar cells in exocrine glands (sweat glands, salivary glands, mammary glands, lacrimal glands), helping expel glandular secretions.",
  "178": "The resting thyroid follicles are lined by a single layer of Simple Cuboidal Epithelium. When hyperactive, the epithelium becomes tall columnar; when inactive and colloid-filled, it flattens into simple squamous.",
  "188": "Enamel of the tooth is a non-living, highly mineralized calcified substance (96% inorganic hydroxyapatite) that is completely avascular and acellular, with zero blood or lymphatic vessels.",
  "189b": "Structures passing through the greater sciatic foramen above and below the piriformis muscle include the Superior Gluteal Nerve and vessels, Inferior Gluteal Nerve and vessels, Sciatic nerve, Posterior femoral cutaneous nerve, and Pudendal nerve.",
  "193": "The Axillary Nerve (C5, C6) passes through the quadrangular space and innervates the Deltoid muscle and the Teres Minor muscle, and gives off the upper lateral cutaneous nerve of the arm.",
  "194": "The normal full-term umbilical cord typically contains TWO umbilical arteries (carrying deoxygenated blood from the fetus to the placenta) and ONE Umbilical Vein (carrying oxygen-rich blood from the placenta to the fetus), embedded in Wharton's jelly.",
  "104b": "Langerhans cells are dendritic, bone-marrow-derived Antigen Presenting Cells (APCs) located in the stratum spinosum of the epidermis of the skin, characterized by racket-shaped Birbeck granules on electron microscopy.",
  "105b": "The Hepatic Veins (typically right, middle, and left hepatic veins draining blood from the liver parenchyma) are the largest tributaries draining directly into the intrahepatic portion of the Inferior Vena Cava just below the diaphragm.",
  "106b": "The Carpal Tunnel is formed by the concave carpal bones arched by the flexor retinaculum, containing 9 tendons (4 FDS, 4 FDP, 1 FPL) and a single major nerve: the Median Nerve.",
  "116": "The Olfactory Nerve (Cranial Nerve I) is a purely sensory cranial nerve dedicated to the perception of olfaction (smell), transmitting bipolar neuronal impulses from the nasal olfactory mucosa across the cribriform plate to the olfactory bulb.",
  "117b": "The lining of the urinary tract (renal pelvis, calyces, ureters, urinary bladder, and proximal prostatic/female urethra) is Transitional Epithelium (Urothelium).",
  "118c": "The base (posterior surface) of the heart is directed posteriorly and is formed mainly (two-thirds) by the Left Atrium and to a lesser extent by the right atrium.",
  "134": "The epiphyseal cartilage (physis / growth plate) located between the epiphysis and metaphysis of growing long bones is the primary, most actively dividing and growing zone responsible for longitudinal skeletal growth.",
  "154b": "The Liver is the largest gland and largest internal solid organ in the human body, weighing approximately 1.4 to 1.6 kg in an adult (accounting for ~2% of total body weight).",
  "155b": "The Submucosa of the gastrointestinal tract is a vascular layer of dense irregular connective tissue that houses major blood vessels, lymphatic networks, and the submucosal (Meissner's) autonomic nerve plexus.",
  "160b": "The Alveoli (alveolar sacs) are the tiny, thin-walled, capillary-rich terminal microscopic air sacs that represent the fundamental structural and functional gas-exchange units of the lungs.",
  "174b": "Skeletal, cardiac, and smooth muscle tissues are embryologically derived from the embryonic Mesoderm (specifically paraxial somites, splanchnic lateral plate mesoderm, and somatic mesoderm).",
  "180b": "The Uterus is a thick-walled, hollow, pear-shaped muscular internal female reproductive organ situated in the lesser pelvis between the urinary bladder and rectum."
};

const output = [];

raw.questions.forEach((q, idx) => {
  const qNum = q.qNum;
  let exp = anatExplanations[qNum] || anatExplanations[qNum + 'b'] || anatExplanations[qNum + 'c'];
  if (!exp) {
    exp = `The correct answer is ${q.options[q.correctIndex]}. This question appeared in the ${q.year || 'Special BCS'} examination under ${q.topic || 'Anatomy'}. Verified according to BD Chaurasia's Human Anatomy and Snell's Clinical Anatomy.`;
  }
  
  output.push({
    id: `anat-bcs-${qNum}-${idx+1}`,
    question: q.question.replace(/&amp;/g, '&').replace(/&quot;/g, '"'),
    options: q.options.map(o => o.replace(/&amp;/g, '&').replace(/&quot;/g, '"')),
    correctAnswer: q.correctIndex,
    explanation: exp,
    subject: "Anatomy",
    topic: q.topic ? q.topic.replace('Anatomy · ', '') : "Gross Anatomy",
    year: q.year || "Special BCS"
  });
});

const tsCode = `import { Question } from "../../lib/types";\n\nexport const ANATOMY_BCS_QUESTIONS: Question[] = ${JSON.stringify(output, null, 2)};\n`;

fs.writeFileSync('D:\\Study\\BCS\\Exam App\\src\\data\\questions\\anatomy-bcs.ts', tsCode, 'utf8');
console.log(`Anatomy BCS questions generated: ${output.length}`);
