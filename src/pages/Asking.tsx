import { motion } from 'framer-motion';
import { HelpCircle, MessageSquare, PlayCircle } from 'lucide-react';
import ScriptureText from '../components/ScriptureText';
import { DebugPanel } from '../components/DebugPanel';

export default function Asking() {
  const faqs = [
    {
      question: "What does it mean to 'rightly divide' the Word of Truth?",
      answer: "Rightly dividing the Word of Truth (2 Timothy 2:15) means recognizing the distinctions in God's dealings with mankind throughout history. Specifically, it involves distinguishing between God's program for the nation of Israel (Prophecy) and His current program for the Body of Christ (the Mystery revealed to Paul)."
    },
    {
      question: "Why is the Apostle Paul's ministry unique?",
      answer: "Paul was specifically chosen by the ascended Lord Jesus Christ to be the 'Apostle of the Gentiles' (Romans 11:13). To him was committed the 'Dispensation of the Grace of God' and the revelation of the 'Mystery' which had been kept secret since the world began."
    },
    {
      question: "Are we under the Law today?",
      answer: "No. Romans 6:14 explicitly states, 'for ye are not under the law, but under grace.' The Law was a schoolmaster to bring Israel to Christ, but now that faith has come, we are no longer under a schoolmaster (Galatians 3:24-25)."
    },
    {
      question: "In the Gospel of the Grace of God, what role does baptism have?",
      answer: "In the current Dispensation of Grace, there is 'one baptism' (Ephesians 4:5), which is the spiritual baptism by which the Holy Spirit places the believer into the Body of Christ (1 Corinthians 12:13). While water baptism was a requirement in God's program for Israel, Paul states that 'Christ sent me not to baptize, but to preach the gospel' (1 Corinthians 1:17), emphasizing that our salvation is by grace through faith alone, without ritual works.",
      videoUrl: "https://www.youtube.com/@markjjd"
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
          Asking & Seeking
        </motion.h1>
        <p className="text-secondary/60 max-w-2xl mx-auto px-4">
          The intent of this page is to answer the question, not with tradition nor denomination bias, but with the Scriptures rightly divided.
        </p>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">

        <div className="space-y-6">
          <div className="flex items-center space-x-2 mb-8 border-b border-primary/10 pb-4">
            <HelpCircle className="h-5 w-5 text-accent" />
            <h2 className="text-2xl font-serif text-primary">Frequently Asked Questions</h2>
          </div>
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-3xl p-8 shadow-lg border border-primary/5 hover:border-accent/30 transition-all"
            >
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-accent/10 rounded-2xl text-accent shrink-0">
                  <HelpCircle className="h-6 w-6" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-serif font-bold text-primary mb-4">
                    {faq.question}
                  </h3>
                  <div className="flex items-start space-x-3">
                    <MessageSquare className="h-5 w-5 text-primary/30 mt-1 shrink-0" />
                    <div className="space-y-4">
                      <p className="text-primary/70 leading-relaxed">
                        <ScriptureText text={faq.answer} />
                      </p>
                      {faq.videoUrl && (
                        <a 
                          href={faq.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 bg-accent text-white rounded-full text-sm font-medium hover:bg-accent-light transition-colors shadow-sm"
                        >
                          <PlayCircle className="mr-2 h-4 w-4" />
                          View Video
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 p-8 bg-white rounded-3xl border border-dashed border-primary/20 text-center">
          <h3 className="text-xl font-serif text-primary mb-4">Have more questions?</h3>
          <p className="text-primary/60 mb-6">We are here to help you navigate the glorious riches of God's grace.</p>
          <a 
            href="mailto:jjdster@gmail.com" 
            className="inline-flex items-center px-8 py-3 bg-primary text-secondary rounded-full font-medium hover:bg-accent transition-all"
          >
            Contact Us
          </a>
        </div>
      </div>
      <DebugPanel />
    </motion.div>
  );
}
