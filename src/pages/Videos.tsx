import React, { useState } from 'react';

const videos = [
  {
    id: '1',
    title: 'Understanding the Mystery',
    date: '2023-01-15',
    summary: 'This video delves into the deep truths of the Mystery revealed to the Apostle Paul. It explores the unique aspects of the Body of Christ and our heavenly calling. The speaker breaks down complex theological concepts into understandable terms, making it accessible for viewers of all levels of biblical knowledge. Detailed scriptural references are provided to support the teaching. Viewers are encouraged to study the scriptures to see these truths for themselves.',
    url: 'https://youtube.com/watch?v=mock1'
  },
  {
    id: '2',
    title: 'Rightly Dividing the Word of Truth',
    date: '2023-02-22',
    summary: 'A comprehensive study on the importance of dispensational Bible study. The video emphasizes the key instruction found in 2 Timothy 2:15. It contrasts God\'s prophetic program with Israel and His mystery program with the Body of Christ. By understanding these distinctions, many seeming contradictions in the Bible are resolved. The session provides practical examples of how to apply this foundational principle in daily reading.',
    url: 'https://youtube.com/watch?v=mock2'
  },
  {
    id: '3',
    title: 'The Grace of God in Practice',
    date: '2023-03-10',
    summary: 'This session focuses on how the overarching principle of grace should affect our daily walk as believers. It discusses transitioning from a performance-based mentality to resting in the completed work of Christ. The message highlights our identity in Christ and the freedom found therein. Practical scenarios are discussed to demonstrate grace in action in personal relationships. A deeply encouraging message for those struggling with legalism.',
    url: 'https://youtube.com/watch?v=mock3'
  }
];

export default function Videos() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Videos</h1>
      <div className="space-y-8">
        {videos.map(video => (
          <div key={video.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-primary mb-2">{video.title}</h2>
            <div className="text-sm text-gray-500 mb-4">{new Date(video.date).toLocaleDateString()}</div>
            <p className="text-gray-700 leading-relaxed mb-4">{video.summary}</p>
            <a href={video.url} target="_blank" rel="noreferrer" className="text-accent hover:underline font-medium">Watch Video →</a>
          </div>
        ))}
      </div>
    </div>
  );
}
