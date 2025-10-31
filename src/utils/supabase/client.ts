import { projectId, publicAnonKey } from './info';

const serverUrl = `https://${projectId}.supabase.co/functions/v1/make-server-ecebe60b`;

export const kvStore = {
  async get(key: string) {
    const response = await fetch(`${serverUrl}/kv/get`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ key }),
    });
    
    if (!response.ok) {
      console.error('Error getting key:', await response.text());
      return null;
    }
    
    const data = await response.json();
    return data.value;
  },

  async set(key: string, value: any) {
    const response = await fetch(`${serverUrl}/kv/set`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ key, value }),
    });
    
    if (!response.ok) {
      throw new Error('Error setting key: ' + await response.text());
    }
    
    return await response.json();
  },

  async del(key: string) {
    const response = await fetch(`${serverUrl}/kv/del`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ key }),
    });
    
    if (!response.ok) {
      throw new Error('Error deleting key: ' + await response.text());
    }
    
    return await response.json();
  }
};
