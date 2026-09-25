// Contact form: client-side validation, POST JSON to /api/contact, success / error states.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Field = 'name' | 'email' | 'message';

function validate(data: Record<Field, string>): Partial<Record<Field, string>> {
  const errors: Partial<Record<Field, string>> = {};
  if (data.name.trim().length < 2) errors.name = 'Please tell me your name.';
  if (!EMAIL_RE.test(data.email.trim())) errors.email = 'That email doesn’t look right.';
  if (data.message.trim().length < 10) errors.message = 'A little more detail helps — at least 10 characters.';
  return errors;
}

export function initContactForm() {
  const form = document.querySelector<HTMLFormElement>('[data-contact-form]');
  const success = document.querySelector<HTMLElement>('[data-contact-success]');
  if (!form || !success) return;

  const submit = form.querySelector<HTMLButtonElement>('[data-submit]')!;
  const submitLabel = form.querySelector<HTMLElement>('[data-submit-label]')!;
  const formError = form.querySelector<HTMLElement>('[data-form-error]')!;

  const showFieldErrors = (errors: Partial<Record<Field, string>>) => {
    (['name', 'email', 'message'] as Field[]).forEach((field) => {
      const input = form.elements.namedItem(field) as HTMLInputElement | HTMLTextAreaElement;
      const msg = form.querySelector<HTMLElement>(`[data-error-for="${field}"]`);
      const err = errors[field];
      input.classList.toggle('contact-v2__input--invalid', Boolean(err));
      input.setAttribute('aria-invalid', err ? 'true' : 'false');
      if (msg) {
        msg.textContent = err ?? '';
        msg.hidden = !err;
      }
    });
  };

  form.addEventListener('input', (e) => {
    const target = e.target as HTMLInputElement;
    if (target.classList.contains('contact-v2__input--invalid')) {
      target.classList.remove('contact-v2__input--invalid');
      const msg = form.querySelector<HTMLElement>(`[data-error-for="${target.name}"]`);
      if (msg) msg.hidden = true;
    }
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    formError.hidden = true;
    const fd = new FormData(form);
    const data = {
      name: String(fd.get('name') ?? ''),
      email: String(fd.get('email') ?? ''),
      message: String(fd.get('message') ?? ''),
      company: String(fd.get('company') ?? ''),
    };
    const errors = validate(data);
    showFieldErrors(errors);
    if (Object.keys(errors).length) {
      (form.querySelector('.contact-v2__input--invalid') as HTMLElement | null)?.focus();
      return;
    }

    submit.disabled = true;
    submitLabel.textContent = 'Sending…';
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
      });
      const body = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !body.ok) throw new Error(body.error || 'Something went wrong. Please try again or email me directly.');
      form.hidden = true;
      success.hidden = false;
    } catch (err) {
      formError.textContent =
        err instanceof TypeError
          ? 'Network error — please check your connection or email me directly.'
          : (err as Error).message;
      formError.hidden = false;
    } finally {
      submit.disabled = false;
      submitLabel.textContent = 'Send message';
    }
  });
}
