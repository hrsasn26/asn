import { estConfirme } from './placeholders';

/**
 * Une question de FAQ. La même liste sert à l'affichage (composant `Faq`) et aux données
 * structurées FAQPage (`faqJsonLd`) : les deux ne peuvent pas diverger.
 */
export interface QuestionFaq {
  question: string;
  /** Paragraphes de la réponse, en texte simple. */
  reponse: string[];
  /**
   * Lien de la réponse. Si son libellé apparaît dans un paragraphe, ce passage devient le lien.
   * Sinon, le lien est affiché seul sous la réponse (appel à l'action) et n'entre pas dans les
   * données structurées.
   */
  lien?: { label: string; href: string };
  /** Réponse visible à l'ouverture de la page (la première question, dans les maquettes). */
  ouvert?: boolean;
}

/** Morceaux d'un paragraphe : le texte avant le lien, le lien, le texte après. */
export type MorceauParagraphe = string | { label: string; href: string };

/**
 * Découpe un paragraphe autour du libellé du lien (première occurrence). Sans lien, ou si le
 * libellé n'apparaît pas, le paragraphe reste entier.
 */
export function decouperParagraphe(
  paragraphe: string,
  lien: QuestionFaq['lien'],
): MorceauParagraphe[] {
  const position = lien ? paragraphe.indexOf(lien.label) : -1;
  if (!lien || position === -1) return [paragraphe];
  return [
    paragraphe.slice(0, position),
    lien,
    paragraphe.slice(position + lien.label.length),
  ].filter((morceau) => morceau !== '');
}

/** Vrai si le lien est affiché seul sous la réponse : son libellé n'est dans aucun paragraphe. */
export function lienSepare({ reponse, lien }: QuestionFaq): boolean {
  return lien !== undefined && !reponse.some((paragraphe) => paragraphe.includes(lien.label));
}

/**
 * Données structurées schema.org FAQPage. Une question qui contient encore un placeholder
 * n'y figure pas (brief, section 4 : « Aucune valeur non confirmée »).
 */
export function faqJsonLd(questions: QuestionFaq[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: questions
      .filter(({ question, reponse }) => [question, ...reponse].every(estConfirme))
      .map(({ question, reponse }) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: { '@type': 'Answer', text: reponse.join('\n\n') },
      })),
  };
}
