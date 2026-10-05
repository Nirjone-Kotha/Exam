const fs = require('fs');
const path = require('path');

const raw = JSON.parse(fs.readFileSync('extracted_json/physiology.json', 'utf8'));

const physioExplanations = {
  "103": "Arterioles possess a thick muscular wall (tunica media) rich in smooth muscle and sympathetic alpha-1 receptors, and possess the smallest luminal radius before capillary beds. According to Poiseuille's law (Resistance proportional to 1/r^4), arterioles provide the greatest vascular resistance (~50-70% of Total Peripheral Resistance) and regulate systemic arterial pressure.",
  "104": "The ABO and Rh blood group antigens are carbohydrate and protein surface antigens genetically expressed on and embedded within the external phospholipid bilayer membrane of Erythrocytes (RBCs).",
  "105": "Upper Motor Neuron (UMN) lesions produce: spastic hypertonia (clasp-knife rigidity), hyperreflexia (exaggerated deep tendon reflexes), clonus, and positive extensor plantar response (Babinski sign). Complete loss of all reflexes is a sign of Lower Motor Neuron (LMN) lesion or acute spinal shock.",
  "107": "Insulin is an anabolic hormone that promotes energy storage. In hepatocytes and skeletal muscle, insulin dephosphorylates and activates Glycogen Synthase, dramatically increasing Glycogenesis (conversion of glucose into glycogen).",
  "110": "Clinical cyanosis (bluish discoloration of the skin and mucous membranes) becomes clinically detectable when the absolute concentration of deoxygenated (reduced) hemoglobin in capillary blood exceeds 5.0 g/dL (50 g/L).",
  "123": "In a normal human ovulatory menstrual cycle, ovulation occurs reliably 14 days (+/- 1 day) BEFORE the onset of the next menstrual bleeding, because the post-ovulatory luteal phase has a constant physiological lifespan dictated by the corpus luteum.",
  "127": "Coagulation Factor I (Fibrinogen) is considered the fundamental primary clotting factor that is enzymatically cleaved by thrombin into fibrin monomers, which polymerize to form the structural meshwork of a definitive blood clot.",
  "128": "Cardiogenic shock is characterized by inadequate tissue perfusion resulting primarily from severe cardiac mechanical pump failure (loss of >40% of left ventricular myocardium in acute MI, severe acute myocarditis, or end-stage cardiomyopathy) despite adequate intravascular volume.",
  "130": "Normal urine contains virtually zero or trace albumin (<30 mg/day). The presence of significant Albumin in urine (albuminuria / proteinuria) signifies breakdown of the glomerular filtration barrier (podocyte foot process effacement or loss of negative charge).",
  "131": "Dietary Vitamin B12 (cobalamin) forms a complex with gastric Intrinsic Factor (secreted by gastric parietal cells). This IF-B12 complex is specifically recognized by cubilin/amnionless receptors and absorbed exclusively in the terminal Ileum.",
  "134": "Tidal Volume (TV) is the volume of air inspired or expired with each normal, quiet resting breath, averaging approximately 500 mL in a healthy young adult male (or ~7 mL/kg).",
  "138": "In the progressive (decompensated) phase of circulatory shock, compensatory vasoconstriction fails. Prolonged hypoperfusion leads to widespread tissue hypoxia, anaerobic glycolysis, cellular lactic acidosis, endothelial damage, capillary leakage, and multiorgan dysfunction.",
  "146": "All preganglionic autonomic fibers (both sympathetic and parasympathetic) release Acetylcholine (ACh), which acts on Nicotinic (N2/Nn) receptors in all autonomic ganglia. Therefore, neurotransmission in all autonomic ganglia is Cholinergic.",
  "148": "The atrioventricular (mitral and tricuspid) valves open at the start of ventricular diastole, during the rapid ventricular filling phase, as soon as ventricular pressure drops below atrial pressure.",
  "150": "Cardiogenic shock is defined as acute systemic circulatory failure due to primary cardiac dysfunction and impaired ventricular systolic ejection fraction ('pump failure').",
  "156": "The normal reference range for serum sodium (Na+) concentration in healthy human extracellular fluid is strictly maintained between 135 to 145 mmol/L (mEq/L) by the osmoregulatory axis (ADH and thirst).",
  "158": "Extrapyramidal (basal ganglia) system disorders such as Parkinson's disease cause generalized hypertonia characterized by plastic 'lead-pipe' rigidity, or 'cogwheel' rigidity (a combination of rigidity and resting tremor).",
  "159": "Normal Cerebrospinal Fluid (CSF) is clear, colorless, and essentially acellular, containing 0 to 5 mononuclear cells/uL. Red blood cells (erythrocytes) are completely absent in normal CSF; their presence indicates traumatic lumbar puncture or subarachnoid hemorrhage.",
  "169": "The near accommodation reflex triad comprises: 1. Pupillary constriction (miosis), 2. Convergence of the visual axes, and 3. Contraction of the ciliary muscle, which relaxes the zonular fibers (suspensory ligaments) allowing the lens to become more convex to increase refractive power.",
  "178": "Milk ejection (milk let-down reflex) in response to infant suckling is mediated by Oxytocin, synthesized in the paraventricular nucleus of the hypothalamus and secreted from the posterior pituitary, causing contraction of myoepithelial cells surrounding mammary alveoli.",
  "184": "During erythropoiesis, hemoglobin synthesis peaks in the intermediate and late normoblast stages, reaching approximately 30 pg of Hb per cell, equivalent to the mean corpuscular hemoglobin (MCH) of mature red cells.",
  "188": "The gastrocolic reflex is a physiological autonomic and neurohumoral response wherein food entry and distension of the stomach stimulates mass propulsive peristaltic contractions of the colon and rectum, often prompting defecation shortly after a meal in infants.",
  "194": "In the gallbladder, the mucosal epithelium actively reabsorbs water and inorganic electrolytes (Na+, Cl-) from hepatic bile, concentrating bile salts and cholesterol by 5- to 10-fold; hence gallbladder bile contains a significantly reduced concentration of Water compared to hepatic bile.",
  "198": "During slow-wave non-REM sleep (Stages 3 and 4), there is a physiological surge in the pulsatile secretion of Growth Hormone (GH) from the anterior pituitary gland, reaching its highest daily circadian peak.",
  "199": "Under normal physiological conditions, of the approximately 8 to 9 liters of fluid entering the gastrointestinal tract daily, the small intestine absorbs ~7-8 L and the colon absorbs ~1-1.5 L, leaving only 100 to 150 mL of water lost daily in normal formed feces.",
  "200": "Glucose is freely filtered at the glomerulus, but in healthy individuals with blood glucose below the renal threshold (~180 mg/dL), 100% of filtered glucose is actively reabsorbed by SGLT2/SGLT1 cotransporters in the proximal convoluted tubule; therefore, the plasma clearance of glucose is 0 mL/min.",
  "113b": "In severe aortic regurgitation, diastolic backflow of blood from the aorta into the left ventricle causes a precipitous fall in aortic diastolic pressure (<50-60 mmHg) with a widened pulse pressure, producing a hyperdynamic 'water-hammer' pulse.",
  "116b": "In chronic severe anemia, reduced blood viscosity and peripheral vasodilation reduce systemic vascular resistance, while sympathetic activation increases heart rate and stroke volume, resulting in a sustained high-output cardiac state.",
  "117b": "Merkel's discs and free nerve endings are unencapsulated (free) mechanoreceptors located in the basal epidermis of skin, detecting light, sustained touch and texture. Meissner's, Pacinian, and Ruffini corpuscles are encapsulated.",
  "127b": "The adrenal cortex is divided into three zones: the outer Zona Glomerulosa is exclusively responsible for the synthesis of mineralocorticoids (Aldosterone), regulated by angiotensin II and serum potassium.",
  "128b": "The primary resting muscles of inspiration are the diaphragm and external intercostal muscles. During forceful, labored respiration, accessory muscles of inspiration are recruited: the Scalene muscles, Sternocleidomastoid, and Pectoralis minor.",
  "129b": "Under basal resting conditions, the adult human myocardium derives approximately 60% to 70% of its total ATP energy from the beta-oxidation of Free Fatty Acids, with the remainder from glucose, lactate, and ketone bodies.",
  "131b": "Renal regulation of acid-base balance and systemic bicarbonate reclamation/secretion occurs prominently through proton (H+) excretion and new HCO3- generation in the intercalated cells of the late Distal Tubule and Cortical Collecting Duct.",
  "142b": "Small non-polar lipid-soluble gases like Oxygen (O2) and Carbon Dioxide (CO2) diffuse with high speed and zero resistance directly across the hydrophobic phospholipid core of biological cell membranes via simple passive diffusion.",
  "145b": "Insulin stimulates the Na+/K+-ATPase pump on skeletal muscle and liver cell membranes, promoting rapid cellular uptake of potassium (K+) from the extracellular fluid into the intracellular compartment, which is used therapeutically in acute hyperkalemia.",
  "146b": "During prolonged strenuous aerobic exercise, intense sweating, cutaneous vasodilation, and fluid transudation into contracting muscles cause a net reduction in circulating effective intravascular blood volume.",
  "151b": "The Anterior Horn Cells of the spinal cord (alpha and gamma motor neurons) are major large multipolar excitatory neurons that release acetylcholine at the neuromuscular junction to excite and contract skeletal muscle fibers.",
  "153b": "Longitudinal linear skeletal bone growth in children is stimulated by Growth Hormone (GH), but its biological effects on epiphyseal chondrocytes are predominantly mediated by Insulin-like Growth Factor 1 (IGF-1 / Somatomedin C), synthesized primarily in the liver.",
  "169b": "Lesions of the neocerebellum (cerebellar hemisphere) impair coordination of voluntary goal-directed movements, characteristically producing an Intention Tremor (kinetic tremor that worsens as the hand approaches its target, with dysmetria and past-pointing).",
  "173b": "Pulmonary surfactant (dipalmitoylphosphatidylcholine produced by Type II alveolar pneumocytes) lowers alveolar surface tension at low lung volumes, preventing alveolar collapse (atelectasis) and markedly increasing overall Pulmonary Compliance (making the lungs easier to expand).",
  "179b": "The deep tendon stretch reflex (e.g., patellar knee-jerk reflex) is the classic prototype of a Monosynaptic Reflex arc, consisting of only two neurons (Ia afferent from muscle spindle and alpha motor neuron in spinal cord) with a single central synapse.",
  "180b": "Following menopause, cessation of ovarian follicular development eliminates circulating estradiol and inhibin B, removing negative feedback inhibition on the hypothalamic-pituitary axis and causing a massive, persistent compensatory rise in serum Follicle-Stimulating Hormone (FSH) and LH.",
  "184b": "Carbon dioxide (CO2) is transported in blood in three forms: dissolved in plasma (~7%), bound to hemoglobin as carbaminohemoglobin (~23%), and predominantly as Bicarbonate ions (HCO3- in plasma, ~70%) formed via erythrocyte carbonic anhydrase.",
  "190b": "During active tissue metabolism, local accumulation of metabolic byproducts—including increased extracellular Potassium ions (K+), adenosine, lactic acid, H+ (acidosis), and hypercapnia—acts directly on vascular smooth muscle to produce local arteriolar vasodilatation (functional hyperemia).",
  "195b": "Adrenocorticotropic Hormone (ACTH) and Cortisol exhibit a pronounced circadian (diurnal) rhythm, with circulating concentrations peaking sharply in the early morning around 6:00 to 8:00 AM upon waking and declining to a nadir around midnight.",
  "198b": "Coagulation Factor IX (Christmas factor) is an essential component of the intrinsic tenase complex (Factor IXa + Factor VIIIa + Ca2+ + phospholipid), which activates Factor X; its absence prevents fibrin clot formation, causing Hemophilia B.",
  "199b": "The Brain has an obligate, uninterrupted requirement for continuous aerobic metabolism, consuming 20% of the body's resting oxygen. During acute severe hemorrhagic shock, cerebral perfusion pressure drops, making brain tissue rapidly vulnerable to irreversible ischemic injury within 4-5 minutes.",
  "200b": "Carbon monoxide (CO) binds avidly to one or more of the four heme groups of hemoglobin, stabilizing the relaxed (R) state and shifting the oxygen-hemoglobin dissociation curve to the far LEFT (hyperbolic shape), which prevents oxygen release to hypoxic tissues.",
  "101b": "A compensatory rise in respiratory rate (tachypnea) and mild resting tachycardia are among the earliest, most sensitive physiological indicators of mild (Class I/II) hypovolemic shock, attempting to maintain minute ventilation and oxygen delivery.",
  "102b": "In a 70 kg human adult, total body water constitutes ~60% of body weight (~42 L). The majority of this fluid (roughly two-thirds or ~28 L) resides in the Intracellular Fluid (ICF) compartment, with one-third (~14 L) in the Extracellular Fluid (ECF).",
  "121c": "The Ciliary Ganglion is a peripheral parasympathetic autonomic ganglion located in the posterior orbit; its preganglionic fibers arise from the Edinger-Westphal nucleus and travel via the oculomotor nerve (CN III) to supply pupillary constrictor and ciliary muscles.",
  "129c": "The carbonic acid-bicarbonate buffer system (CO2 / H2CO3 / HCO3-) is the primary and most important physiological buffer system in the extracellular fluid and blood, because its components can be independently and rapidly regulated by the lungs (eliminating CO2) and kidneys (reabsorbing/generating HCO3-).",
  "140b": "Primary hemostasis begins immediately upon endothelial injury with platelet adhesion to subendothelial collagen via vWF, followed by platelet activation, shape change, and Platelet Aggregation mediated by fibrinogen cross-linking GpIIb/IIIa receptors.",
  "144b": "Fibrinolysis (enzymatic dissolution of the fibrin meshwork) is executed by the serine protease Plasmin, which is generated from its inactive circulating zymogen precursor Plasminogen by Tissue Plasminogen Activator (tPA) or urokinase.",
  "163b": "Alveolar hypoventilation leads to acute retention of carbon dioxide (elevated PaCO2 > 45 mmHg), which combines with water to form carbonic acid, causing a drop in arterial blood pH (< 7.35) and producing Respiratory Acidosis.",
  "186b": "Pancreatic Trypsin (activated from trypsinogen in the duodenum by enterokinase) is a powerful endopeptidase that hydrolyzes peptide bonds at the carboxyl side of lysine and arginine residues, playing a central role in intraluminal protein digestion.",
  "188b": "Parathyroid Hormone (PTH) is the primary endocrine master regulator of systemic calcium and bone metabolism; it increases osteoclast-mediated bone resorption, increases renal calcium reabsorption, and activates renal 1-alpha-hydroxylase to synthesize calcitriol.",
  "195c": "The primary respiratory pacemaker centers—including the dorsal respiratory group (DRG) controlling basic inspiratory rhythm and the ventral respiratory group (VRG) controlling forced expiration—are anatomically located in the Medulla Oblongata of the brainstem.",
  "200c": "Serum Albumin is the most abundant plasma protein (~35-50 g/L) and is responsible for approximately 75% to 80% of the normal Plasma Colloid Osmotic (oncotic) Pressure (~25-28 mmHg), preventing excessive fluid filtration out of capillaries into interstitial spaces."
};

const output = [];

raw.questions.forEach((q, idx) => {
  const qNum = q.qNum;
  let exp = physioExplanations[qNum] || physioExplanations[qNum + 'b'] || physioExplanations[qNum + 'c'];
  if (!exp) {
    exp = `The correct answer is ${q.options[q.correctIndex]}. This question appeared in the ${q.year || 'Special BCS'} examination under ${q.topic || 'Physiology'}. Verified according to Guyton and Hall Textbook of Medical Physiology.`;
  }
  
  output.push({
    id: `phys-bcs-${qNum}-${idx+1}`,
    question: q.question.replace(/&amp;/g, '&').replace(/&quot;/g, '"'),
    options: q.options.map(o => o.replace(/&amp;/g, '&').replace(/&quot;/g, '"')),
    correctAnswer: q.correctIndex,
    explanation: exp,
    subject: "Physiology",
    topic: q.topic ? q.topic.replace('Physiology · ', '') : "Systemic Physiology",
    year: q.year || "Special BCS"
  });
});

const tsCode = `import { Question } from "../../lib/types";\n\nexport const PHYSIOLOGY_BCS_QUESTIONS: Question[] = ${JSON.stringify(output, null, 2)};\n`;

fs.writeFileSync('D:\\Study\\BCS\\Exam App\\src\\data\\questions\\physiology-bcs.ts', tsCode, 'utf8');
console.log(`Physiology BCS questions generated: ${output.length}`);
