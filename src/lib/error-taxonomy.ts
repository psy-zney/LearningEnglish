export const ERROR_CATEGORIES = {
  subjectVerbAgreement: "subject_verb_agreement",
  tense: "tense_or_time_anchor",
  verbForm: "verb_form_or_pattern",
  preposition: "preposition_or_collocation",
  connector: "connector_or_clause_structure",
  wordChoice: "word_choice_or_meaning",
  recall: "content_recall",
} as const;

export const ERROR_CATEGORY_LABELS: Record<string, string> = {
  [ERROR_CATEGORIES.subjectVerbAgreement]: "Subject–verb agreement",
  [ERROR_CATEGORIES.tense]: "Tense & time anchor",
  [ERROR_CATEGORIES.verbForm]: "Verb form & pattern",
  [ERROR_CATEGORIES.preposition]: "Preposition & collocation",
  [ERROR_CATEGORIES.connector]: "Connector & clause structure",
  [ERROR_CATEGORIES.wordChoice]: "Word choice",
  [ERROR_CATEGORIES.recall]: "Content recall",
};
