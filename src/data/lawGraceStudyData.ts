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
  },
  {
    id: 'lg-m3',
    title: "The Law as a Schoolmaster",
    description: "Understanding the temporary role of the Law in leading to Christ.",
    lessons: [
      {
        id: 'lg-l3',
        title: "The Purpose and End of the Schoolmaster",
        scripture: [
          { reference: "Galatians 3:24-25", text: "Wherefore the law was our schoolmaster to bring us unto Christ, that we might be justified by faith. But after that faith is come, we are no longer under a schoolmaster." }
        ],
        sourceText: {
          book: "Things That Differ",
          author: "Cornelius R. Stam",
          excerpt: "The schoolmaster (pedagogue) in ancient times was not the teacher, but the one who conducted the child to the teacher. The Law conducted the sinner to Christ, but once Christ is reached, the schoolmaster's work is finished."
        },
        summary: "The Law served a specific, temporary purpose in God's dealings with Israel. Like a schoolmaster who supervises a minor child until they reach maturity, the Law supervised Israel's conduct and revealed their need for a Savior. However, with the revelation of the mystery and the coming of the dispensation of grace, the believer is no longer under that supervisor. We have been brought to Christ, where justification is by faith alone.",
        keyIdeas: [
          "The Law was a tutor/supervisor, not the final goal.",
          "The 'coming of faith' refers to the revelation of the path of justification apart from the Law.",
          "Believers today are 'graduated' from the Law's supervision."
        ],
        reflectionPrompt: "If the Law is no longer your schoolmaster, what is now the primary guide for your life and conduct as a member of the Body of Christ?",
        questions: [
          {
            id: 'lg-q5',
            question: "According to Galatians 3:24, what was the primary goal of the Law as a 'schoolmaster'?",
            options: [
              "To make people permanently holy",
              "To bring us unto Christ",
              "To replace the need for faith",
              "To provide a permanent social code"
            ],
            correctAnswer: 1,
            explanation: "Galatians 3:24 says: 'Wherefore the law was our schoolmaster to bring us unto Christ.'",
            type: "multiple-choice"
          }
        ]
      }
    ]
  },
  {
    id: 'lg-m4',
    title: "Dead to the Law",
    description: "The believer's identification with Christ in His death to the Law.",
    lessons: [
      {
        id: 'lg-l4',
        title: "Married to Another",
        scripture: [
          { reference: "Romans 7:4", text: "Wherefore, my brethren, ye also are become dead to the law by the body of Christ; that ye should be married to another, even to him who is raised from the dead, that we should bring forth fruit unto God." },
          { reference: "Romans 7:6", text: "But now we are delivered from the law, that being dead wherein we were held; that we should serve in newness of spirit, and not in the oldness of the letter." }
        ],
        sourceText: {
          book: "A Dispensational Theology",
          author: "Charles F. Baker",
          excerpt: "The believer's death with Christ has severed the legal relationship with the Law. Just as a wife is freed from the law of her husband when he dies, we are freed from the Law through Christ's death so that we might belong to Him in resurrection."
        },
        summary: "In Romans 7, Paul uses the analogy of marriage to show how our relationship to the Law has been severed. Through our identification with Christ in His death, we have become 'dead to the law.' This is not an license to sin, but a change of mastery. We are no longer governed by external rules (the 'oldness of the letter') but by the indwelling Spirit (the 'newness of spirit').",
        keyIdeas: [
          "Death terminates all legal obligations.",
          "We are delivered from the Law to serve God in a new way.",
          "Our union with the risen Christ is the source of spiritual fruit."
        ],
        reflectionPrompt: "Compare 'serving in the oldness of the letter' with 'serving in the newness of spirit.' Which one characterizes your current walk?",
        questions: [
          {
            id: 'lg-q6',
            question: "According to Romans 7:4, how do we become 'dead to the law'?",
            options: [
              "By ignoring its commands",
              "By the body of Christ (our identification with His death)",
              "By becoming perfect in behavior",
              "By repenting of legalism"
            ],
            correctAnswer: 1,
            explanation: "Romans 7:4 states we 'become dead to the law by the body of Christ.'",
            type: "multiple-choice"
          }
        ]
      }
    ]
  },
  {
    id: 'lg-m5',
    title: "Grace for Living",
    description: "The practical outworking of grace in the believer's daily life.",
    lessons: [
      {
        id: 'lg-l5',
        title: "The Teaching of Grace",
        scripture: [
          { reference: "Titus 2:11-12", text: "For the grace of God that bringeth salvation hath appeared to all men, Teaching us that, denying ungodliness and worldly lusts, we should live soberly, righteously, and godly, in this present world;" }
        ],
        sourceText: {
          book: "Things That Differ",
          author: "Cornelius R. Stam",
          excerpt: "Grace is not only a means of salvation; it is a teacher. It teaches us to live godly lives not because we are afraid of punishment, but because we are thankful for God's love."
        },
        summary: "Many mistakenly believe that without the Law, there is no restraint for sin. However, Paul teaches that Grace itself is a powerful instructor. It teaches us to deny ungodliness and worldly lusts. While the Law commanded us to do right from the outside, Grace motivates us to do right from the inside through a heart of gratitude for the finished work of Christ.",
        keyIdeas: [
          "Grace is an active teacher of godly living.",
          "Grace-motivated service is based on gratitude, not fear.",
          "The 'present world' is the sphere where grace's power is demonstrated."
        ],
        reflectionPrompt: "In what ways has the grace of God personally taught you to deny 'worldly lusts' this week?",
        questions: [
          {
            id: 'lg-q7',
            question: "According to Titus 2:12, what does the grace of God teach us?",
            options: [
              "To keep the Sabbath",
              "To deny ungodliness and worldly lusts",
              "That sin doesn't matter",
              "To follow the Mosaic Law"
            ],
            correctAnswer: 1,
            explanation: "Titus 2:12 explicitly states that grace teaches us to 'deny ungodliness and worldly lusts.'",
            type: "multiple-choice"
          }
        ]
      }
    ]
  }
];
