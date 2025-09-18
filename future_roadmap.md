# Future Roadmap: AI CV Crafter Enhancements

This document outlines potential future enhancements for the AI CV Crafter application, focusing on improving User Experience (UX), User Interface (UI), and leveraging AI capabilities to create a truly intelligent career assistant.

---

## 1. Onboarding & First-Time User Experience

The goal is to make the first interaction intuitive, welcoming, and less intimidating for new users.

*   **Guided Start:** (Status: DONE)
    *   **Behavior:** On first load, present a welcome modal with two choices: "Start with an example" (current behavior) or "Start from scratch."
    *   **Appearance:** A clean, simple modal. If "Start from scratch" is chosen, all form fields will be empty, displaying inspiring placeholder text.

*   **Interactive Mini-Tutorial:** (Status: TODO)
    *   **Behavior:** For new users, a sequence of tooltips can guide them through the primary actions: filling info, choosing a theme, reordering sections, and downloading the CV.
    *   **Appearance:** Use a non-intrusive library like Shepherd.js or Intro.js for guided tour pop-ups that match the application's aesthetic.

---

## 2. AI-Powered Content Assistance (Gemini Integration)

Transform the application from a simple editor into a smart career assistant by integrating the Gemini API.

*   **Content Generation & Enhancement:** (Status: TODO)
    *   **Behavior:** Add a "magic wand" icon next to the "Summary" and "Experience Description" text areas. Clicking it would offer options to:
        1.  **Generate text** from keywords (e.g., "React developer, 5 years experience, agile, e-commerce").
        2.  **Improve existing text** for better impact (using action verbs, professional tone).
        3.  **Proofread** for spelling and grammar.
    *   **Appearance:** A subtle icon that opens a simple menu. The AI-generated text could either replace the current text or be shown alongside for comparison.

*   **Intelligent Skill Suggestions:** (Status: TODO)
    *   **Behavior:** When a user enters a job title (e.g., "Frontend Developer at Google"), the AI analyzes it and suggests relevant skills (e.g., "React, TypeScript, Web Performance, PWA") to add to the "Skills" section.
    *   **Appearance:** A "Suggestions" area would appear below the skills form with clickable tags to easily add them.

---

## 3. Ergonomics & Workflow Fluidity

Reduce friction and make the data entry process as smooth and efficient as possible.

*   **Bulk Add for Skills & Interests:** (Status: TODO)
    *   **Behavior:** Allow users to paste a comma-separated list of items (e.g., "React, Node.js, Figma") into the input field, which would automatically create individual entries.
    *   **Appearance:** A simple help text below the input field: "You can add multiple items separated by a comma."

*   **Undo for Deletions:** (Status: TODO)
    *   **Behavior:** Instead of a blocking confirmation modal, deleting an item would be immediate. A temporary "toast" notification would appear at the bottom of the screen with an "Undo" button, allowing the user to reverse the action.
    *   **Appearance:** A discreet, self-dismissing notification snackbar.

---

## 4. Enhanced Customization & Preview

Build upon the application's core strength—the live preview.

*   **Dynamic Theme Previews:** (Status: TODO)
    *   **Behavior:** The theme thumbnails in the selector could be dynamically generated to show a mini-preview of the user's *actual* CV content with that theme applied.
    *   **Appearance:** The theme selector previews would become live representations, giving users an immediate and accurate view of the result.

*   **Custom Theme Saving:** (Status: TODO)
    *   **Behavior:** After a user customizes colors, fonts, and sizing for a theme, they could save this configuration as a new "Custom Theme."
    *   **Appearance:** An "Save as new theme" button would appear in the customization panel. The new theme would be added to the theme list, perhaps with a special user icon.

---

## 5. Accessibility & Performance

Ensure the application is usable and performant for everyone.

*   **Full Keyboard Navigation:** (Status: TODO)
    *   **Behavior:** Ensure all interactive elements are fully accessible and operable via the keyboard (Tab, Shift+Tab, Enter, Space). The drag-and-drop functionality for reordering sections should have a keyboard alternative (e.g., "Move Up" and "Move Down" buttons).
    *   **Appearance:** Clear and highly visible focus indicators (e.g., a colored ring) around the currently selected element.

*   **Live Color Contrast Validation:** (Status: TODO)
    *   **Behavior:** As a user picks custom text and background colors, the UI could provide real-time feedback on whether the color contrast ratio meets WCAG accessibility standards.
    *   **Appearance:** A small badge (e.g., showing AA or AAA compliance, or a simple green/orange/red indicator) next to the color pickers.