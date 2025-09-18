# AI CV Crafter

A beautiful, real-time CV template generator. Choose from multiple professional themes, edit your details, and download a print-ready CV in seconds. This application is designed for modern job seekers to create stunning resumes with ease.

## ✨ Key Features

-   **Live Preview:** See your CV update in real-time as you type.
-   **Multiple Themes:** Choose from a selection of professionally designed templates (`Modern Professional`, `Classic Elegance`, `Creative Tech`, `Professional Deep Blue`, `Corporate Blue`, `Earthy Tones`, `Rounded Charm`, `Tri-Column Impact`, `Rounded Oblique`, `Diagonal Split`).
-   **Color & Font Customization:** Personalize your chosen theme with custom colors and a selection of professional fonts.
-   **Layout Resizing:** Adjust the base font size, heading scale, and overall spacing to perfectly tailor the layout to your content.
-   **Draggable Sections:** Reorder the main sections (Summary, Experience, etc.) with a simple drag-and-drop interface.
-   **Comprehensive Editing:** Easily add, edit, and delete sections for:
    -   Personal Information & Profile Photo
    -   Work Experience
    -   Education
    -   Skills
-   **Download as PDF:** Generate a high-quality, print-ready A4 PDF of your final CV with a single click.
-   **Automatic Multi-Page PDF:** Content that exceeds one page is automatically split into multiple pages for a clean, professional look.
-   **Responsive Design:** Works seamlessly on both desktop and mobile devices.
-   **Safe Deletion:** A confirmation dialog prevents accidental removal of your important entries.

## 🚀 Tech Stack

-   **Frontend:** [React](https://reactjs.org/) with [TypeScript](https://www.typescriptlang.org/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/) for a utility-first styling approach.
-   **PDF Generation:** [jsPDF](https://github.com/parallax/jsPDF) and [html2canvas](https://html2canvas.hertzen.com/) to convert the live preview into a downloadable PDF.
-   **Unique IDs:** [uuid](https://github.com/uuidjs/uuid) for generating unique keys for dynamic list items.

## Usage

1.  **Fill in your details:** Start by entering your personal information in the form on the left.
2.  **Add your experience:** Fill out the sections for Work Experience, Education, and Skills. Use the `+ Add` buttons to create new entries.
3.  **Reorder sections:** Drag and drop the section headers in the form to change their order on your CV.
4.  **Upload a photo:** Personalize your CV by uploading a professional profile picture.
5.  **Choose a theme:** Select a theme from the options at the top to instantly change the look and feel of your CV.
6.  **Customize:** Fine-tune your chosen theme with the color, font, and sizing selectors.
7.  **Download:** Once you are happy with the preview, click the **Download PDF** button to save a high-quality version to your device.

## File Structure

```
.
├── index.html          # Main HTML entry point
├── index.tsx           # React app bootstrap
├── App.tsx             # Main application component, manages state and layout
├── types.ts            # TypeScript type definitions for data structures
├── constants.ts        # Initial CV data and theme configurations
├── metadata.json       # Application metadata
└── components/
    ├── CVForm.tsx      # The main form for user input
    ├── CVPreview.tsx   # Renders the live CV preview
    ├── ThemeSelector.tsx # Component for choosing and customizing a theme
    └── Icons.tsx       # SVG icon components
```