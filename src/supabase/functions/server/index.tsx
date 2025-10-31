import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import * as kv from './kv_store.tsx';

const app = new Hono();

// Middleware
app.use('*', cors());
app.use('*', logger(console.log));

// KV Store routes
app.post('/make-server-ecebe60b/kv/get', async (c) => {
  try {
    const { key } = await c.req.json();
    const value = await kv.get(key);
    return c.json({ value });
  } catch (error) {
    console.error('Error in /kv/get:', error);
    return c.json({ error: String(error) }, 500);
  }
});

app.post('/make-server-ecebe60b/kv/set', async (c) => {
  try {
    const { key, value } = await c.req.json();
    await kv.set(key, value);
    return c.json({ success: true });
  } catch (error) {
    console.error('Error in /kv/set:', error);
    return c.json({ error: String(error) }, 500);
  }
});

app.post('/make-server-ecebe60b/kv/del', async (c) => {
  try {
    const { key } = await c.req.json();
    await kv.del(key);
    return c.json({ success: true });
  } catch (error) {
    console.error('Error in /kv/del:', error);
    return c.json({ error: String(error) }, 500);
  }
});

// Health check
app.get('/make-server-ecebe60b/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

Deno.serve(app.fetch);
