export type IssueType = 'Bug' | 'Enhancement' | 'Working as Expected';
export type DeviceType = 'Desktop' | 'Tablet' | 'Mobile';
export type OSType = 'iOS' | 'Windows' | 'Android';
export type BrowserType = 'Chrome' | 'Safari' | 'Firefox' | 'Other';
export type SeverityType = 'High' | 'Medium' | 'Low';

export type Issue = {
  id: string;
  title: string;
  version: string;
  reporter: string;
  createdAt: string;
  assignedTo: string;
  severity: SeverityType;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Reopen' | 'To Do';
  updatedAt: string;
  issueType: IssueType;
  issueDescription: string;
  expectedResult: string;
  stepsToReproduce: string;
  device: DeviceType;
  os: OSType;
  browser: BrowserType;
  otherBrowser?: string;
  date: string;
};

/** Payload for creating an issue. title is optional (derived from issueDescription if omitted). */
export type IssueCreateInput = Omit<Issue, 'id' | 'createdAt' | 'updatedAt'> & { title?: string };

export const createIssue = async (issueData: IssueCreateInput): Promise<Issue> => {
  // Prefer build-time Vite env vars, but fall back to runtime-injected globals (runtime-config.js)
  let SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
  let SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY ?? import.meta.env.VITE_SUPABASE_ANON_KEY;

  if ((!SUPABASE_URL || !SUPABASE_KEY) && typeof window !== 'undefined') {
    const w = window as any;
    // support both direct runtime globals and the object injected by docker-entrypoint.sh
    if (!SUPABASE_URL && w.__RUNTIME_SUPABASE_URL) SUPABASE_URL = w.__RUNTIME_SUPABASE_URL;
    if (!SUPABASE_KEY && w.__RUNTIME_SUPABASE_ANON_KEY) SUPABASE_KEY = w.__RUNTIME_SUPABASE_ANON_KEY;
    if (w.__RUNTIME_CONFIG__) {
      if (!SUPABASE_URL && w.__RUNTIME_CONFIG__.VITE_SUPABASE_URL) SUPABASE_URL = w.__RUNTIME_CONFIG__.VITE_SUPABASE_URL;
      if (!SUPABASE_KEY && w.__RUNTIME_CONFIG__.VITE_SUPABASE_ANON_KEY) SUPABASE_KEY = w.__RUNTIME_CONFIG__.VITE_SUPABASE_ANON_KEY;
      if (!SUPABASE_KEY && w.__RUNTIME_CONFIG__.VITE_SUPABASE_KEY) SUPABASE_KEY = w.__RUNTIME_CONFIG__.VITE_SUPABASE_KEY;
    }
  }

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error(
      'Supabase URL and anon key are not configured. ' +
      'Local dev: add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to a .env file (see .env.example) and restart the dev server. ' +
      'Production: set env vars so runtime-config.js is populated (e.g. Docker entrypoint).'
    );
  }

  if (!import.meta.env.VITE_SUPABASE_KEY && (import.meta.env.VITE_SUPABASE_ANON_KEY || (typeof window !== 'undefined' && (window as any).__RUNTIME_SUPABASE_ANON_KEY))) {
    // running with anon key - warn in console (safe for dev, not recommended for production)
    // eslint-disable-next-line no-console
    console.warn('Using anon Supabase key for direct DB writes. Ensure RLS policies allow this in development only.');
  }

  // Short title for the row; each form field maps to its own column
  const title =
    issueData.title?.trim() ||
    (issueData.issueDescription?.trim()
      ? issueData.issueDescription.trim().slice(0, 120) + (issueData.issueDescription.trim().length > 120 ? '…' : '')
      : 'Issue report');

  // One-to-one: each form field → one column (snake_case). Table uses created_at (no date column).
  const payload: Record<string, unknown> = {
    title,
    issue_type: issueData.issueType ?? 'Bug',
    issue_description: issueData.issueDescription?.trim() ?? '',
    expected_result: issueData.expectedResult?.trim() ?? '',
    steps_to_reproduce: issueData.stepsToReproduce?.trim() ?? '',
    version: issueData.version ?? '',
    device: issueData.device ?? 'Desktop',
    os: issueData.os ?? '',
    browser: issueData.browser ?? 'Other',
    other_browser: issueData.otherBrowser?.trim() ?? '',
    reporter: issueData.reporter ?? '',
    severity: issueData.severity ?? 'Low',
    assigned_to: issueData.assignedTo ?? 'Unassigned',
    status: issueData.status ?? 'Open',
  };

  const res = await fetch(`${SUPABASE_URL.replace(/\/$/, '')}/rest/v1/issues`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      Prefer: 'return=representation',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Failed to create issue: ${res.status} ${res.statusText} - ${body}`);
  }

  const [created] = await res.json();

  // Map snake_case response to camelCase Issue type
  const result: Issue = {
    id: created.id,
    title: created.title,
    version: created.version,
    reporter: created.reporter,
    createdAt: created.created_at,
    assignedTo: created.assigned_to,
    severity: created.severity,
    status: created.status,
    updatedAt: created.updated_at,
    issueType: created.issue_type ?? 'Bug',
    issueDescription: created.issue_description ?? '',
    expectedResult: created.expected_result ?? '',
    stepsToReproduce: created.steps_to_reproduce ?? '',
    device: created.device ?? 'Desktop',
    os: created.os ?? '',
    browser: created.browser ?? 'Other',
    otherBrowser: created.other_browser ?? undefined,
    date: created.date ?? created.created_at,
  };

  return result;
};

