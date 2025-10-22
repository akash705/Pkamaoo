export enum Language {
  EN = 'en',
  HI = 'hi',
}

export interface Testimonial {
  id: number;
  name: string;
  location: string;
  text: { [key in Language]: string };
  image: string;
}

// Fix: Use a recursive type to allow for arbitrarily nested translation strings.
// This resolves type errors where nested objects like 'how_it_works' were not
// correctly represented by the previous type definition.
export interface TranslationTree {
  [key: string]: string | TranslationTree;
}

export type Translations = {
  [key in Language]: TranslationTree;
};
