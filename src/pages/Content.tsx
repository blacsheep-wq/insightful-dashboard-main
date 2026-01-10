import { useState, useEffect } from 'react';
import { Sparkles, Send, Lightbulb, TrendingUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { usePlatform } from '@/contexts/PlatformContext';
import { Badge } from '@/components/ui/badge';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { toast } from "sonner";
import { useLocation } from 'react-router-dom';

// Initialize Gemini API
const API_KEY = 'AIzaSyA4Tn1a6_uUx5-W1BCzARGq7z8L0dNc-oY';
const genAI = new GoogleGenerativeAI(API_KEY);

interface Idea {
  headline: string;
  description: string;
  format: string;
  content?: string;
}

export default function Content() {
  const [topic, setTopic] = useState('');
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(false);
  const { platform } = usePlatform();
  const location = useLocation();

  const handleGenerate = async (overrideTopic?: string) => {
    const topicToUse = overrideTopic || topic;
    if (!topicToUse.trim()) return;

    if (overrideTopic) setTopic(overrideTopic);

    setLoading(true);
    
    const models = ["gemini-3-flash-preview", "gemini-2.0-flash", "gemini-1.5-flash", "gemini-1.5-pro", "gemini-1.5-flash-8b", "gemini-1.0-pro", "gemini-pro"];
    let success = false;

    // Try models in sequence until one works
    for (const modelName of models) {
      if (success) break;
      
      try {
        console.log(`Attempting generation with model: ${modelName}`);
        const model = genAI.getGenerativeModel({ model: modelName });

        const prompt = `
          You are an expert social media content creator. 
          Generate 3 distinct content ideas for the platform: "${platform}" based on the topic: "${topicToUse}".
          
          For each idea, provide:
          1. A catchy Headline.
          2. A brief Description of the concept.
          3. The Format (e.g., Reel, Carousel, Tweet, Post).
          4. The full Content draft (caption, script, or text body).
          
          Return the result as a strictly valid JSON array of objects with keys: "headline", "description", "format", "content".
          Do not wrap the JSON in markdown code blocks. Just return the raw JSON array.
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();
        
        // Clean up markdown code blocks if present
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();

        const generatedIdeas = JSON.parse(text);
        
        if (Array.isArray(generatedIdeas)) {
           setIdeas(generatedIdeas);
           success = true; // Mark as successful to exit loop
           console.log(`Successfully generated with ${modelName}`);
        } else {
           // If parsing fails, we might want to try another model or just throw
           console.warn(`Invalid format from ${modelName}`);
           continue; 
        }

      } catch (error: any) {
        console.warn(`Failed with model ${modelName}:`, error.message);
        // Continue to next model
      }
    }

    if (!success) {
      console.error('All models failed.');
      toast.error("Failed to generate content. Please check your API limits or try again later.");
    }
    
    setLoading(false);
  };

  useEffect(() => {
    if (location.state?.topic) {
      handleGenerate(location.state.topic);
      // Clear state to prevent re-run on simple re-renders if utilizing location history manip
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const suggestions = [
    "How to grow your audience",
    "Viral video trends 2024",
    "Engagement hacks",
    "Monetization strategies"
  ];

  return (
    <div className="p-6 space-y-8 animate-fade-in">
      <div className="text-center space-y-4 max-w-2xl mx-auto pt-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Sparkles className="h-4 w-4" />
          <span>Powered by Gemini AI</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight">
          What content should you create next?
        </h1>
        <p className="text-muted-foreground text-lg">
          Get AI-generated content ideas tailored to your niche and audience.
        </p>

        <div className="flex gap-2 max-w-md mx-auto relative mt-8">
          <Input 
            placeholder="Enter a topic (e.g., 'Wellness tips', 'Tech reviews')" 
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="h-12 pl-4 pr-12 text-lg shadow-sm"
            onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
          />
          <Button 
            className="absolute right-1 top-1 h-10 w-10 p-0 rounded-md"
            onClick={() => handleGenerate()}
            disabled={loading}
          >
            {loading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-r-transparent" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Suggestions Column */}
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          <span className="text-sm text-muted-foreground flex items-center gap-1">
             <Lightbulb className="h-3 w-3" /> Try:
          </span>
          {suggestions.map((s) => (
             <Badge 
               key={s} 
               variant="secondary" 
               className="cursor-pointer hover:bg-secondary/80"
               onClick={() => {
                 setTopic(s);
                 // Optional: Auto-trigger generation
                 // handleGenerate(); 
               }}
             >
               {s}
             </Badge>
          ))}
        </div>
      </div>

      {/* Generated Ideas Grid */}
      {ideas.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto pt-8">
          {ideas.map((idea, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-primary/20">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                   <Badge variant="outline" className="bg-primary/5">{idea.format}</Badge>
                   <TrendingUp className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {idea.headline}
                </CardTitle>
                <CardDescription className="text-base pt-2">
                  {idea.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                 <div className="mt-4 p-4 bg-secondary/10 rounded-md text-sm text-muted-foreground max-h-60 overflow-y-auto whitespace-pre-wrap">
                    {idea.content || "Content generated..."}
                 </div>
                 <Button variant="secondary" className="w-full mt-4" onClick={() => {
                    navigator.clipboard.writeText(idea.content || "");
                    toast.success("Content copied to clipboard!");
                 }}>
                    Copy Content
                 </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
