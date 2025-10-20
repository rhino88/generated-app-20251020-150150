import { useState } from 'react';
import { useVideoStore, Video } from '@/store/videoStore';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Download, Maximize, VideoOff } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';
const GalleryPage = () => {
  const videos = useVideoStore((state) => state.videos);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const handleDownload = (url: string, prompt: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${prompt.slice(0, 20).replace(/\s/g, '_')}.mp4`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  if (videos.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 md:py-10 lg:py-12 text-center">
          <VideoOff className="mx-auto h-16 w-16 text-muted-foreground" />
          <h1 className="mt-4 text-4xl md:text-5xl font-display font-bold">Your Gallery is Empty</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            You haven't generated any videos yet. Let's create something magical!
          </p>
          <Button asChild size="lg" className="mt-8 bg-brand-coral text-brand-navy hover:bg-brand-coral/90">
            <Link to="/dashboard">Go to Dashboard</Link>
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 md:py-10 lg:py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold">Your Video Gallery</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            A collection of your AI-generated masterpieces.
          </p>
        </div>
        <Dialog onOpenChange={(isOpen) => !isOpen && setSelectedVideo(null)}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video) => (
              <Card key={video.id} className="overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="aspect-video bg-black relative">
                  <video
                    src={video.url}
                    className="w-full h-full object-cover"
                    muted
                    playsInline
                    // The video will show its first frame as a preview
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <DialogTrigger asChild onClick={() => setSelectedVideo(video)}>
                      <Button size="icon" variant="outline" className="bg-white/20 hover:bg-white/30 border-none text-white">
                        <Maximize className="h-5 w-5" />
                      </Button>
                    </DialogTrigger>
                    <Button size="icon" variant="outline" className="bg-white/20 hover:bg-white/30 border-none text-white" onClick={() => handleDownload(video.url, video.prompt)}>
                      <Download className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <p className="text-sm font-medium truncate" title={video.prompt}>{video.prompt}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatDistanceToNow(new Date(video.createdAt), { addSuffix: true })}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          {selectedVideo && (
            <DialogContent className="max-w-4xl w-full p-0">
              <DialogHeader className="p-4">
                <DialogTitle className="truncate">{selectedVideo.prompt}</DialogTitle>
              </DialogHeader>
              <div className="aspect-video bg-black">
                <video
                  key={selectedVideo.id}
                  src={selectedVideo.url}
                  controls
                  autoPlay
                  className="w-full h-full"
                />
              </div>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </div>
  );
};
export default GalleryPage;