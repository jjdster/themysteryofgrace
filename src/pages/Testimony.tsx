import { motion } from 'motion/react';
import { Quote, ShieldCheck, Anchor, Sparkles } from 'lucide-react';

export default function Testimony() {
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
          A Personal Testimony
        </motion.h1>
        <p className="text-accent-light tracking-[0.2em] uppercase text-sm font-medium">
          A Journey from Conviction to Assurance
        </p>
      </header>

      <div className="max-w-4xl mx-auto px-4 -mt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 md:p-16 rounded-3xl shadow-2xl border border-primary/5 space-y-16"
        >
          {/* Original Testimony Section */}
          <section className="relative">
            <Quote className="absolute -top-8 -left-8 h-16 w-16 text-primary/5 -z-0" />
            <div className="relative z-10 prose prose-lg max-w-none text-primary/80 italic leading-relaxed font-serif">
              <p className="text-xl md:text-2xl text-primary mb-8 not-italic font-bold border-l-4 border-accent pl-6">
                "I believe that the Spirit of God, using the testimony of the Word of Truth, convinced me of my sinfulness, convinced me that I was separated from God and that I deserved to go to Hell."
              </p>
              <p>
                I believe Jesus Christ shed His sinless blood on the cross of Calvary and died there because of and for my sins. I believe he was buried and rose again on the third day. I trust that His blood has paid for all my sins, past, present, and future.
              </p>
              <p>
                I believe that I have been baptized by the Spirit of God into the Body of Christ and have been sealed unto the day of redemption. And I know there is therefore no condemnation to me and for all those who are in Christ Jesus.
              </p>
            </div>
          </section>

          <hr className="border-primary/10" />

          {/* Expanded Reflection Section */}
          <section className="space-y-12">
            <div className="text-center">
              <h2 className="text-3xl font-serif text-primary mb-4">Theological Reflection</h2>
              <div className="w-16 h-1 bg-accent mx-auto"></div>
            </div>

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

            <div className="prose prose-lg max-w-none text-primary/80 leading-relaxed">
              <p>
                Water baptism is most definitely Scriptural. While being commanded historically for Israel, water baptism is not an ordinance or an instructed ritual for members of the Body of Christ. My assurance rests entirely upon my existence in Christ and His finished work. Acknowledging that I have no righteousness of my own, I know that God has imputed the righteousness of Christ to my account and He accepts me as righteous in Him.
              </p>
              <p>
                Because of this, I live in the confident hope of glorification, when all these positional realities will be fully experienced. That will be when Christ shall take the Church, which is His Body, off the earth to meet Him in the air. Knowing there is no condemnation to those who are in Christ Jesus, I rejoice in the assurance and completeness of my salvation in Christ Jesus, all to the praise of God's glorious grace!
              </p>
            </div>
          </section>
        </motion.div>
      </div>
    </motion.div>
  );
}
