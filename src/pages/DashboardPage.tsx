import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Wand2, Loader2 } from 'lucide-react';
import { useVideoStore, Video } from '@/store/videoStore';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
const DashboardPage = () => {
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [generatedVideo, setGeneratedVideo] = useState<Video | null>(null);
  const addVideo = useVideoStore((state) => state.addVideo);
  const isLoading = useVideoStore((state) => state.isLoading);
  const setLoading = useVideoStore((state) => state.setLoading);
  const setError = useVideoStore((state) => state.setError);
  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt.');
      return;
    }
    setLoading(true);
    setError(null);
    setGeneratedVideo(null);
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('/api/video/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ prompt, aspectRatio }),
      });
      const data = await response.json();
      if (response.ok) {
        const newVideo: Video = {
          id: crypto.randomUUID(),
          prompt,
          url: data.url,
          createdAt: new Date().toISOString(),
        };
        addVideo(newVideo);
        setGeneratedVideo(newVideo);
        toast.success('Video generated successfully!');
      } else {
        throw new Error(data.error || 'Failed to generate video.');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 md:py-10 lg:py-12">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold">Video Generation Dashboard</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Craft your next visual masterpiece. Just describe it, and we'll bring it to life.
          </p>
        </div>
        <Card className="mt-10 max-w-3xl mx-auto shadow-lg rounded-2xl">
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="prompt" className="text-lg font-medium">Your Creative Prompt</Label>
                <Textarea
                  id="prompt"
                  placeholder="e.g., a cartoon fox programming on a laptop in a cozy forest"
                  rows={4}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="text-base"
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-3">
                <Label className="text-lg font-medium">Aspect Ratio</Label>
                <RadioGroup
                  defaultValue="16:9"
                  className="flex flex-wrap gap-4"
                  value={aspectRatio}
                  onValueChange={setAspectRatio}
                  disabled={isLoading}
                >
                  {['16:9', '9:16', '1:1', '4:3'].map((ratio) => (
                    <div key={ratio} className="flex items-center space-x-2">
                      <RadioGroupItem value={ratio} id={`r-${ratio}`} />
                      <Label htmlFor={`r-${ratio}`} className="font-normal">{ratio}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <Button onClick={handleGenerate} size="lg" className="w-full text-lg bg-brand-coral text-brand-navy hover:bg-brand-coral/90" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Wand2 className="mr-2 h-5 w-5" />}
                Generate Video
              </Button>
            </div>
          </CardContent>
        </Card>
        <div className="mt-12 max-w-3xl mx-auto">
          <AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center p-8 border-2 border-dashed rounded-2xl"
              >
                <Loader2 className="h-12 w-12 mx-auto text-brand-coral animate-spin" />
                <p className="mt-4 text-xl font-medium text-muted-foreground">Generating your vision...</p>
                <p className="text-muted-foreground">This might take a moment.</p>
              </motion.div>
            )}
            {generatedVideo && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-display font-bold text-center mb-4">Your Creation is Ready!</h2>
                <Card className="overflow-hidden shadow-xl rounded-2xl">
                  <div className="aspect-video bg-black">
                    <video
                      key={generatedVideo.url}
                      src={generatedVideo.url}
                      controls
                      autoPlay
                      className="w-full h-full"
                    />
                  </div>
                  <div className="p-4 bg-muted/50">
                    <p className="text-sm text-muted-foreground italic">"{generatedVideo.prompt}"</p>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
export default DashboardPage;