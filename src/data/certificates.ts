// Credentials shown on /certifications. Every entry is labelled truthfully:
// a Google course certificate is a course certificate; a MindLuster course is a
// course completion; the ISC2 file is the Course Pre-assessment (not the CC exam);
// the TOEFL file is an institutional prediction test (not an official ETS score).
// PDFs live in /public/sertif. (README › Content rules — no inflated claims.)

export interface Credential {
  title: string;
  issuer: string;
  kind: 'Certificate' | 'Assessment' | 'Course' | 'Language test';
  year: string;
  file: string;
  credentialId?: string;
  verifyUrl?: string;
  note?: string;
  initials: string;
  accent: string;
}

export interface CredentialGroup {
  heading: string;
  blurb: string;
  items: Credential[];
}

export const credentialGroups: CredentialGroup[] = [
  {
    heading: 'Certifications',
    blurb: 'Issued credentials — the Google one is independently verifiable.',
    items: [
      {
        title: 'Google AI Essentials',
        issuer: 'Google · Coursera',
        kind: 'Certificate',
        year: 'Jul 2024',
        file: '/sertif/google-ai-essentials.pdf',
        verifyUrl: 'https://coursera.org/verify/2SR5DJZ8JYPZ',
        note: 'Online non-credit course authorized by Google, offered through Coursera.',
        initials: 'G',
        accent: '#4285f4',
      },
    ],
  },
  {
    heading: 'Assessments & proficiency',
    blurb: 'Completion and proficiency records — labelled for exactly what they are.',
    items: [
      {
        title: 'Certified in Cybersecurity — Course Pre-assessment',
        issuer: 'ISC2',
        kind: 'Assessment',
        year: 'Jul 2024',
        file: '/sertif/isc2-cybersecurity.pdf',
        credentialId: 'Learner ID 3eaa3ec6…c03',
        note: 'ISC2 CC course pre-assessment completion — not the CC certification exam.',
        initials: 'IS',
        accent: '#0aa06e',
      },
      {
        title: 'English Proficiency — TOEFL Prediction (ITP-style)',
        issuer: 'Universal English',
        kind: 'Language test',
        year: 'Dec 2023',
        file: '/sertif/toefl.pdf',
        note: 'Institutional TOEFL prediction test, total score 583 — not an official ETS score.',
        initials: 'UE',
        accent: '#2f8fd6',
      },
    ],
  },
  {
    heading: 'Course completions',
    blurb: 'Self-paced courses completed through MindLuster (2024).',
    items: [
      {
        title: 'Ethical Hacking',
        issuer: 'MindLuster',
        kind: 'Course',
        year: 'Jul 2024',
        file: '/sertif/ethical-hacker.pdf',
        credentialId: 'No. 18713020782',
        note: 'MindLuster course completion — not the EC-Council CEH certification.',
        initials: 'ML',
        accent: '#e8622c',
      },
      {
        title: 'Expert Linux',
        issuer: 'MindLuster',
        kind: 'Course',
        year: 'Jul 2024',
        file: '/sertif/expert-linux.pdf',
        credentialId: 'No. 18713021874',
        initials: 'ML',
        accent: '#e8622c',
      },
      {
        title: 'Python Programming',
        issuer: 'MindLuster',
        kind: 'Course',
        year: 'Jul 2024',
        file: '/sertif/python-programming.pdf',
        credentialId: 'No. 18713029478 · 12h',
        initials: 'ML',
        accent: '#e8622c',
      },
      {
        title: 'Microsoft Excel',
        issuer: 'MindLuster',
        kind: 'Course',
        year: 'Jul 2024',
        file: '/sertif/ms-excel.pdf',
        credentialId: 'No. 18713025640 · 5h',
        initials: 'ML',
        accent: '#e8622c',
      },
    ],
  },
];

export const credentialCount = credentialGroups.reduce((n, g) => n + g.items.length, 0);
