import { Coins } from 'lucide-react'
import React from 'react'

const Footer = () => {
  return (
    <div className="bg-gray-900 text-white px-6 py-12">
       <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Coins className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">MoneyManager</span>
            </div>
            <div className="flex space-x-8 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Support</a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 MutukuJnr. All rights reserved.</p>
          </div>
        </div>
    </div>
  )
}

export default Footer