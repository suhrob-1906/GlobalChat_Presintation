# Discord UI - Quick Reference Guide

## 🚀 Quick Start

```bash
# Start the development server
npm run dev

# Application will be available at:
http://localhost:5173
```

## 📋 Common Tasks

### Adding a New Channel Feature
1. Update `src/components/Channels.jsx`
2. Add the feature to the channel list rendering
3. Update CSS in `src/styles/discord.css` if needed

### Modifying Message Display
1. Edit `src/components/Message.jsx` for message structure
2. Update `.message` styles in `discord.css`

### Changing Theme Colors
```css
/* Edit src/styles/discord.css */
:root {
  --accent: #5865f2;      /* Change to your color */
  --bg-main: #313338;     /* Main background */
  /* etc... */
}
```

### Adding New Authentication Field
1. Edit `src/pages/Login.jsx` or `Register.jsx`
2. Add state: `const [field, setField] = useState("")`
3. Add input field in JSX
4. Update submit function to include new field

### Customizing Animations
```css
/* In discord.css, find the element and adjust: */
.server {
  transition: all 0.2s ease;  /* Change duration/easing */
}
```

## 🎨 Styling Quick Reference

### Adding Hover Effect
```css
.your-element:hover {
  background: var(--bg-hover);
  color: var(--text-header);
}
```

### Creating New Component Style
```css
.your-component {
  background: var(--bg-secondary);
  padding: 16px;
  border-radius: 8px;
  transition: all 0.15s ease;
}
```

## 🔧 Common Code Patterns

### Fetching Data from API
```javascript
useEffect(() => {
  if (!channel || !token) return;
  
  fetchData(channel.id, token)
    .then(data => setData(data))
    .catch(err => console.error(err));
}, [channel, token]);
```

### Sending WebSocket Message
```javascript
const sendMessage = (text) => {
  socketRef.current.send(
    JSON.stringify({
      channel_id: activeChannel.id,
      text,
    })
  );
};
```

### Adding Loading State
```javascript
const [loading, setLoading] = useState(false);

const handleAction = async () => {
  setLoading(true);
  try {
    await someAsyncAction();
  } finally {
    setLoading(false);
  }
};

// In JSX:
<button disabled={loading}>
  {loading ? "Loading..." : "Click Me"}
</button>
```

## 📦 File Quick Access

### Most Frequently Edited
- `src/components/Chat.jsx` - Chat functionality
- `src/components/Message.jsx` - Message display
- `src/styles/discord.css` - All styling
- `src/App.jsx` - Main app logic

### API Integration
- `src/api/auth.js` - Authentication
- `src/api/servers.js` - Server/channel data
- `src/api/messages.js` - Message history

### Configuration
- `package.json` - Dependencies
- `vite.config.js` - Vite configuration
- `index.html` - HTML template

## 🐛 Debugging Tips

### WebSocket Not Connecting
1. Check backend is running on port 8001
2. Verify token is in localStorage: `localStorage.getItem('access')`
3. Check browser console for WebSocket errors

### Messages Not Displaying
1. Check `allMessages` array in Chat component
2. Verify message structure matches expected format
3. Look for console errors in message rendering

### Styling Issues
1. Check if CSS file is imported in `main.jsx`
2. Verify CSS variable names are correct
3. Use browser DevTools to inspect element styles

### Authentication Issues
1. Check AuthContext is providing user data
2. Verify tokens are stored: `localStorage.getItem('access')`
3. Check network tab for API request/response

## 🎯 Keyboard Shortcuts

### In Chat
- `Enter` - Send message
- `Ctrl+A` - Select all text in input

### In Auth Forms
- `Enter` - Submit form
- `Tab` - Navigate between fields

## 📊 Performance Tips

### Optimizing Message List
```javascript
// Use unique keys instead of index
allMessages.map((msg) => (
  <Message key={msg.id} message={msg} />
))
```

### Lazy Loading Messages
```javascript
// Load more messages when scrolling to top
useEffect(() => {
  const handleScroll = (e) => {
    if (e.target.scrollTop === 0) {
      loadMoreMessages();
    }
  };
  
  containerRef.current?.addEventListener('scroll', handleScroll);
  return () => containerRef.current?.removeEventListener('scroll', handleScroll);
}, []);
```

## 🔐 Security Notes

- Tokens stored in localStorage
- Always validate input before sending
- Never expose sensitive data in client-side code
- Use HTTPS in production

## 📱 Browser Compatibility

Tested and working on:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Edge 90+
- ✅ Safari 14+

## 🆘 Quick Fixes

### "Cannot find module" error
```bash
npm install
```

### Port 5173 already in use
```bash
# Kill process on port 5173 or change port in vite.config.js
```

### Styles not applying
```bash
# Hard refresh browser
Ctrl + Shift + R (Windows/Linux)
Cmd + Shift + R (Mac)
```

### WebSocket connection failed
1. Ensure backend is running
2. Check WebSocket URL in App.jsx
3. Verify token is valid

## 📚 Additional Resources

- **React Docs**: https://react.dev
- **Vite Docs**: https://vite.dev
- **WebSocket API**: https://developer.mozilla.org/en-US/docs/Web/API/WebSocket

## 💡 Pro Tips

1. **Use React DevTools** - Essential for debugging React components
2. **Keep console open** - Catch errors early
3. **Test in different browsers** - Ensure compatibility
4. **Use CSS variables** - Easy theming
5. **Comment complex logic** - Help future you

## 🎓 Learning Path

1. Understand the component structure
2. Learn how WebSocket integration works
3. Explore the styling system
4. Modify existing features
5. Add new features

---

**Need Help?** Check the full documentation in:
- `README.md` - Project overview
- `FEATURES.md` - Feature details
- `PROJECT_SUMMARY.md` - What's been built
- `LAYOUT_GUIDE.txt` - Visual layout reference
