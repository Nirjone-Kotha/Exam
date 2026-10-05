const fs = require('fs');
const path = require('path');

// Helper to decode HTML entities
function cleanText(str) {
  if (!str) return '';
  return str
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

console.log("Ready to build Medicine, Anatomy, and Physiology modules.");
