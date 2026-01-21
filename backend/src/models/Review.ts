import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
    userId: string;
    originalCode: string;
    language: string;
    context: string;
    issues: any[];
    severityScore: number;
    createdAt: Date;
}

const ReviewSchema: Schema = new Schema({
    userId: { type: String, required: true, index: true },
    originalCode: { type: String, required: true },
    language: { type: String, required: true },
    context: { type: String, required: true },
    issues: [{
        category: String,
        severity: String,
        title: String,
        description: String,
        lineNumber: Number,
        explanation: String,
        refactoredExample: String
    }],
    severityScore: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IReview>('Review', ReviewSchema);
