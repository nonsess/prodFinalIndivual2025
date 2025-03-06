export default function HighLoadWarning({ visible }) {
    if (!visible) return null;

    return (
        <div style={{ 
            color: '#faad14', 
            marginTop: '16px',
            marginBottom: '16px',
            textAlign: 'center',
            padding: '8px',
            backgroundColor: '#fff7e6',
            borderRadius: '4px'
        }}>
            ⚠️ Большая нагрузка, осторожно
        </div>
    );
} 