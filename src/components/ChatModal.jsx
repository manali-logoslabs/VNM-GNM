import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send } from 'lucide-react'

export default function ChatModal({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: 'Hi! I\'m the Green House AI Assistant. How can I help you today?' }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const quickReplies = [
    'Explain VNM',
    'Calculate Savings',
    'Check Eligibility',
    'Start Registration'
  ]

  const handleQuickReply = (reply) => {
    addMessage(reply, 'user')
    setTimeout(() => {
      handleBotResponse(reply)
    }, 500)
  }

  const handleSendMessage = () => {
    if (!input.trim()) return
    addMessage(input, 'user')
    setInput('')
    setTimeout(() => {
      handleBotResponse(input)
    }, 500)
  }

  const addMessage = (text, type) => {
    setMessages(prev => [...prev, { id: Date.now(), type, text }])
  }

  const handleBotResponse = (userMessage) => {
    setIsTyping(true)
    setTimeout(() => {
      const responses = {
        'Explain VNM': 'Virtual Net Metering (VNM) allows you to subscribe to a shared solar plant and get credits for the solar energy generated. You don\'t need to install panels on your roof!',
        'Calculate Savings': 'You can calculate your potential savings on our Calculator page. Just share your monthly bill and location, and we\'ll show you how much you can save.',
        'Check Eligibility': 'Most residential consumers, societies, and commercial buildings are eligible. Check your eligibility on our Eligibility page based on your state.',
        'Start Registration': 'Great! Visit our Contact page or click "Calculate My Savings" to begin the registration process. Our team will guide you through it.',
      }

      const botResponse = responses[userMessage] || 'Thanks for your message! Our team will get back to you shortly with more information.'
      addMessage(botResponse, 'bot')
      setIsTyping(false)
    }, 1000)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:bottom-4 md:right-4 md:top-auto md:left-auto md:w-full md:max-w-md bg-white rounded-2xl shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-4 rounded-t-2xl flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg">Green House AI</h3>
                <p className="text-xs text-primary-100">Always here to help</p>
              </div>
              <button
                onClick={onClose}
                className="p-1 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
              {messages.map(msg => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      msg.type === 'user'
                        ? 'bg-primary-600 text-white rounded-br-none'
                        : 'bg-white text-slate-900 border border-slate-200 rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-200 px-4 py-2 rounded-lg rounded-bl-none">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Replies */}
            {messages.length === 1 && (
              <div className="px-4 py-3 border-t border-slate-200 bg-white">
                <p className="text-xs text-slate-600 mb-2 font-semibold">Quick replies:</p>
                <div className="grid grid-cols-2 gap-2">
                  {quickReplies.map(reply => (
                    <button
                      key={reply}
                      onClick={() => handleQuickReply(reply)}
                      className="text-xs bg-primary-50 text-primary-600 px-2 py-1 rounded hover:bg-primary-100 transition-colors font-medium"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="border-t border-slate-200 p-4 bg-white rounded-b-2xl flex gap-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
              />
              <button
                onClick={handleSendMessage}
                disabled={!input.trim()}
                className="bg-primary-600 text-white p-2 rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
