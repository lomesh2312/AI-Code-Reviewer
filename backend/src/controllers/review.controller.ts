import { Response } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Review from '../models/Review';
import { AuthRequest } from '../middleware/auth.middleware';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export const analyzeCode = async (req: AuthRequest, res: Response) => {
    try {
        const { code, language, context } = req.body;
        const userId = req.user.uid;

        if (!code) {
            return res.status(400).json({ message: 'Code is required' });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
      Analyze the following ${language} code for a ${context} context.
      Return the response in strict JSON format with the following structure:
      {
        "issues": [
          {
            "category": "Code Quality" | "Performance" | "Security" | "Best Practices" | "Refactoring",
            "severity": "LOW" | "MEDIUM" | "HIGH" | "CRITICAL",
            "title": "Short title of the issue",
            "description": "Brief description",
            "lineNumber": number (if applicable, else null),
            "explanation": "Detailed explanation",
            "refactoredExample": "String containing the refactored code snippet"
          }
        ],
        "severityScore": number (0-100, where 100 is best)
      }

      Code to analyze:
      \`\`\`${language}
      ${code}
      \`\`\`
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean up markdown code blocks if present
        const cleanText = text.replace(/```json\n?|\n?```/g, '').trim();

        let analysisResult;
        try {
            analysisResult = JSON.parse(cleanText);
        } catch {
            console.error('Failed to parse Gemini response:', text);
            return res.status(500).json({ message: 'Failed to analyze code' });
        }

        const review = new Review({
            userId,
            originalCode: code,
            language,
            context,
            issues: analysisResult.issues,
            severityScore: analysisResult.severityScore,
        });

        await review.save();

        const reviewObj = review.toObject();
        if (reviewObj.issues) {
            reviewObj.issues = reviewObj.issues.map((issue: Record<string, any>) => ({
                ...issue,
                id: issue._id.toString(),
            }));
        }

        res.status(201).json(reviewObj);
    } catch (error) {
        console.error('Error analyzing code:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getReviews = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user.uid;
        const reviews = await Review.find({ userId }).sort({ createdAt: -1 });

        const transformedReviews = reviews.map(review => {
            const r = review.toObject();
            if (r.issues) {
                r.issues = r.issues.map((issue: Record<string, any>) => ({
                    ...issue,
                    id: issue._id.toString(),
                }));
            }
            return r;
        });

        res.json(transformedReviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getReviewById = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const userId = req.user.uid;
        const review = await Review.findOne({ _id: id, userId });

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        const r = review.toObject();
        if (r.issues) {
            r.issues = r.issues.map((issue: Record<string, any>) => ({
                ...issue,
                id: issue._id.toString(),
            }));
        }

        res.json(r);
    } catch (error) {
        console.error('Error fetching review:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
