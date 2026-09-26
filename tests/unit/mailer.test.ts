import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('astro:env/server', () => ({
  MAIL_TRANSPORT: 'mailjet',
  MAILJET_API_KEY: 'cle-api',
  MAILJET_SECRET_KEY: 'cle-secrete',
  MAIL_FROM: 'site@exemple.ma',
  MAIL_TO: 'equipe@exemple.ma',
}));

const { envoyerEmail } = await import('../../src/lib/mailer');

const email = {
  sujet: 'Nouvelle demande\r\nde contact',
  texte: 'Bonjour',
  repondreA: { email: 'client@exemple.ma', nom: 'Client' },
};

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('envoyerEmail (Mailjet)', () => {
  it("envoie la demande à l'API Send v3.1 avec les deux clés", async () => {
    const fetchSimule = vi.fn().mockResolvedValue(new Response('{}', { status: 200 }));
    vi.stubGlobal('fetch', fetchSimule);

    await envoyerEmail(email);

    const [url, options] = fetchSimule.mock.calls[0] as [string, RequestInit];
    expect(url).toBe('https://api.mailjet.com/v3.1/send');
    expect((options.headers as Record<string, string>).authorization).toBe(
      `Basic ${btoa('cle-api:cle-secrete')}`,
    );
    expect(JSON.parse(options.body as string)).toEqual({
      Messages: [
        {
          From: { Email: 'site@exemple.ma', Name: 'Digital Solutions' },
          To: [{ Email: 'equipe@exemple.ma' }],
          ReplyTo: { Email: 'client@exemple.ma', Name: 'Client' },
          Subject: 'Nouvelle demande de contact',
          TextPart: 'Bonjour',
        },
      ],
    });
  });

  it('ajoute la version HTML si elle existe', async () => {
    const fetchSimule = vi.fn().mockResolvedValue(new Response('{}', { status: 200 }));
    vi.stubGlobal('fetch', fetchSimule);

    await envoyerEmail({ ...email, html: '<p>Bonjour</p>' });

    const [, options] = fetchSimule.mock.calls[0] as [string, RequestInit];
    const [message] = JSON.parse(options.body as string).Messages;
    expect(message.TextPart).toBe('Bonjour');
    expect(message.HTMLPart).toBe('<p>Bonjour</p>');
  });

  it('lève une erreur si Mailjet refuse la demande', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('refus', { status: 401 })));

    await expect(envoyerEmail(email)).rejects.toThrow('Mailjet a répondu 401 : refus');
  });
});
