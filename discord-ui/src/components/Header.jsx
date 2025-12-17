export default function Header({ channel }) {
    if (!channel) return null;

    return (
        <div className="chat-header">
            <h3>
                <span style={{ color: "var(--text-muted)", fontWeight: 500 }}>#</span>
                {channel.name}
            </h3>
            {channel.topic && <span className="channel-topic">{channel.topic}</span>}
        </div>
    );
}
