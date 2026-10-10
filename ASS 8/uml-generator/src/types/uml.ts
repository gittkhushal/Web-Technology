export type Visibility = '+' | '-' | '#' | '~';

export type ClassStereotype = 'class' | 'abstract' | 'interface' | 'enum';

export interface UMLClass {
  id: string;
  name: string;
  stereotype?: ClassStereotype;
  attributes: string[];
  methods: string[];
  x: number;
  y: number;
  width?: number;
  height?: number;
  color?: string; // Optional accent theme e.g. blue, emerald, amber, purple
}

export type RelationshipType =
  | 'inheritance' // Generalization (extends) - solid line with hollow triangle arrow
  | 'realization' // Implementation (implements) - dashed line with hollow triangle arrow
  | 'association' // Associates with - solid line with open arrow
  | 'aggregation' // Aggregation (has-a) - solid line with hollow diamond
  | 'composition' // Composition (part-of) - solid line with filled diamond
  | 'dependency'; // Uses / depends on - dashed line with open arrow

export interface UMLRelationship {
  id: string;
  sourceId: string;
  targetId: string;
  type: RelationshipType;
  label?: string;
  sourceMultiplicity?: string;
  targetMultiplicity?: string;
}

export interface DiagramData {
  title: string;
  version?: string;
  timestamp: string;
  classes: UMLClass[];
  relationships?: UMLRelationship[];
}

export interface GeneratorOptions {
  includeConstructors: boolean;
  includeGettersSetters: boolean;
  includeToString: boolean;
  includeComments: boolean;
}
