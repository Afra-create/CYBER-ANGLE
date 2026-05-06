import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// import { initializeApp, cert } from 'firebase-admin/app';
// import { getFirestore } from 'firebase-admin/firestore';
import OpenAI from 'openai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Initialize OpenAI (Requires OPENAI_API_KEY in .env)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'dummy_key_to_prevent_crash_if_missing',
});

// Firebase Admin setup (Commented out until service account is provided)
// const serviceAccount = require('./serviceAccountKey.json');
// initializeApp({ credential: cert(serviceAccount) });
// const db = getFirestore();

// In-memory mock database for fallback
const mockAlerts = [
  { id: 1, type: 'SMS', message: 'High volume of fake delivery SMS reported in your area.', date: new Date().toISOString(), severity: 'high' },
  { id: 2, type: 'Email', message: 'Phishing campaign targeting bank customers.', date: new Date(Date.now() - 86400000).toISOString(), severity: 'medium' }
];

const mockReports = [];

// --- API ROUTES ---

// Root route
app.get('/', (req, res) => {
  res.json({
    name: 'CyberSafe Hub API',
    status: 'running',
    version: '1.0.0',
    endpoints: {
      health:  'GET  /api/health',
      scan:    'POST /api/scan',
      chat:    'POST /api/chat',
      report:  'POST /api/reports',
      alerts:  'GET  /api/alerts',
    }
  });
});

// 1. Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'CyberSafe Hub Backend is running.' });
});

// 2. Scam Message Scanner
// Analyzes a message or URL for phishing/scam patterns
app.post('/api/scan', async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Text or URL is required for scanning.' });

  try {
    // If we have a real OpenAI key, use it. Otherwise, return mock response.
    if (process.env.OPENAI_API_KEY) {
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a cybersecurity expert. Analyze the following text/URL and determine if it is a scam. Respond with a JSON object containing "isScam" (boolean), "threatLevel" (Low, Medium, High), and "analysis" (a brief explanation).' },
          { role: 'user', content: text }
        ],
        response_format: { type: 'json_object' }
      });
      const result = JSON.parse(response.choices[0].message.content);
      return res.json(result);
    } else {
      // Mock analysis logic
      const isScam = text.toLowerCase().includes('urgent') || text.toLowerCase().includes('win') || text.toLowerCase().includes('http');
      res.json({
        isScam,
        threatLevel: isScam ? 'High' : 'Low',
        analysis: isScam ? 'This message contains suspicious keywords typical of phishing attempts.' : 'No immediate threats detected, but always stay vigilant.',
        source: 'Mock Scanner'
      });
    }
  } catch (error) {
    console.error('Scan Error:', error);
    res.status(500).json({ error: 'Failed to analyze the message.' });
  }
});

// 3. AI Chatbot Assistant
app.post('/api/chat', async (req, res) => {
  const { message, history = [] } = req.body;
  if (!message) return res.status(400).json({ error: 'Message is required.' });

  try {
    if (process.env.OPENAI_API_KEY) {
      const messages = [
        { role: 'system', content: 'You are a helpful cybersecurity assistant named CyberSafe AI. You help users identify scams, explain security concepts simply, and provide actionable advice. Keep answers concise.' },
        ...history,
        { role: 'user', content: message }
      ];
      
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages
      });
      
      res.json({ reply: response.choices[0].message.content });
    } else {
      // Mock response
      res.json({ reply: `(Mock Mode) I understand you asked: "${message}". As an AI, I suggest verifying the sender's identity before clicking any links.`, source: 'Mock Chatbot' });
    }
  } catch (error) {
    console.error('Chat Error:', error);
    res.status(500).json({ error: 'Chatbot failed to respond.' });
  }
});

// 4. Submit Scam Report
app.post('/api/reports', async (req, res) => {
  const { type, content, description, userEmail } = req.body;
  
  if (!content || !type) {
    return res.status(400).json({ error: 'Type and content are required to file a report.' });
  }

  const newReport = {
    id: Date.now().toString(),
    type,
    content,
    description,
    userEmail: userEmail || 'anonymous',
    status: 'pending_review',
    createdAt: new Date().toISOString()
  };

  try {
    // If Firebase Admin is configured, use it:
    // await db.collection('reports').doc(newReport.id).set(newReport);
    
    // Fallback:
    mockReports.push(newReport);
    res.status(201).json({ message: 'Report submitted successfully.', reportId: newReport.id });
  } catch (error) {
    console.error('Reporting Error:', error);
    res.status(500).json({ error: 'Failed to submit report.' });
  }
});

// 5. Fetch Recent Alerts
app.get('/api/alerts', async (req, res) => {
  try {
    // If Firebase Admin is configured:
    // const snapshot = await db.collection('alerts').orderBy('date', 'desc').limit(5).get();
    // const alerts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    // return res.json(alerts);
    
    res.json(mockAlerts);
  } catch (error) {
    console.error('Alerts Error:', error);
    res.status(500).json({ error: 'Failed to fetch alerts.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
