import { motion } from 'motion/react';
import { Mail, Send, MapPin, Phone, Loader2 } from 'lucide-react';
import { useState, FormEvent } from 'react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      fullName: formData.get('fullName') as string,
      email: formData.get('email') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
      createdAt: new Date().toISOString(),
    };

    try {
      // Firebase is disconnected. We'll just simulate a successful send.
      console.log('Contact form data (simulated):', data);
      setSubmitted(true);
    } catch (err) {
      setError('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-secondary min-h-screen"
    >
      <header className="bg-primary py-24 text-center">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-4xl md:text-6xl font-serif text-secondary mb-4"
        >
          Get in Touch
        </motion.h1>
        <p className="text-secondary/60 max-w-2xl mx-auto px-4">
          Have questions about the Mystery of Grace or the Revelation of the Mystery? We are here to help you in your study of the Word.
        </p>
        <div className="mt-8 max-w-2xl mx-auto px-4 text-accent-light italic text-lg">
          *** Please, if any one has any suggestion that might make this site more user friendly or, if you struggle finding what you are looking for or, if you find a typo or I misspeak, I would appreciate hearing from you. ***
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            <div className="p-8 bg-white rounded-3xl shadow-sm border border-primary/5">
              <h3 className="text-xl font-serif font-bold text-primary mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-accent mr-4 shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-primary/40 uppercase tracking-widest mb-1">Email</p>
                    <p className="text-primary font-medium">jjdster@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-accent mr-4 shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-primary/40 uppercase tracking-widest mb-1">Phone</p>
                    <p className="text-primary font-medium">(623) 377 - 3071</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-accent mr-4 shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-primary/40 uppercase tracking-widest mb-1">Location</p>
                    <p className="text-primary font-medium">Surprise, AZ</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-primary/5">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Send className="h-10 w-10 text-accent" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-primary mb-2">Message Sent</h3>
                  <p className="text-primary/60">Thank you for reaching out. We will respond to your inquiry shortly.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-8 text-accent font-bold hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium">
                      {error}
                    </div>
                  )}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-primary/40 uppercase tracking-widest mb-2">Full Name</label>
                      <input
                        required
                        name="fullName"
                        type="text"
                        className="w-full px-4 py-3 rounded-xl border border-primary/10 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-primary/40 uppercase tracking-widest mb-2">Email Address</label>
                      <input
                        required
                        name="email"
                        type="email"
                        className="w-full px-4 py-3 rounded-xl border border-primary/10 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-primary/40 uppercase tracking-widest mb-2">Subject</label>
                    <input
                      required
                      name="subject"
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-primary/10 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                      placeholder="Question about the Mystery"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-primary/40 uppercase tracking-widest mb-2">Message</label>
                    <textarea
                      required
                      name="message"
                      rows={6}
                      className="w-full px-4 py-3 rounded-xl border border-primary/10 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all resize-none"
                      placeholder="Your message here..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-primary text-secondary rounded-xl font-bold uppercase tracking-widest hover:bg-accent transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
