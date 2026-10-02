// Single source of truth for every editable collection. Add a field here
// and it appears in the admin form automatically -- no other file needs
// to change. This is how you can add new Skills, Projects, Certificates
// etc. forever without touching code (they're rows in Postgres); this
// config only needs to change if you want a brand-new *type* of field.

export type FieldType = "text" | "textarea" | "url" | "number" | "boolean" | "date";

export interface FieldDef {
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
  help?: string;
}

export interface EntityDef {
  table: string;
  label: string;
  labelPlural: string;
  titleField: string; // field used as the row label in admin lists
  orderBy?: string;
  fields: FieldDef[];
}

export const ENTITIES: Record<string, EntityDef> = {
  education: {
    table: "education",
    label: "Education",
    labelPlural: "Education",
    titleField: "degree",
    orderBy: "sort_order",
    fields: [
      { key: "degree", label: "Degree", type: "text", required: true },
      { key: "institution", label: "Institution", type: "text", required: true },
      { key: "start_year", label: "Start Year", type: "text" },
      { key: "end_year", label: "End Year", type: "text" },
      { key: "grade", label: "Grade / CGPA", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "logo_url", label: "Institution Logo URL", type: "url" },
      { key: "sort_order", label: "Sort Order", type: "number" },
    ],
  },
  skills: {
    table: "skills",
    label: "Skill",
    labelPlural: "Skills",
    titleField: "name",
    orderBy: "sort_order",
    fields: [
      { key: "name", label: "Skill Name", type: "text", required: true },
      { key: "category", label: "Category", type: "text", required: true, help: "e.g. Programming, Cloud & DevOps, Database" },
      { key: "level", label: "Proficiency Level", type: "text", help: "e.g. Beginner / Intermediate / Advanced" },
      { key: "percentage", label: "Percentage", type: "number" },
      { key: "description", label: "Short Description", type: "textarea" },
      { key: "icon_url", label: "Icon URL", type: "url" },
      { key: "sort_order", label: "Sort Order", type: "number" },
    ],
  },
  projects: {
    table: "projects",
    label: "Project",
    labelPlural: "Projects",
    titleField: "name",
    orderBy: "sort_order",
    fields: [
      { key: "name", label: "Project Name", type: "text", required: true },
      { key: "description", label: "Description", type: "textarea" },
      { key: "tech", label: "Technologies (comma separated)", type: "text" },
      { key: "category", label: "Category", type: "text" },
      { key: "github_url", label: "GitHub URL", type: "url" },
      { key: "demo_url", label: "Live Demo URL", type: "url" },
      { key: "image_url", label: "Cover Image", type: "url", help: "Uploaded via the image picker below" },
      { key: "start_date", label: "Start Date", type: "date" },
      { key: "end_date", label: "Completion Date", type: "date" },
      { key: "role", label: "Your Role", type: "text", help: "e.g. Solo developer, Frontend developer" },
      { key: "features", label: "Key Features", type: "textarea", help: "One feature per line" },
      { key: "challenges", label: "Challenges & What I Learned", type: "textarea", help: "1 to 3 sentences about a real problem you solved" },
      { key: "featured", label: "Featured Project", type: "boolean" },
      { key: "sort_order", label: "Sort Order", type: "number" },
    ],
  },
  certificates: {
    table: "certificates",
    label: "Certificate",
    labelPlural: "Certificates",
    titleField: "name",
    orderBy: "issue_date",
    fields: [
      { key: "name", label: "Certificate Name", type: "text", required: true },
      { key: "org", label: "Issuing Organization", type: "text" },
      { key: "issue_date", label: "Issue Date", type: "date" },
      { key: "credential_id", label: "Credential ID", type: "text" },
      { key: "credential_url", label: "Credential URL", type: "url" },
      { key: "image_url", label: "Certificate Image", type: "url" },
      { key: "pdf_url", label: "Certificate PDF", type: "url" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "skills", label: "Associated Skills (comma separated)", type: "text" },
    ],
  },
  achievements: {
    table: "achievements",
    label: "Achievement",
    labelPlural: "Achievements",
    titleField: "title",
    orderBy: "date",
    fields: [
      { key: "title", label: "Title", type: "text", required: true },
      { key: "description", label: "Description", type: "textarea" },
      { key: "date", label: "Date", type: "date" },
      { key: "organization", label: "Organization", type: "text" },
      { key: "image_url", label: "Image", type: "url" },
      { key: "certificate_url", label: "Certificate", type: "url" },
      { key: "external_link", label: "External Link", type: "url" },
    ],
  },
};