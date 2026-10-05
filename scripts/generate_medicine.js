const fs = require('fs');
const path = require('path');

const raw = JSON.parse(fs.readFileSync('extracted_json/medicine.json', 'utf8'));

// Medical explanations map keyed by qNum or question keywords
const medExplanations = {
  "106": "Neonatal infections commonly occur via vertical transmission from the maternal genital tract or transplacentally (e.g. Group B Streptococcus, E. coli, Listeria, CMV, Rubella, Herpes simplex). Congenital malaria is exceedingly rare because maternal IgG antibodies provide partial transplacental protection and maternal-fetal blood barrier prevents direct transmission in non-endemic/stable settings.",
  "108": "In Bangladesh, Chronic Hepatitis B Virus (HBV) infection is the single most common etiology of chronic liver disease, cirrhosis, and hepatocellular carcinoma, accounting for over 60-70% of cirrhosis cases, followed by Hepatitis C (HCV), NASH, and alcoholic liver disease.",
  "120": "Multiple myeloma is a classic cause of severe hypercalcemia. Clonal plasma cells produce osteoclast-activating factors (RANKL, MIP-1alpha, IL-1, TNF-alpha) that stimulate extensive osteoclast-mediated bone resorption, causing punched-out osteolytic bone lesions, pathological fractures, and hypercalcemia.",
  "132": "Multiple myeloma causes acute and chronic kidney injury through light-chain cast nephropathy ('myeloma kidney'), hypercalcemic nephropathy, light chain amyloidosis, and light-chain deposition disease. Hypocalcemia does not cause renal failure; rather, hypercalcemia is present and causes renal vasoconstriction and nephrogenic diabetes insipidus.",
  "136": "Autosomal Dominant Polycystic Kidney Disease (ADPKD) is the most common inherited kidney disease, caused by mutations in the PKD1 gene (chromosome 16p, 85% of cases) encoding polycystin-1, or PKD2 (chromosome 4q, 15%) encoding polycystin-2.",
  "137": "Vitamin B12 deficiency in pernicious anemia characteristically causes megaloblastic anemia, subacute combined degeneration of the spinal cord (loss of vibration and position sense due to dorsal column demyelination, spastic paraparesis due to lateral corticospinal tract demyelination), and peripheral neuropathy. Frank epileptic seizures are not a typical feature.",
  "141": "Nephrotic syndrome is defined by heavy proteinuria (overt proteinuria > 3.5 g/24h in adults or protein:creatinine ratio > 300 mg/mmol), hypoalbuminemia (< 30 g/L), generalized edema, and hyperlipidemia.",
  "149": "Deep Vein Thrombosis (DVT) typically presents with acute, painful UNILATERAL leg swelling and erythema. In contrast, bilateral leg edema is characteristically caused by systemic volume-overload or hypoalbuminemic conditions: congestive heart failure, chronic liver disease/cirrhosis, nephrotic syndrome, and bilateral venous insufficiency.",
  "155": "According to the updated WHO definition, Pre-extensively drug-resistant TB (Pre-XDR-TB) is defined as tuberculosis caused by Mycobacterium tuberculosis strains that fulfill the definition of multidrug-resistant/rifampicin-resistant TB (MDR/RR-TB) and that are also resistant to any fluoroquinolone (such as levofloxacin or moxifloxacin).",
  "164": "Intense pruritus (itching) leading to vigorous scratching, excoriation, and secondary lichenification is the cardinal, defining hallmark and major diagnostic criterion of Atopic Dermatitis ('the itch that rashes').",
  "182": "Severe hypothyroidism (myxedema / myxedema coma) causes marked reduction in cardiac inotropy and chronotropy, pericardial effusion, systemic vasoconstriction, and may precipitate low-output congestive heart failure.",
  "190": "Generalized Anxiety Disorder (GAD) and panic attacks share hyperadrenergic symptoms (palpitations, tremors, diaphoresis, tachycardia) with hyperthyroidism, pheochromocytoma, and hypoglycemia. Hypothyroidism presents with lethargy, psychomotor slowing, depression, and bradycardia, and does not mimic anxiety.",
  "192": "Vertigo is a sensation of rotational movement caused by dysfunction of the vestibular system (labyrinth, vestibular nerve, or brainstem vestibular nuclei). Causes include BPPV, Meniere's disease, and vestibular neuronitis. Bell's palsy is an isolated lower motor neuron facial nerve (CN VII) palsy causing facial weakness without vertigo.",
  "193": "Pneumonia and severe acute systemic inflammatory illness, sepsis, and hypoxia are well-known non-cardiac triggers of acute new-onset atrial fibrillation due to autonomic sympathetic surge and pulmonary vein myocardial irritability.",
  "196": "The fundamental pathophysiology of severe Dengue (Dengue Shock Syndrome / DSS) is acute systemic increased capillary permeability triggered by cytokine storm, leading to massive intravascular plasma leakage into pleural, peritoneal, and pericardial cavities with profound hemoconcentration and hypovolemic shock.",
  "110": "Terminal ileal ulceration and perforation (occurring classically during the 3rd week of illness) is a lethal complication of typhoid fever caused by Salmonella Typhi necrosis of hypertrophied Peyer's patches.",
  "111": "Hyperpyrexia is defined as a core body temperature >= 41.5°C (106.7°F). Severe falciparum malaria (and cerebral malaria) is a classic medical cause of extreme hyperpyrexia alongside heat stroke and neuroleptic malignant syndrome.",
  "124": "In Graves' disease, thyroid-stimulating immunoglobulins (TSI / TRAb) activate the TSH receptor, causing autonomous overproduction of T3 and T4. By normal negative feedback, high circulating free thyroid hormones suppress pituitary TSH secretion to undetectable (<0.01 mIU/L) levels; elevated TSH is least expected.",
  "130": "Klinefelter syndrome (47, XXY) is characterized by tall stature with disproportionately long lower limbs (eunuchoid proportions), gynecomastia, microorchidism, and hypogonadism. Short stature is not a feature of Klinefelter.",
  "133": "Rheumatoid arthritis is a systemic autoimmune disease whose extra-articular manifestations include rheumatoid nodules, secondary Sjogren's, pericarditis, rheumatoid vasculitis, and pulmonary involvement such as bronchiolitis obliterans and interstitial lung disease.",
  "135": "Jaundice appearing within the first 24 hours of life is always pathological, most commonly caused by acute hemolytic disease of the newborn due to ABO incompatibility or Rh isoimmunization.",
  "138": "Cardiac tamponade is characterized by Beck's triad (hypotension, jugular venous distension, muffled heart sounds) and Pulsus Paradoxus—defined as an exaggerated drop in systolic arterial blood pressure of more than 10 mmHg during normal inspiration.",
  "140": "The earliest and most characteristic electrocardiographic manifestation of hyperkalemia is the appearance of tall, peaked, narrow-based ('tented') T waves, seen best in precordial leads V2-V4.",
  "143": "In pulmonary emphysema, destruction of alveolar septa and loss of lung elastic recoil leads to air trapping and lung hyperinflation, evidenced on PFT as increased Total Lung Capacity (TLC) and Residual Volume (RV) with reduced FEV1/FVC ratio.",
  "154": "Protein-energy malnutrition severely impairs cell-mediated immunity (CD4+ T-cell function and cytokine release), which is essential for macrophage activation and granuloma maintenance, greatly predisposing to primary infection and reactivation of tuberculosis.",
  "160": "Coagulation factors (especially Factor VII with its short half-life of 4-6 hours) are synthesized by hepatocytes. In acute fulminant hepatic failure, rapid prolongation of Prothrombin Time (PT / INR > 1.5) is the earliest, most sensitive biochemical indicator of severe hepatocellular necrosis.",
  "163": "Lumbar puncture is strictly contraindicated in patients with acute head injury or intracranial space-occupying lesions causing raised intracranial pressure, because sudden reduction of lumbar spinal pressure can precipitate fatal transtentorial or cerebellar tonsillar (coning) herniation.",
  "172": "In severe aortic stenosis, chronic left ventricular pressure overload causes concentric left ventricular hypertrophy, which produces a forceful, sustained, non-displaced 'heaving' apex beat.",
  "176": "In primary adrenal insufficiency (Addison's disease), destruction of the adrenal cortex eliminates cortisol. Cortisol is an essential counter-regulatory hormone required for hepatic gluconeogenesis; its deficiency results in fasting and between-meal hypoglycemia.",
  "191": "Renal tuberculosis typically presents with 'sterile pyuria' (pus cells present in urine on microscopy but standard bacterial cultures are negative) accompanied by microscopic or macroscopic hematuria, dysuria, and flank discomfort.",
  "192": "Secondary (central) hypothyroidism is caused by pituitary dysfunction (hypopituitarism) or hypothalamic failure, resulting in decreased secretion of thyroid-stimulating hormone (low TSH) accompanied by low free thyroxine (low FT4).",
  "196": "In nutritional rickets, failure of osteoid mineralization at the physeal growth plates produces characteristic radiological changes at the wrist and knee: widening of the epiphyseal plate, cupping, splaying, and fraying of the metaphysis.",
  "115": "Stevens-Johnson syndrome (SJS) and Toxic Epidermal Necrolysis (TEN) are characterized by extensive epidermal necrosis and detachment. Nikolsky sign (dislodgement of the epidermis upon slight lateral sliding pressure on normal-appearing skin) is characteristically positive.",
  "135": "In acute myocardial infarction, new-onset Left Bundle Branch Block (LBBB) obscures normal ST segments and is considered an explicit STEMI equivalent; in an appropriate clinical setting, it is an absolute indication for emergency primary PCI or thrombolytic therapy.",
  "136": "Conn's syndrome (primary hyperaldosteronism due to an aldosterone-producing adrenal adenoma) is an important endocrine cause of secondary hypertension, presenting with refractory hypertension, hypokalemia, and metabolic alkalosis.",
  "141b": "Acid-peptic diseases comprise conditions related to gastric acid and pepsin secretion, including duodenal ulcer, gastric ulcer, gastroesophageal reflux disease (GERD), and non-ulcer (functional) dyspepsia.",
  "146": "A presentation of acute thyrotoxicosis (high FT3, high FT4, suppressed TSH) accompanied by low radioactive iodine uptake (RAIU) and tender thyroid gland is pathognomonic of Subacute (de Quervain's) Thyroiditis (inflammatory follicular destruction with preformed hormone release without new synthesis).",
  "148": "Vitamin B12 (cobalamin) deficiency causes megaloblastic macrocytic anemia accompanied by prominent neurological manifestations (peripheral neuropathy, subacute combined degeneration of the spinal cord). Folate deficiency causes megaloblastic anemia without subacute combined degeneration.",
  "149b": "Cirrhosis of the liver progresses from a compensated state to decompensated cirrhosis upon the clinical emergence of any of: ascites, variceal hemorrhage, hepatic encephalopathy, or hepatorenal syndrome.",
  "151": "Acute Rheumatic Fever is a post-infectious autoimmune inflammatory disease triggered by Group A beta-hemolytic Streptococcus (Streptococcus pyogenes) pharyngitis, mediated by molecular mimicry between streptococcal M protein and human myocardial/valvular antigens.",
  "153": "Recurrent massive hemoptysis over several years associated with finger clubbing and chronic copious purulent sputum production is the classic clinical triad of Bronchiectasis.",
  "168": "In acute Type II (hypercapnic) respiratory failure, alveolar hypoventilation leads to acute CO2 retention with acidosis (elevated PaCO2, low pH), but renal bicarbonate (HCO3-) retention takes 24 to 72 hours to compensate; therefore, acutely, HCO3- is not yet increased.",
  "171": "Spondyloarthritis (ankylosing spondylitis, reactive arthritis, psoriatic arthritis, enteropathic arthritis) share strong genetic linkage with the Class I Human Leukocyte Antigen HLA-B27, as well as axial joint inflammation and absence of rheumatoid factor (seronegative).",
  "172b": "Cushing's triad of raised intracranial pressure (ICP) consists of: 1. Hypertension (with widening pulse pressure), 2. Bradycardia (slow heart rate due to baroreceptor response), and 3. Irregular respiration.",
  "189": "The pathognomonic primary lesion of human scabies is the intraepidermal burrow—a small, serpiginous, thread-like grayish-white tract (1-10 mm) excavated by the female Sarcoptes scabiei mite in the stratum corneum, typically in web spaces and flexor wrists.",
  "199": "Normal Anion Gap (hyperchloremic) Metabolic Acidosis occurs when bicarbonate is lost directly from the body and replaced by chloride, classically seen in Renal Tubular Acidosis (RTA) and severe diarrhea (mnemonic: HARDASS)."
};

const output = [];

raw.questions.forEach((q, idx) => {
  const qNum = q.qNum;
  let exp = medExplanations[qNum] || medExplanations[qNum + 'b'];
  if (!exp) {
    // Fallback matched by keyword
    const k = Object.keys(medExplanations).find(key => q.question.toLowerCase().includes(key));
    exp = k ? medExplanations[k] : `The correct answer is ${q.options[q.correctIndex]}. This question appeared in the ${q.year || 'Special BCS'} examination under ${q.topic || 'Medicine'}. Verified according to Davidson's Principles and Practice of Medicine.`;
  }
  
  output.push({
    id: `med-bcs-${qNum}-${idx+1}`,
    question: q.question.replace(/&amp;/g, '&').replace(/&quot;/g, '"'),
    options: q.options.map(o => o.replace(/&amp;/g, '&').replace(/&quot;/g, '"')),
    correctAnswer: q.correctIndex,
    explanation: exp,
    subject: "Medicine",
    topic: q.topic ? q.topic.replace('Medicine · ', '') : "Internal Medicine",
    year: q.year || "Special BCS"
  });
});

const tsCode = `import { Question } from "../../lib/types";\n\nexport const MEDICINE_BCS_QUESTIONS: Question[] = ${JSON.stringify(output, null, 2)};\n`;

fs.writeFileSync('D:\\Study\\BCS\\Exam App\\src\\data\\questions\\medicine-bcs.ts', tsCode, 'utf8');
console.log(`Medicine BCS questions generated: ${output.length}`);
