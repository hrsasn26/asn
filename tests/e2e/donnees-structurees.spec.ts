import { expect, test, type Page } from '@playwright/test';
import { pages } from './pages';

type Noeud = Record<string, unknown> & { '@type'?: string };

/** Tous les nœuds JSON-LD de la page, blocs `@graph` compris. */
async function noeuds(page: Page): Promise<Noeud[]> {
  const blocs = await page.locator('script[type="application/ld+json"]').allTextContents();
  return blocs.flatMap((bloc) => {
    const donnees = JSON.parse(bloc) as Noeud & { '@graph'?: Noeud[] };
    return donnees['@graph'] ?? [donnees];
  });
}

const normaliser = (texte: string) => texte.replace(/\s+/g, ' ').trim();

for (const chemin of pages) {
  test(`${chemin} : les données structurées FAQPage reprennent la FAQ affichée`, async ({
    page,
  }) => {
    await page.goto(chemin);
    // Questions de la FAQ : les <details> du contenu (le menu mobile de l'en-tête en est un aussi).
    const questions = page.locator('main details');
    const faq = (await noeuds(page)).filter((noeud) => noeud['@type'] === 'FAQPage');

    if ((await questions.count()) === 0) {
      expect(faq).toHaveLength(0);
      return;
    }
    expect(faq).toHaveLength(1);

    // Réponses affichées, sans le paragraphe qui ne contient qu'un lien (appel à l'action).
    const affichees = await questions.evaluateAll((elements) =>
      elements.map((details) => ({
        // Premier <span> du <summary> : le second est le « + » décoratif.
        question: details.querySelector('summary > span')?.textContent ?? '',
        reponse: [...details.querySelectorAll('p')]
          .filter((p) => p.textContent?.trim() !== p.querySelector('a')?.textContent?.trim())
          .map((p) => p.textContent ?? '')
          .join(' '),
      })),
    );
    const structurees = (
      faq[0]?.mainEntity as { name: string; acceptedAnswer: { text: string } }[]
    ).map(({ name, acceptedAnswer }) => ({ question: name, reponse: acceptedAnswer.text }));

    expect(structurees.map(({ question, reponse }) => [question, normaliser(reponse)])).toEqual(
      affichees.map(({ question, reponse }) => [normaliser(question), normaliser(reponse)]),
    );
  });
}

test('chaque service renvoie à l’agence décrite sur l’accueil', async ({ page }) => {
  await page.goto('/');
  const agence = (await noeuds(page)).find((noeud) => noeud['@type'] === 'ProfessionalService');
  expect(agence?.['@id']).toBeTruthy();

  for (const chemin of pages.filter((p) => p.startsWith('/services/'))) {
    await page.goto(chemin);
    const service = (await noeuds(page)).find((noeud) => noeud['@type'] === 'Service');
    expect(service?.provider, chemin).toMatchObject({ '@id': agence?.['@id'] });
  }
});
