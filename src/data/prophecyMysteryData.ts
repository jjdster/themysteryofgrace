
import { Module } from './baptismStudyData';

export const prophecyMysteryData: Module[] = [
  {
    id: 'foundations',
    title: 'Foundations of Right Division',
    description: 'Understanding the basic distinction between God\'s program for Israel (Prophecy) and His program for the Body of Christ (the Mystery).',
    lessons: [
      {
        id: 'prophecy-definition',
        title: 'What is Prophecy?',
        scripture: [
          { reference: 'Acts 3:21', text: 'Whom the heaven must receive until the times of restitution of all things, which God hath spoken by the mouth of all his holy prophets since the world began.' },
          { reference: 'Luke 1:70', text: 'As he spake by the mouth of his holy prophets, which have been since the world began:' }
        ],
        sourceText: {
          book: 'Things That Differ',
          author: 'C.R. Stam',
          excerpt: 'Prophecy is that which has been spoken by the mouth of all His holy prophets since the world began. It concerns the earthly kingdom and the restoration of Israel.'
        },
        summary: `To "rightly divide the word of truth" (2 Timothy 2:15), we must first understand what "Prophecy" is in a dispensational sense. According to Acts 3:21 and Luke 1:70, Prophecy is that which God has spoken by the mouth of all His holy prophets "since the world began." 

Prophecy deals with God's earthly program. It focuses on the nation of Israel, their covenants, their land, and the coming of their King to establish an earthly kingdom. It was never a secret; it was the subject of divine revelation from the earliest times. From Genesis to the early chapters of Acts, the focus is on this prophetic program—God's plan to reclaim the earth through a redeemed nation of Israel.

When we read the Old Testament, the Gospels, and the early part of Acts, we are reading about the unfolding of this Prophetic program. It is "spoken" and "known" throughout the ages. Understanding this allows us to see that God's dealings with man were not always the same as they are today under the Mystery.`,
        keyIdeas: [
          'Prophecy has been spoken since the world began.',
          'Prophecy concerns God\'s earthly program and the nation of Israel.',
          'Prophecy was never a secret; it was revealed to the prophets.',
          'The earthly kingdom is the central theme of the prophetic program.'
        ],
        questions: [
          {
            id: 'pm1-q1',
            type: 'multiple-choice',
            question: 'According to Acts 3:21, how long has Prophecy been spoken?',
            options: [
              'Since the time of Paul',
              'Since the world began',
              'Only since Moses',
              'It was a secret until recently'
            ],
            correctAnswer: 1,
            explanation: 'Peter explicitly states that prophecy has been spoken by the prophets since the world began.'
          },
          {
            id: 'pm1-q2',
            type: 'multiple-choice',
            question: 'What is the primary focus of the Prophetic program?',
            options: [
              'The Body of Christ',
              'The Heavenly places',
              'The Earthly kingdom and Israel',
              'The individual believer\'s feelings'
            ],
            correctAnswer: 2,
            explanation: 'Prophecy centers on God\'s plan for the earth through the nation of Israel.'
          },
          {
            id: 'pm1-q3',
            type: 'multiple-choice',
            question: 'Was the Prophetic program a secret?',
            options: [
              'Yes, it was hidden in God',
              'No, it was spoken by the mouth of all holy prophets',
              'Only to the Gentiles',
              'Only until the cross'
            ],
            correctAnswer: 1,
            explanation: 'Prophecy was revealed and spoken throughout the ages, unlike the Mystery.'
          }
        ],
        reflectionPrompt: 'If Prophecy has been "spoken since the world began," why do many people think all of the Bible is about the same thing?'
      },
      {
        id: 'mystery-definition',
        title: 'What is the Mystery?',
        scripture: [
          { reference: 'Romans 16:25', text: 'Now to him that is of power to stablish you according to my gospel, and the preaching of Jesus Christ, according to the revelation of the mystery, which was kept secret since the world began,' },
          { reference: 'Ephesians 3:3-5', text: 'How that by revelation he made known unto me the mystery... Which in other ages was not made known unto the sons of men, as it is now revealed unto his holy apostles and prophets by the Spirit;' },
          { reference: 'Colossians 1:26', text: 'Even the mystery which hath been hid from ages and from generations, but now is made manifest to his saints:' }
        ],
        sourceText: {
          book: 'The Mystery',
          author: 'Charles F. Baker',
          excerpt: 'The Mystery is that which was kept secret since the world began. It was not revealed to the prophets of old but was first committed to the Apostle Paul for us Gentiles.'
        },
        summary: `In stark contrast to Prophecy, the "Mystery" (Greek: *mysterion*) is that which was "kept secret since the world began" (Romans 16:25). It was "hid in God" (Ephesians 3:9) and was not made known to the sons of men in other ages. 

The Mystery is God's heavenly program. It concerns the "Body of Christ," a new creation where there is neither Jew nor Gentile, but all are one in Christ. This program does not focus on an earthly kingdom or national covenants, but on a heavenly position and spiritual blessings in heavenly places (Ephesians 1:3).

The Mystery was first revealed to the Apostle Paul. He was the chosen vessel to make known this "unsearchable riches of Christ" (Ephesians 3:8). While Prophecy was the subject of the "holy prophets since the world began," the Mystery was "kept secret since the world began" until it was revealed to Paul.

Rightly dividing the word of truth means recognizing this fundamental distinction. We must not read the Mystery (Paul's epistles) into Prophecy (the rest of the Bible), nor should we try to force the Prophetic program onto the Body of Christ today.`,
        keyIdeas: [
          'The Mystery was kept secret since the world began.',
          'The Mystery concerns God\'s heavenly program and the Body of Christ.',
          'The Mystery was first revealed to the Apostle Paul.',
          'The Mystery was "hid in God" and not known to the Old Testament prophets.'
        ],
        questions: [
          {
            id: 'pm2-q1',
            type: 'multiple-choice',
            question: 'According to Romans 16:25, how long was the Mystery kept secret?',
            options: [
              'Since the time of Moses',
              'Since the world began',
              'Only for a few years',
              'It was never a secret'
            ],
            correctAnswer: 1,
            explanation: 'Paul states the mystery was "kept secret since the world began."'
          },
          {
            id: 'pm2-q2',
            type: 'multiple-choice',
            question: 'To whom was the Mystery first revealed?',
            options: [
              'Peter',
              'John the Baptist',
              'The Apostle Paul',
              'Moses'
            ],
            correctAnswer: 2,
            explanation: 'Ephesians 3:3-5 clarifies that the mystery was made known to Paul by revelation.'
          },
          {
            id: 'pm2-q3',
            type: 'multiple-choice',
            question: 'Where was the Mystery "hid" before it was revealed?',
            options: [
              'In the Old Testament',
              'In the stars',
              'In God',
              'In the temple'
            ],
            correctAnswer: 2,
            explanation: 'Ephesians 3:9 says the mystery was "hid in God."'
          }
        ],
        reflectionPrompt: 'How does knowing that the Body of Christ was a "secret" change the way you read the Old Testament?'
      }
    ]
  },
  {
    id: 'distinctions',
    title: 'Key Distinctions',
    description: 'Exploring the practical differences between the two programs.',
    lessons: [
      {
        id: 'earth-vs-heaven',
        title: 'Earthly Kingdom vs. Heavenly Body',
        scripture: [
          { reference: 'Matthew 6:10', text: 'Thy kingdom come. Thy will be done in earth, as it is in heaven.' },
          { reference: 'Ephesians 1:3', text: 'Blessed be the God and Father of our Lord Jesus Christ, who hath blessed us with all spiritual blessings in heavenly places in Christ:' },
          { reference: 'Philippians 3:20', text: 'For our conversation is in heaven; from whence also we look for the Saviour, the Lord Jesus Christ:' }
        ],
        sourceText: {
          book: 'The Twofold Purpose of God',
          author: 'Harry Bultema',
          excerpt: 'God has a purpose for the earth and a purpose for the heavens. Israel is the earthly people; the Body of Christ is the heavenly people.'
        },
        summary: `One of the most visible distinctions between Prophecy and the Mystery is the sphere of blessing. 

The Prophetic program is centered on the **Earth**. The promise to Abraham was a physical land. The prayer of the disciples was for the kingdom to come "in earth" (Matthew 6:10). The prophets spoke of a time when the wolf would dwell with the lamb and the earth would be full of the knowledge of the Lord. Israel's hope is an earthly one.

The Mystery program is centered on the **Heavens**. Paul tells us that we are blessed with "all spiritual blessings in heavenly places" (Ephesians 1:3). Our "conversation" (citizenship) is in heaven (Philippians 3:20). We are not looking for an earthly kingdom, but for our Savior to come from heaven to catch us up to be with Him.

Confusing these two spheres leads to "kingdom building" on earth today, which is not God's current program. We are ambassadors for a heavenly country, not citizens of an earthly kingdom.`,
        keyIdeas: [
          'Prophecy focuses on an earthly kingdom and physical blessings.',
          'The Mystery focuses on a heavenly position and spiritual blessings.',
          'Israel is God\'s earthly people; the Body of Christ is His heavenly people.',
          'Our citizenship as members of the Body is in heaven.'
        ],
        questions: [
          {
            id: 'pm3-q1',
            type: 'multiple-choice',
            question: 'Where are the blessings of the Body of Christ located according to Ephesians 1:3?',
            options: [
              'In the land of Israel',
              'In heavenly places',
              'In a local church building',
              'In our bank accounts'
            ],
            correctAnswer: 1,
            explanation: 'Paul says we are blessed with spiritual blessings "in heavenly places."'
          },
          {
            id: 'pm3-q2',
            type: 'multiple-choice',
            question: 'What was the focus of the "Lord\'s Prayer" regarding the kingdom?',
            options: [
              'That it would stay in heaven',
              'That it would come "in earth"',
              'That it would be a spiritual feeling',
              'That it would be delayed'
            ],
            correctAnswer: 1,
            explanation: 'The prayer is "Thy kingdom come... in earth," reflecting the prophetic hope.'
          }
        ],
        reflectionPrompt: 'If our citizenship is in heaven, how should that affect our involvement in earthly politics and kingdom-building?'
      }
    ]
  }
];
