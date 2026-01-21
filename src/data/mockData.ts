import { Review, AnalyticsData, User } from '../types';

export const mockUser: User = {
  uid: '1',
  email: 'developer@example.com',
  displayName: 'Alex Developer',
  preferences: {
    strictness: 'moderate',
    codingStandard: 'airbnb',
    notifications: true,
  },
};

export const mockReviews: Review[] = [
  {
    id: '1',
    userId: '1',
    language: 'TypeScript',
    context: 'Frontend',
    code: `function fetchUserData(userId) {
  const data = fetch('/api/users/' + userId).then(r => r.json());
  return data;
}`,
    issues: [
      {
        id: '1-1',
        category: 'Code Quality',
        severity: 'MEDIUM',
        title: 'Missing type annotations',
        description: 'Function parameters and return type should have explicit type annotations.',
        lineNumber: 1,
        explanation: 'TypeScript works best with explicit types. This improves code maintainability and catches errors at compile time.',
        refactoredExample: `async function fetchUserData(userId: string): Promise<User> {
  const response = await fetch(\`/api/users/\${userId}\`);
  return response.json();
}`,
      },
      {
        id: '1-2',
        category: 'Performance',
        severity: 'LOW',
        title: 'String concatenation in URL',
        description: 'Use template literals for better readability and performance.',
        lineNumber: 2,
        explanation: 'Template literals are more readable and prevent common errors in string concatenation.',
        refactoredExample: `fetch(\`/api/users/\${userId}\`)`,
      },
      {
        id: '1-3',
        category: 'Best Practices',
        severity: 'HIGH',
        title: 'Missing error handling',
        description: 'Network requests should include error handling for failed requests.',
        lineNumber: 2,
        explanation: 'Always handle potential errors in async operations to prevent unhandled promise rejections.',
        refactoredExample: `try {
  const response = await fetch(\`/api/users/\${userId}\`);
  if (!response.ok) throw new Error('Failed to fetch user');
  return response.json();
} catch (error) {
  console.error('Error fetching user:', error);
  throw error;
}`,
      },
    ],
    severityScore: 72,
    createdAt: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    userId: '1',
    language: 'JavaScript',
    context: 'Backend',
    code: `const users = [];
for (var i = 0; i < data.length; i++) {
  users.push(data[i].name);
}`,
    issues: [
      {
        id: '2-1',
        category: 'Best Practices',
        severity: 'MEDIUM',
        title: 'Use const instead of var',
        description: 'var has function scope and can lead to unexpected behavior. Use const or let.',
        lineNumber: 2,
        explanation: 'Modern JavaScript prefers const and let for block scoping and better predictability.',
        refactoredExample: `for (let i = 0; i < data.length; i++) {`,
      },
      {
        id: '2-2',
        category: 'Refactoring',
        severity: 'LOW',
        title: 'Use array methods instead of loops',
        description: 'This can be simplified using map() for better readability.',
        lineNumber: 2,
        explanation: 'Functional array methods are more declarative and less error-prone.',
        refactoredExample: `const users = data.map(item => item.name);`,
      },
    ],
    severityScore: 85,
    createdAt: '2024-01-14T14:20:00Z',
  },
  {
    id: '3',
    userId: '1',
    language: 'TypeScript',
    context: 'API',
    code: `app.get('/api/users', (req, res) => {
  const query = req.query.search;
  db.query('SELECT * FROM users WHERE name = ' + query);
});`,
    issues: [
      {
        id: '3-1',
        category: 'Security',
        severity: 'CRITICAL',
        title: 'SQL Injection vulnerability',
        description: 'Directly concatenating user input into SQL queries is dangerous.',
        lineNumber: 3,
        explanation: 'Always use parameterized queries to prevent SQL injection attacks.',
        refactoredExample: `db.query('SELECT * FROM users WHERE name = ?', [query]);`,
      },
      {
        id: '3-2',
        category: 'Best Practices',
        severity: 'MEDIUM',
        title: 'Missing error handling',
        description: 'Database queries should have error handling.',
        lineNumber: 3,
        explanation: 'Always handle database errors to prevent crashes and provide meaningful error messages.',
        refactoredExample: `try {
  const result = await db.query('SELECT * FROM users WHERE name = ?', [query]);
  res.json(result);
} catch (error) {
  res.status(500).json({ error: 'Database error' });
}`,
      },
    ],
    severityScore: 45,
    createdAt: '2024-01-13T09:15:00Z',
  },
];

export const mockAnalytics: AnalyticsData = {
  totalReviews: 12,
  avgSeverityScore: 67,
  improvementTrend: 15,
  issuesByCategory: {
    'Code Quality': 8,
    'Performance': 5,
    'Security': 3,
    'Best Practices': 12,
    'Refactoring': 6,
  },
  severityDistribution: {
    'LOW': 10,
    'MEDIUM': 15,
    'HIGH': 7,
    'CRITICAL': 2,
  },
  recentReviews: mockReviews,
};
