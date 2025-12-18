
<!DOCTYPE html>
<html lang="pt-BR" class="scroll-smooth">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Gilvan Sousa | Portfolio</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Orbitron:wght@700;900&family=Outfit:wght@200;300;400;500;600&display=swap" rel="stylesheet" />
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet" />
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: "#667eea",
                        secondary: "#ffd700",
                        accent: "#c084fc",
                        background: "#050508",
                        neonGreen: "#a3ff00"
                    },
                    fontFamily: {
                        display: ["Orbitron", "sans-serif"],
                        body: ["Inter", "sans-serif"],
                        outfit: ["Outfit", "sans-serif"],
                    },
                },
            },
        };
    </script>
    <style>
        :root {
            --glass-bg: rgba(255, 255, 255, 0.03);
            --glass-border: rgba(255, 255, 255, 0.08);
            --glass-highlight: rgba(255, 255, 255, 0.2);
            --text-main: rgba(255, 255, 255, 0.9);
            --text-muted: rgba(255, 255, 255, 0.6);
            --val: 100%;
        }

        body {
            background-color: #050508;
            color: var(--text-main);
            font-family: 'Outfit', sans-serif;
            overflow-x: hidden;
        }

        .glass-panel {
            backdrop-filter: blur(24px) saturate(120%);
            -webkit-backdrop-filter: blur(24px) saturate(120%);
            background: linear-gradient(145deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%);
            border: 1px solid var(--glass-border);
            border-top: 1px solid var(--glass-highlight);
            border-left: 1px solid var(--glass-highlight);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.02);
            border-radius: 24px;
        }

        .theme-button {
            width: 44px;
            height: 44px;
            border-radius: 50%;
            border: none;
            cursor: pointer;
            position: relative;
            transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
            box-shadow: 0 4px 10px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.4), inset 0 -2px 4px rgba(0,0,0,0.2);
        }
        #theme-1 { background: radial-gradient(circle at 30% 30%, #a78bfa, #4c1d95); }
        #theme-2 { background: radial-gradient(circle at 30% 30%, #fb7185, #9f1239); }
        #theme-3 { background: radial-gradient(circle at 30% 30%, #38bdf8, #0c4a6e); }
        
        .theme-button::after {
            content: '';
            position: absolute;
            inset: -4px;
            border-radius: 50%;
            border: 2px solid rgba(255,255,255,0.8);
            opacity: 0;
            transform: scale(1.1);
            transition: all 0.3s ease;
        }
        .theme-button.active::after { opacity: 1; transform: scale(1); }

        /* DENSITY SLIDER BEAUTIFICATION */
        .density-slider {
            -webkit-appearance: none;
            width: 100%;
            height: 4px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            outline: none;
            margin: 15px 0;
        }

        .density-slider::-webkit-slider-runnable-track {
            width: 100%;
            height: 4px;
            background: linear-gradient(to right, #667eea var(--val), rgba(255, 255, 255, 0.1) var(--val));
            border-radius: 2px;
        }

        .density-slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background: #fff;
            cursor: pointer;
            border: 3px solid #667eea;
            box-shadow: 0 0 10px rgba(102, 126, 234, 0.5);
            margin-top: -7px;
            transition: all 0.2s ease;
        }

        .density-slider::-webkit-slider-thumb:hover {
            transform: scale(1.2);
            box-shadow: 0 0 15px rgba(102, 126, 234, 0.8);
        }

        .control-button {
            backdrop-filter: blur(20px) saturate(140%);
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-top: 1px solid rgba(255, 255, 255, 0.25);
            color: white;
            padding: 12px 24px;
            border-radius: 50px;
            cursor: pointer;
            font-size: 13px;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            transition: all 0.3s ease;
            min-width: 120px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
        }
        .control-button:hover {
            background: rgba(255, 255, 255, 0.1);
            transform: translateY(-4px);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
        }
    </style>
<script type="importmap">
{
  "imports": {
    "@google/genai": "https://esm.sh/@google/genai@^1.34.0",
    "react-dom/": "https://esm.sh/react-dom@^19.2.3/",
    "react/": "https://esm.sh/react@^19.2.3/",
    "react": "https://esm.sh/react@^19.2.3"
  }
}
</script>
</head>
<body class="selection:bg-primary/30">
    <div id="root"></div>
</body>
</html>
