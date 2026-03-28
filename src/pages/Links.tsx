import { motion } from 'motion/react';
import { ExternalLink, Link as LinkIcon } from 'lucide-react';

export default function Links() {
  const links = [
    {
      title: "Grace School of the Bible",
      url: "https://www.graceschoolofthebible.org",
      description: "A comprehensive Bible study program focused on the Pauline revelation."
    },
    {
      title: "Berean Bible Society",
      url: "https://www.bereanbiblesociety.org",
      description: "Dedicated to the study and promotion of the Mystery revealed to Paul."
    },
    {
      title: "Grace Ambassadors",
      url: "https://graceambassadors.com",
      description: "Excellent resources for rightly dividing the Word of Truth."
    },
    {
      title: "Forgotten Truths",
      url: "http://www.forgottentruths.com",
      description: "Teaching the Mystery that was kept secret since the world began."
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
          Helpful Links
        </motion.h1>
        <p className="text-secondary/60 max-w-2xl mx-auto px-4">
          Resources and ministries that focus on the Preaching of Jesus Christ according to the Revelation of the Mystery.
        </p>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        <div className="grid gap-6">
          {links.map((link, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-3xl p-8 shadow-lg border border-primary/5 hover:border-accent/30 transition-all group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-accent/10 rounded-2xl text-accent shrink-0">
                    <LinkIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                      {link.title}
                    </h3>
                    <p className="text-primary/70 leading-relaxed mb-4">
                      {link.description}
                    </p>
                    <a 
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-accent font-bold hover:underline"
                    >
                      Visit Website
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 p-8 bg-white rounded-3xl border border-dashed border-primary/20 text-center">
          <h3 className="text-xl font-serif text-primary mb-4">Know of a great resource?</h3>
          <p className="text-primary/60 mb-6">We are always looking for more resources that rightly divide the Word of Truth.</p>
          <a 
            href="mailto:jjdster@gmail.com" 
            className="inline-flex items-center px-8 py-3 bg-primary text-secondary rounded-full font-medium hover:bg-accent transition-all"
          >
            Suggest a Link
          </a>
        </div>
      </div>
    </motion.div>
  );
}
