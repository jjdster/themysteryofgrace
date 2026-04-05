import { motion } from 'framer-motion';
import { ShieldAlert, Heart, Cross, CheckCircle, Quote, ShieldCheck, Anchor, Sparkles } from 'lucide-react';
import ScriptureText from '../components/ScriptureText';

export default function Gospel() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-secondary min-h-screen pb-20"
    >
      <header className="relative bg-primary py-32 text-center px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-50">
          <img
            src="https://images.unsplash.com/photo-1510597074723-5fb81f6a3b75?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Crucifixion Silhouette"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif text-secondary mb-4 drop-shadow-lg"
          >
            The Gospel of Grace
          </motion.h1>
          <p className="text-accent-light tracking-[0.2em] uppercase text-sm font-medium drop-shadow-md">
            The Message of Salvation & A Personal Journey
          </p>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 -mt-12 relative z-20">
        <div className="grid grid-cols-1 gap-12">
          
          {/* Part 1: Are You Saved? */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 md:p-16 rounded-3xl shadow-2xl border border-primary/5 space-y-12"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif text-primary mb-4">First Things First — Are You Saved?</h2>
              <div className="w-24 h-1 bg-accent mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <section className="prose prose-lg max-w-none text-primary/80">
                <div className="flex items-center space-x-4 mb-6">
                  <ShieldAlert className="h-8 w-8 text-red-600 shrink-0" />
                  <h3 className="text-2xl font-serif text-primary m-0">The Human Condition</h3>
                </div>
                <p>
                  <ScriptureText text="The entire human race is guilty (Romans 3:23). Since sin entered the world, every person has been born in sin and is sinful from birth (Psalm 51:5). In spite of some being elect, all were dead in trespasses and sins and were by nature the children of wrath (Ephesians 2:1–3)." />
                </p>
              </section>

              <section className="prose prose-lg max-w-none text-primary/80">
                <div className="flex items-center space-x-4 mb-6">
                  <Cross className="h-8 w-8 text-accent shrink-0" />
                  <h3 className="text-2xl font-serif text-primary m-0">Salvation in Christ Alone</h3>
                </div>
                <p>
                  <ScriptureText text="Salvation is in Christ alone (Acts 4:12). It is through the merits of Christ and His death on the cross of Calvary that God’s righteousness has been satisfied (Romans 3:25). He bore our sins in His body (1 Peter 2:24) and shed His blood so that those who believe would receive forgiveness (Colossians 2:13, Ephesians 1:7)." />
                </p>
              </section>
            </div>

            <section className="prose prose-lg max-w-none text-primary/80">
              <div className="flex items-center space-x-4 mb-6">
                <Heart className="h-8 w-8 text-accent shrink-0" />
                <h3 className="text-2xl font-serif text-primary m-0">The Gospel of Grace</h3>
              </div>
              <p>
                <ScriptureText text="The gospel of the grace of God (Acts 20:24) is the gospel which God entrusted to Paul (1 Timothy 1:11), which he identifies as “my gospel” (Romans 16:25). This is the gospel that is to be preached at the present time (Galatians 1:6–10)." />
              </p>
              <div className="bg-primary/5 p-8 rounded-2xl border-l-4 border-accent italic my-8">
                "That in the ages to come He might show the exceeding riches of His grace in His kindness toward us through Christ Jesus. For by grace are ye saved through faith; and that not of yourselves: it is the gift of God: not of works, lest any man should boast."
                <span className="block mt-4 font-bold not-italic text-sm">— <ScriptureText text="Ephesians 2:7–9" /></span>
              </div>
            </section>

            <div className="grid md:grid-cols-2 gap-8">
              <section className="bg-secondary/30 p-8 rounded-2xl border border-primary/10">
                <h3 className="text-xl font-serif font-bold text-primary mb-4">Why This is of the Utmost Importance</h3>
                <ul className="space-y-4 text-primary/80 text-sm">
                  <li className="flex items-start">
                    <span className="font-bold mr-2">1.</span>
                    <ScriptureText text="There is a judgment coming for all those who have not believed what God has said (Revelation 20:11–15)." />
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold mr-2">2.</span>
                    <ScriptureText text="It is impossible to truly understand Scripture without the presence of the Holy Spirit (1 Corinthians 2:14)." />
                  </li>
                </ul>
              </section>

              <section className="text-center p-8 bg-accent/5 rounded-2xl border border-accent/20">
                <div className="inline-block p-3 rounded-full bg-accent/10 mb-4">
                  <CheckCircle className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-2xl font-serif text-primary mb-4">What Must You Do?</h3>
                <div className="space-y-4 text-base">
                  <p className="font-bold text-primary">
                    <ScriptureText text="Believe the gospel—trust that Christ died for your sins, was buried, and rose again (1 Corinthians 15:1–4)." />
                  </p>
                  <p className="text-primary/70">
                    <ScriptureText text="Trust in Him alone for your salvation, apart from works or any intrinsic righteousness (Romans 7:18)." />
                  </p>
                </div>
              </section>
            </div>
          </motion.div>

          {/* Part 2: Testimony */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 md:p-16 rounded-3xl shadow-2xl border border-primary/5 space-y-16"
          >
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-serif text-primary mb-4">A Personal Testimony</h2>
              <div className="w-24 h-1 bg-accent mx-auto"></div>
              <p className="text-primary/50 mt-4 italic">A Journey from Conviction to Assurance</p>
            </div>

            <section className="relative">
              <Quote className="absolute -top-8 -left-8 h-16 w-16 text-primary/5 -z-0" />
              <div className="relative z-10 prose prose-lg max-w-none text-primary/80 italic leading-relaxed font-serif">
                <p className="text-xl md:text-2xl text-primary mb-8 not-italic font-bold border-l-4 border-accent pl-6">
                  <ScriptureText text='"I believe that the Spirit of God, using the testimony of the Word of Truth, convinced me of my sinfulness, convinced me that I was separated from God and that I deserved to go to Hell."' />
                </p>
                <p>
                  <ScriptureText text="I believe Jesus Christ shed His sinless blood on the cross of Calvary and died there because of and for my sins. I believe he was buried and rose again on the third day. I trust that His blood has paid for all my sins, past, present, and future." />
                </p>
                <p>
                  <ScriptureText text="I believe that I have been baptized by the Spirit of God into the Body of Christ and have been sealed unto the day of redemption. And I know there is therefore no condemnation to me and for all those who are in Christ Jesus." />
                </p>
              </div>
            </section>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/5 p-3 rounded-xl">
                    <ShieldCheck className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-primary text-lg mb-2">Justification by Faith</h3>
                    <p className="text-primary/70 text-sm leading-relaxed">
                      Hearing the gospel of salvation, I believed that Jesus Christ died for my sin, was buried, and rose again on the third day, and that His finished work was entirely sufficient for my salvation. By faith, I relied completely on Christ, not on any act of mine, and at that moment God declared me justified, crediting me with the perfect righteousness of Christ.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary/5 p-3 rounded-xl">
                    <Anchor className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-primary text-lg mb-2">Positional Reality</h3>
                    <p className="text-primary/70 text-sm leading-relaxed">
                      I am sanctified in Christ. I was baptized, not with or in water, but by the Spirit of God into the Body of Christ, uniting me positionally with Him in His death, burial, and resurrection, and establishing me in God's sight as holy and accepted in His sight. From that positional reality flows my life today.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/5 p-3 rounded-xl">
                    <Sparkles className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-primary text-lg mb-2">Experiential Walk</h3>
                    <p className="text-primary/70 text-sm leading-relaxed">
                      My assurance rests entirely upon Christ’s finished work. Though I still experience sin, it is my heart's desire and intent to yield to the Spirit in my daily walk. I know that I am secure in Christ and sealed unto the day of redemption while the Spirit is presently transforming me from glory to glory into the image of Christ.
                    </p>
                  </div>
                </div>

                <div className="bg-secondary/30 p-6 rounded-2xl border border-primary/10">
                  <p className="text-primary/80 text-sm italic leading-relaxed">
                    "My faith is a resting, convinced trust in Christ alone, applied by the Spirit, through which I have been justified, united to the Body, set apart positionally, and secured for the hope of eternal glorification."
                  </p>
                </div>
              </div>
            </div>

            <div className="prose prose-lg max-w-none text-primary/80 leading-relaxed pt-8 border-t border-primary/5">
              <p>
                <ScriptureText text="Water baptism is most definitely Scriptural. While being commanded historically for Israel, water baptism is not an ordinance or an instructed ritual for members of the Body of Christ. My assurance rests entirely upon my existence in Christ and His finished work. Acknowledging that I have no righteousness of my own, I know that God has imputed the righteousness of Christ to my account and He accepts me as righteous in Him." />
              </p>
              <p>
                <ScriptureText text="Because of this, I live in the confident hope of glorification, when all these positional realities will be fully experienced. That will be when Christ shall take the Church, which is His Body, off the earth to meet Him in the air. Knowing there is no condemnation to those who are in Christ Jesus, I rejoice in the assurance and completeness of my salvation in Christ Jesus, all to the praise of God's glorious grace!" />
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
