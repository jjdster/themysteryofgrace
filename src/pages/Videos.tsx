import { motion } from 'motion/react';
import { Youtube, ExternalLink, PlayCircle } from 'lucide-react';

export default function Videos() {
  const channelUrl = "https://www.youtube.com/@markjjd";
  
  // Categorized video data
  const categories = [
    {
      name: "The Revelation of the Mystery",
      description: "Deep dives into the specific revelation given to the Apostle Paul.",
      videos: [
        {
          id: "1",
          title: "The Revelation of the Mystery: The Basics",
          thumbnail: "https://picsum.photos/seed/bible1/640/360",
          duration: "12:45",
          views: "1.2K views",
          date: "2 months ago"
        },
        {
          id: "2",
          title: "The Mystery Hidden in God",
          thumbnail: "https://picsum.photos/seed/bible2/640/360",
          duration: "18:20",
          views: "850 views",
          date: "3 months ago"
        },
        {
          id: "7",
          title: "The Mystery Revealed (New)",
          thumbnail: "https://img.youtube.com/vi/bAArtTX-eGM/maxresdefault.jpg",
          duration: "Watch Now",
          views: "New",
          date: "Just added",
          url: "https://www.youtube.com/watch?v=bAArtTX-eGM"
        }
      ]
    },
    {
      name: "Rightly Dividing the Word",
      description: "Learning how to distinguish between God's plan for Israel and the Body of Christ.",
      videos: [
        {
          id: "3",
          title: "Prophecy vs Mystery Explained",
          thumbnail: "https://picsum.photos/seed/bible3/640/360",
          duration: "24:15",
          views: "2.1K views",
          date: "5 months ago"
        },
        {
          id: "5",
          title: "Time Past, But Now, and Ages to Come",
          thumbnail: "https://picsum.photos/seed/bible5/640/360",
          duration: "32:10",
          views: "1.5K views",
          date: "7 months ago"
        }
      ]
    },
    {
      name: "The Dispensation of Grace",
      description: "Understanding our current position and walk in the Body of Christ.",
      videos: [
        {
          id: "4",
          title: "Grace and the Body of Christ",
          thumbnail: "https://picsum.photos/seed/bible4/640/360",
          duration: "15:30",
          views: "920 views",
          date: "6 months ago"
        },
        {
          id: "6",
          title: "Our Identity in Christ",
          thumbnail: "https://picsum.photos/seed/bible6/640/360",
          duration: "21:45",
          views: "1.1K views",
          date: "8 months ago"
        }
      ]
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-secondary min-h-screen pb-20"
    >
      <header className="bg-primary py-24 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-serif text-secondary mb-4"
        >
          Video Lessons
        </motion.h1>
        <p className="text-secondary/60 max-w-2xl mx-auto px-4 mb-8">
          Watch our latest teachings and Bible studies on YouTube, organized by topic.
        </p>
        <a 
          href={channelUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-3 bg-[#FF0000] text-white rounded-full font-bold hover:bg-[#CC0000] transition-colors shadow-lg"
        >
          <Youtube className="mr-2 h-5 w-5" />
          Visit YouTube Channel
          <ExternalLink className="ml-2 h-4 w-4" />
        </a>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {categories.map((category, catIdx) => (
          <div key={category.name} className={catIdx > 0 ? "mt-24" : ""}>
            <div className="mb-10">
              <h2 className="text-3xl font-serif text-primary mb-2">{category.name}</h2>
              <p className="text-primary/60 max-w-2xl">{category.description}</p>
              <div className="w-20 h-1 bg-accent mt-4"></div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.videos.map((video, idx) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-md border border-primary/5 group hover:shadow-xl transition-all"
                >
                  <a href={video.url || channelUrl} target="_blank" rel="noopener noreferrer" className="block relative aspect-video overflow-hidden">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <PlayCircle className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity transform scale-90 group-hover:scale-100 duration-300" />
                    </div>
                    <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded font-medium">
                      {video.duration}
                    </span>
                  </a>
                  <div className="p-6">
                    <h3 className="text-lg font-serif font-bold text-primary mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                      {video.title}
                    </h3>
                    <div className="flex items-center text-primary/40 text-xs font-medium uppercase tracking-wider">
                      <span>{video.views}</span>
                      <span className="mx-2">•</span>
                      <span>{video.date}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}

        <div className="mt-20 p-12 bg-primary rounded-3xl text-center text-secondary relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-serif mb-4">Stay Updated</h2>
            <p className="text-secondary/70 mb-8 max-w-xl mx-auto">
              Subscribe to our channel to receive notifications whenever we upload new lessons and deep dives into the Word of Truth.
            </p>
            <a 
              href={channelUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-accent text-white rounded-full font-bold hover:bg-accent-light transition-all shadow-xl"
            >
              Subscribe on YouTube
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
