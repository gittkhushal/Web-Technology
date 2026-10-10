# ASS 8: Interactive UML Class Diagram Generator

An interactive web-based UML Class Diagram Generator built with React 18, TypeScript, and Tailwind CSS. It enables software engineers and students to visually design UML class architectures, link them with UML 2.0 relationships, and automatically generate syntactically complete Java source code, PlantUML scripts, and Mermaid diagrams. Includes full Creately-compatible JSON export/import and an observability analytics dashboard.

---

## 📋 Overview

- **Frontend Architecture**: React 18 + TypeScript + Tailwind CSS
- **Visual Design Canvas**: Smooth class dragging, auto-routing SVG relationship lines, and zoom controls
- **Java Code Generation**: Robust parser supporting UML visibility (`+`, `-`, `#`, `~`), parameters, constructors, getters/setters, `toString()`, and relationship-based field generation
- **UML 2.0 Relationships**: Inheritance (`extends`), Realization (`implements`), Association, Aggregation, Composition, and Dependency
- **Creately Integration**: Real JSON file export and import for seamless cloud and offline workflow
- **Templates**: 1-click loading for University Management, E-Commerce Order System, and Hospital Management
- **Dashboard**: Draggable observability widget grid tracking live diagram statistics

---

## 🎯 Features

- ✅ **Visual UML Canvas**: Drag classes freely with real-time coordinate updates and grid background
- ✅ **Dynamic SVG Relationship Lines**: Calculates optimal connection points between classes with correct UML marker heads
- ✅ **Complete Java Code Generation**:
  - Handles `+` (public), `-` (private), `#` (protected), `~` (package)
  - Auto-formats parameter names and return statements (no compile errors)
  - Supports `extends` (Inheritance) and `implements` (Realization)
  - Supports Collection fields (e.g. `List<OrderItem>`) for associations & compositions
  - Toggleable default and parameterized constructors
  - Toggleable Getters and Setters
  - Toggleable `toString()` method
- ✅ **Multi-File & Multi-Format Code Export**:
  - Tabbed preview per class (`Student.java`, `Course.java`, etc.)
  - Download individual `.java` files or all classes
  - Export to **PlantUML** (`.puml`) and **Mermaid** (`.mmd`)
- ✅ **Creately Integration**:
  - Export diagrams as standard `uml-diagram.json`
  - **Import JSON**: File upload (file picker) or direct JSON text paste with instant validation
- ✅ **Pre-built Templates**: Load University, E-Commerce, or Hospital architecture with one click
- ✅ **Analytics Dashboard**: Live metrics tracking Total Classes, Attributes, Methods, Relationships, and Completeness Score
- ✅ **Auto-Save**: Automatic LocalStorage persistence so diagram changes are never lost on page refresh

---

## 🚀 Setup & Running

### Prerequisites
- Node.js 14+ installed
- npm installed

### Installation & Launch

```bash
# 1. Navigate to the project directory
cd "ASS 8/uml-generator"

# 2. Install dependencies (if not already installed)
npm install

# 3. Start development server
npm start
```

The application runs on `http://localhost:3000`.

### Running Tests
```bash
npm test -- --watchAll=false
```

### Production Build
```bash
npm run build
```

---

## 📁 Project Structure

```
uml-generator/
├── public/
│   └── index.html               # HTML entry point
├── src/
│   ├── components/
│   │   ├── Navbar.tsx           # Navigation bar with tabs and counters
│   │   ├── DiagramCanvas.tsx    # Drag-and-drop canvas with SVG relationship lines
│   │   ├── CodeGenerator.tsx    # Java, PlantUML & Mermaid code generator panel
│   │   ├── CreatelyIntegration.tsx # Creately export/import & cloud guidance
│   │   ├── ClassModal.tsx       # Interactive Class creation/edit modal
│   │   ├── RelationshipModal.tsx# Relationship type & multiplicity modal
│   │   ├── AboutModal.tsx       # Documentation & notation guide
│   │   └── ui/
│   │       ├── dashboard.tsx    # Draggable statistics dashboard
│   │       └── draggable-widget-grid.tsx # Widget grid layout engine
│   ├── types/
│   │   └── uml.ts               # UML TypeScript interfaces & types
│   ├── utils/
│   │   ├── codeGenerator.ts     # Java, PlantUML & Mermaid generation engine
│   │   └── diagramTemplates.ts  # Pre-built University, E-Commerce & Hospital templates
│   ├── App.tsx                  # Master application controller
│   ├── App.css                  # Custom styling & scrollbars
│   ├── index.css                # Tailwind directives & design tokens
│   └── index.tsx                # React entry point
├── package.json                 # Dependencies & scripts
├── tailwind.config.js           # Tailwind configuration
├── tsconfig.json                # TypeScript configuration
└── README.md                    # Assignment documentation
```

---

## 📖 How to Use

### 1. Designing Classes
1. Click **+ Add Class** on the canvas or toolbar.
2. Enter the class name (e.g. `Student`).
3. Select stereotype: `Standard Class`, `<<abstract>>`, `<<interface>>`, or `<<enum>>`.
4. Choose an accent color theme.
5. Add attributes using the interactive builder or bulk text mode:
   - `- id: int`
   - `- name: String`
   - `- gpa: double`
6. Add methods:
   - `+ getGpa(): double`
   - `+ enroll(course: Course): boolean`
7. Click **Create Class**. Double-click any class box to edit it at any time.

### 2. Linking Relationships
1. Click **Add Relationship** or click the 🔗 icon on any class box.
2. Select the Source and Target classes.
3. Choose the relationship type:
   - **Inheritance / Generalization**: `Subclass ——▷ Superclass` (Java `extends`)
   - **Realization / Interface**: `Class - - ▷ Interface` (Java `implements`)
   - **Association**: `ClassA ——> ClassB`
   - **Aggregation**: `Parent ◇—— Child` (weak "has-a")
   - **Composition**: `Parent ◆—— Child` (strong "part-of")
   - **Dependency**: `ClassA - - > ClassB`
4. Set multiplicity (e.g. `1` to `*`) and optional label (e.g. `enrolledIn`).
5. Click **Create Relationship**. The SVG connector automatically routes between the boxes.

### 3. Generating Java Code
1. Click **🔨 Generate Java Code** in the navbar.
2. View code per-class tab or in the combined file view.
3. Toggle optional features in the Settings menu:
   - Default & Parameterized Constructors
   - Getters and Setters
   - `toString()` Method
   - Section Comments
4. Click **📋 Copy** or **⬇️ Download** to save the `.java` files.
5. Switch to **PlantUML** or **Mermaid** tabs for instant diagram markdown exports.

### 4. Creately Integration (Export & Import)
1. In the sidebar, open the **Creately Integration** section.
2. Click **📤 Export JSON** to save `uml-diagram.json`.
3. To load any saved or Creately diagram, click **📥 Import JSON** and select the `.json` file, or click **📋 Paste JSON** to paste directly.

---

## 📊 Exported JSON Schema

```json
{
  "title": "UML Class Diagram",
  "version": "2.0",
  "timestamp": "2026-10-10T12:00:00.000Z",
  "classes": [
    {
      "id": "cls-student",
      "name": "Student",
      "stereotype": "class",
      "color": "#3b82f6",
      "attributes": [
        "- studentId: String",
        "- gpa: double"
      ],
      "methods": [
        "+ getGpa(): double",
        "+ enroll(course: Course): boolean"
      ],
      "x": 120,
      "y": 280,
      "width": 220
    }
  ],
  "relationships": [
    {
      "id": "rel-1",
      "sourceId": "cls-student",
      "targetId": "cls-person",
      "type": "inheritance",
      "label": "extends"
    }
  ]
}
```

---

## 🛠️ Bugs & Flaws Fixed from Initial Submission

| Component | Bug / Flaw in Original Code | Resolution |
|-----------|-----------------------------|------------|
| **DiagramCanvas** | Dragging class position was a dummy comment (`// Update classes array...`) and never persisted | Implemented smooth real-time drag positioning with zoom coordinates |
| **DiagramCanvas** | Canvas delete button was hardcoded to `alert('Delete not implemented yet')` | Connected real `onDeleteClass` handler with relationship cascade deletion |
| **DiagramCanvas** | Save button in edit modal had no `onClick` handler | Full `ClassModal` with validation, interactive builder, and working save |
| **DiagramCanvas** | Canvas click unintentionally spawned dummy classes `ClassN` | Replaced with explicit `+ Add Class` modal and clean canvas click selection |
| **DiagramCanvas** | Missing all UML relationship connectors | Implemented SVG lines with proper UML markers (Inheritance, Realization, Association, Aggregation, Composition) |
| **CodeGenerator** | Visibility symbols (`+`, `-`, `#`, `~`) produced invalid Java like `private String - name;` or silently dropped methods | Implemented smart parser for attributes & methods supporting visibility, defaults, and parameters |
| **CodeGenerator** | Methods lacked return statements, causing Java compile errors | Generates syntactically correct default return statements based on type |
| **CodeGenerator** | Lacked constructors, getters/setters, and relationship field generation | Added configurable constructors, getters/setters, `toString()`, and `List<T>` association fields |
| **CreatelyIntegration** | "Import from JSON" was just an alert telling user to go away | Real working JSON file upload (FileReader) and text paste import with schema validation |
| **CreatelyIntegration** | Export JSON stripped out positions and diagram metadata | Full schema export including positions, dimensions, stereotypes, and relationships |
| **Architecture** | Duplicate and conflicting `.js` and `.tsx` files in `src/` | Consolidated to 100% clean TypeScript with zero compiler/ESLint warnings |
| **Aesthetics** | Clashing light/dark panels, raw `<style>` tag DOM injection | Unified dark theme with Tailwind CSS, glassmorphism, Lucide icons, and responsive layouts |

---

**Status**: ✅ Complete & Production Ready  
**Tech Stack**: React 18 + TypeScript + Tailwind CSS + Framer Motion  
**Tested**: All Unit & Build Tests Passing (0 warnings, 0 errors)
