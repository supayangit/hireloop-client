const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';

// Client-callable: POST to our app API route. Returns parsed JSON or throws.
export async function submitApplication(jobId, applicationData) {
  if (!jobId) throw new Error('Missing job id');

  const url = `${baseUrl}/api/jobs/${encodeURIComponent(jobId)}/apply`;

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(applicationData),
  });

  const text = await res.text();
  let data;
  try { data = text ? JSON.parse(text) : {}; } catch (e) { data = { text }; }

  if (!res.ok) throw new Error(data?.error || data?.message || 'Failed to submit application');

  return data;
}
