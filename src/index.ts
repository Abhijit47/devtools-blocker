import { useEffect } from 'react';

/**
 * Blocks common DevTools shortcuts and the context menu.
 * Registers once on mount and cleans up on unmount.
 */
export function useDevtoolsBlocker() {
  useEffect(() => {
    // Block right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // Block F12 and other devtools shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12
      if (e.key === 'F12') {
        e.preventDefault();
      }

      // Ctrl+Shift+I (Windows/Linux Inspector)
      if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault();
      }

      // Ctrl+Shift+J (Console)
      if (e.ctrlKey && e.shiftKey && e.key === 'J') {
        e.preventDefault();
      }

      // Ctrl+Shift+C (Inspector/Select Element)
      if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        e.preventDefault();
      }

      // Ctrl+Shift+K (Console in Firefox)
      if (e.ctrlKey && e.shiftKey && e.key === 'K') {
        e.preventDefault();
      }

      // Cmd+Option+I (Mac Inspector)
      if (e.metaKey && e.altKey && e.key === 'i') {
        e.preventDefault();
      }

      // Cmd+Option+J (Mac Console)
      if (e.metaKey && e.altKey && e.key === 'j') {
        e.preventDefault();
      }

      // Cmd+Option+U (Mac View Source)
      if (e.metaKey && e.altKey && e.key === 'u') {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
}
