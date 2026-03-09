import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  try {
    const root = path.resolve(process.cwd());
    const agentPath = path.join(root, '.agent', 'mcp_config.json');
    if (!fs.existsSync(agentPath)) {
      return res.status(404).json({ error: '.agent/mcp_config.json not found' });
    }
    const raw = fs.readFileSync(agentPath, 'utf-8');
    const json = JSON.parse(raw);
    return res.status(200).json(json);
  } catch (err) {
    return res.status(500).json({ error: String(err) });
  }
}
