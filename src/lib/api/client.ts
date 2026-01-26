const API_BASE = '';

export interface ApiFetchOptions extends Omit<RequestInit, 'body'> {
  body?: Record<string, unknown> | FormData;
}

export async function apiFetch<T = unknown>(
  path: string,
  options: ApiFetchOptions = {}
): Promise<{ data: T; res: Response }> {
  const { body, ...rest } = options;

  const init: RequestInit = {
    ...rest,
    credentials: 'include',
  };

  if (body != null && !(body instanceof FormData)) {
    init.headers = {
      ...(init.headers as Record<string, string>),
      'Content-Type': 'application/json',
    };
    init.body = JSON.stringify(body);
  } else if (body instanceof FormData) {
    init.body = body;
  }

  const res = await fetch(`${API_BASE}${path}`, init);
  const contentType = res.headers.get('content-type');
  let data: T;
  if (contentType?.includes('application/json')) {
    data = (await res.json()) as T;
  } else {
    data = (await res.text()) as unknown as T;
  }

  return { data, res };
}
