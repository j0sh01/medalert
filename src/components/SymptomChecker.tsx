
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Bot, ArrowRight } from 'lucide-react';

const commonSymptoms = [
  'Fever', 'Headache', 'Cough', 'Chest Pain', 'Nausea', 'Fatigue',
  'Difficulty Breathing', 'Abdominal Pain', 'Dizziness', 'Rash'
];

export const SymptomChecker: React.FC = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [customSymptom, setCustomSymptom] = useState('');
  const [aiResponse, setAiResponse] = useState('');

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const addCustomSymptom = () => {
    if (customSymptom.trim() && !selectedSymptoms.includes(customSymptom.trim())) {
      setSelectedSymptoms(prev => [...prev, customSymptom.trim()]);
      setCustomSymptom('');
    }
  };

  const analyzeSymptoms = () => {
    if (selectedSymptoms.length === 0) return;

    // Simulate AI analysis
    setAiResponse(`Based on your symptoms (${selectedSymptoms.join(', ')}), here are some recommendations:
    
    • Consider consulting with a healthcare provider
    • Monitor your symptoms closely
    • Stay hydrated and get adequate rest
    • Seek immediate medical attention if symptoms worsen
    
    This is not a medical diagnosis. Please consult a qualified healthcare professional for proper evaluation.`);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          AI Symptom Checker
        </CardTitle>
        <CardDescription>
          Describe your symptoms and get AI-powered health guidance
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Common Symptoms */}
        <div>
          <h3 className="font-medium mb-3">Common Symptoms</h3>
          <div className="flex flex-wrap gap-2">
            {commonSymptoms.map(symptom => (
              <Badge
                key={symptom}
                variant={selectedSymptoms.includes(symptom) ? "default" : "outline"}
                className="cursor-pointer transition-colors"
                onClick={() => toggleSymptom(symptom)}
              >
                {symptom}
              </Badge>
            ))}
          </div>
        </div>

        {/* Custom Symptom Input */}
        <div className="flex gap-2">
          <Input
            placeholder="Add custom symptom..."
            value={customSymptom}
            onChange={(e) => setCustomSymptom(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addCustomSymptom()}
          />
          <Button onClick={addCustomSymptom} size="sm">
            Add
          </Button>
        </div>

        {/* Selected Symptoms */}
        {selectedSymptoms.length > 0 && (
          <div>
            <h3 className="font-medium mb-2">Selected Symptoms:</h3>
            <div className="flex flex-wrap gap-1">
              {selectedSymptoms.map(symptom => (
                <Badge key={symptom} variant="secondary" className="text-xs">
                  {symptom}
                  <button
                    onClick={() => toggleSymptom(symptom)}
                    className="ml-1 hover:text-destructive"
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Analyze Button */}
        <Button 
          onClick={analyzeSymptoms}
          disabled={selectedSymptoms.length === 0}
          className="w-full gap-2"
        >
          <Search className="h-4 w-4" />
          Analyze Symptoms
          <ArrowRight className="h-4 w-4" />
        </Button>

        {/* AI Response */}
        {aiResponse && (
          <Card className="bg-muted">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Bot className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div className="whitespace-pre-line text-sm">{aiResponse}</div>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
};
