import { motion } from 'framer-motion';
import { Youtube, ExternalLink, PlayCircle, Clock, Eye, Calendar, Sparkles, Filter, ArrowRight } from 'lucide-react';
import ScriptureText from '../components/ScriptureText';

export default function Videos() {
  const channelUrl = "https://www.youtube.com/@markjjd";
  
  const categories = [
    {
      name: "The Fellowship of the Mystery",
      description: "Exploring the profound depths of the secret revealed to the Apostle Paul.",
      videos: [
        {
          id: "1",
          title: "The Revelation of the Mystery: The Basics",
          thumbnail: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&q=80&w=640&h=360",
          duration: "12:45",
          views: "1.2K",
          date: "2 months ago",
          featured: true
        },
        {
          id: "2",
          title: "The Mystery Hidden in God",
          thumbnail: "https://images.unsplash.com/photo-1490730141103-6ac217a9a7b8?auto=format&fit=crop&q=80&w=640&h=360",
          duration: "18:20",
          views: "850",
          date: "3 months ago"
        },
        {
          id: "7",
          title: "The Mystery Revealed",
          thumbnail: "https://img.youtube.com/vi/bAArtTX-eGM/maxresdefault.jpg",
          duration: "Watch Now",
          views: "New",
          date: "Recently Added",
          url: "https://www.youtube.com/watch?v=bAArtTX-eGM"
        }
      ]
    },
    {
      name: "Rightly Dividing the Word",
      description: "Critical distinctions between Prophecy and the Mystery.",
      videos: [
        {
          id: "3",
          title: "Prophecy vs Mystery Explained",
          thumbnail: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=640&h=360",
          duration: "24:15",
          views: "2.1K",
          date: "5 months ago"
        },
        {
          id: "5",
          title: "Time Past, But Now, and Ages to Come",
          thumbnail: "https://images.unsplash.com/photo-1447069387593-a5de0862481e?auto=format&fit=crop&q=80&w=640&h=360",
          duration: "32:10",
          views: "1.5K",
          date: "7 months ago"
        }
      ]
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-secondary-light min-h-screen pb-32"
    >
      <header className="relative bg-primary pt-32 pb-48 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,var(--color-accent)_0%,transparent_40%)]"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_80%,var(--color-accent)_0%,transparent_40%)]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <Sparkles className="h-5 w-5 text-accent-light" />
              <span className="text-accent-light tracking-[0.4em] font-bold text-xs uppercase">Visual Teachings</span>
              <Sparkles className="h-5 w-5 text-accent-light" />
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-8 tracking-tight">
              Grace <span className="italic font-normal text-accent-light">Archive</span>
            </h1>
            <p className="max-w-2xl mx-auto text-secondary/60 text-lg font-serif italic mb-12">
              In-depth Bible studies organized to help you grow in the knowledge of the Lord Jesus Christ.
            </p>
            <a 
              href={channelUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-10 py-5 bg-[#FF0000] text-white rounded-2xl font-bold hover:bg-[#CC0000] transition-all shadow-2xl shadow-red-600/20 active:scale-95"
            >
              <Youtube className="mr-3 h-6 w-6" />
              Official YouTube Channel
            </a>
          </motion.div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20">
        <div className="bg-white rounded-[2.5rem] shadow-2xl p-4 mb-24 border border-primary/5 flex items-center justify-center">
           <div className="flex items-center gap-4 text-primary/40 text-[10px] font-bold tracking-[0.3em] uppercase">
             <Filter className="h-4 w-4" /> Filter by Core Subject
           </div>
        </div>

        {categories.map((category, catIdx) => (
          <div key={category.name} className={catIdx > 0 ? "mt-32" : ""}>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
              <div className="max-w-2xl">
                <h2 className="text-4xl font-serif font-bold text-primary mb-4 italic tracking-tight">
                  {category.name}
                </h2>
                <p className="text-primary/50 text-lg font-serif">{category.description}</p>
              </div>
              <div className="h-px flex-1 bg-primary/5 hidden md:block mb-4 mx-12"></div>
              <div className="text-[10px] font-bold tracking-[0.4em] uppercase text-primary/30">Section {catIdx + 1}</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {category.videos.map((video, idx) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group"
                >
                  <div className="relative aspect-video rounded-[2rem] overflow-hidden shadow-xl mb-6 bg-primary">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent flex items-center justify-center">
                       <a 
                        href={video.url || channelUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-primary transform scale-90 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-2xl"
                      >
                        <PlayCircle className="h-8 w-8" />
                      </a>
                    </div>
                    <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-lg text-white text-[10px] font-mono font-bold tracking-widest uppercase">
                      {video.duration}
                    </div>
                  </div>
                  
                  <div className="px-2">
                    <h3 className="text-2xl font-serif font-bold text-primary mb-4 leading-tight group-hover:text-accent transition-colors">
                      {video.title}
                    </h3>
                    <div className="flex items-center gap-6 text-[10px] font-bold tracking-widest uppercase text-primary/30">
                      <div className="flex items-center gap-2">
                        <Eye className="h-3 w-3" /> {video.views}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3" /> {video.date}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}

        {/* Cinematic Subscribe Section */}
        <div className="mt-40 relative rounded-[3rem] p-16 md:p-32 overflow-hidden bg-primary text-secondary shadow-[0_48px_100px_-12px_rgba(0,0,0,0.5)]">
           <div className="absolute inset-0 opacity-20">
             <img src="https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&q=80" alt="" className="w-full h-full object-cover grayscale" />
           </div>
           <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent"></div>
           
           <div className="relative z-10 max-w-2xl">
              <span className="text-accent-light text-xs font-bold tracking-[0.4em] uppercase mb-8 block">Fellowship & Community</span>
              <h2 className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-tight">Join the Body <span className="italic font-normal text-accent-light">Online</span></h2>
              <p className="text-secondary/60 text-xl font-serif italic mb-12">
                "Till I come, give attendance to reading, to exhortation, to doctrine."
                <span className="block mt-4 text-xs font-bold not-italic tracking-widest uppercase opacity-40">— 1 Timothy 4:13</span>
              </p>
              <a 
                href={channelUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-4 px-12 py-6 bg-accent text-white rounded-3xl font-bold shadow-2xl hover:bg-accent-light transition-all active:scale-95"
              >
                Subscribe on YouTube <ArrowRight className="h-5 w-5" />
              </a>
           </div>
        </div>
      </div>
    </motion.div>
  );
}
