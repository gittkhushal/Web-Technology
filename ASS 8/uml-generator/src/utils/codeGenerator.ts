import { UMLClass, UMLRelationship, GeneratorOptions } from '../types/uml';

export interface ParsedAttribute {
  visibility: string; // 'public', 'private', 'protected', or ''
  type: string;
  name: string;
  defaultValue?: string;
  isStatic?: boolean;
}

export interface ParsedParameter {
  type: string;
  name: string;
}

export interface ParsedMethod {
  visibility: string;
  returnType: string;
  name: string;
  parameters: ParsedParameter[];
  isAbstract?: boolean;
  isStatic?: boolean;
}

/**
 * Parses UML attribute string into structured data.
 * Handles forms like:
 * "- name: String"
 * "+ age: int = 21"
 * "private String name"
 * "email:String"
 * "String email"
 */
export function parseAttribute(raw: string): ParsedAttribute | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;

  let str = trimmed;
  let visibility = 'private'; // UML default is usually private

  // 1. Check leading visibility symbols
  if (str.startsWith('+')) {
    visibility = 'public';
    str = str.substring(1).trim();
  } else if (str.startsWith('-')) {
    visibility = 'private';
    str = str.substring(1).trim();
  } else if (str.startsWith('#')) {
    visibility = 'protected';
    str = str.substring(1).trim();
  } else if (str.startsWith('~')) {
    visibility = ''; // package-private
    str = str.substring(1).trim();
  }

  // 2. Check keyword visibility if provided (e.g. "public int age")
  const kwMatch = str.match(/^(public|private|protected)\s+(.+)$/);
  if (kwMatch) {
    visibility = kwMatch[1];
    str = kwMatch[2].trim();
  }

  // Strip trailing semicolon if user typed it
  if (str.endsWith(';')) {
    str = str.slice(0, -1).trim();
  }

  // Check for default value: "x: int = 10"
  let defaultValue: string | undefined;
  if (str.includes('=')) {
    const parts = str.split('=');
    str = parts[0].trim();
    defaultValue = parts[1].trim();
  }

  // Check UML style "name: type"
  if (str.includes(':')) {
    const [namePart, typePart] = str.split(':').map((s) => s.trim());
    if (namePart && typePart) {
      // Clean up any remaining invalid chars from name
      const cleanName = namePart.replace(/[^a-zA-Z0-9_$]/g, '');
      return {
        visibility,
        name: cleanName || namePart,
        type: typePart,
        defaultValue,
      };
    }
  }

  // Check Java style "Type name"
  const javaMatch = str.match(/^([\w<>[\],]+)\s+([\w$]+)$/);
  if (javaMatch) {
    return {
      visibility,
      type: javaMatch[1],
      name: javaMatch[2],
      defaultValue,
    };
  }

  // Fallback: treat as String variable
  return {
    visibility,
    name: str.replace(/[^a-zA-Z0-9_$]/g, ''),
    type: 'String',
    defaultValue,
  };
}

/**
 * Parses UML method string into structured data.
 * Handles forms like:
 * "+ getName(): String"
 * "- validate(user: User): boolean"
 * "setAge(int): void"
 * "public void display()"
 */
export function parseMethod(raw: string): ParsedMethod | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;

  let str = trimmed;
  let visibility = 'public'; // UML default for methods is usually public

  // 1. Check leading visibility symbols
  if (str.startsWith('+')) {
    visibility = 'public';
    str = str.substring(1).trim();
  } else if (str.startsWith('-')) {
    visibility = 'private';
    str = str.substring(1).trim();
  } else if (str.startsWith('#')) {
    visibility = 'protected';
    str = str.substring(1).trim();
  } else if (str.startsWith('~')) {
    visibility = '';
    str = str.substring(1).trim();
  }

  // 2. Check keyword visibility
  const kwMatch = str.match(/^(public|private|protected)\s+(.+)$/);
  if (kwMatch) {
    visibility = kwMatch[1];
    str = kwMatch[2].trim();
  }

  // Check Java-style method signature: "void displayInfo()" or "String getName()"
  const javaSigMatch = str.match(/^([\w<>[\],]+)\s+([\w$]+)\s*\((.*?)\)$/);
  if (javaSigMatch) {
    const returnType = javaSigMatch[1];
    const methodName = javaSigMatch[2];
    const paramsStr = javaSigMatch[3];
    return {
      visibility,
      name: methodName,
      returnType,
      parameters: parseParameters(paramsStr),
    };
  }

  // Check standard UML-style: "methodName(params): ReturnType" or "methodName(params)"
  const umlMatch = str.match(/^([\w$]+)\s*\((.*?)\)(?:\s*:\s*([\w<>[\],]+))?$/);
  if (umlMatch) {
    const methodName = umlMatch[1];
    const paramsStr = umlMatch[2];
    const returnType = umlMatch[3] ? umlMatch[3].trim() : 'void';
    return {
      visibility,
      name: methodName,
      returnType,
      parameters: parseParameters(paramsStr),
    };
  }

  // Fallback for simple names
  return {
    visibility,
    name: str.replace(/[^\w$]/g, ''),
    returnType: 'void',
    parameters: [],
  };
}

/**
 * Parses method parameter strings:
 * "name: String, age: int" OR "String name, int age" OR "int, String"
 */
function parseParameters(paramsStr: string): ParsedParameter[] {
  if (!paramsStr || !paramsStr.trim()) return [];

  const rawParams = paramsStr.split(',').map((p) => p.trim()).filter(Boolean);
  return rawParams.map((param, index) => {
    // UML style: "name: Type"
    if (param.includes(':')) {
      const [namePart, typePart] = param.split(':').map((s) => s.trim());
      return {
        name: namePart.replace(/[^\w$]/g, '') || `param${index + 1}`,
        type: typePart || 'Object',
      };
    }

    // Java style: "Type name"
    const javaMatch = param.match(/^([\w<>[\],]+)\s+([\w$]+)$/);
    if (javaMatch) {
      return {
        type: javaMatch[1],
        name: javaMatch[2],
      };
    }

    // Only type provided: e.g. "int" or "String" -> auto-generate param name
    const cleanType = param.trim();
    let suggestedName = `param${index + 1}`;
    if (cleanType.toLowerCase() === 'int') suggestedName = 'num';
    else if (cleanType.toLowerCase() === 'string') suggestedName = 'str';
    else if (cleanType.toLowerCase() === 'double') suggestedName = 'val';
    else if (cleanType.toLowerCase() === 'boolean') suggestedName = 'flag';
    else if (/^[A-Z]/.test(cleanType)) {
      suggestedName = cleanType.charAt(0).toLowerCase() + cleanType.slice(1);
    }

    return {
      type: cleanType,
      name: suggestedName,
    };
  });
}

/**
 * Generates appropriate Java return statement for a given type.
 */
function getDefaultReturnStatement(returnType: string, methodName: string): string {
  const type = returnType.trim();
  const lower = type.toLowerCase();

  if (lower === 'void') return '';
  if (lower === 'boolean') return 'return false;';
  if (['int', 'long', 'short', 'byte'].includes(lower)) return 'return 0;';
  if (['double', 'float'].includes(lower)) return 'return 0.0;';
  if (lower === 'char') return "return '\\0';";
  if (type === 'String') return 'return "";';
  if (type.startsWith('List<') || type.startsWith('ArrayList<')) return 'return new java.util.ArrayList<>();';
  if (type.startsWith('Set<') || type.startsWith('HashSet<')) return 'return new java.util.HashSet<>();';
  if (type.startsWith('Map<') || type.startsWith('HashMap<')) return 'return new java.util.HashMap<>();';

  return 'return null;';
}

/**
 * Capitalizes string for getter/setter
 */
function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Generates full Java code for an individual UMLClass with relationships.
 */
export function generateClassJavaCode(
  umlClass: UMLClass,
  allClasses: UMLClass[],
  relationships: UMLRelationship[] = [],
  options: GeneratorOptions = {
    includeConstructors: true,
    includeGettersSetters: true,
    includeToString: true,
    includeComments: true,
  }
): string {
  const stereotype = umlClass.stereotype || 'class';
  const isInterface = stereotype === 'interface';
  const isAbstract = stereotype === 'abstract';
  const isEnum = stereotype === 'enum';

  // 1. Resolve Inheritance (extends)
  const extendsRel = relationships.find(
    (r) => r.sourceId === umlClass.id && r.type === 'inheritance'
  );
  const targetParent = extendsRel
    ? allClasses.find((c) => c.id === extendsRel.targetId)
    : null;

  // 2. Resolve Interfaces (implements)
  const implementsRels = relationships.filter(
    (r) => r.sourceId === umlClass.id && r.type === 'realization'
  );
  const implementedInterfaces = implementsRels
    .map((r) => allClasses.find((c) => c.id === r.targetId)?.name)
    .filter(Boolean);

  // 3. Resolve Associations, Aggregations, Compositions
  const associationRels = relationships.filter(
    (r) =>
      r.sourceId === umlClass.id &&
      (r.type === 'association' ||
        r.type === 'aggregation' ||
        r.type === 'composition')
  );

  let code = '';

  // Imports
  const needsList = associationRels.some(
    (r) => r.targetMultiplicity?.includes('*')
  );
  if (needsList) {
    code += 'import java.util.List;\nimport java.util.ArrayList;\n\n';
  }

  // Class declaration
  let classModifier = 'public ';
  if (isInterface) {
    classModifier += 'interface ';
  } else if (isEnum) {
    classModifier += 'enum ';
  } else if (isAbstract) {
    classModifier += 'abstract class ';
  } else {
    classModifier += 'class ';
  }

  code += `${classModifier}${umlClass.name}`;

  if (!isInterface && targetParent) {
    code += ` extends ${targetParent.name}`;
  }

  if (!isInterface && implementedInterfaces.length > 0) {
    code += ` implements ${implementedInterfaces.join(', ')}`;
  } else if (isInterface && implementedInterfaces.length > 0) {
    code += ` extends ${implementedInterfaces.join(', ')}`;
  }

  code += ' {\n';

  // Parse attributes
  const parsedAttributes: ParsedAttribute[] = (umlClass.attributes || [])
    .map(parseAttribute)
    .filter((a): a is ParsedAttribute => a !== null);

  // If enum, render enum values
  if (isEnum) {
    const enumConstants = parsedAttributes.map((a) => a.name.toUpperCase());
    code += `    ${enumConstants.join(', ') || 'DEFAULT'};\n\n`;
  } else {
    // Attributes
    if (parsedAttributes.length > 0 || associationRels.length > 0) {
      if (options.includeComments) {
        code += '    // ================= Attributes ================\n';
      }
      parsedAttributes.forEach((attr) => {
        const vis = attr.visibility ? `${attr.visibility} ` : '';
        const def = attr.defaultValue ? ` = ${attr.defaultValue}` : '';
        code += `    ${vis}${attr.type} ${attr.name}${def};\n`;
      });

      // Relationship attributes
      associationRels.forEach((rel) => {
        const targetClass = allClasses.find((c) => c.id === rel.targetId);
        if (targetClass) {
          const isMany =
            rel.targetMultiplicity?.includes('*') ||
            rel.targetMultiplicity === '0..*' ||
            rel.targetMultiplicity === '1..*';
          const fieldName =
            rel.label?.toLowerCase() ||
            (isMany
              ? `${targetClass.name.charAt(0).toLowerCase() + targetClass.name.slice(1)}List`
              : targetClass.name.charAt(0).toLowerCase() + targetClass.name.slice(1));

          if (isMany) {
            code += `    private List<${targetClass.name}> ${fieldName} = new ArrayList<>();\n`;
          } else {
            code += `    private ${targetClass.name} ${fieldName};\n`;
          }
        }
      });
      code += '\n';
    }
  }

  // Constructors (skip for interfaces and enums)
  if (!isInterface && !isEnum && options.includeConstructors) {
    if (options.includeComments) {
      code += '    // =============== Constructors ================\n';
    }
    // Default constructor
    code += `    public ${umlClass.name}() {\n`;
    code += '        // Default constructor\n';
    code += '    }\n\n';

    // Parameterized constructor if attributes exist
    if (parsedAttributes.length > 0) {
      const paramList = parsedAttributes
        .map((a) => `${a.type} ${a.name}`)
        .join(', ');
      code += `    public ${umlClass.name}(${paramList}) {\n`;
      if (targetParent) {
        code += '        super();\n';
      }
      parsedAttributes.forEach((a) => {
        code += `        this.${a.name} = ${a.name};\n`;
      });
      code += '    }\n\n';
    }
  }

  // Parse methods
  const parsedMethods: ParsedMethod[] = (umlClass.methods || [])
    .map(parseMethod)
    .filter((m): m is ParsedMethod => m !== null);

  // Methods
  if (parsedMethods.length > 0) {
    if (options.includeComments) {
      code += '    // =================== Methods ==================\n';
    }
    parsedMethods.forEach((method) => {
      const paramsFormatted = method.parameters
        .map((p) => `${p.type} ${p.name}`)
        .join(', ');

      if (isInterface) {
        code += `    ${method.returnType} ${method.name}(${paramsFormatted});\n\n`;
      } else {
        const vis = method.visibility ? `${method.visibility} ` : '';
        code += `    ${vis}${method.returnType} ${method.name}(${paramsFormatted}) {\n`;
        const retStmt = getDefaultReturnStatement(method.returnType, method.name);
        if (retStmt) {
          code += `        ${retStmt}\n`;
        } else {
          code += '        // TODO: Implement method logic\n';
        }
        code += '    }\n\n';
      }
    });
  }

  // Getters and Setters (skip for interfaces and enums)
  if (!isInterface && !isEnum && options.includeGettersSetters && parsedAttributes.length > 0) {
    if (options.includeComments) {
      code += '    // ============= Getters and Setters ============\n';
    }
    parsedAttributes.forEach((attr) => {
      const capName = capitalize(attr.name);
      // Getter
      code += `    public ${attr.type} get${capName}() {\n`;
      code += `        return this.${attr.name};\n`;
      code += '    }\n\n';
      // Setter
      code += `    public void set${capName}(${attr.type} ${attr.name}) {\n`;
      code += `        this.${attr.name} = ${attr.name};\n`;
      code += '    }\n\n';
    });
  }

  // toString method
  if (!isInterface && !isEnum && options.includeToString && parsedAttributes.length > 0) {
    if (options.includeComments) {
      code += '    // =================== toString =================\n';
    }
    code += '    @Override\n';
    code += '    public String toString() {\n';
    const fieldsFormatted = parsedAttributes
      .map((a) => `"${a.name}=" + ${a.name}`)
      .join(' + ", " + ');
    code += `        return "${umlClass.name}{" + ${fieldsFormatted} + "}";\n`;
    code += '    }\n\n';
  }

  code += '}\n';
  return code;
}

/**
 * Generates all Java code, returning map of fileName -> code and combined code.
 */
export function generateAllJavaCode(
  classes: UMLClass[],
  relationships: UMLRelationship[] = [],
  options?: GeneratorOptions
): {
  files: { [fileName: string]: string };
  combined: string;
} {
  const files: { [fileName: string]: string } = {};
  let combined = '// ==========================================\n';
  combined += '// Generated by UML Class Diagram Generator\n';
  combined += `// Generated on: ${new Date().toLocaleString()}\n`;
  combined += `// Classes: ${classes.length} | Relationships: ${relationships.length}\n`;
  combined += '// ==========================================\n\n';

  classes.forEach((cls) => {
    const singleCode = generateClassJavaCode(cls, classes, relationships, options);
    files[`${cls.name}.java`] = singleCode;
    combined += `// File: ${cls.name}.java\n`;
    combined += singleCode;
    combined += '\n\n';
  });

  return { files, combined };
}

/**
 * Generates PlantUML script.
 */
export function generatePlantUML(
  classes: UMLClass[],
  relationships: UMLRelationship[] = []
): string {
  let puml = '@startuml\n';
  puml += 'skinparam classAttributeIconSize 0\n\n';

  classes.forEach((c) => {
    const st = c.stereotype ? `<<${c.stereotype}>> ` : '';
    puml += `class ${c.name} ${st}{\n`;
    (c.attributes || []).forEach((a) => {
      puml += `  ${a}\n`;
    });
    (c.methods || []).forEach((m) => {
      puml += `  ${m}\n`;
    });
    puml += '}\n\n';
  });

  relationships.forEach((r) => {
    const src = classes.find((c) => c.id === r.sourceId)?.name;
    const tgt = classes.find((c) => c.id === r.targetId)?.name;
    if (!src || !tgt) return;

    const label = r.label ? ` : ${r.label}` : '';
    const srcMult = r.sourceMultiplicity ? ` "${r.sourceMultiplicity}"` : '';
    const tgtMult = r.targetMultiplicity ? ` "${r.targetMultiplicity}"` : '';

    switch (r.type) {
      case 'inheritance':
        puml += `${src} --|> ${tgt}${label}\n`;
        break;
      case 'realization':
        puml += `${src} ..|> ${tgt}${label}\n`;
        break;
      case 'composition':
        puml += `${src}${srcMult} *--${tgtMult} ${tgt}${label}\n`;
        break;
      case 'aggregation':
        puml += `${src}${srcMult} o--${tgtMult} ${tgt}${label}\n`;
        break;
      case 'association':
        puml += `${src}${srcMult} -->${tgtMult} ${tgt}${label}\n`;
        break;
      case 'dependency':
        puml += `${src} ..> ${tgt}${label}\n`;
        break;
    }
  });

  puml += '\n@enduml\n';
  return puml;
}

/**
 * Generates Mermaid classDiagram script.
 */
export function generateMermaid(
  classes: UMLClass[],
  relationships: UMLRelationship[] = []
): string {
  let mermaid = 'classDiagram\n';

  classes.forEach((c) => {
    if (c.stereotype) {
      mermaid += `    class ${c.name} {\n        <<${c.stereotype}>>\n`;
    } else {
      mermaid += `    class ${c.name} {\n`;
    }
    (c.attributes || []).forEach((a) => {
      mermaid += `        ${a}\n`;
    });
    (c.methods || []).forEach((m) => {
      mermaid += `        ${m}\n`;
    });
    mermaid += '    }\n';
  });

  relationships.forEach((r) => {
    const src = classes.find((c) => c.id === r.sourceId)?.name;
    const tgt = classes.find((c) => c.id === r.targetId)?.name;
    if (!src || !tgt) return;

    const label = r.label ? ` : ${r.label}` : '';
    switch (r.type) {
      case 'inheritance':
        mermaid += `    ${tgt} <|-- ${src}${label}\n`;
        break;
      case 'realization':
        mermaid += `    ${tgt} <|.. ${src}${label}\n`;
        break;
      case 'composition':
        mermaid += `    ${src} *-- ${tgt}${label}\n`;
        break;
      case 'aggregation':
        mermaid += `    ${src} o-- ${tgt}${label}\n`;
        break;
      case 'association':
        mermaid += `    ${src} --> ${tgt}${label}\n`;
        break;
      case 'dependency':
        mermaid += `    ${src} ..> ${tgt}${label}\n`;
        break;
    }
  });

  return mermaid;
}
