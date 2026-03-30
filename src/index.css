@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Exo+2:wght@300;400;500;600;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 270 15% 8%;
    --foreground: 270 10% 92%;

    --card: 270 12% 12%;
    --card-foreground: 270 10% 92%;

    --popover: 270 12% 12%;
    --popover-foreground: 270 10% 92%;

    --primary: 270 80% 60%;
    --primary-foreground: 0 0% 100%;

    --secondary: 45 95% 55%;
    --secondary-foreground: 270 15% 8%;

    --muted: 270 10% 18%;
    --muted-foreground: 270 10% 60%;

    --accent: 270 60% 45%;
    --accent-foreground: 0 0% 100%;

    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;

    --border: 270 15% 20%;
    --input: 270 15% 20%;
    --ring: 270 80% 60%;

    --radius: 0.75rem;

    --glow-primary: 270 80% 60%;
    --glow-secondary: 45 95% 55%;

    --sidebar-background: 270 12% 10%;
    --sidebar-foreground: 270 10% 92%;
    --sidebar-primary: 270 80% 60%;
    --sidebar-primary-foreground: 0 0% 100%;
    --sidebar-accent: 270 15% 18%;
    --sidebar-accent-foreground: 270 10% 92%;
    --sidebar-border: 270 15% 20%;
    --sidebar-ring: 270 80% 60%;
  }
}

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground;
    font-family: 'Exo 2', sans-serif;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Orbitron', sans-serif;
  }
}

@layer utilities {
  .glow-text {
    text-shadow: 0 0 20px hsl(var(--glow-primary) / 0.6), 0 0 40px hsl(var(--glow-primary) / 0.3);
  }

  .glow-box {
    box-shadow: 0 0 15px hsl(var(--glow-primary) / 0.3), 0 0 30px hsl(var(--glow-primary) / 0.1);
  }

  .glow-box-secondary {
    box-shadow: 0 0 15px hsl(var(--glow-secondary) / 0.3), 0 0 30px hsl(var(--glow-secondary) / 0.1);
  }

  @keyframes glow-pulse {
    0%, 100% { box-shadow: 0 0 15px hsl(var(--glow-primary) / 0.4), 0 0 30px hsl(var(--glow-primary) / 0.2); }
    50% { box-shadow: 0 0 25px hsl(var(--glow-primary) / 0.7), 0 0 50px hsl(var(--glow-primary) / 0.4); }
  }

  .animate-glow-pulse {
    animation: glow-pulse 2s infinite ease-in-out;
  }
}
