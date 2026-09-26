/**
 * Fichier llms.txt (format https://llmstxt.org) : présentation du site pour les assistants et
 * les moteurs de recherche à base d'IA.
 *
 * Textes : meta description de l'accueil (brief, section 6.7), promesse du pied de page,
 * phrase sur le devis de la page Sites web (section 6.2). Chaque lien reprend mot pour mot la
 * meta description de sa page. Le test tests/e2e/llms.spec.ts vérifie que chaque page du
 * sitemap est listée avec sa meta description : mettez ce fichier à jour avec les pages.
 */
import type { APIRoute } from 'astro';
import { liensLegaux, navigationPrincipale, services, type LienNav } from '~/data/navigation';
import { adresseComplete, site } from '~/data/site';

/** Meta description de chaque page, identique à celle de la page. */
const descriptions: Record<string, string> = {
  '/services':
    'Sites web, applications web et mobiles, logiciels SaaS, IA, automatisation et maintenance : des projets testés, mis en ligne et suivis par la même équipe.',
  '/services/sites-web':
    'Site vitrine, boutique en ligne ou refonte : des sites rapides, sécurisés et prêts pour le référencement.',
  '/services/applications-sur-mesure':
    'Outil métier, espace client, application mobile ou première version de votre projet : nous développons des applications sur mesure, testées et faites pour évoluer.',
  '/services/applications-mobiles':
    'Une application iPhone et Android pour vos clients ou vos équipes, testée sur de vrais téléphones et suivie après sa publication sur les stores.',
  '/services/logiciels-saas':
    'Vous voulez vendre un logiciel en ligne par abonnement ? Nous développons votre SaaS : comptes clients, abonnements, paiement en ligne, sécurité et suivi.',
  '/services/intelligence-artificielle':
    "Assistant pour vos clients, recherche dans vos documents, lecture automatique des factures : nous intégrons l'IA là où elle vous fait gagner du temps.",
  '/services/automatisation-integrations':
    "Connectez votre site, votre CRM et votre comptabilité. Automatisez les tâches répétitives et utilisez l'IA là où elle vous fait vraiment gagner du temps.",
  '/services/donnees-tableaux-de-bord':
    "Mesure d'audience de votre site et tableaux de bord de votre activité : vos chiffres clés sur un seul écran, fiables et mis à jour automatiquement.",
  '/services/tests-securite':
    'Audit de sécurité, tests avant une mise en ligne, tests automatiques et tests de charge : nous vérifions vos sites et vos applications.',
  '/services/hebergement-maintenance':
    'Hébergement sécurisé, sauvegardes, mises à jour et support : nous gardons votre site et vos applications en ligne, rapides et protégés. Forfaits mensuels.',
  '/processus':
    'Échange gratuit, devis à prix fixe, maquettes, développement par étapes, tests complets et suivi après la mise en ligne : découvrez comment se déroule votre projet.',
  '/agence':
    'Une équipe qui conçoit, teste, héberge et maintient des sites et des applications, avec un interlocuteur direct.',
  '/audit-gratuit':
    'Vitesse, sécurité, référencement, affichage mobile : recevez gratuitement un audit technique de votre site, avec un rapport clair et les actions prioritaires.',
  '/contact':
    'Décrivez votre projet en quelques lignes : nous revenons vers vous avec les prochaines étapes. Échange gratuit et sans engagement.',
  '/mentions-legales': `Mentions légales du site ${site.nom} : éditeur, propriété intellectuelle et données personnelles.`,
  '/cgv': `Conditions générales de vente des prestations de ${site.nom} : devis, prix, délais, propriété, maintenance et droit de rétractation.`,
  '/confidentialite':
    'Quelles données nous collectons avec nos formulaires, pourquoi, qui les reçoit et comment exercer vos droits.',
};

const accueil =
  'Nous créons, testons, hébergeons et maintenons vos sites et vos applications. Un interlocuteur direct, un devis à prix fixe et un suivi après la mise en ligne.';

/** Lien du menu principal, par son adresse. */
function lienPrincipal(href: string): LienNav {
  const lien = navigationPrincipale.find((element) => element.href === href);
  if (!lien) throw new Error(`Lien absent du menu principal : ${href}`);
  return lien;
}

const sections: { titre: string; liens: LienNav[] }[] = [
  { titre: 'Services', liens: [lienPrincipal('/services'), ...services] },
  { titre: "L'agence", liens: [lienPrincipal('/processus'), lienPrincipal('/agence')] },
  {
    titre: 'Contact',
    liens: [{ label: 'Audit gratuit', href: '/audit-gratuit' }, lienPrincipal('/contact')],
  },
  // « Optional » : section du format llms.txt pour les informations secondaires.
  { titre: 'Optional', liens: liensLegaux },
];

export const GET: APIRoute = ({ site: adresse }) => {
  const ligne = ({ label, href }: LienNav) => {
    const description = descriptions[href];
    if (!description) throw new Error(`Description absente pour ${href}`);
    return `- [${label}](${new URL(href, adresse).href}): ${description}`;
  };

  const texte = [
    `# ${site.nom}`,
    `> ${accueil}`,
    'Des sites et des applications fiables, testés, sécurisés et suivis dans la durée. ' +
      "Chaque projet fait l'objet d'un devis gratuit et détaillé, à prix fixe.",
    `Adresse : ${adresseComplete}, Maroc. Téléphone : ${site.telephone}. E-mail : ${site.email}.`,
    ...sections.map(({ titre, liens }) => `## ${titre}\n\n${liens.map(ligne).join('\n')}`),
  ].join('\n\n');

  return new Response(`${texte}\n`, {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  });
};
