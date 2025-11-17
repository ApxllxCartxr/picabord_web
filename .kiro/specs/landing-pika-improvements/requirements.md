# Requirements Document

## Introduction

This document outlines the requirements for improving the landing page and PIKA product page of the PICABORD website. The improvements focus on typography adjustments, content updates to remove division names while maintaining links, and a complete redesign of the PIKA page with an interactive 3D model viewer.

## Glossary

- **Landing_Page**: The main homepage of the PICABORD website located at app/page.tsx
- **PIKA_Page**: The product page for the PIKA-1 single-board computer located at pages/PIKA.tsx and app/pika/page.tsx
- **Hero_Section**: The top section of the Landing_Page containing the main hero component
- **Mission_Section**: The "Who We Are" section on the Landing_Page
- **Solutions_Section**: The section displaying Hardware and Software cards on the Landing_Page
- **Three_Viewer**: A 3D model viewer component built with Three.js for displaying the circuit.glb model
- **Division_Name**: References to "PIKA Division" and "TEC Division" in the UI

## Requirements

### Requirement 1

**User Story:** As a website visitor, I want the content on the landing page to be more readable with appropriate text sizing, so that I can easily consume the information.

#### Acceptance Criteria

1. WHEN the Landing_Page renders, THE Mission_Section SHALL display the "Who We Are" heading with a font size reduced by 4 points from the current size
2. WHEN the Landing_Page renders, THE Mission_Section SHALL display the description paragraph with a font size reduced by 4 points from the current size
3. WHEN the Landing_Page renders, THE Solutions_Section SHALL display all text content with font sizes reduced by 4 points from the current sizes
4. WHEN the Landing_Page renders, THE Mission_Section SHALL display all text content with justified text alignment
5. WHEN the Landing_Page renders, THE Solutions_Section SHALL display all paragraph text with justified text alignment

### Requirement 2

**User Story:** As a website visitor, I want to see product categories without division names, so that the interface is cleaner and more focused on the products themselves.

#### Acceptance Criteria

1. WHEN the Landing_Page renders the Solutions_Section, THE Hardware card SHALL display "Hardware" as the heading without any division name reference
2. WHEN the Landing_Page renders the Solutions_Section, THE Software card SHALL display "Software" as the heading without any division name reference
3. WHEN the Landing_Page renders the Solutions_Section, THE Hardware card SHALL NOT display the text "PIKA Division"
4. WHEN the Landing_Page renders the Solutions_Section, THE Software card SHALL NOT display the text "TEC Division"
5. WHEN a user clicks on the Hardware card, THE Landing_Page SHALL navigate to the /pika route
6. WHEN a user clicks on the Software card, THE Landing_Page SHALL navigate to the /tec route

### Requirement 3

**User Story:** As a website visitor viewing the PIKA page, I want to see comprehensive product information with justified text, so that I can understand the product's capabilities and target market.

#### Acceptance Criteria

1. WHEN the PIKA_Page renders, THE page SHALL display the heading "PIKA-1" with the subtitle "India's First Modular AI-Enabled Single Board Computer"
2. WHEN the PIKA_Page renders, THE page SHALL display the product description: "PIKA-1 is a high-performance, compact single-board computer (SBC) designed by PICABORD to deliver versatility and efficiency in a small form factor. Engineered for developers, tech enthusiasts, and businesses, it combines robust processing power with low energy consumption, making it ideal for edge computing, IoT applications, AI prototyping, and embedded systems."
3. WHEN the PIKA_Page renders, THE page SHALL display the target market description: "Its target market includes startups, educational institutions, makers, and enterprises seeking an affordable yet powerful computing platform for rapid development, automation, or experimentation. PIKA-1 can be used for home automation projects, robotics, industrial monitoring, AI/ML model deployment, digital signage, and lightweight server applications, providing a flexible foundation for innovative tech solutions."
4. WHEN the PIKA_Page renders, THE page SHALL display all paragraph text with justified text alignment
5. WHEN the PIKA_Page renders, THE page SHALL maintain the existing color scheme and visual design

### Requirement 4

**User Story:** As a website visitor viewing the PIKA page, I want to interact with a 3D model of the circuit board, so that I can examine the product from different angles.

#### Acceptance Criteria

1. WHEN the PIKA_Page renders, THE Three_Viewer SHALL load and display the circuit.glb 3D model file
2. WHEN a user drags on the Three_Viewer, THE Three_Viewer SHALL rotate the 3D model based on the drag direction and distance
3. WHEN a user scrolls on the Three_Viewer, THE Three_Viewer SHALL zoom in or out on the 3D model based on the scroll direction
4. WHEN a user pinches on a touch device, THE Three_Viewer SHALL zoom in or out on the 3D model based on the pinch gesture
5. WHEN the Three_Viewer loads the model, THE Three_Viewer SHALL display the model with appropriate lighting and camera positioning
6. IF the circuit.glb file fails to load, THEN THE Three_Viewer SHALL display an error message or fallback content
7. WHEN the PIKA_Page unmounts, THE Three_Viewer SHALL properly dispose of Three.js resources to prevent memory leaks
