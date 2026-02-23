export type Issue = {
  id: string;
  title: string;
  version: string;
  reporter: string;
  createdAt: string;
  assignedTo: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Open' | 'In Progress' | 'Resolved' | 'Reopen' | 'To Do';
  updatedAt: string;
};

export const createIssue = async (
  issueData: Omit<Issue, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Issue> => {
  const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
  // Support both VITE_SUPABASE_KEY and VITE_SUPABASE_ANON_KEY (common naming)
  const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY ?? import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error('Supabase credentials are not configured (VITE_SUPABASE_URL / VITE_SUPABASE_KEY or VITE_SUPABASE_ANON_KEY).');
  }

  if (!import.meta.env.VITE_SUPABASE_KEY && import.meta.env.VITE_SUPABASE_ANON_KEY) {
    // running with anon key - warn in console (safe for dev, not recommended for production)
    // eslint-disable-next-line no-console
    console.warn('Using VITE_SUPABASE_ANON_KEY for direct DB writes. Ensure RLS policies allow this in development only.');
  }

  const payload = {
    title: issueData.title,
    version: issueData.version,
    reporter: issueData.reporter,
    assigned_to: issueData.assignedTo,
    severity: issueData.severity,
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
  };

  return result;
};

