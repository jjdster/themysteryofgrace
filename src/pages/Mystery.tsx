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
              Rightly dividing the Word of Truth means recognizing that while all Scripture is for us, not all Scripture is written to us or about us. When our eyes are illumined to the distinct message and ministry that God committed to Paul's trust, the Mystery, the Gospel of God's grace, many of the so-called contradictions of the Bible vanish. Our understanding and appreciation for the glorious riches of God's infinite grace envelops and empowers us as we become increasingly aware of our joy, our peace and and our rest in Christ.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
