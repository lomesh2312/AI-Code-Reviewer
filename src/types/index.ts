export type Language = 'JavaScript' | 'TypeScript' | 'Python' | 'Java' | 'Go';
export type Context = 'Frontend' | 'Backend' | 'API' | 'Utility';
export type Severity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type Category = 'Code Quality' | 'Performance' | 'Security' | 'Best Practices' | 'Refactoring';

export interface Issue {
  id: string;
  category: Category;
  severity: Severity;
  title: string;
  description: string;
  lineNumber?: number;
  refactoredExample?: string;
  explanation: string;
}

export interface Review {
  id: string;
  userId: string;
  language: Language;
  context: Context;
  code: string;
  issues: Issue[];
  severityScore: number;
  createdAt: string;
  refactoredCode?: string;
}

export interface User {
  uid: string;
  email: string;
  displayName?: string;
  preferences: UserPreferences;
}

export interface UserPreferences {
  strictness: 'lenient' | 'moderate' | 'strict';
  codingStandard: 'standard' | 'google' | 'airbnb';
  notifications: boolean;
}

export interface AnalyticsData {
  totalReviews: number;
  avgSeverityScore: number;
  improvementTrend: number;
  issuesByCategory: Record<Category, number>;
  severityDistribution: Record<Severity, number>;
  recentReviews: Review[];
}
