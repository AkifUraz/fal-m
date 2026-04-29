export default function StudioLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 999999,
                background: "#FAFAF7",
                overflow: "auto",
            }}
        >
            {children}
        </div>
    );
}
