export type AnnotationCategory = "clarity" | "regulation" | "repair" | "coordination";

export type Annotation = {
  id: string;
  beatId: string;
  category: AnnotationCategory;
  message: string;
  constructive: true;
};

export type RewritePath = {
  id: string;
  title: string;
  before: string;
  after: string;
  rationale: string;
};
