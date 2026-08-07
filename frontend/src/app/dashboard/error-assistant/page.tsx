"use client";
import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Bot, Bug, Code2, AlertTriangle, CheckCircle2, List, ShieldCheck } from 'lucide-react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';

export default function ErrorAssistantPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [code, setCode] = useState('');
  const [logs, setLogs] = useState('');
  const [language, setLanguage] = useState('python');

  const languages = [
    'Python', 'Java', 'JavaScript', 'TypeScript', 'C++', 'C#', 'Go', 'PHP', 'Rust', 'SQL',
    'React', 'Angular', 'Vue', 'Node.js', 'Django', 'Spring Boot', 'Laravel'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/error-fix/`, {
        code,
        logs,
        language
      });
      setResult(response.data);
      toast.success('Analysis complete!');
    } catch (error) {
      toast.error('Failed to analyze code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <Toaster position="top-right" />
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
          <Bug size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-heading font-bold">AI Error Fix Assistant</h1>
          <p className="text-white/50">Paste your code and logs to get instant AI-powered fixes.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Card className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                {languages.map(lang => (
                  <option key={lang} value={lang.toLowerCase()}>{lang}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Code Snippet</label>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                rows={8}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Paste your problematic code here..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Error Logs</label>
              <textarea
                value={logs}
                onChange={(e) => setLogs(e.target.value)}
                rows={4}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white font-mono text-sm text-error/80 focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Paste console output or stack trace..."
              />
            </div>

            <Button type="submit" className="w-full py-3 flex items-center justify-center space-x-2" disabled={loading}>
              <Bot size={20} />
              <span>{loading ? 'Analyzing...' : 'Analyze & Fix Error'}</span>
            </Button>
          </Card>
        </form>

        <div className="space-y-4 h-full">
          {result ? (
            <Card className="h-full border-success/30 bg-success/5 space-y-6 overflow-y-auto max-h-[800px]">
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="text-success shrink-0 mt-1" />
                <div>
                  <h3 className="font-medium text-lg text-success mb-1">Root Cause Identified</h3>
                  <p className="text-white/70 text-sm">{result.root_cause}</p>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3 flex items-center space-x-2">
                  <Bot size={16} />
                  <span>Explanation</span>
                </h3>
                <p className="text-sm text-white/80">{result.explanation}</p>
              </div>

              <div>
                <h3 className="font-medium mb-3 flex items-center space-x-2">
                  <Code2 size={16} />
                  <span>Corrected Code</span>
                </h3>
                <div className="bg-black/40 rounded-lg p-4 border border-white/10 overflow-x-auto">
                  <pre className="text-sm font-mono text-white/90">
                    <code>{result.corrected_code}</code>
                  </pre>
                </div>
              </div>

              {result.best_practices && result.best_practices.length > 0 && (
                <div>
                  <h3 className="font-medium mb-3 flex items-center space-x-2">
                    <List size={16} />
                    <span>Best Practices</span>
                  </h3>
                  <ul className="list-disc pl-5 text-sm text-white/80 space-y-1">
                    {result.best_practices.map((practice: string, idx: number) => (
                      <li key={idx}>{practice}</li>
                    ))}
                  </ul>
                </div>
              )}

              {result.unit_tests && (
                <div>
                  <h3 className="font-medium mb-3 flex items-center space-x-2">
                    <ShieldCheck size={16} />
                    <span>Suggested Unit Tests</span>
                  </h3>
                  <div className="bg-black/40 rounded-lg p-4 border border-white/10 overflow-x-auto">
                    <pre className="text-sm font-mono text-white/90">
                      <code>{result.unit_tests}</code>
                    </pre>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between text-sm pt-4 border-t border-white/10">
                <span className="text-white/50">Confidence Score:</span>
                <span className="font-bold text-success">{result.confidence_score}%</span>
              </div>
            </Card>
          ) : (
            <Card className="h-full flex flex-col items-center justify-center text-center p-12 border-dashed">
              <AlertTriangle size={48} className="text-white/20 mb-4" />
              <h3 className="text-lg font-medium text-white/50 mb-2">No Analysis Yet</h3>
              <p className="text-sm text-white/40">Submit your code and error logs on the left to get AI-powered insights and fixes.</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
