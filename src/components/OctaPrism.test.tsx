import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import OctaPrism from './OctaPrism';

// Mocking browser-specific functions
window.HTMLElement.prototype.setPointerCapture = jest.fn();
window.HTMLElement.prototype.releasePointerCapture = jest.fn();

describe('OctaPrism', () => {
  it('renders without crashing', () => {
    act(() => {
      render(<OctaPrism />);
    });
    expect(screen.getByRole('img', { name: /react/i })).toBeInTheDocument();
  });

  it('renders with default icons and labels', () => {
    act(() => {
      render(<OctaPrism />);
    });
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Next.js')).toBeInTheDocument();
    expect(screen.getAllByRole('img').length).toBe(8);
  });

  it('does not render labels when showLabels is false', () => {
    act(() => {
      render(<OctaPrism showLabels={false} />);
    });
    expect(screen.queryByText('React')).not.toBeInTheDocument();
  });

  it('renders custom icons when provided', () => {
    const customIcons = new Array(8).fill(0).map((_, i) => ({
      label: `Custom ${i}`,
      url: `https://custom.icon/${i}`,
    }));
    act(() => {
      render(<OctaPrism icons={customIcons} />);
    });
    expect(screen.getByText('Custom 0')).toBeInTheDocument();
    expect(screen.getByText('Custom 7')).toBeInTheDocument();
    expect(screen.getAllByRole('img').length).toBe(8);
  });

  it('falls back to default icons if less than 8 custom icons are provided', () => {
    const customIcons = [{ label: 'Custom', url: 'https://custom.icon' }];
    act(() => {
      render(<OctaPrism icons={customIcons} />);
    });
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.queryByText('Custom')).not.toBeInTheDocument();
  });

  it('handles pointer down, move, and up events for dragging', () => {
    const { container } = render(<OctaPrism />);
    const root = container.firstChild as HTMLElement;

    if (!root) {
      throw new Error('Root element not found');
    }

    const initialTransform = root.querySelector('.camera')?.getAttribute('style');

    act(() => {
      fireEvent.pointerDown(root, { clientX: 100, clientY: 100, pointerId: 1 });
      fireEvent.pointerMove(root, { clientX: 150, clientY: 150, pointerId: 1 });
    });

    const draggedTransform = root.querySelector('.camera')?.getAttribute('style');
    expect(draggedTransform).not.toBe(initialTransform);

    act(() => {
      fireEvent.pointerUp(root, { pointerId: 1 });
    });
    // Further assertions can be made about the state after pointer up
  });

  it('handles wheel event for zooming', () => {
    const { container } = render(<OctaPrism />);
    const root = container.firstChild as HTMLElement;

    if (!root) {
      throw new Error('Root element not found');
    }

    const initialTransform = root.querySelector('.camera')?.getAttribute('style');

    act(() => {
      fireEvent.wheel(root, { deltaY: 100 });
    });

    const zoomedTransform = root.querySelector('.camera')?.getAttribute('style');
    expect(zoomedTransform).not.toBe(initialTransform);
    expect(zoomedTransform).toContain('scale(0.92)');

    act(() => {
      fireEvent.wheel(root, { deltaY: -100 });
    });
    const zoomedInTransform = root.querySelector('.camera')?.getAttribute('style');
    expect(zoomedInTransform).toContain('scale(1)');
  });
});
