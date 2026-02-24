"use client";

interface WavyDividerProps {
    topColor?: string;
    bottomColor?: string;
    flip?: boolean;
    className?: string;
}

export default function WavyDivider({
    topColor = "#f8f7f2",
    bottomColor = "#ffffff",
    flip = false,
    className = "",
}: WavyDividerProps) {
    return (
        <div
            className={`relative w-full overflow-hidden ${className}`}
            style={{
                height: "80px",
                transform: flip ? "scaleY(-1)" : undefined,
                marginTop: flip ? "-1px" : undefined,
                marginBottom: flip ? undefined : "-1px",
            }}
        >
            <svg
                viewBox="0 0 1440 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute bottom-0 w-full"
                preserveAspectRatio="none"
                style={{ height: "100%", width: "100%" }}
            >
                {/* Background fill */}
                <rect width="1440" height="80" fill={topColor} />

                {/* Wave layer 1 — slowest, deepest */}
                <path
                    fill={bottomColor}
                    opacity="0.4"
                    className="animate-wave-slow"
                >
                    <animate
                        attributeName="d"
                        dur="8s"
                        repeatCount="indefinite"
                        values="
                            M0,50 C240,30 480,70 720,45 C960,20 1200,60 1440,40 L1440,80 L0,80 Z;
                            M0,45 C240,65 480,25 720,50 C960,75 1200,35 1440,55 L1440,80 L0,80 Z;
                            M0,50 C240,30 480,70 720,45 C960,20 1200,60 1440,40 L1440,80 L0,80 Z
                        "
                    />
                </path>

                {/* Wave layer 2 — medium speed */}
                <path
                    fill={bottomColor}
                    opacity="0.6"
                    className="animate-wave-medium"
                >
                    <animate
                        attributeName="d"
                        dur="6s"
                        repeatCount="indefinite"
                        values="
                            M0,55 C360,35 720,65 1080,40 C1260,30 1350,50 1440,45 L1440,80 L0,80 Z;
                            M0,40 C360,60 720,30 1080,55 C1260,65 1350,45 1440,50 L1440,80 L0,80 Z;
                            M0,55 C360,35 720,65 1080,40 C1260,30 1350,50 1440,45 L1440,80 L0,80 Z
                        "
                    />
                </path>

                {/* Wave layer 3 — fastest, topmost */}
                <path
                    fill={bottomColor}
                    opacity="1"
                >
                    <animate
                        attributeName="d"
                        dur="4s"
                        repeatCount="indefinite"
                        values="
                            M0,60 C180,50 360,68 540,55 C720,42 900,62 1080,52 C1260,42 1350,58 1440,50 L1440,80 L0,80 Z;
                            M0,52 C180,62 360,48 540,58 C720,68 900,48 1080,58 C1260,68 1350,52 1440,60 L1440,80 L0,80 Z;
                            M0,60 C180,50 360,68 540,55 C720,42 900,62 1080,52 C1260,42 1350,58 1440,50 L1440,80 L0,80 Z
                        "
                    />
                </path>
            </svg>
        </div>
    );
}
