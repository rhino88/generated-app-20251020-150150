import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Clapperboard, Wand2, Film } from 'lucide-react';
import { motion } from 'framer-motion';
const HomePage = () => {
  return (
    <div className="min-h-screen bg-brand-cream dark:bg-brand-navy text-brand-navy dark:text-brand-cream overflow-hidden">
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Clapperboard className="h-8 w-8 text-brand-coral" />
            <span className="text-2xl font-display font-bold">StellarFrame</span>
          </div>
          <div className="space-x-2">
            <Button asChild variant="ghost">
              <Link to="/login">Log In</Link>
            </Button>
            <Button asChild className="bg-brand-navy text-brand-cream hover:bg-brand-navy/90 dark:bg-brand-cream dark:text-brand-navy dark:hover:bg-brand-cream/90 rounded-full">
              <Link to="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-24 md:py-32 lg:py-40 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-extrabold tracking-tight">
                Create Videos
                <br />
                <span className="text-brand-coral">from Pure Imagination</span>
              </h1>
              <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-brand-navy/80 dark:text-brand-cream/80">
                StellarFrame transforms your text prompts into stunning, high-quality videos.
                Unleash your creativity and bring your stories to life with the power of AI.
              </p>
              <div className="mt-10 flex justify-center gap-4">
                <Button asChild size="lg" className="bg-brand-navy text-brand-cream hover:bg-brand-navy/90 dark:bg-brand-cream dark:text-brand-navy dark:hover:bg-brand-cream/90 rounded-full px-8 py-6 text-lg transition-transform hover:scale-105">
                  <Link to="/signup">Start Creating for Free</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 h-1/2 bg-background" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="bg-brand-navy dark:bg-gray-800/20 rounded-3xl shadow-2xl p-8"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8 }}
            >
              <div className="aspect-video bg-brand-navy/50 rounded-2xl flex items-center justify-center">
                <p className="text-brand-cream/50 text-lg">
                  [Whimsical animation of ideas turning into video]
                </p>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-display font-bold">How It Works</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-brand-navy/80 dark:text-brand-cream/80">
                A simple, magical, three-step process.
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-brand-coral/20 mx-auto">
                  <Wand2 className="h-8 w-8 text-brand-coral" />
                </div>
                <h3 className="mt-6 text-2xl font-display font-bold">1. Write a Prompt</h3>
                <p className="mt-2 text-brand-navy/80 dark:text-brand-cream/80">Describe any scene, character, or story you can imagine. The more detailed, the better!</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-brand-coral/20 mx-auto">
                  <Clapperboard className="h-8 w-8 text-brand-coral" />
                </div>
                <h3 className="mt-6 text-2xl font-display font-bold">2. Generate Video</h3>
                <p className="mt-2 text-brand-navy/80 dark:text-brand-cream/80">Our AI gets to work, interpreting your words and crafting a unique video masterpiece.</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-brand-coral/20 mx-auto">
                  <Film className="h-8 w-8 text-brand-coral" />
                </div>
                <h3 className="mt-6 text-2xl font-display font-bold">3. Watch & Share</h3>
                <p className="mt-2 text-brand-navy/80 dark:text-brand-cream/80">Download your creation, share it with the world, or keep it in your personal gallery.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-brand-navy text-brand-cream">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; {new Date().getFullYear()} StellarFrame. Built with ❤️ at Cloudflare.</p>
        </div>
      </footer>
    </div>
  );
};
export default HomePage;