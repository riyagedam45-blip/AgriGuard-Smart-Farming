const fs = require('fs');
const path = require('path');

// Load treatments data
const treatmentsPath = path.join(__dirname, '..', 'data', 'treatments.json');
const treatments = JSON.parse(fs.readFileSync(treatmentsPath, 'utf-8'));

/**
 * Find treatment recommendation for a detected disease.
 * Uses fuzzy matching to handle variations in disease names.
 */
function getTreatment(diseaseName) {
  // Direct match
  let treatment = treatments.find(
    t => t.disease.toLowerCase() === diseaseName.toLowerCase()
  );

  // Fuzzy match — check if disease name contains the treatment disease name
  if (!treatment) {
    treatment = treatments.find(
      t => diseaseName.toLowerCase().includes(t.disease.toLowerCase().split(' ').slice(-2).join(' '))
    );
  }

  // Partial keyword match
  if (!treatment) {
    const keywords = diseaseName.toLowerCase().split(/[\s_]+/);
    treatment = treatments.find(t => {
      const tKeywords = t.disease.toLowerCase().split(/[\s_]+/);
      return keywords.some(k => tKeywords.includes(k) && k !== 'healthy');
    });
  }

  // Default to healthy treatment if no match
  if (!treatment) {
    treatment = treatments.find(t => t.disease === 'Healthy') || {
      disease: diseaseName,
      crop: 'Unknown',
      severity: 'medium',
      description: 'Treatment information is being updated for this disease.',
      steps: ['Consult a local agricultural extension office', 'Take additional photos for further analysis'],
      prevention: ['Regular crop monitoring', 'Maintain proper field hygiene'],
      organicAlternatives: ['Consult organic farming resources']
    };
  }

  return {
    description: treatment.description,
    steps: treatment.steps,
    prevention: treatment.prevention,
    organicAlternatives: treatment.organicAlternatives,
    severity: treatment.severity
  };
}

/**
 * Get all available treatments
 */
function getAllTreatments() {
  return treatments.map(t => ({
    disease: t.disease,
    crop: t.crop,
    severity: t.severity,
    description: t.description
  }));
}

module.exports = { getTreatment, getAllTreatments };
