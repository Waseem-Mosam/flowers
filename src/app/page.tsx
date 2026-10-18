"use client";

import { useEffect, useRef, useState } from "react";
import "./flower.scss";

type MusicStatus = "idle" | "loading" | "playing" | "paused" | "ended" | "blocked" | "error";

const musicCaptions: Record<MusicStatus, string> = {
    idle: "Clinton Kane",
    loading: "Starting the music…",
    playing: "Clinton Kane",
    paused: "Clinton Kane",
    ended: "A little love, on replay?",
    blocked: "Tap play to start the music",
    error: "Couldn’t load · tap to retry",
};

function SideLily({ tone }: { tone: "ivory" | "rose" }) {
    const gradientId = `lily-petal-${tone}`;

    return (
        <div className={`side-lily side-lily--${tone}`} aria-hidden="true">
            <div className="side-lily__stem"></div>
            <div className="side-lily__leaves">
                <i></i>
                <i></i>
            </div>
            <svg
                className="side-lily__bloom"
                viewBox="0 0 160 160"
                focusable="false"
            >
                <defs>
                    <linearGradient
                        id={gradientId}
                        x1="80"
                        y1="80"
                        x2="80"
                        y2="12"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop
                            offset="0"
                            stopColor={tone === "ivory" ? "#e5b0a0" : "#b82e50"}
                        />
                        <stop
                            offset="0.42"
                            stopColor={tone === "ivory" ? "#fff4e5" : "#ef7f9b"}
                        />
                        <stop
                            offset="1"
                            stopColor={tone === "ivory" ? "#ffffff" : "#ffe9ef"}
                        />
                    </linearGradient>
                </defs>
                {/* Every petal shares the same base, so the bloom stays connected. */}
                {[0, 120, 240, 60, 180, 300].map((angle) => (
                    <g key={angle} transform={`rotate(${angle} 80 80)`}>
                        <path
                            d="M80 84 C51 67 54 33 80 12 C106 33 109 67 80 84Z"
                            fill={`url(#${gradientId})`}
                            stroke={tone === "ivory" ? "#e4c6b8" : "#d66685"}
                            strokeWidth="0.65"
                        />
                        <path
                            d="M80 79 Q75 48 80 22"
                            fill="none"
                            stroke="#fff9ef"
                            strokeOpacity="0.45"
                            strokeWidth="1.2"
                        />
                    </g>
                ))}
                <ellipse cx="80" cy="80" rx="10" ry="8" fill="#b5a76a" />
                <g
                    fill="none"
                    stroke="#f5dc94"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                >
                    <path d="M80 82 Q65 74 61 61" />
                    <path d="M80 82 Q79 64 85 53" />
                    <path d="M80 82 Q95 75 103 65" />
                </g>
                <g fill="#b97130">
                    <ellipse
                        cx="61"
                        cy="61"
                        rx="4"
                        ry="2.5"
                        transform="rotate(45 61 61)"
                    />
                    <ellipse
                        cx="85"
                        cy="53"
                        rx="4"
                        ry="2.5"
                        transform="rotate(-30 85 53)"
                    />
                    <ellipse
                        cx="103"
                        cy="65"
                        rx="4"
                        ry="2.5"
                        transform="rotate(-40 103 65)"
                    />
                </g>
            </svg>
        </div>
    );
}

export default function AwFlowerPage() {
    const [isGardenOpen, setIsGardenOpen] = useState(false);
    const [musicEnabled, setMusicEnabled] = useState(true);
    const [musicStatus, setMusicStatus] = useState<MusicStatus>("idle");
    const gardenRef = useRef<HTMLElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    const musicActive = musicStatus === "playing" || musicStatus === "loading";

    function playMusic() {
        const audio = audioRef.current;
        if (!audio) return;
        if (audio.ended) audio.currentTime = 0;
        if (audio.error) audio.load();
        setMusicStatus("loading");
        // Call play in the click handler so mobile browsers receive the gesture.
        void audio.play().catch((error: unknown) => {
            if (error instanceof DOMException && error.name === "AbortError") return;
            const blocked = error instanceof DOMException && error.name === "NotAllowedError";
            setMusicStatus(blocked ? "blocked" : "error");
        });
    }

    function openGarden() {
        if (musicEnabled) playMusic();
        setIsGardenOpen(true);
    }

    function togglePlayback() {
        if (musicActive) {
            audioRef.current?.pause();
            setMusicStatus("paused");
        } else {
            playMusic();
        }
    }

    const audioPlayer = (
        <audio
            key="garden-audio"
            ref={audioRef}
            src="/audio/i-guess-im-in-love-chorus.m4a"
            preload="auto"
            onPlaying={() => setMusicStatus("playing")}
            onPause={() => setMusicStatus("paused")}
            onEnded={() => setMusicStatus("ended")}
            onWaiting={(event) => {
                if (!event.currentTarget.paused) setMusicStatus("loading");
            }}
            onError={() => setMusicStatus("error")}
        />
    );

    useEffect(() => {
        const audio = audioRef.current;
        return () => {
            audio?.pause();
        };
    }, []);

    useEffect(() => {
        if (isGardenOpen) gardenRef.current?.focus({ preventScroll: true });
    }, [isGardenOpen]);

    if (!isGardenOpen) {
        return (
            <>
            {audioPlayer}
            <main className="welcome-screen">
                <section
                    className="welcome-note"
                    aria-labelledby="welcome-heading"
                >
                    <svg
                        className="welcome-note__envelope"
                        viewBox="0 0 88 72"
                        fill="none"
                        aria-hidden="true"
                        focusable="false"
                    >
                        <path
                            d="M12 28 44 8 76 28V61H12Z"
                            fill="#fbe5e7"
                            stroke="#d9a0a7"
                            strokeWidth="1.4"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M23 16H65V48H23Z"
                            fill="#fffdf9"
                            stroke="#e2b8b8"
                            strokeWidth="1.2"
                        />
                        <path
                            d="M12 28 44 48 76 28V61H12Z"
                            fill="#fff0ed"
                            stroke="#d9a0a7"
                            strokeWidth="1.4"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M12 61 34 42M76 61 54 42"
                            stroke="#e2b8b8"
                            strokeWidth="1.2"
                        />
                        <path
                            d="M44 38C42 35 34 31 34 26C34 20 41 18 44 23C47 18 54 20 54 26C54 31 46 35 44 38Z"
                            fill="#c86880"
                        />
                    </svg>
                    <p className="welcome-note__eyebrow">
                        A little note for you
                    </p>
                    <h1 id="welcome-heading">
                        Just something to <span>make you smile</span>
                    </h1>
                    <button
                        className="welcome-note__sound"
                        type="button"
                        role="switch"
                        aria-checked={musicEnabled}
                        aria-label="Play music when the garden opens"
                        onClick={() => setMusicEnabled((enabled) => !enabled)}
                    >
                        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
                            <path d="M9 18V6L20 4V16M9 9L20 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <ellipse cx="6" cy="18" rx="3" ry="2.5" fill="currentColor" />
                            <ellipse cx="17" cy="16" rx="3" ry="2.5" fill="currentColor" />
                        </svg>
                        <span>Music {musicEnabled ? "on" : "off"}</span>
                        <span className="welcome-note__switch" aria-hidden="true" />
                    </button>
                    <button
                        className="welcome-note__button"
                        type="button"
                        onClick={openGarden}
                    >
                        Show me
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            aria-hidden="true"
                            focusable="false"
                        >
                            <path
                                d="M5 12H19M13 6L19 12L13 18"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                    <p className="welcome-note__signature">with love, Waseem</p>
                </section>
            </main>
            </>
        );
    }

    return (
        <>
        {audioPlayer}
        <main
            className="flower-container garden-reveal"
            ref={gardenRef}
            tabIndex={-1}
            aria-label="A&W flower garden"
        >
            <div className="garden-music" data-playing={musicStatus === "playing"}>
                <span className="garden-music__bars" aria-hidden="true"><i /><i /><i /><i /></span>
                <div className="garden-music__caption">
                    <p className="garden-music__title">I GUESS I’M IN LOVE</p>
                    <p className="garden-music__status" aria-live="polite">
                        {musicCaptions[musicStatus]}
                    </p>
                </div>
                <button
                    className="garden-music__button"
                    type="button"
                    onClick={togglePlayback}
                    aria-label={musicActive ? "Pause music" : musicStatus === "ended" ? "Replay music" : "Play music"}
                >
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
                        {musicActive ? <path d="M7 5H10V19H7ZM14 5H17V19H14Z" /> : <path d="M8 5V19L19 12Z" />}
                    </svg>
                </button>
            </div>
            {/* flower content */}
            <div className="garden-mark" role="img" aria-label="A and W">
                <svg viewBox="0 0 104 112" aria-hidden="true" focusable="false">
                    <defs>
                        <linearGradient
                            id="garden-heart-fill"
                            x1="25"
                            y1="12"
                            x2="78"
                            y2="98"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor="#ffffff" />
                            <stop offset="1" stopColor="#fff0ed" />
                        </linearGradient>
                    </defs>
                    <path
                        d="M49 101 C39 89 10 70 9 43 C8 24 19 13 33 16 C43 18 49 25 52 32 C57 18 69 9 81 15 C97 23 96 42 87 59 C77 77 62 92 49 101Z"
                        fill="url(#garden-heart-fill)"
                        stroke="#ffffff"
                        strokeWidth="1.5"
                    />
                    <path
                        d="M49 101 C39 89 10 70 9 43 C8 24 19 13 33 16 C43 18 49 25 52 32 C57 18 69 9 81 15 C97 23 96 42 87 59 C77 77 62 92 49 101Z"
                        transform="translate(7.3 8) scale(.86)"
                        fill="none"
                        stroke="#d9a0a7"
                        strokeOpacity=".55"
                        strokeWidth=".8"
                    />
                </svg>
                <span className="garden-mark__letters" aria-hidden="true">
                    A<span>&amp;</span>W
                </span>
            </div>
            <div className="night"></div>
            <div className="flowers">
                <div className="flower flower--1">
                    <div className="flower__leafs flower__leafs--1">
                        <div className="flower__leaf flower__leaf--1"></div>
                        <div className="flower__leaf flower__leaf--2"></div>
                        <div className="flower__leaf flower__leaf--3"></div>
                        <div className="flower__leaf flower__leaf--4"></div>
                        <div className="flower__white-circle"></div>

                        <div className="flower__light flower__light--1"></div>
                        <div className="flower__light flower__light--2"></div>
                        <div className="flower__light flower__light--3"></div>
                        <div className="flower__light flower__light--4"></div>
                        <div className="flower__light flower__light--5"></div>
                        <div className="flower__light flower__light--6"></div>
                        <div className="flower__light flower__light--7"></div>
                        <div className="flower__light flower__light--8"></div>
                    </div>
                    <div className="flower__line">
                        <div className="flower__line__leaf flower__line__leaf--1"></div>
                        <div className="flower__line__leaf flower__line__leaf--2"></div>
                        <div className="flower__line__leaf flower__line__leaf--3"></div>
                        <div className="flower__line__leaf flower__line__leaf--4"></div>
                        <div className="flower__line__leaf flower__line__leaf--5"></div>
                        <div className="flower__line__leaf flower__line__leaf--6"></div>
                    </div>
                </div>

                <div className="flower flower--2">
                    <div className="flower__leafs flower__leafs--2">
                        <div className="flower__leaf flower__leaf--1"></div>
                        <div className="flower__leaf flower__leaf--2"></div>
                        <div className="flower__leaf flower__leaf--3"></div>
                        <div className="flower__leaf flower__leaf--4"></div>
                        <div className="flower__white-circle"></div>

                        <div className="flower__light flower__light--1"></div>
                        <div className="flower__light flower__light--2"></div>
                        <div className="flower__light flower__light--3"></div>
                        <div className="flower__light flower__light--4"></div>
                        <div className="flower__light flower__light--5"></div>
                        <div className="flower__light flower__light--6"></div>
                        <div className="flower__light flower__light--7"></div>
                        <div className="flower__light flower__light--8"></div>
                    </div>
                    <div className="flower__line">
                        <div className="flower__line__leaf flower__line__leaf--1"></div>
                        <div className="flower__line__leaf flower__line__leaf--2"></div>
                        <div className="flower__line__leaf flower__line__leaf--3"></div>
                        <div className="flower__line__leaf flower__line__leaf--4"></div>
                    </div>
                </div>

                <div className="flower flower--3">
                    <div className="flower__leafs flower__leafs--3">
                        <div className="flower__leaf flower__leaf--1"></div>
                        <div className="flower__leaf flower__leaf--2"></div>
                        <div className="flower__leaf flower__leaf--3"></div>
                        <div className="flower__leaf flower__leaf--4"></div>
                        <div className="flower__white-circle"></div>

                        <div className="flower__light flower__light--1"></div>
                        <div className="flower__light flower__light--2"></div>
                        <div className="flower__light flower__light--3"></div>
                        <div className="flower__light flower__light--4"></div>
                        <div className="flower__light flower__light--5"></div>
                        <div className="flower__light flower__light--6"></div>
                        <div className="flower__light flower__light--7"></div>
                        <div className="flower__light flower__light--8"></div>
                    </div>
                    <div className="flower__line">
                        <div className="flower__line__leaf flower__line__leaf--1"></div>
                        <div className="flower__line__leaf flower__line__leaf--2"></div>
                        <div className="flower__line__leaf flower__line__leaf--3"></div>
                        <div className="flower__line__leaf flower__line__leaf--4"></div>
                    </div>
                </div>

                <SideLily tone="ivory" />
                <SideLily tone="rose" />

                <div className="lily-buds" aria-hidden="true">
                    <div className="lily-bud lily-bud--one">
                        <i></i>
                        <b></b>
                    </div>
                    <div className="lily-bud lily-bud--two">
                        <i></i>
                        <b></b>
                    </div>
                    <div className="lily-bud lily-bud--three">
                        <i></i>
                        <b></b>
                    </div>
                </div>

                <div
                    className="grow-ans"
                    style={{ "--d": "1.2s" } as React.CSSProperties}
                >
                    <div className="flower__g-long">
                        <div className="flower__g-long__top"></div>
                        <div className="flower__g-long__bottom"></div>
                    </div>
                </div>

                <div className="growing-grass">
                    <div className="flower__grass flower__grass--1">
                        <div className="flower__grass--top"></div>
                        <div className="flower__grass--bottom"></div>
                        <div className="flower__grass__leaf flower__grass__leaf--1"></div>
                        <div className="flower__grass__leaf flower__grass__leaf--2"></div>
                        <div className="flower__grass__leaf flower__grass__leaf--3"></div>
                        <div className="flower__grass__leaf flower__grass__leaf--4"></div>
                        <div className="flower__grass__leaf flower__grass__leaf--5"></div>
                        <div className="flower__grass__leaf flower__grass__leaf--6"></div>
                        <div className="flower__grass__leaf flower__grass__leaf--7"></div>
                        <div className="flower__grass__leaf flower__grass__leaf--8"></div>
                        <div className="flower__grass__overlay"></div>
                    </div>
                </div>

                <div className="growing-grass">
                    <div className="flower__grass flower__grass--2">
                        <div className="flower__grass--top"></div>
                        <div className="flower__grass--bottom"></div>
                        <div className="flower__grass__leaf flower__grass__leaf--1"></div>
                        <div className="flower__grass__leaf flower__grass__leaf--2"></div>
                        <div className="flower__grass__leaf flower__grass__leaf--3"></div>
                        <div className="flower__grass__leaf flower__grass__leaf--4"></div>
                        <div className="flower__grass__leaf flower__grass__leaf--5"></div>
                        <div className="flower__grass__leaf flower__grass__leaf--6"></div>
                        <div className="flower__grass__leaf flower__grass__leaf--7"></div>
                        <div className="flower__grass__leaf flower__grass__leaf--8"></div>
                        <div className="flower__grass__overlay"></div>
                    </div>
                </div>

                <div
                    className="grow-ans"
                    style={{ "--d": "2.4s" } as React.CSSProperties}
                >
                    <div className="flower__g-right flower__g-right--1">
                        <div className="leaf"></div>
                    </div>
                </div>

                <div
                    className="grow-ans"
                    style={{ "--d": "2.8s" } as React.CSSProperties}
                >
                    <div className="flower__g-right flower__g-right--2">
                        <div className="leaf"></div>
                    </div>
                </div>

                <div
                    className="grow-ans"
                    style={{ "--d": "2.8s" } as React.CSSProperties}
                >
                    <div className="flower__g-front">
                        <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--1">
                            <div className="flower__g-front__leaf"></div>
                        </div>
                        <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--2">
                            <div className="flower__g-front__leaf"></div>
                        </div>
                        <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--3">
                            <div className="flower__g-front__leaf"></div>
                        </div>
                        <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--4">
                            <div className="flower__g-front__leaf"></div>
                        </div>
                        <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--5">
                            <div className="flower__g-front__leaf"></div>
                        </div>
                        <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--6">
                            <div className="flower__g-front__leaf"></div>
                        </div>
                        <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--7">
                            <div className="flower__g-front__leaf"></div>
                        </div>
                        <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--8">
                            <div className="flower__g-front__leaf"></div>
                        </div>
                        <div className="flower__g-front__line"></div>
                    </div>
                </div>

                <div
                    className="grow-ans"
                    style={{ "--d": "3.2s" } as React.CSSProperties}
                >
                    <div className="flower__g-fr">
                        <div className="leaf"></div>
                        <div className="flower__g-fr__leaf flower__g-fr__leaf--1"></div>
                        <div className="flower__g-fr__leaf flower__g-fr__leaf--2"></div>
                        <div className="flower__g-fr__leaf flower__g-fr__leaf--3"></div>
                        <div className="flower__g-fr__leaf flower__g-fr__leaf--4"></div>
                        <div className="flower__g-fr__leaf flower__g-fr__leaf--5"></div>
                        <div className="flower__g-fr__leaf flower__g-fr__leaf--6"></div>
                        <div className="flower__g-fr__leaf flower__g-fr__leaf--7"></div>
                        <div className="flower__g-fr__leaf flower__g-fr__leaf--8"></div>
                    </div>
                </div>

                <div className="long-g long-g--0">
                    <div
                        className="grow-ans"
                        style={{ "--d": "3s" } as React.CSSProperties}
                    >
                        <div className="leaf leaf--0"></div>
                    </div>
                    <div
                        className="grow-ans"
                        style={{ "--d": "2.2s" } as React.CSSProperties}
                    >
                        <div className="leaf leaf--1"></div>
                    </div>
                    <div
                        className="grow-ans"
                        style={{ "--d": "3.4s" } as React.CSSProperties}
                    >
                        <div className="leaf leaf--2"></div>
                    </div>
                    <div
                        className="grow-ans"
                        style={{ "--d": "3.6s" } as React.CSSProperties}
                    >
                        <div className="leaf leaf--3"></div>
                    </div>
                </div>

                <div className="long-g long-g--1">
                    <div
                        className="grow-ans"
                        style={{ "--d": "3.6s" } as React.CSSProperties}
                    >
                        <div className="leaf leaf--0"></div>
                    </div>
                    <div
                        className="grow-ans"
                        style={{ "--d": "3.8s" } as React.CSSProperties}
                    >
                        <div className="leaf leaf--1"></div>
                    </div>
                    <div
                        className="grow-ans"
                        style={{ "--d": "4s" } as React.CSSProperties}
                    >
                        <div className="leaf leaf--2"></div>
                    </div>
                    <div
                        className="grow-ans"
                        style={{ "--d": "4.2s" } as React.CSSProperties}
                    >
                        <div className="leaf leaf--3"></div>
                    </div>
                </div>

                <div className="long-g long-g--2">
                    <div
                        className="grow-ans"
                        style={{ "--d": "4s" } as React.CSSProperties}
                    >
                        <div className="leaf leaf--0"></div>
                    </div>
                    <div
                        className="grow-ans"
                        style={{ "--d": "4.2s" } as React.CSSProperties}
                    >
                        <div className="leaf leaf--1"></div>
                    </div>
                    <div
                        className="grow-ans"
                        style={{ "--d": "4.4s" } as React.CSSProperties}
                    >
                        <div className="leaf leaf--2"></div>
                    </div>
                    <div
                        className="grow-ans"
                        style={{ "--d": "4.6s" } as React.CSSProperties}
                    >
                        <div className="leaf leaf--3"></div>
                    </div>
                </div>

                <div className="long-g long-g--3">
                    <div
                        className="grow-ans"
                        style={{ "--d": "4s" } as React.CSSProperties}
                    >
                        <div className="leaf leaf--0"></div>
                    </div>
                    <div
                        className="grow-ans"
                        style={{ "--d": "4.2s" } as React.CSSProperties}
                    >
                        <div className="leaf leaf--1"></div>
                    </div>
                    <div
                        className="grow-ans"
                        style={{ "--d": "3s" } as React.CSSProperties}
                    >
                        <div className="leaf leaf--2"></div>
                    </div>
                    <div
                        className="grow-ans"
                        style={{ "--d": "3.6s" } as React.CSSProperties}
                    >
                        <div className="leaf leaf--3"></div>
                    </div>
                </div>

                <div className="long-g long-g--4">
                    <div
                        className="grow-ans"
                        style={{ "--d": "4s" } as React.CSSProperties}
                    >
                        <div className="leaf leaf--0"></div>
                    </div>
                    <div
                        className="grow-ans"
                        style={{ "--d": "4.2s" } as React.CSSProperties}
                    >
                        <div className="leaf leaf--1"></div>
                    </div>
                    <div
                        className="grow-ans"
                        style={{ "--d": "3s" } as React.CSSProperties}
                    >
                        <div className="leaf leaf--2"></div>
                    </div>
                    <div
                        className="grow-ans"
                        style={{ "--d": "3.6s" } as React.CSSProperties}
                    >
                        <div className="leaf leaf--3"></div>
                    </div>
                </div>

                <div className="long-g long-g--5">
                    <div
                        className="grow-ans"
                        style={{ "--d": "4s" } as React.CSSProperties}
                    >
                        <div className="leaf leaf--0"></div>
                    </div>
                    <div
                        className="grow-ans"
                        style={{ "--d": "4.2s" } as React.CSSProperties}
                    >
                        <div className="leaf leaf--1"></div>
                    </div>
                    <div
                        className="grow-ans"
                        style={{ "--d": "3s" } as React.CSSProperties}
                    >
                        <div className="leaf leaf--2"></div>
                    </div>
                    <div
                        className="grow-ans"
                        style={{ "--d": "3.6s" } as React.CSSProperties}
                    >
                        <div className="leaf leaf--3"></div>
                    </div>
                </div>

                <div className="long-g long-g--6">
                    <div
                        className="grow-ans"
                        style={{ "--d": "4.2s" } as React.CSSProperties}
                    >
                        <div className="leaf leaf--0"></div>
                    </div>
                    <div
                        className="grow-ans"
                        style={{ "--d": "4.4s" } as React.CSSProperties}
                    >
                        <div className="leaf leaf--1"></div>
                    </div>
                    <div
                        className="grow-ans"
                        style={{ "--d": "4.6s" } as React.CSSProperties}
                    >
                        <div className="leaf leaf--2"></div>
                    </div>
                    <div
                        className="grow-ans"
                        style={{ "--d": "4.8s" } as React.CSSProperties}
                    >
                        <div className="leaf leaf--3"></div>
                    </div>
                </div>

                <div className="long-g long-g--7">
                    <div
                        className="grow-ans"
                        style={{ "--d": "3s" } as React.CSSProperties}
                    >
                        <div className="leaf leaf--0"></div>
                    </div>
                    <div
                        className="grow-ans"
                        style={{ "--d": "3.2s" } as React.CSSProperties}
                    >
                        <div className="leaf leaf--1"></div>
                    </div>
                    <div
                        className="grow-ans"
                        style={{ "--d": "3.5s" } as React.CSSProperties}
                    >
                        <div className="leaf leaf--2"></div>
                    </div>
                    <div
                        className="grow-ans"
                        style={{ "--d": "3.6s" } as React.CSSProperties}
                    >
                        <div className="leaf leaf--3"></div>
                    </div>
                </div>
            </div>
        </main>
        </>
    );
}
