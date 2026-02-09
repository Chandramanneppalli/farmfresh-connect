import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Phone, MoreVertical } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const contacts = [
  { id: 1, name: 'Priya Sharma', lastMsg: 'When will the tomatoes be ready?', time: '2m ago', unread: 2, avatar: 'P' },
  { id: 2, name: 'Amit Kumar', lastMsg: 'Order received. Thank you!', time: '1h ago', unread: 0, avatar: 'A' },
  { id: 3, name: 'Neha Reddy', lastMsg: 'Can you deliver to Sector 15?', time: '3h ago', unread: 1, avatar: 'N' },
  { id: 4, name: 'Vikram Singh', lastMsg: 'Interested in bulk rice order', time: '1d ago', unread: 0, avatar: 'V' },
];

const messages = [
  { id: 1, sender: 'them', text: 'Hi! Are the organic tomatoes still available?', time: '10:30 AM' },
  { id: 2, sender: 'me', text: 'Yes! We have 50kg fresh stock. Grade A+ quality.', time: '10:32 AM' },
  { id: 3, sender: 'them', text: 'Great! What\'s the price per kg?', time: '10:33 AM' },
  { id: 4, sender: 'me', text: '₹45/kg. AI recommends ₹48 based on current market trends.', time: '10:34 AM' },
  { id: 5, sender: 'them', text: 'I\'ll take 5kg. When can you deliver?', time: '10:35 AM' },
  { id: 6, sender: 'me', text: 'Tomorrow morning by 10 AM. I\'ll create the order for you!', time: '10:36 AM' },
  { id: 7, sender: 'them', text: 'When will the tomatoes be ready?', time: '10:38 AM' },
];

const ChatPage = () => {
  const [selectedContact, setSelectedContact] = useState(contacts[0]);
  const [newMessage, setNewMessage] = useState('');

  return (
    <div className="flex h-[calc(100vh-60px)] md:h-screen">
      {/* Contacts List */}
      <div className="w-full md:w-80 border-r border-border bg-card flex flex-col">
        <div className="p-4 border-b border-border">
          <h2 className="text-lg font-bold font-display text-card-foreground">Messages</h2>
        </div>
        <div className="flex-1 overflow-auto">
          {contacts.map((contact) => (
            <button
              key={contact.id}
              onClick={() => setSelectedContact(contact)}
              className={`w-full flex items-center gap-3 px-4 py-3 border-b border-border transition-colors text-left ${
                selectedContact.id === contact.id ? 'bg-accent' : 'hover:bg-muted/50'
              }`}
            >
              <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm shrink-0">
                {contact.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <p className="font-medium text-sm text-card-foreground truncate">{contact.name}</p>
                  <span className="text-xs text-muted-foreground shrink-0">{contact.time}</span>
                </div>
                <p className="text-xs text-muted-foreground truncate mt-0.5">{contact.lastMsg}</p>
              </div>
              {contact.unread > 0 && (
                <span className="h-5 w-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center shrink-0">
                  {contact.unread}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="hidden md:flex flex-1 flex-col bg-background">
        {/* Chat Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
              {selectedContact.avatar}
            </div>
            <div>
              <p className="font-medium text-sm text-card-foreground">{selectedContact.name}</p>
              <p className="text-xs text-farm-success">Online</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon"><Phone className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-auto p-4 space-y-3">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[70%] rounded-2xl px-4 py-2.5 ${
                msg.sender === 'me'
                  ? 'bg-primary text-primary-foreground rounded-br-md'
                  : 'bg-card text-card-foreground border border-border rounded-bl-md'
              }`}>
                <p className="text-sm">{msg.text}</p>
                <p className={`text-[10px] mt-1 ${msg.sender === 'me' ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}>{msg.time}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border bg-card">
          <div className="flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 h-11"
            />
            <Button size="icon" className="h-11 w-11 shrink-0">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
