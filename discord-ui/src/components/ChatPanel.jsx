import React from 'react';

function formatTimestamp(isoString) {
    const date = new Date(isoString);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();

    const timeStr = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });

    if (isToday) {
        return `Today at ${timeStr}`;
    }

    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) {
        return `Yesterday at ${timeStr}`;
    }

    return date.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
    }) + ` ${timeStr}`;
}

function Avatar({ user, size = 'md' }) {
    const sizeClasses = {
        sm: 'w-6 h-6 text-xs',
        md: 'w-10 h-10 text-sm',
        lg: 'w-20 h-20 text-2xl',
    };

    const colors = ['#5865F2', '#57F287', '#FEE75C', '#EB459E', '#ED4245'];
    const colorIndex = user.username.charCodeAt(0) % colors.length;

    return (
        <div
            className={`${sizeClasses[size]} rounded-full flex items-center justify-center text-white font-medium flex-shrink-0`}
            style={{ backgroundColor: colors[colorIndex] }}
        >
            {user.avatar ? (
                <img src={user.avatar} alt={user.username} className="w-full h-full rounded-full object-cover" />
            ) : (
                user.username[0].toUpperCase()
            )}
        </div>
    );
}

function Reaction({ emoji, count, reacted, onToggle }) {
    return (
        <button
            onClick={onToggle}
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-sm border transition-colors ${reacted
                    ? 'bg-[#5865F2]/20 border-[#5865F2] text-[#dee0fc]'
                    : 'bg-[#2b2d31] border-[#3f4147] text-[#b5bac1] hover:border-[#5a5e66]'
                }`}
        >
            <span>{emoji}</span>
            <span className={reacted ? 'text-[#5865F2]' : ''}>{count}</span>
        </button>
    );
}

function MessageActions() {
    return (
        <div className="absolute -top-4 right-4 hidden group-hover:flex bg-[#2b2d31] border border-[#1e1f22] rounded shadow-lg">
            <button className="p-1.5 hover:bg-[#36373d] text-[#b5bac1] hover:text-[#dbdee1]" title="Add Reaction">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.0002 0.500244C5.64624 0.500244 0.500244 5.64624 0.500244 12.0002C0.500244 18.3542 5.64624 23.5002 12.0002 23.5002C18.3542 23.5002 23.5002 18.3542 23.5002 12.0002C23.5002 5.64624 18.3542 0.500244 12.0002 0.500244ZM12.0002 21.5002C6.75024 21.5002 2.50024 17.2502 2.50024 12.0002C2.50024 6.75024 6.75024 2.50024 12.0002 2.50024C17.2502 2.50024 21.5002 6.75024 21.5002 12.0002C21.5002 17.2502 17.2502 21.5002 12.0002 21.5002ZM8.00024 10.0002C8.00024 9.17224 8.67224 8.50024 9.50024 8.50024C10.3282 8.50024 11.0002 9.17224 11.0002 10.0002C11.0002 10.8282 10.3282 11.5002 9.50024 11.5002C8.67224 11.5002 8.00024 10.8282 8.00024 10.0002ZM13.0002 10.0002C13.0002 9.17224 13.6722 8.50024 14.5002 8.50024C15.3282 8.50024 16.0002 9.17224 16.0002 10.0002C16.0002 10.8282 15.3282 11.5002 14.5002 11.5002C13.6722 11.5002 13.0002 10.8282 13.0002 10.0002ZM17.6002 14.4002C16.5002 16.5002 14.3002 17.5002 12.0002 17.5002C9.70024 17.5002 7.50024 16.5002 6.40024 14.4002C6.20024 14.0002 6.40024 13.5002 6.80024 13.3002C7.20024 13.1002 7.70024 13.3002 7.90024 13.7002C8.70024 15.2002 10.3002 15.8002 12.0002 15.8002C13.7002 15.8002 15.3002 15.2002 16.1002 13.7002C16.3002 13.3002 16.8002 13.1002 17.2002 13.3002C17.6002 13.5002 17.8002 14.0002 17.6002 14.4002Z" />
                </svg>
            </button>
            <button className="p-1.5 hover:bg-[#36373d] text-[#b5bac1] hover:text-[#dbdee1]" title="Reply">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M10 8.26667V4L3 11.4667L10 18.9333V14.56C15 14.56 18.5 16.2667 21 20C20 14.6667 17 9.33333 10 8.26667Z" />
                </svg>
            </button>
            <button className="p-1.5 hover:bg-[#36373d] text-[#b5bac1] hover:text-[#dbdee1]" title="More">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                </svg>
            </button>
        </div>
    );
}

function Message({ message, isCompact, onReact }) {
    if (isCompact) {
        return (
            <div className="group relative flex items-start gap-4 px-4 py-0.5 hover:bg-[#2e3035]">
                <span className="w-10 text-right text-[11px] text-[#949ba4] opacity-0 group-hover:opacity-100 pt-0.5 flex-shrink-0">
                    {new Date(message.timestamp).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
                </span>
                <div className="flex-1 min-w-0">
                    <p className="text-[#dbdee1] break-words">{message.content}</p>
                    {message.reactions.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                            {message.reactions.map((r, i) => (
                                <Reaction
                                    key={i}
                                    {...r}
                                    onToggle={() => onReact(message.id, r.emoji)}
                                />
                            ))}
                        </div>
                    )}
                </div>
                <MessageActions />
            </div>
        );
    }

    return (
        <div className="group relative flex items-start gap-4 px-4 py-2 mt-4 hover:bg-[#2e3035]">
            <Avatar user={message.author} size="md" />
            <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                    <span className="font-medium text-[#f2f3f5] hover:underline cursor-pointer">
                        {message.author.username}
                    </span>
                    <span className="text-xs text-[#949ba4]">
                        {formatTimestamp(message.timestamp)}
                    </span>
                </div>
                <p className="text-[#dbdee1] break-words mt-0.5">{message.content}</p>
                {message.reactions.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                        {message.reactions.map((r, i) => (
                            <Reaction
                                key={i}
                                {...r}
                                onToggle={() => onReact(message.id, r.emoji)}
                            />
                        ))}
                    </div>
                )}
            </div>
            <MessageActions />
        </div>
    );
}

function WelcomeHeader({ channel }) {
    return (
        <div className="px-4 pt-4 pb-6">
            <div className="w-[68px] h-[68px] rounded-full bg-[#41434a] flex items-center justify-center mb-2">
                <svg className="w-10 h-10 fill-[#dbdee1]" viewBox="0 0 24 24">
                    <path d="M5.88657 21C5.57547 21 5.3399 20.7189 5.39427 20.4126L6.00001 17H2.59511C2.28449 17 2.04905 16.7198 2.10259 16.4138L2.27759 15.4138C2.31946 15.1746 2.52722 15 2.77011 15H6.35001L7.41001 9H4.00511C3.69449 9 3.45905 8.71977 3.51259 8.41381L3.68759 7.41381C3.72946 7.17456 3.93722 7 4.18011 7H7.76001L8.39677 3.41262C8.43914 3.17391 8.64664 3 8.88907 3H9.87344C10.1845 3 10.4201 3.28107 10.3657 3.58738L9.76001 7H15.76L16.3968 3.41262C16.4391 3.17391 16.6466 3 16.8891 3H17.8734C18.1845 3 18.4201 3.28107 18.3657 3.58738L17.76 7H21.1649C21.4755 7 21.711 7.28023 21.6574 7.58619L21.4824 8.58619C21.4406 8.82544 21.2328 9 20.9899 9H17.41L16.35 15H19.7549C20.0655 15 20.301 15.2802 20.2474 15.5862L20.0724 16.5862C20.0306 16.8254 19.8228 17 19.5799 17H16L15.3632 20.5874C15.3209 20.8261 15.1134 21 14.8709 21H13.8866C13.5755 21 13.3399 20.7189 13.3943 20.4126L14 17H8.00001L7.36325 20.5874C7.32088 20.8261 7.11337 21 6.87094 21H5.88657ZM9.41045 9L8.35045 15H14.3504L15.4104 9H9.41045Z" />
                </svg>
            </div>
            <h1 className="text-[32px] font-bold text-white mb-2">Welcome to #{channel?.name || 'general'}!</h1>
            <p className="text-[#949ba4]">This is the start of the #{channel?.name || 'general'} channel.</p>
        </div>
    );
}

export default function ChatPanel({ messages = [], channel, onReact }) {
    const shouldGroupWithPrevious = (currentMsg, prevMsg) => {
        if (!prevMsg) return false;
        if (currentMsg.author.id !== prevMsg.author.id) return false;

        const currentTime = new Date(currentMsg.timestamp).getTime();
        const prevTime = new Date(prevMsg.timestamp).getTime();
        const diffMinutes = (currentTime - prevTime) / 1000 / 60;

        return diffMinutes < 7;
    };

    return (
        <div className="flex-1 overflow-y-auto flex flex-col">
            <WelcomeHeader channel={channel} />

            <div className="flex-1">
                {messages.map((message, index) => {
                    const prevMessage = messages[index - 1];
                    const isCompact = shouldGroupWithPrevious(message, prevMessage);

                    return (
                        <Message
                            key={message.id}
                            message={message}
                            isCompact={isCompact}
                            onReact={onReact}
                        />
                    );
                })}
            </div>
        </div>
    );
}
