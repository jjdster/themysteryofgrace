import { motion } from 'motion/react';
import { ShieldAlert, Heart, Cross, CheckCircle } from 'lucide-react';

export default function Salvation() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-secondary min-h-screen pb-20"
    >
      <header className="bg-primary py-24 text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-serif text-secondary mb-4"
        >
          First Things First — Are You Saved?
        </motion.h1>
        <p className="text-accent-light tracking-[0.2em] uppercase text-sm font-medium">
          The Most Important Question of Your Life
        </p>
      </header>

      <div className="max-w-4xl mx-auto px-4 -mt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 md:p-16 rounded-3xl shadow-2xl border border-primary/5 space-y-12"
        >
          {/* Section 1: The Problem */}
          <section className="prose prose-lg max-w-none text-primary/80">
            <div className="flex items-center space-x-4 mb-6">
              <ShieldAlert className="h-8 w-8 text-red-600 shrink-0" />
              <h2 className="text-2xl md:text-3xl font-serif text-primary m-0">The Human Condition</h2>
            </div>
            <p>
              The entire human race is guilty (Romans 3:23). Since sin entered the world, every person has been born in sin and is sinful from birth (Psalm 51:5). In spite of some being elect, all were dead in trespasses and sins and were by nature the children of wrath (Ephesians 2:1–3).
            </p>
          </section>

          {/* Section 2: The Solution */}
          <section className="prose prose-lg max-w-none text-primary/80">
            <div className="flex items-center space-x-4 mb-6">
              <Cross className="h-8 w-8 text-accent shrink-0" />
              <h2 className="text-2xl md:text-3xl font-serif text-primary m-0">Salvation in Christ Alone</h2>
            </div>
            <p>
              Salvation is in Christ alone (Acts 4:12). It is through the merits of Christ and His death on the cross of Calvary that God’s righteousness has been satisfied (Romans 3:25). He bore our sins in His body (1 Peter 2:24) and shed His blood so that those who believe would receive forgiveness (Colossians 2:13).
            </p>
          </section>

          {/* Section 3: The Gospel */}
          <section className="prose prose-lg max-w-none text-primary/80">
            <div className="flex items-center space-x-4 mb-6">
              <Heart className="h-8 w-8 text-accent shrink-0" />
              <h2 className="text-2xl md:text-3xl font-serif text-primary m-0">The Gospel of Grace</h2>
            </div>
            <p>
              The gospel of the grace of God (Acts 20:24) is the gospel which God entrusted to Paul (1 Timothy 1:11), which he identifies as “my gospel” (Romans 16:25). This is the gospel that is to be preached at the present time (Galatians 1:6–10).
            </p>
            <div className="bg-primary/5 p-8 rounded-2xl border-l-4 border-accent italic my-8">
              "That in the ages to come He might show the exceeding riches of His grace in His kindness toward us through Christ Jesus. For by grace are ye saved through faith; and that not of yourselves: it is the gift of God: not of works, lest any man should boast."
              <span className="block mt-4 font-bold not-italic text-sm">— Ephesians 2:7–9</span>
            </div>
          </section>

          {/* Section 4: Importance */}
          <section className="bg-secondary/30 p-8 rounded-2xl border border-primary/10">
            <h3 className="text-xl font-serif font-bold text-primary mb-4">Why This is of the Utmost Importance</h3>
            <ul className="space-y-4 text-primary/80">
              <li className="flex items-start">
                <span className="font-bold mr-2">1.</span>
                There is a judgment coming for all those who have not believed what God has said (Rev 20:11-15).
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-2">2.</span>
                It is impossible to truly understand Scripture without the presence of the Holy Spirit (1 Cor 2:14).
              </li>
            </ul>
          </section>

          {/* Section 5: What Must You Do? */}
          <section className="text-center py-12 border-t border-primary/10">
            <div className="inline-block p-4 rounded-full bg-accent/10 mb-6">
              <CheckCircle className="h-10 w-10 text-accent" />
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-primary mb-6">What Must You Do?</h2>
            <div className="max-w-2xl mx-auto space-y-6 text-lg">
              <p className="font-bold text-primary">Believe the gospel—trust that Christ died for your sins, was buried, and rose again (1 Cor 15:1–4).</p>
              <p className="text-primary/70">Trust in Him alone for your salvation, apart from works or any intrinsic righteousness (Rom 7:18).</p>
            </div>
          </section>
        </motion.div>
      </div>
    </motion.div>
  );
}
