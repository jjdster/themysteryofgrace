import { Module } from './baptismStudyData';

export const lawGraceStudyData: Module[] = [
  {
    id: 'lg-m1',
    title: "The Purpose of the Law",
    description: "Understanding why God gave the Law to Israel and its role in the divine plan.",
    lessons: [
      {
        id: 'lg-l1',
        title: "The Knowledge of Sin",
        scripture: [
          { reference: "Romans 3:20", text: "Therefore by the deeds of the law there shall no flesh be justified in his sight: for by the law is the knowledge of sin." },
          { reference: "Romans 5:20", text: "Moreover the law entered, that the offence might abound. But where sin abounded, grace did much more abound:" }
        ],
        sourceText: {
          book: "Things That Differ",
          author: "Cornelius R. Stam",
          excerpt: "The Law was not given to save, but to reveal sin and the need for a Savior. It entered that the offence might abound, showing man his total helplessness."
        },
        summary: "The Law was never intended to be a means of salvation. Instead, it served as a divine mirror, revealing the depth of human sinfulness and the absolute necessity of God's grace. By providing a perfect standard that no fallen human could meet, the Law 'concluded all under sin' so that the promise by faith of Jesus Christ might be given to them that believe.",
        keyIdeas: [
          "The Law reveals sin, it does not remove it.",
          "The Law was given to Israel, not the Body of Christ.",
          "The Law makes the offense 'abound' to show the need for grace."
        ],
        reflectionPrompt: "How does understanding the Law's purpose as a mirror change your view of your own standing before God?",
        questions: [
          {
            id: 'lg-q1',
            question: "According to Romans 3:20, what is the primary function of the Law?",
            options: [
              "To provide a way to heaven",
              "To give the knowledge of sin",
              "To improve human behavior",
              "To establish a national government"
            ],
            correctAnswer: 1,
            explanation: "Romans 3:20 explicitly states that 'by the law is the knowledge of sin.'",
            type: "multiple-choice"
          },
          {
            id: 'lg-q2',
            question: "Why did the Law 'enter' according to Romans 5:20?",
            options: [
              "To stop sinning",
              "To make people righteous",
              "That the offence might abound",
              "To replace grace"
            ],
            correctAnswer: 2,
            explanation: "Romans 5:20 says the law entered 'that the offence might abound,' highlighting the need for grace.",
            type: "multiple-choice"
          }
        ]
      }
    ]
  },
  {
    id: 'lg-m2',
    title: "The Dispensation of Grace",
    description: "Exploring the current program of God for the Body of Christ.",
    lessons: [
      {
        id: 'lg-l2',
        title: "Not Under Law, But Under Grace",
        scripture: [
          { reference: "Romans 6:14", text: "For sin shall not have dominion over you: for ye are not under the law, but under grace." },
          { reference: "Galatians 5:4", text: "Christ is become of no effect unto you, whosoever of you are justified by the law; ye are fallen from grace." }
        ],
        sourceText: {
          book: "A Dispensational Theology",
          author: "Charles F. Baker",
          excerpt: "To be under grace is to be under a system where God's favor is bestowed freely based on Christ's finished work, entirely apart from the works of the Law."
        },
        summary: "Paul's declaration that we are 'not under the law, but under grace' is the foundation of our Christian walk. Grace is not just a sentiment; it is a dispensation—a way in which God deals with man. Falling from grace, as mentioned in Galatians, does not mean losing salvation, but rather falling from the system of grace back into the system of legalism.",
        keyIdeas: [
          "Grace is the current system of God's dealing with man.",
          "Falling from grace means returning to legalism.",
          "Sin's dominion is broken by grace, not by the Law."
        ],
        reflectionPrompt: "What does it mean to you practically that you are 'not under the law' in your daily life?",
        questions: [
          {
            id: 'lg-q3',
            question: "According to Romans 6:14, why shall sin not have dominion over the believer?",
            options: [
              "Because they try harder",
              "Because they follow the Ten Commandments",
              "Because they are not under the law, but under grace",
              "Because they are perfect"
            ],
            correctAnswer: 2,
            explanation: "Romans 6:14 links the lack of sin's dominion directly to being under grace rather than law.",
            type: "multiple-choice"
          },
          {
            id: 'lg-q4',
            question: "What does 'fallen from grace' mean in the context of Galatians 5:4?",
            options: [
              "Losing one's salvation",
              "Committing a serious sin",
              "Returning to the system of Law for justification",
              "Forgetting to pray"
            ],
            correctAnswer: 2,
            explanation: "In Galatians, Paul is rebuking those who try to be justified by the law, thereby moving away from the system of grace.",
            type: "multiple-choice"
          }
        ]
      }
    ]
  }
];
