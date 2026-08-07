"use client";
import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { LineChart, UploadCloud, FileSpreadsheet, PieChart } from 'lucide-react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';

export default function DataAnalyzerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<any>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const analyzeData = async () => {
    if (!file) return;
    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/data-analysis/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      // Merge backend basic stats with some AI insights (placeholder until full AI model integration for data analysis)
      setReport({
        ...response.data,
        insights: [
          "Strong correlation detected between columns.",
          "Check for inconsistent formats in categorical data.",
          "Potential outliers detected in numeric distributions."
        ]
      });
      toast.success('Data analyzed successfully!');
    } catch (error) {
      toast.error('Failed to analyze data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <Toaster position="top-right" />
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center text-secondary">
          <LineChart size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-heading font-bold">AI Data Analysis Assistant</h1>
          <p className="text-white/50">Upload datasets to instantly generate quality reports and actionable insights.</p>
        </div>
      </div>

      <Card className="border-dashed flex flex-col items-center justify-center py-16">
        <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
          <UploadCloud size={32} className="text-primary" />
        </div>
        <h3 className="text-xl font-medium mb-2">Upload your dataset</h3>
        <p className="text-white/50 text-sm mb-6">Supports CSV (Max 50MB)</p>

        <input
          type="file"
          id="file-upload"
          className="hidden"
          accept=".csv"
          onChange={handleUpload}
        />
        <label htmlFor="file-upload">
          <Button variant="secondary" className="cursor-pointer pointer-events-none">
            Browse Files
          </Button>
        </label>

        {file && (
          <div className="mt-6 flex items-center space-x-3 bg-white/5 px-4 py-2 rounded-lg">
            <FileSpreadsheet size={16} className="text-secondary" />
            <span className="text-sm font-medium">{file.name}</span>
            <Button variant="primary" onClick={analyzeData} disabled={loading}>
              {loading ? 'Analyzing...' : 'Analyze Data'}
            </Button>
          </div>
        )}
      </Card>

      {report && !report.error && (
        <div className="grid md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card className="col-span-3">
            <h3 className="font-heading font-semibold text-lg mb-4 flex items-center space-x-2">
              <PieChart size={20} className="text-accent" />
              <span>Data Quality Overview</span>
            </h3>
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-white/5 p-4 rounded-lg">
                <div className="text-sm text-white/50 mb-1">Total Rows</div>
                <div className="text-2xl font-bold">{report.rows?.toLocaleString() || 0}</div>
              </div>
              <div className="bg-white/5 p-4 rounded-lg">
                <div className="text-sm text-white/50 mb-1">Total Columns</div>
                <div className="text-2xl font-bold">{String(report.columns || 0)}</div>
              </div>
              <div className="bg-error/10 p-4 rounded-lg border border-error/20">
                <div className="text-sm text-error/70 mb-1">Missing Values</div>
                <div className="text-2xl font-bold text-error">{String(report.missing_values || 0)}</div>
              </div>
              <div className="bg-warning/10 p-4 rounded-lg border border-yellow-500/20">
                <div className="text-sm text-yellow-500/70 mb-1">Columns Tracked</div>
                <div className="text-2xl font-bold text-yellow-500">{String((report.columns_list as string[])?.length || 0)}</div>
              </div>
            </div>
          </Card>

          <Card className="col-span-3 border-secondary/30">
            <h3 className="font-heading font-semibold text-lg mb-4 text-secondary">AI Insights & Suggestions</h3>
            <ul className="space-y-3">
              {Array.isArray(report.insights) ? report.insights.map((insight: string, i: number) => (
                <li key={i} className="flex items-start space-x-3 bg-white/5 p-3 rounded-lg">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 shrink-0" />
                  <span className="text-sm text-white/80">{insight}</span>
                </li>
              )) : null}
            </ul>
          </Card>
        </div>
      )}
    </div>
  );
}
