import { describe, expect, it } from 'vitest';
import { decouperParagraphe, faqJsonLd, lienSepare, type QuestionFaq } from '../../src/lib/faq';

const forfaits = { label: 'forfaits mensuels', href: '/services/hebergement-maintenance#forfaits' };
const audit = { label: 'Faire auditer mon site', href: '/audit-gratuit' };

describe('decouperParagraphe', () => {
  it('garde le paragraphe entier sans lien', () => {
    expect(decouperParagraphe('Oui.', undefined)).toEqual(['Oui.']);
  });

  it('transforme le libellé du lien en lien, avec le texte autour', () => {
    expect(decouperParagraphe("avec l'un de nos forfaits mensuels.", forfaits)).toEqual([
      "avec l'un de nos ",
      forfaits,
      '.',
    ]);
  });

  it('garde le paragraphe entier si le libellé n’y apparaît pas', () => {
    expect(decouperParagraphe('Oui.', audit)).toEqual(['Oui.']);
  });
});

describe('lienSepare', () => {
  it('affiche seul un lien dont le libellé n’est dans aucun paragraphe', () => {
    expect(lienSepare({ question: 'Q ?', reponse: ['Oui.'], lien: audit })).toBe(true);
    expect(
      lienSepare({ question: 'Q ?', reponse: ['nos forfaits mensuels.'], lien: forfaits }),
    ).toBe(false);
    expect(lienSepare({ question: 'Q ?', reponse: ['Oui.'] })).toBe(false);
  });
});

describe('faqJsonLd', () => {
  const questions: QuestionFaq[] = [
    { question: 'Dois-je changer mes outils ?', reponse: ['Non.', 'Nous partons des vôtres.'] },
    { question: 'Quelle différence ?', reponse: ['Cela dépend.'], lien: audit },
    { question: 'Quel délai ?', reponse: ['Sous [48 h ouvrées].'] },
  ];

  it('décrit chaque question avec sa réponse, paragraphes compris', () => {
    const jsonLd = faqJsonLd(questions);
    expect(jsonLd['@type']).toBe('FAQPage');
    expect(jsonLd.mainEntity[0]).toEqual({
      '@type': 'Question',
      name: 'Dois-je changer mes outils ?',
      acceptedAnswer: { '@type': 'Answer', text: 'Non.\n\nNous partons des vôtres.' },
    });
  });

  it('n’ajoute pas le lien affiché seul (appel à l’action) à la réponse', () => {
    expect(faqJsonLd(questions).mainEntity[1]?.acceptedAnswer.text).toBe('Cela dépend.');
  });

  it('écarte une question qui contient encore un placeholder', () => {
    const noms = faqJsonLd(questions).mainEntity.map(({ name }) => name);
    expect(noms).not.toContain('Quel délai ?');
    expect(noms).toHaveLength(2);
  });
});
