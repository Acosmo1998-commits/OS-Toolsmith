# OS Toolsmith PWA — v0.1

This is a browser-first prototype.

## Run it
Serve this directory from HTTPS (or localhost) rather than opening `index.html` directly. For example, any static web host can serve it.

## Install on iPhone
Open the deployed HTTPS address in Safari, tap Share, then **Add to Home Screen**.

## Current modules
- Dashboard
- Code editor starter
- Sandbox terminal emulator
- Local project manager
- Local owner/admin mode
- PWA manifest + service worker

## Important architecture boundary
A PWA cannot grant itself root/administrator privileges or install arbitrary native software on a device. A future "real terminal" can be connected through an explicitly installed/authorized companion service or remote server. The PWA should authenticate to that service and display the shell through a secure channel.

## Recommended next build
1. Persistent project/file system using IndexedDB.
2. Real syntax highlighting.
3. ZIP import/export.
4. Secure authentication.
5. Optional remote Linux backend with a WebSocket terminal.
6. Device capability detection and explicit permission UI.
7. Plugin/tool system with signed packages.
