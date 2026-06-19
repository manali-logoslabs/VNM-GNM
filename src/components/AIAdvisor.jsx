import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send } from 'lucide-react'

const AI_RESPONSES = {
  'explain-vnm': 'Virtual Net Metering (VNM) lets multiple people share one solar plant. The solar energy is credited to each person\'s meter proportionally. Perfect for housing societies, schools, and community buildings!',
  'explain-gnm': 'Group Net Metering (GNM) lets one owner use solar across multiple meters/locations. A building owner can have solar on the roof and distribute energy to different floors or departments.',
  'calculate-savings': 'You can calculate your exact savings using our calculator! Tell us your state, monthly electricity bill, and consumer type. We\'ll show you potential annual savings, payback period, and 25-year benefits.',
  'check-eligibility': 'To check eligibility, we need to know: (1) Your state, (2) Consumer type (residential, commercial, etc.), (3) Monthly electricity bill. Then we can tell you if VNM, GNM, or both are available.',
  'start-registration': 'Great! Here\'s how it works: 1) Check eligibility, 2) Get a site assessment, 3) Finalize solar capacity, 4) Government approval (30-60 days), 5) Installation & commissioning, 6) Start saving!',
  'default': 'Thanks for your question! Our team will get back to you shortly. In the meantime, feel free to explore the calculator or check your eligibility.'
}

export default function AIAdvisor() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      text: 'Hi! 👋 I\'m your solar energy advisor. How can I help?',
      timestamp: new Date(),
    }
  ])
  const [isTyping, setIsTyping] = useState(false)

  const quickReplies = [
    { id: 'explain-vnm', label: 'What\'s VNM?' },
    { id: 'explain-gnm', label: 'What\'s GNM?' },
    { id: 'calculate-savings', label: 'Calculate Savings' },
    { id: 'check-eligibility', label: 'Check Eligibility' },
  ]

  const handleQuickReply = async (replyId) => {
    const reply = quickReplies.find(r => r.id === replyId)
    if (!reply) return

    setMessages(prev => [...prev, {
      id: Date.now(),
      type: 'user',
      text: reply.label,
      timestamp: new Date(),
    }])

    setIsTyping(true)
    await new Promise(resolve => setTimeout(resolve, 800))

    const response = AI_RESPONSES[replyId] || AI_RESPONSES['default']
    setMessages(prev => [...prev, {
      id: Date.now() + 1,
      type: 'ai',
      text: response,
      timestamp: new Date(),
    }])
    setIsTyping(false)
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    const input = e.target.message
    const text = input.value.trim()
    if (!text) return

    setMessages(prev => [...prev, {
      id: Date.now(),
      type: 'user',
      text,
      timestamp: new Date(),
    }])
    input.value = ''

    setIsTyping(true)
    await new Promise(resolve => setTimeout(resolve, 1000))

    setMessages(prev => [...prev, {
      id: Date.now() + 1,
      type: 'ai',
      text: AI_RESPONSES['default'],
      timestamp: new Date(),
    }])
    setIsTyping(false)
  }

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? (
          <div className="w-14 h-14 bg-primary-600 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-primary-700 transition-colors">
            <X className="w-6 h-6" />
          </div>
        ) : (
          <div className="relative">
            <motion.div
              className="absolute inset-0 bg-primary-400 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ opacity: 0.3 }}
            />
            <div className="w-14 h-14 bg-primary-600 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-primary-700 transition-colors relative z-10">
              <MessageCircle className="w-6 h-6" />
            </div>
          </div>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 right-6 w-80 max-h-96 bg-white rounded-xl shadow-xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-4">
              <h3 className="font-semibold">Solar Energy Advisor</h3>
              <p className="text-xs text-primary-100">We\'re here to help!</p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                      msg.type === 'user'
                        ? 'bg-primary-600 text-white'
                        : 'bg-slate-100 text-slate-900'
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <div className="flex gap-2 text-slate-400">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              )}
            </div>

            {/* Quick Replies */}
            {messages.length === 1 && (
              <div className="px-4 py-2 border-t border-slate-200 space-y-2">
                {quickReplies.map((reply) => (
                  <button
                    key={reply.id}
                    onClick={() => handleQuickReply(reply.id)}
                    className="w-full text-left text-xs px-2 py-1.5 rounded bg-slate-50 hover:bg-slate-100 text-slate-700 transition-colors"
                  >
                    {reply.label}
                  </button>
                ))}
              </div>
            )}

            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="border-t border-slate-200 p-3 flex gap-2">
              <input
                type="text"
                name="message"
                placeholder="Ask a question..."
                className="flex-1 text-xs border border-slate-300 rounded px-2 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button
                type="submit"
                className="w-8 h-8 bg-primary-600 rounded flex items-center justify-center text-white hover:bg-primary-700 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
