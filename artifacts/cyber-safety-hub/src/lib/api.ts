const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Health check
  async healthCheck() {
    return this.request<{ status: string; message: string }>('/api/health');
  }

  // Scan message/URL for threats
  async scanMessage(text: string) {
    return this.request<{
      isScam: boolean;
      threatLevel: string;
      analysis: string;
      source?: string;
    }>('/api/scan', {
      method: 'POST',
      body: JSON.stringify({ text }),
    });
  }

  // Chat with AI assistant
  async chat(message: string, history: any[] = []) {
    return this.request<{
      reply: string;
      source?: string;
    }>('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message, history }),
    });
  }

  // Submit scam report
  async submitReport(report: {
    type: string;
    content: string;
    description?: string;
    userEmail?: string;
  }) {
    return this.request<{
      message: string;
      reportId: string;
    }>('/api/reports', {
      method: 'POST',
      body: JSON.stringify(report),
    });
  }

  // Get alerts
  async getAlerts() {
    return this.request<Array<{
      id: number;
      type: string;
      message: string;
      date: string;
      severity: string;
    }>>('/api/alerts');
  }

  // Get dashboard data
  async getDashboardData() {
    return this.request<{
      userStats: {
        level: string;
        xp: number;
        xpToNext: number;
        modulesCompleted: number;
        totalModules: number;
        reportsSubmitted: number;
      };
      scamTrends: Array<{
        name: string;
        Phishing: number;
        OTP: number;
        Job: number;
      }>;
      reportsData: Array<{
        month: string;
        reports: number;
      }>;
    }>('/api/dashboard');
  }

  // Get user progress
  async getUserProgress() {
    return this.request<{
      level: string;
      xp: number;
      badges: string[];
      completedModules: string[];
      streak: number;
    }>('/api/user/progress');
  }

  // Update user progress
  async updateProgress(moduleId: string, xpGained: number) {
    return this.request<{
      success: boolean;
      newXp: number;
      newLevel?: string;
    }>('/api/user/progress', {
      method: 'POST',
      body: JSON.stringify({ moduleId, xpGained }),
    });
  }
}

export const apiClient = new ApiClient();