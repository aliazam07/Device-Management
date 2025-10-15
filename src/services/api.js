// Simple mock API service. Replace with real HTTP requests later.
import { mockAssets, mockMaintenance } from '../mock/mockData';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export async function getAssets() {
  await delay(200); // simulate latency
  return JSON.parse(JSON.stringify(mockAssets));
}

export async function getMaintenance() {
  await delay(200);
  return JSON.parse(JSON.stringify(mockMaintenance));
}
