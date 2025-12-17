# Discord UI - Modern Chat Application

A beautiful, modern Discord-inspired chat application built with React and Vite. Features real-time messaging through WebSockets, server and channel management, and a premium user interface design.

## ✨ Features

- **Real-time Messaging** - WebSocket-based instant messaging
- **Server Management** - Create and join multiple servers
- **Channel Organization** - Text channels for organized communication
- **User Authentication** - Secure login and registration
- **Premium UI/UX** - Modern Discord-inspired design with smooth animations
- **Responsive Design** - Works seamlessly across different screen sizes

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API server running on `http://127.0.0.1:8001`

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd discord-ui
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173` (or the port shown in terminal)

## 🏗️ Project Structure

```
discord-ui/
├── src/
│   ├── api/           # API service functions
│   ├── components/    # React components
│   │   ├── Channels.jsx
│   │   ├── Chat.jsx
│   │   ├── Header.jsx
│   │   ├── Message.jsx
│   │   ├── Servers.jsx
│   │   └── UserPanel.jsx
│   ├── context/       # React context providers
│   │   └── AuthContext.jsx
│   ├── pages/         # Page components
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── styles/        # CSS styles
│   │   └── discord.css
│   ├── App.jsx        # Main application component
│   └── main.jsx       # Application entry point
├── index.html
├── package.json
└── vite.config.js
```

## 🎨 Design Features

- **Custom Color Scheme** - Discord-inspired dark theme
- **Smooth Animations** - Micro-interactions for better UX
- **Custom Scrollbars** - Styled scrollbars matching the theme
- **Glassmorphism** - Modern frosted glass effect on auth pages
- **Hover Effects** - Interactive elements with smooth transitions

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 API Endpoints

The application expects the following backend API endpoints:

- `POST /api/auth/login/` - User login
- `POST /api/auth/register/` - User registration
- `GET /api/servers/` - Fetch user's servers
- `GET /api/servers/:id/channels/` - Fetch server channels
- `GET /api/channels/:id/messages/` - Fetch channel messages
- `WS /ws/chat/?token=<token>` - WebSocket connection for real-time messaging

## 🎯 Key Components

### Chat Component
- Displays message history
- Real-time message updates
- Auto-scroll to latest messages
- Empty state handling

### Servers Sidebar
- Visual server list
- Active server indication
- Smooth hover animations

### Channels Panel
- Channel list with # prefix
- Active channel highlighting
- User panel at bottom

### UserPanel
- User avatar with initials
- Username and status
- Quick action buttons (Mute, Deafen, Settings)

## 💡 Technologies Used

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **WebSocket** - Real-time communication
- **CSS3** - Styling with modern features
- **Inter Font** - Typography

## 🔐 Authentication

The application uses JWT-based authentication:
- Access tokens stored in localStorage
- Refresh tokens for session management
- Protected routes requiring authentication

## 📱 Responsive Design

The UI is optimized for various screen sizes and includes:
- Flexible layouts
- Adaptive spacing
- Touch-friendly interactions

## 🎨 Color Palette

```css
--bg-main: #313338
--bg-secondary: #2b2d31
--bg-tertiary: #1e1f22
--accent: #5865f2
--text-normal: #dbdee1
--text-muted: #949ba4
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is created for educational purposes as part of the GlobalChat presentation.

## 🙏 Acknowledgments

- Inspired by Discord's UI/UX design
- Built with modern React best practices
- Uses Vite for optimal development experience

---

Made with ❤️ for the GlobalChat presentation
