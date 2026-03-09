const fs = require('fs');
const path = require('path');

const indexHtmlPath = path.join(__dirname, 'index.html');
const dppDataPath = path.join(__dirname, 'nextjs', 'data', 'dppData.ts');

const htmlContent = fs.readFileSync(indexHtmlPath, 'utf8');

// Find the declaration of allDPPs
const startIndex = htmlContent.indexOf('const allDPPs = {');
if (startIndex === -1) {
    console.error('Could not find allDPPs in index.html');
    process.exit(1);
}

// Find the end of the object declaration.
// It's followed by `// State Management`
const targetEnd = '// State Management';
const endIndex = htmlContent.indexOf(';', htmlContent.indexOf(targetEnd, startIndex) - 50);

const allDPPsCode = htmlContent.substring(startIndex, endIndex + 1);

const tsContent = `export type Question = {
    q: string;
    a?: string[];
    correct?: number;
    expl: string;
    code?: string;
};

export type DPP = {
    title: string;
    type: 'mcq' | 'subjective';
    questions: Question[];
};

export type DPPData = {
    [key: number]: DPP;
};

export ${allDPPsCode}
`;

fs.writeFileSync(dppDataPath, tsContent);
console.log('Successfully extracted DPP data to', dppDataPath);
