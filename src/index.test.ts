import { renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useDevtoolsBlocker } from './index';

describe('useDevtoolsBlocker', () => {
  let addEventListenerSpy: ReturnType<typeof vi.spyOn>;
  let removeEventListenerSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    addEventListenerSpy = vi.spyOn(document, 'addEventListener');
    removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should register event listeners on mount', () => {
    renderHook(() => useDevtoolsBlocker());

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'contextmenu',
      expect.any(Function)
    );
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'keydown',
      expect.any(Function)
    );
  });

  it('should remove event listeners on unmount', () => {
    const { unmount } = renderHook(() => useDevtoolsBlocker());

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'contextmenu',
      expect.any(Function)
    );
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'keydown',
      expect.any(Function)
    );
  });

  it('should prevent default on context menu', () => {
    renderHook(() => useDevtoolsBlocker());

    const contextMenuHandler = addEventListenerSpy.mock.calls.find(
      (call) => call[0] === 'contextmenu'
    )?.[1] as EventListener;

    const mockEvent = new MouseEvent('contextmenu', { bubbles: true });
    const preventDefaultSpy = vi.spyOn(mockEvent, 'preventDefault');

    contextMenuHandler(mockEvent);

    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('should prevent F12 key', () => {
    renderHook(() => useDevtoolsBlocker());

    const keydownHandler = addEventListenerSpy.mock.calls.find(
      (call) => call[0] === 'keydown'
    )?.[1] as EventListener;

    const mockEvent = new KeyboardEvent('keydown', { key: 'F12' });
    const preventDefaultSpy = vi.spyOn(mockEvent, 'preventDefault');

    keydownHandler(mockEvent);

    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('should prevent Ctrl+Shift+I', () => {
    renderHook(() => useDevtoolsBlocker());

    const keydownHandler = addEventListenerSpy.mock.calls.find(
      (call) => call[0] === 'keydown'
    )?.[1] as EventListener;

    const mockEvent = new KeyboardEvent('keydown', {
      key: 'I',
      ctrlKey: true,
      shiftKey: true,
    });
    const preventDefaultSpy = vi.spyOn(mockEvent, 'preventDefault');

    keydownHandler(mockEvent);

    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('should prevent Cmd+Option+I on Mac', () => {
    renderHook(() => useDevtoolsBlocker());

    const keydownHandler = addEventListenerSpy.mock.calls.find(
      (call) => call[0] === 'keydown'
    )?.[1] as EventListener;

    const mockEvent = new KeyboardEvent('keydown', {
      key: 'i',
      metaKey: true,
      altKey: true,
    });
    const preventDefaultSpy = vi.spyOn(mockEvent, 'preventDefault');

    keydownHandler(mockEvent);

    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('should not prevent normal keys', () => {
    renderHook(() => useDevtoolsBlocker());

    const keydownHandler = addEventListenerSpy.mock.calls.find(
      (call) => call[0] === 'keydown'
    )?.[1] as EventListener;

    const mockEvent = new KeyboardEvent('keydown', { key: 'a' });
    const preventDefaultSpy = vi.spyOn(mockEvent, 'preventDefault');

    keydownHandler(mockEvent);

    expect(preventDefaultSpy).not.toHaveBeenCalled();
  });
});
