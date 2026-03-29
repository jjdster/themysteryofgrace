
export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  type: 'multiple-choice' | 'short-answer' | 'reflection';
}

export interface Lesson {
  id: string;
  title: string;
  scripture: {
    reference: string;
    text: string;
  }[];
  sourceText: {
    book: string;
    author: string;
    excerpt: string;
  };
  summary: string;
  keyIdeas: string[];
  questions: Question[];
  reflectionPrompt: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export const baptismStudyData: Module[] = [
  {
    id: 'meaning',
    title: 'The Meaning of Baptism: Identification',
    description: 'A deep dive into the Greek word "baptizo" and its primary meaning of identification, moving beyond the traditional water-only view.',
    lessons: [
      {
        id: 'identification-depth',
        title: 'Baptism as Identification',
        scripture: [
          { reference: 'Romans 6:3-4', text: 'Know ye not, that so many of us as were baptized into Jesus Christ were baptized into his death? Therefore we are buried with him by baptism into death: that like as Christ was raised up from the dead by the glory of the Father, even so we also should walk in newness of life.' },
          { reference: '1 Corinthians 10:2', text: 'And were all baptized unto Moses in the cloud and in the sea;' }
        ],
        sourceText: {
          book: 'Real Baptism',
          author: 'Charles F. Baker',
          excerpt: 'The primary meaning of the Greek word baptizo is to place into, or to identify with. It does not always imply water. When we are baptized into Christ, we are identified with Him in His death, burial, and resurrection.'
        },
        summary: `The word "baptism" has become so synonymous with water in religious tradition that its true biblical meaning is often obscured. To understand baptism, we must first examine the Greek word *baptizo*. In classical Greek and biblical usage, the word primarily signifies "identification" or "placement into." It describes a change of state or relationship where one thing is placed into another so that its character or condition is altered.

A classic example is found in 1 Corinthians 10:2, where Israel was "baptized unto Moses in the cloud and in the sea." This was not a water baptism in the sense of immersion (the Egyptians were the ones immersed and drowned), but rather an identification. By passing through the sea under the cloud, Israel was identified with Moses as their leader and separated from Egypt. They were "placed into" a relationship with Moses.

In Romans 6:3-4, Paul speaks of being "baptized into Jesus Christ." This is a spiritual identification. When we believe the gospel, the Holy Spirit identifies us with Christ in His death, burial, and resurrection. We are placed into Him. This baptism is dry; it is a spiritual reality that changes our standing before God. We are no longer "in Adam," but "in Christ."

Understanding baptism as identification is the key to "rightly dividing" the word of truth. It allows us to see that God uses various baptisms throughout scripture—some with water, some with the Spirit, and some with fire—each serving a specific purpose in His unfolding plan. When we see "baptism" in the text, we should first ask: "What is the believer being identified with here?" rather than assuming a pool of water is nearby. This shift in perspective is foundational for grasping the Pauline revelation and the unique message of Grace.`,
        keyIdeas: [
          'Baptism primarily means identification or placement into a new condition.',
          '1 Corinthians 10:2 shows baptism without immersion in water.',
          'Romans 6 describes a spiritual identification with Christ\'s death and life.',
          'Distinguishing between ritual and reality is essential for sound doctrine.'
        ],
        questions: [
          {
            id: 'm1-q1',
            type: 'multiple-choice',
            question: 'What is the primary meaning of the Greek word "baptizo" in biblical context?',
            options: [
              'To wash with soap',
              'To identify with or place into',
              'To join a specific denomination',
              'To perform a religious ritual'
            ],
            correctAnswer: 1,
            explanation: 'The word signifies a change of state or relationship through identification.'
          },
          {
            id: 'm1-q2',
            type: 'multiple-choice',
            question: 'In 1 Corinthians 10:2, who was "baptized unto Moses"?',
            options: [
              'The Egyptians',
              'The Israelites',
              'The Midianites',
              'The Romans'
            ],
            correctAnswer: 1,
            explanation: 'The Israelites were identified with Moses through the cloud and the sea.'
          },
          {
            id: 'm1-q3',
            type: 'multiple-choice',
            question: 'According to Romans 6:3, what were we baptized into?',
            options: [
              'A local church membership',
              'The death of Jesus Christ',
              'A pool of water',
              'The Jordan River'
            ],
            correctAnswer: 1,
            explanation: 'Paul states we were "baptized into his death," signifying our identification with His sacrifice.'
          },
          {
            id: 'm1-q4',
            type: 'multiple-choice',
            question: 'Why is it important to distinguish between water and identification?',
            options: [
              'To win theological arguments',
              'To understand the spiritual reality of our position in Christ',
              'To avoid getting wet',
              'To follow church tradition'
            ],
            correctAnswer: 1,
            explanation: 'Understanding the reality of our identification in Christ is foundational to our walk.'
          },
          {
            id: 'm1-q5',
            type: 'multiple-choice',
            question: 'What does "dry baptism" refer to in this context?',
            options: [
              'Baptism in a desert',
              'A spiritual identification that does not involve water',
              'A failed water baptism',
              'Sprinkling instead of immersion'
            ],
            correctAnswer: 1,
            explanation: 'It refers to the spiritual placement into Christ by the Holy Spirit.'
          }
        ],
        reflectionPrompt: 'Think about your life "in Adam" vs. "in Christ." How does the reality of being "placed into" Christ change your daily confidence?'
      }
    ]
  },
  {
    id: 'israel',
    title: 'The Baptisms of Israel: Ritual and Manifestation',
    description: 'Examining the role of water baptism in the Kingdom program, from John the Baptist to the early chapters of Acts.',
    lessons: [
      {
        id: 'israel-ritual',
        title: 'Water and the Kingdom',
        scripture: [
          { reference: 'John 1:31', text: 'And I knew him not: but that he should be made manifest to Israel, therefore am I come baptizing with water.' },
          { reference: 'Acts 2:38', text: 'Then Peter said unto them, Repent, and be baptized every one of you in the name of Jesus Christ for the remission of sins, and ye shall receive the gift of the Holy Ghost.' }
        ],
        sourceText: {
          book: 'The Bible and Baptism',
          author: 'Harry Bultema',
          excerpt: 'John\'s baptism was specifically for the manifestation of Christ to Israel. It was a "baptism of repentance for the remission of sins" linked to the coming Kingdom.'
        },
        summary: `During the earthly ministry of Jesus Christ and the early period of the book of Acts, water baptism held a specific, divinely appointed place within the Kingdom program for Israel. John the Baptist appeared in the wilderness preaching a "baptism of repentance for the remission of sins" (Mark 1:4). This was not a "Christian" baptism in the modern sense, but a Jewish ritual required for entrance into the promised Kingdom.

John explicitly stated his purpose in John 1:31: "that he [Christ] should be made manifest to Israel, therefore am I come baptizing with water." Water baptism was the means by which the Messiah was introduced to the nation. It was a national requirement for a nation of priests (Exodus 19:6) who needed cleansing before they could serve God in His Kingdom.

When Peter preached at Pentecost in Acts 2:38, he continued this Kingdom message. He told the "men of Israel" to "Repent, and be baptized... for the remission of sins." In this context, water baptism was an expression of faith in Jesus as the Messiah and a requirement for the remission of sins and the reception of the Holy Spirit. This was consistent with the "Great Commission" given to the twelve, which included baptizing the nations (Matthew 28:19).

It is crucial to recognize that these baptisms were part of God's dealings with Israel under the Law and the Prophetic program. They were physical rituals signifying a spiritual repentance and a national identification with the coming King. As we move into the epistles of Paul, we see a transition away from these physical rituals toward the spiritual reality of the "one baptism" into the Body of Christ. Failing to distinguish between John's baptism for Israel and the Spirit's baptism for the Body leads to confusion and legalism. The Grace Library resources emphasize that while water baptism was valid and required for Israel's Kingdom program, it is not the "one baptism" Paul speaks of for the current dispensation.`,
        keyIdeas: [
          'John\'s baptism was for the manifestation of Christ to Israel.',
          'Water baptism in early Acts was linked to the remission of sins for Israel.',
          'These rituals were part of the Kingdom program, not the Body of Christ.',
          'Rightly dividing requires seeing the transition from Israel\'s rituals to the Body\'s reality.'
        ],
        questions: [
          {
            id: 'm2-q1',
            type: 'multiple-choice',
            question: 'What was the primary purpose of John the Baptist\'s water baptism?',
            options: [
              'To start a new religion',
              'To manifest Christ to Israel',
              'To replace the temple sacrifices',
              'To baptize Gentiles'
            ],
            correctAnswer: 1,
            explanation: 'John 1:31 explicitly states it was to manifest Christ to Israel.'
          },
          {
            id: 'm2-q2',
            type: 'multiple-choice',
            question: 'According to Acts 2:38, what was water baptism for?',
            options: [
              'A public testimony of a saved person',
              'The remission of sins',
              'Joining a local church',
              'Fulfilling the law of Moses'
            ],
            correctAnswer: 1,
            explanation: 'Peter told the Israelites to be baptized "for the remission of sins."'
          },
          {
            id: 'm2-q3',
            type: 'multiple-choice',
            question: 'Who was the primary audience for John\'s and Peter\'s early baptism message?',
            options: [
              'The Roman Empire',
              'The Nation of Israel',
              'The Body of Christ',
              'The Greek philosophers'
            ],
            correctAnswer: 1,
            explanation: 'The context of the Gospels and early Acts is focused on the "men of Israel."'
          },
          {
            id: 'm2-q4',
            type: 'multiple-choice',
            question: 'Was water baptism part of the "Great Commission" given to the twelve?',
            options: [
              'No, it was excluded',
              'Yes, they were told to baptize all nations',
              'Only for Jewish converts',
              'It was optional'
            ],
            correctAnswer: 1,
            explanation: 'Matthew 28:19 includes the command to "baptize them."'
          },
          {
            id: 'm2-q5',
            type: 'multiple-choice',
            question: 'How does John\'s baptism differ from the "one baptism" of Ephesians 4?',
            options: [
              'It doesn\'t, they are the same',
              'John\'s was a ritual for Israel; the "one" is a spiritual reality for the Body',
              'John\'s was in the Jordan; the "one" is in a church',
              'John\'s was for adults only'
            ],
            correctAnswer: 1,
            explanation: 'The distinction lies in the program (Kingdom vs. Grace) and the nature (Ritual vs. Reality).'
          }
        ],
        reflectionPrompt: 'If water baptism was "for the remission of sins" in Acts 2:38, why does Paul say we have redemption through His blood (Eph 1:7) without mentioning water?'
      }
    ]
  },
  {
    id: 'body',
    title: 'The One Baptism: Spirit Identification',
    description: 'The transition to the "One Baptism" of the current dispensation of Grace and its spiritual nature.',
    lessons: [
      {
        id: 'spirit-baptism',
        title: 'One Lord, One Faith, One Baptism',
        scripture: [
          { reference: 'Ephesians 4:5', text: 'One Lord, one faith, one baptism,' },
          { reference: '1 Corinthians 12:13', text: 'For by one Spirit are we all baptized into one body, whether we be Jews or Gentiles, whether we be bond or free; and have been all made to drink into one Spirit.' },
          { reference: 'Colossians 2:12', text: 'Buried with him in baptism, wherein also ye are risen with him through the faith of the operation of God, who hath raised him from the dead.' }
        ],
        sourceText: {
          book: 'Common Questions About the Grace Message',
          author: 'Joel Fink',
          excerpt: 'In the current dispensation of Grace, Paul declares there is "one baptism." Since 1 Corinthians 12:13 tells us we are baptized into the Body by the Spirit, this spiritual baptism is the "one" that remains.'
        },
        summary: `As the dispensation of the Mystery was revealed to the Apostle Paul, a significant transition occurred regarding baptism. While the Kingdom program involved "divers washings" and water rituals, the dispensation of Grace is characterized by a singular, spiritual reality. Paul explicitly declares in Ephesians 4:5 that there is "one baptism."

If there is only one baptism for the believer today, we must identify which one it is. 1 Corinthians 12:13 provides the answer: "For by one Spirit are we all baptized into one body." This is the "operation of God" (Colossians 2:12), not the work of man. It is a spiritual baptism performed by the Holy Spirit at the moment of belief, identifying the believer with the Body of Christ.

This "one baptism" accomplishes what no amount of water ever could. It places us into Christ's death, burial, and resurrection (Romans 6:3-4). It makes us members of His Body, of His flesh, and of His bones (Ephesians 5:30). It is the reality that the water rituals of the past merely foreshadowed. In the light of this revelation, water baptism becomes a "shadow" that has been superseded by the "substance" which is Christ.

The practical implication is profound. We do not need a physical ritual to be "closer" to God or to "show" our faith. We are already perfectly identified with Christ by the Spirit. Our standing is secure, our position is in the heavenlies, and our identity is found solely in Him. To insist on water baptism today is often to miss the glory of the spiritual reality we already possess. The Grace Library authors consistently point to the "one baptism" as the Spirit's work, freeing the believer from the yoke of religious ritual and grounding them in the finished work of Christ.`,
        keyIdeas: [
          'Ephesians 4:5 states there is only ONE baptism for today.',
          '1 Corinthians 12:13 identifies this one baptism as the Spirit\'s work.',
          'This baptism is a spiritual reality, not a physical ritual.',
          'It identifies the believer with the Body of Christ and His resurrection.'
        ],
        questions: [
          {
            id: 'm3-q1',
            type: 'multiple-choice',
            question: 'How many baptisms does Paul say exist for the believer in Ephesians 4:5?',
            options: [
              'Two',
              'Three',
              'One',
              'None'
            ],
            correctAnswer: 2,
            explanation: 'Paul is emphatic: "One Lord, one faith, one baptism."'
          },
          {
            id: 'm3-q2',
            type: 'multiple-choice',
            question: 'According to 1 Corinthians 12:13, who performs the "one baptism"?',
            options: [
              'The Pastor',
              'The Holy Spirit',
              'The Believer',
              'The Apostles'
            ],
            correctAnswer: 1,
            explanation: 'It is "by one Spirit" that we are all baptized into one body.'
          },
          {
            id: 'm3-q3',
            type: 'multiple-choice',
            question: 'What is the result of the Spirit\'s baptism?',
            options: [
              'We are placed into the Body of Christ',
              'We are forgiven of our sins',
              'We become members of a local church',
              'We are given a certificate'
            ],
            correctAnswer: 0,
            explanation: 'The verse says we are "baptized into one body."'
          },
          {
            id: 'm3-q4',
            type: 'multiple-choice',
            question: 'What does Colossians 2:12 call this baptism?',
            options: [
              'A religious tradition',
              'The operation of God',
              'A human effort',
              'A symbolic gesture'
            ],
            correctAnswer: 1,
            explanation: 'It is "through the faith of the operation of God."'
          },
          {
            id: 'm3-q5',
            type: 'multiple-choice',
            question: 'Why is water baptism considered a "shadow" in this context?',
            options: [
              'Because it happens in the dark',
              'Because it was a ritual pointing to the spiritual reality in Christ',
              'Because it is not important',
              'Because Paul didn\'t like it'
            ],
            correctAnswer: 1,
            explanation: 'Rituals often foreshadowed the spiritual realities revealed in the dispensation of Grace.'
          }
        ],
        reflectionPrompt: 'If you are already "baptized into one body" by the Spirit, what does that say about your unity with other believers regardless of their water baptism status?'
      }
    ]
  },
  {
    id: 'practical',
    title: 'Practical Application: Walking in Identification',
    description: 'How the reality of our identification with Christ affects our daily life and spiritual growth.',
    lessons: [
      {
        id: 'walking-identification',
        title: 'Newness of Life',
        scripture: [
          { reference: 'Romans 6:4', text: 'Therefore we are buried with him by baptism into death: that like as Christ was raised up from the dead by the glory of the Father, even so we also should walk in newness of life.' },
          { reference: 'Galatians 3:27', text: 'For as many of you as have been baptized into Christ have put on Christ.' }
        ],
        sourceText: {
          book: 'True Spirituality',
          author: 'C.R. Stam',
          excerpt: 'Our identification with Christ is not just a legal standing; it is a living reality. Because we died with Him, we are free from the power of sin. Because we rose with Him, we have His life to live through us.'
        },
        summary: `The doctrine of baptism as identification is not merely an academic exercise; it is the foundation for practical Christian living. Paul's argument in Romans 6 is that because we have been "baptized into his death," we are dead to sin. The old man was crucified with Christ so that the body of sin might be destroyed. This is our spiritual reality.

Practicality begins with "reckoning" (Romans 6:11). We are to count ourselves dead indeed unto sin, but alive unto God through Jesus Christ our Lord. This reckoning is based on the fact of our baptism—our identification—with Him. When temptation comes, we don't try to "die" to it; we recognize that we *already* died to it in Christ.

Furthermore, Galatians 3:27 tells us that having been "baptized into Christ," we have "put on Christ." This is like putting on a garment. We are clothed with His righteousness, His character, and His life. Our walk should reflect the one we are identified with. We are not trying to become something; we are walking in the reality of what we already are in Him.

This understanding removes the burden of religious performance. We don't perform rituals to get closer to God; we walk in the closeness we already have through the Spirit's baptism. We don't follow rules to be "holy"; we live out the holiness that is ours in Christ. This is "true spirituality"—a life lived by faith in the operation of God. It is edifying because it builds us up in our most holy faith, and it is practical because it provides the power for a transformed life. The Grace Library resources consistently emphasize that the "one baptism" is the starting point for a life of victory and peace in the dispensation of Grace.`,
        keyIdeas: [
          'Identification with Christ\'s death means we are dead to sin\'s power.',
          'Identification with His resurrection means we have His life within us.',
          'We are to "reckon" ourselves dead to sin based on this baptism.',
          'Putting on Christ is the practical result of our spiritual identification.'
        ],
        questions: [
          {
            id: 'm4-q1',
            type: 'multiple-choice',
            question: 'According to Romans 6:4, why were we buried with Christ by baptism?',
            options: [
              'To show we are sorry',
              'That we should walk in newness of life',
              'To fulfill a prophecy',
              'To join a ministry'
            ],
            correctAnswer: 1,
            explanation: 'The purpose is that "even so we also should walk in newness of life."'
          },
          {
            id: 'm4-q2',
            type: 'multiple-choice',
            question: 'What does it mean to "reckon" yourself dead to sin (Romans 6:11)?',
            options: [
              'To try really hard not to sin',
              'To count as true what God says about your identification with Christ',
              'To ignore your problems',
              'To wait for a feeling'
            ],
            correctAnswer: 1,
            explanation: 'Reckoning is an act of faith, counting as true the reality of our death in Christ.'
          },
          {
            id: 'm4-q3',
            type: 'multiple-choice',
            question: 'What does Galatians 3:27 say we have "put on"?',
            options: [
              'A new set of rules',
              'Christ',
              'A white robe',
              'A better attitude'
            ],
            correctAnswer: 1,
            explanation: 'We have "put on Christ," identifying with His life and character.'
          },
          {
            id: 'm4-q4',
            type: 'multiple-choice',
            question: 'How does this understanding remove the burden of religious performance?',
            options: [
              'It makes us lazy',
              'It shows us we are already accepted and complete in Christ',
              'It tells us sin doesn\'t matter',
              'It replaces the Bible with feelings'
            ],
            correctAnswer: 1,
            explanation: 'Knowing our secure identification in Christ frees us from trying to earn God\'s favor.'
          },
          {
            id: 'm4-q5',
            type: 'multiple-choice',
            question: 'What is "true spirituality" according to the summary?',
            options: [
              'Doing lots of good works',
              'A life lived by faith in the operation of God',
              'Feeling very emotional',
              'Knowing all the Greek words'
            ],
            correctAnswer: 1,
            explanation: 'It is living in the reality of what God has already accomplished in us.'
          }
        ],
        reflectionPrompt: 'In what area of your life do you need to "reckon" yourself dead to sin and alive to God today?'
      }
    ]
  }
];
