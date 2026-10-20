import { describe, it, expect } from 'vitest';
import { GET as getPosts, POST as createPost } from '../../app/api/marketing/posts/route';
import { POST as approvePost } from '../../app/api/marketing/posts/[id]/approve/route';
import { POST as publishPost } from '../../app/api/marketing/posts/[id]/publish/route';
import { GET as getPause, POST as togglePause } from '../../app/api/marketing/pause/route';
import { GET as getAnalytics } from '../../app/api/marketing/analytics/route';
import { GET as exportCalendar } from '../../app/api/marketing/export/route';

describe('Marketing App Router API Endpoints', () => {
  it('GET /api/marketing/posts should return 30-day posts and campaign summary', async () => {
    const req = new Request('http://localhost:3000/api/marketing/posts');
    const res = await getPosts(req);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.success).toBe(true);
    expect(data.posts).toHaveLength(30);
    expect(data.summary.totalPosts).toBe(30);
  });

  it('GET /api/marketing/posts with search filter should return matching items', async () => {
    const req = new Request('http://localhost:3000/api/marketing/posts?search=Malayalam');
    const res = await getPosts(req);
    const data = await res.json();
    expect(data.success).toBe(true);
    expect(data.posts.length).toBeGreaterThan(0);
  });

  it('POST /api/marketing/posts/[id]/approve should record human approval', async () => {
    const req = new Request('http://localhost:3000/api/marketing/posts/miseva-day-11/approve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'APPROVE',
        approverName: 'Jane Rose, Assistant Professor',
        notes: 'Verified voiceover sync and brand guidelines.'
      })
    });

    const res = await approvePost(req, { params: Promise.resolve({ id: 'miseva-day-11' }) });
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.success).toBe(true);
    expect(data.post.status).toBe('Approved');
    expect(data.post.approvalRecord.approverName).toBe('Jane Rose, Assistant Professor');
  });

  it('GET & POST /api/marketing/pause should inspect and toggle emergency campaign pause', async () => {
    // Check initial state
    const getRes = await getPause();
    const getData = await getRes.json();
    expect(getData.isPaused).toBe(false);

    // Toggle ON
    const toggleReq = new Request('http://localhost:3000/api/marketing/pause', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        isPaused: true,
        reason: 'Temporary audit by brand security team',
        actor: 'Security Guardian'
      })
    });
    const postRes = await togglePause(toggleReq);
    const postData = await postRes.json();
    expect(postData.isPaused).toBe(true);
    expect(postData.reason).toContain('Temporary audit');

    // Toggle OFF again
    const resetReq = new Request('http://localhost:3000/api/marketing/pause', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isPaused: false })
    });
    await togglePause(resetReq);
  });

  it('GET /api/marketing/analytics should return funnel report and growth experiments', async () => {
    const res = await getAnalytics();
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.funnel).toBeDefined();
    expect(data.funnel.observedAttributedRevenueInr).toBeGreaterThan(0);
    expect(data.experiments.length).toBeGreaterThanOrEqual(7);
    expect(data.weeklyDigest).toBeDefined();
  });

  it('GET /api/marketing/export?format=CSV should return downloadable CSV calendar', async () => {
    const req = new Request('http://localhost:3000/api/marketing/export?format=CSV');
    const res = await exportCalendar(req);
    expect(res.status).toBe(200);
    expect(res.headers.get('Content-Type')).toContain('text/csv');

    const csvText = await res.text();
    expect(csvText).toContain('Day,Title,Phase,Pillar,Format,Platforms,Status');
  });
});
