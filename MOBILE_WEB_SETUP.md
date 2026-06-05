# Mobile Web Setup

This project is intended to run on your home PC. Your phone opens it as a web app in the browser.

## What you need

- This PC stays on.
- Ollama stays running on this PC.
- Tailscale is installed on this PC and on your phone.

## Start the app

From this project folder:

```powershell
.\START_MOBILE_WEB.ps1
```

This will:

1. Build the Next.js app
2. Start it on `http://0.0.0.0:3000`

## Connect Tailscale

On this PC:

```powershell
& 'C:\Program Files\Tailscale\tailscale.exe' up
& 'C:\Program Files\Tailscale\tailscale.exe' serve 3000
```

If Tailscale asks for sign-in, complete it in the browser.

## Open from phone

1. Install the Tailscale app on your phone
2. Sign in to the same Tailscale account
3. Open this URL in your phone browser:

```text
http://100.102.167.38:3000
```

You can also check the current machine IP anytime with:

```powershell
& 'C:\Program Files\Tailscale\tailscale.exe' status
```

## Notes

- Use the browser on your phone. No separate mobile app is needed.
- `dev.db` remains on this PC.
- AI checks still run through your local Ollama on this PC.
