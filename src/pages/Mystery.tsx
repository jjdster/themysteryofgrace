import { motion } from 'framer-motion';
import { BookOpen, Scroll, Star } from 'lucide-react';
import ScriptureText from '../components/ScriptureText';

export default function Mystery() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-secondary min-h-screen pb-20"
    >
      {/* Header */}
      <header className="bg-primary py-24 text-center">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-4xl md:text-6xl font-serif text-secondary mb-4"
        >
          The Mystery Revealed
        </motion.h1>
        <p className="text-accent-light tracking-[0.2em] uppercase text-sm font-medium">
          The Revelation of Jesus Christ to Paul
        </p>
      </header>

      <div className="max-w-5xl mx-auto px-4 -mt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 md:p-16 rounded-3xl shadow-2xl border border-primary/5"
        >
          <div className="prose prose-lg max-w-none text-primary/80 leading-relaxed">
            <div className="flex items-center space-x-4 mb-8">
              <Scroll className="h-8 w-8 text-accent shrink-0" />
              <h2 className="text-2xl md:text-3xl font-serif text-primary m-0">What is "The Mystery"?</h2>
            </div>
            
            <p className="mb-6">
              In the Bible, a "mystery" (Greek: <span className="italic font-serif">mysterion</span>) is not something that cannot be understood, but rather a secret that was hidden in God from the beginning of the world and has now been revealed.
            </p>

            <div className="bg-primary/5 p-6 rounded-xl border-l-4 border-accent mb-8 italic">
              "Now to him that is of power to stablish you according to my gospel, and the preaching of Jesus Christ, according to the revelation of the mystery, which was kept secret since the world began..." 
              <span className="block mt-2 font-bold not-italic text-sm">— <ScriptureText text="Romans 16:25" /></span>
            </div>

            {/* Interactive Timeline Section */}
            <div className="my-16">
              <h3 className="text-2xl font-serif font-bold text-primary mb-8 text-center">The Timeline of God's Revelation</h3>
              <div className="relative">
                {/* Vertical Line */}
                <div className="absolute left-1/2 -translate-x-1/2 h-full w-1 bg-primary/10 rounded-full"></div>
                
                <div className="space-y-12">
                  {[
                    {
                      period: "Prophecy",
                      title: "The Old Testament & Gospels",
                      description: "Spoken by the mouth of all his holy prophets since the world began (Acts 3:21). Focus on Israel and the earthly kingdom.",
                      verse: "Luke 1:70",
                      align: "left"
                    },
                    {
                      period: "Transition",
                      title: "The Ministry of the Twelve",
                      description: "Preaching the Gospel of the Kingdom to Israel. The offer of the kingdom is rejected by the nation.",
                      verse: "Acts 3:19-21",
                      align: "right"
                    },
                    {
                      period: "Mystery",
                      title: "The Revelation to Paul",
                      description: "Kept secret since the world began (Rom 16:25). A new dispensation of Grace for all nations, forming the Body of Christ.",
                      verse: "Ephesians 3:1-9",
                      align: "left",
                      highlight: true
                    },
                    {
                      period: "Future",
                      title: "The Fulness of Times",
                      description: "When God will gather together in one all things in Christ, both which are in heaven, and which are on earth.",
                      verse: "Ephesians 1:10",
                      align: "right"
                    }
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: item.align === 'left' ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className={`relative flex items-center justify-between w-full ${item.align === 'left' ? 'flex-row-reverse' : ''}`}
                    >
                      <div className="w-[45%]"></div>
                      <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-accent border-4 border-white shadow-md z-10"></div>
                      <div className={`w-[45%] p-6 rounded-2xl border ${item.highlight ? 'bg-primary text-secondary border-accent' : 'bg-white border-primary/10 shadow-sm'}`}>
                        <span className={`text-[10px] font-bold uppercase tracking-widest mb-2 block ${item.highlight ? 'text-accent-light' : 'text-accent'}`}>
                          {item.period}
                        </span>
                        <h4 className="text-lg font-serif font-bold mb-2">{item.title}</h4>
                        <p className={`text-sm mb-4 ${item.highlight ? 'text-secondary/80' : 'text-primary/70'}`}>{item.description}</p>
                        <div className={`text-xs font-bold ${item.highlight ? 'text-accent-light' : 'text-primary'}`}>
                          — <ScriptureText text={item.verse} />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Deep Dive Section */}
            <motion.div 
              id="grammar-deep-dive"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="my-12 p-8 bg-secondary/30 rounded-3xl border border-primary/10"
            >
              <h3 className="text-2xl font-serif font-bold text-primary mb-6 flex items-center">
                <BookOpen className="mr-3 h-6 w-6 text-accent" />
                Deep Dive: The Grammar of Romans 16:25
              </h3>
              
              <div className="space-y-6 text-sm md:text-base">
                <p>
                  There is strong grammatical and structural justification for seeing these two phrases as "one and the same" in the context of Romans 16:25. While the Granville Sharp Rule doesn't apply here, a different grammatical feature called <strong>Apposition</strong> does.
                </p>
                
                <p>
                  In Greek, when two phrases are placed side-by-side to rename or define each other, they are in apposition. In this specific verse, Paul uses a structure that links three distinct descriptions of the message he was commissioned to preach.
                </p>

                <div className="bg-white/50 p-6 rounded-xl border border-primary/5 font-serif italic text-center my-6">
                  "...according to <span className="text-accent font-bold">my gospel [A]</span>, and (kai) <span className="text-accent font-bold">the preaching of Jesus Christ [B]</span>, according to <span className="text-accent font-bold">the revelation of the mystery [C]</span>..."
                </div>

                <div className="space-y-8">
                  <section>
                    <h4 className="font-bold text-primary mb-2">1. The use of Kai as an Explanatory "And"</h4>
                    <p>
                      In Greek, the word <span className="italic">kai</span> (and) doesn't always mean "this plus something else." It can be used <strong>egetically</strong> (to explain). In this sense, it means "and specifically," or "which is to say."
                    </p>
                    <p className="mt-2 text-primary/70">
                      Paul is likely using <span className="italic">kai</span> here to define "my gospel." He isn't saying he has a gospel plus a different preaching of Jesus; he is saying his gospel is the preaching of Jesus Christ viewed through a specific lens: the Revelation of the Mystery.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-bold text-primary mb-2">2. Matching Case and Structure</h4>
                    <p>
                      Both "my gospel" (<span className="italic">to euaggelion mou</span>) and "the preaching" (<span className="italic">to kērygma</span>) are:
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-primary/70">
                      <li><strong>Accusative:</strong> They both follow the preposition <span className="italic">kata</span> (according to).</li>
                      <li><strong>Articular:</strong> They both have the definite article "the."</li>
                    </ul>
                    <p className="mt-2 text-primary/70">
                      This parallel structure signals to the reader that Paul is stacking descriptions. He starts with a personal term ("my gospel") and then immediately clarifies its content ("the preaching of Jesus Christ") and its source/character ("according to the revelation of the mystery").
                    </p>
                  </section>

                  <section>
                    <h4 className="font-bold text-primary mb-2">The "Mystery" as the Defining Factor</h4>
                    <p>
                      The phrase "according to the revelation of the mystery" acts as a modifier for the preaching of Jesus Christ. This is what makes the message distinctively "Pauline."
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                      <div className="p-4 bg-white/40 rounded-lg border border-primary/5">
                        <span className="block text-[10px] uppercase tracking-widest text-accent font-bold mb-1">The Subject</span>
                        <span className="text-sm font-serif">Jesus Christ</span>
                      </div>
                      <div className="p-4 bg-white/40 rounded-lg border border-primary/5">
                        <span className="block text-[10px] uppercase tracking-widest text-accent font-bold mb-1">The Method</span>
                        <span className="text-sm font-serif">Preaching</span>
                      </div>
                      <div className="p-4 bg-white/40 rounded-lg border border-primary/5">
                        <span className="block text-[10px] uppercase tracking-widest text-accent font-bold mb-1">The Perspective</span>
                        <span className="text-sm font-serif">The Revelation of the Mystery</span>
                      </div>
                    </div>
                    <p className="mt-4 text-primary/70">
                      If these were separate messages, Paul would be contradicting his own point about the unity of the "dispensation of the grace of God" committed to him. By linking them this way, he shows that "the preaching of Jesus Christ" is not always the same as "the mystery"—but when it is preached according to that revelation, it constitutes the gospel Paul calls "mine."
                    </p>
                  </section>
                </div>

                <div className="mt-10 overflow-hidden rounded-xl border border-primary/10 shadow-sm">
                  <table className="w-full text-left text-xs md:text-sm">
                    <thead className="bg-primary text-secondary">
                      <tr>
                        <th className="px-4 py-3 font-serif">Phrase</th>
                        <th className="px-4 py-3 font-serif">Role in the Sentence</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-primary/10">
                      <tr className="bg-white/30">
                        <td className="px-4 py-3 font-bold text-primary">"My Gospel"</td>
                        <td className="px-4 py-3 text-primary/70">The Title Paul gives to his specific commission.</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-bold text-primary">"The Preaching of Jesus Christ"</td>
                        <td className="px-4 py-3 text-primary/70">The Core Subject of that commission.</td>
                      </tr>
                      <tr className="bg-white/30">
                        <td className="px-4 py-3 font-bold text-primary">"According to the Revelation of the Mystery"</td>
                        <td className="px-4 py-3 text-primary/70">The Specific Manner/Information by which Christ is now being preached.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-12 p-8 bg-accent/5 border-2 border-accent/20 rounded-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Scroll className="h-16 w-16 text-accent" />
                  </div>
                  <p className="text-primary font-serif text-lg md:text-2xl font-bold italic leading-relaxed text-center relative z-10">
                    "Grammatically, these are not three different things, but one message described with increasing detail."
                  </p>
                  <div className="mt-4 flex justify-center">
                    <div className="h-1 w-24 bg-accent/30 rounded-full" />
                  </div>
                </div>
              </div>
            </motion.div>

            <h3 className="text-xl font-serif font-bold text-primary mt-12 mb-4">The Apostle of the Gentiles</h3>
            
            <div className="bg-primary/5 p-6 rounded-xl border-l-4 border-accent mb-8 space-y-4 italic text-sm">
              <div>
                "But the Lord said unto him, Go thy way: for he is a chosen vessel unto me, to bear my name before the Gentiles, and kings, and the children of Israel: 16 For I will show him how great things he must suffer for my name's sake."
                <span className="block mt-1 font-bold not-italic">— <ScriptureText text="Acts 9:15–16" /></span>
              </div>
              <div>
                "And he said, The God of our fathers hath chosen thee, that thou shouldest know his will, and see that Just One, and shouldest hear the voice of his mouth. 15 For thou shalt be his witness unto all men of what thou hast seen and heard."
                <span className="block mt-1 font-bold not-italic">— <ScriptureText text="Acts 22:14–15" /></span>
              </div>
              <div>
                "But rise, and stand upon thy feet: for I have appeared unto thee for this purpose, to make thee a minister and a witness both of these things which thou hast seen, and of those things in the which I will appear unto thee; 17 Delivering thee from the people, and from the Gentiles, unto whom now I send thee, 18 To open their eyes, and to turn them from darkness to light, and from the power of Satan unto God, that they may receive forgiveness of sins, and inheritance among them which are sanctified by faith that is in me."
                <span className="block mt-1 font-bold not-italic">— <ScriptureText text="Acts 26:16–18" /></span>
              </div>
            </div>

            <p className="mb-6">
              While the twelve apostles were sent to the nation of Israel to preach the "Gospel of the Kingdom," the ascended, glorified Lord Jesus Christ chose Saul of Tarsus (Paul) to be His unique vessel. To Paul was revealed the "Mystery" or the secret "Dispensation of the Grace of God" that God had kept secret since the world began. Under this newly revealed Divine economy, Jew and Gentile are joined in one new creation, the Body of Christ. All ethnic historical distinctions have been removed, the two have become one in Christ. Old things are passed away, behold, all things are become new.
            </p>
            <p className="mb-6">
              This newly revealed truth, the Mystery, which is the Gospel of God's Grace, as wonderfully glorious as it is, will be universally resisted and those preaching and teaching it will suffer great persecution from Satan and the unredeemed human race. Even among the redeemed, the members of the Body of Christ, there has been strong resistance and vehement debates that have often been accompanied with visceral exchanges that should not be. "Iron sharpens Iron" and sometimes that is uncomfortable but as members of the Body of Christ, It is my prayer as we desire to edify one another in the Body of Christ, that it is His love that motivates us and that we do not succumb to our natural selves.
            </p>

            <div className="grid md:grid-cols-2 gap-8 my-12">
              <div className="p-6 rounded-2xl border border-primary/10 bg-secondary/50">
                <Star className="h-6 w-6 text-accent mb-4" />
                <h4 className="font-serif font-bold text-primary mb-2">Hidden in God</h4>
                <p className="text-sm">This message was not found in the Old Testament or the four Gospels. It was a secret kept by God until the time was right to reveal it through Paul.</p>
              </div>
              <div className="p-6 rounded-2xl border border-primary/10 bg-secondary/50">
                <BookOpen className="h-6 w-6 text-accent mb-4" />
                <h4 className="font-serif font-bold text-primary mb-2">A New Creation</h4>
                <p className="text-sm">The Mystery reveals the "One New Man"—the Body of Christ—where there is no distinction between Jew and Gentile in their standing before God.</p>
              </div>
            </div>

            <h3 className="text-xl font-serif font-bold text-primary mt-12 mb-4">Why It Matters</h3>
            
            <div className="bg-primary/5 p-6 rounded-xl border-l-4 border-accent mb-8 space-y-4 italic text-sm">
              <div>
                "All scripture is given by inspiration of God, and is profitable for doctrine, for reproof, for correction, for instruction in righteousness: 17 That the man of God may be perfect, thoroughly furnished unto all good works."
                <span className="block mt-2 font-bold not-italic">— <ScriptureText text="2 Timothy 3:16–17" /></span>
              </div>
              <div>
                "For this cause also thank we God without ceasing, because, when ye received the word of God which ye heard of us, ye received it not as the word of men, but as it is in truth, the word of God, which effectually worketh also in you that believe."
                <span className="block mt-2 font-bold not-italic">— <ScriptureText text="1 Thessalonians 2:13" /></span>
              </div>
            </div>

            <p className="mb-6">
              Rightly dividing the Word of Truth does not mean that we are forsaking Christ and replacing Him with Paul, or, as some slanderously suggest, "We worship Paul more than Christ." Is it just possible that we might be believing what the Bible has declared. I was a Gentile and God sovereignly chose Paul to be my apostle. He received a body of truth that had been hidden in God up to the point in time when Christ revealed it to him.
            </p>
            <p>
              Rightly dividing the Word of Truth means recognizing that while all Scripture is for us, not all Scripture is written to us or about us. When our eyes are illumined to the distinct message and ministry that God committed to Paul's trust, the Mystery, the Gospel of God's grace, many of the so-called contradictions of the Bible vanish. Our understanding and appreciation for the glorious riches of God's infinite grace envelops and empowers us as we become increasingly thankful and appreciative of our joy, our peace and and our rest in Christ.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
