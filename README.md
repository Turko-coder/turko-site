# Turvakoolitus Website

Modern website for Turvakoolituse Keskus (Security Training Center) built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Modern UI/UX**: Clean, responsive design with Tailwind CSS
- **Navigation**: Dropdown menus for Meiest, Kursused, and Treeningud sections
- **Complete Page Structure**: All pages as specified in the requirements
- **Contact Forms**: Inquiry form for course registration
- **Course Calendar**: Calendar view of available courses
- **Responsive Design**: Works on all device sizes

## Project Structure

```
/
├── app/
│   ├── page.tsx                    # Homepage
│   ├── layout.tsx                  # Root layout with navigation and footer
│   ├── globals.css                 # Global styles
│   ├── meiest/                     # About section
│   │   ├── ajalugu/               # History
│   │   ├── tegevuse-alus/         # Legal basis
│   │   ├── noustamine/            # Consulting
│   │   ├── partnerid/             # Partners
│   │   ├── koolitus/              # General training info
│   │   ├── kontaktid/             # Contacts
│   │   └── paring/                # Inquiry form
│   ├── kursused/                   # Courses section
│   │   ├── koolituskalender/      # Course calendar
│   │   ├── valvetootaja-tase-3/   # Level 3 course
│   │   ├── turvatootaja-tase-4/   # Level 4 course
│   │   ├── turvajuht-tase-5/      # Level 5 course
│   │   ├── taiendope/             # Advanced training
│   │   ├── oppekavad/             # Curricula
│   │   └── oppetoo/               # Educational content
│   └── treeningud/                 # Trainings section
├── components/
│   ├── Navigation.tsx             # Main navigation component
│   └── Footer.tsx                 # Footer component
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Contact Information

- **Address**: Peterburi tee 47, Tallinn 11415
- **Phone**: +372 5 290 528
- **Email**: info@turvakoolitus.eu

## Technologies Used

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **React**: UI library

## License

Copyright © 2024 Turvakoolituse Keskus. All rights reserved.
