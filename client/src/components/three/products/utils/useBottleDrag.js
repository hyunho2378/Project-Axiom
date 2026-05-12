import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

export function useBottleDrag(isDraggable) {
  const { gl } = useThree();
  const groupRef  = useRef();
  const autoY     = useRef(0);
  const manY      = useRef(0);
  const manX      = useRef(0);
  const vel       = useRef({ x: 0, y: 0 });
  const dragging  = useRef(false);
  const lastPos   = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!isDraggable) return;
    const canvas = gl.domElement;

    const getXY = (e) => e.touches
      ? { x: e.touches[0].clientX, y: e.touches[0].clientY }
      : { x: e.clientX, y: e.clientY };

    const onDown = (e) => {
      dragging.current = true;
      lastPos.current = getXY(e);
      vel.current = { x: 0, y: 0 };
    };
    const onMove = (e) => {
      if (!dragging.current) return;
      const { x, y } = getXY(e);
      vel.current.x = (x - lastPos.current.x) * 0.008;
      vel.current.y = (y - lastPos.current.y) * 0.005;
      manY.current += vel.current.x * 1.5;
      manX.current = Math.max(-0.5, Math.min(0.5, manX.current + vel.current.y * 1.2));
      lastPos.current = { x, y };
    };
    const onUp = () => { dragging.current = false; };

    canvas.addEventListener('mousedown',  onDown);
    canvas.addEventListener('mousemove',  onMove);
    canvas.addEventListener('mouseup',    onUp);
    canvas.addEventListener('mouseleave', onUp);
    canvas.addEventListener('touchstart', onDown, { passive: true });
    canvas.addEventListener('touchmove',  onMove, { passive: true });
    canvas.addEventListener('touchend',   onUp);

    return () => {
      canvas.removeEventListener('mousedown',  onDown);
      canvas.removeEventListener('mousemove',  onMove);
      canvas.removeEventListener('mouseup',    onUp);
      canvas.removeEventListener('mouseleave', onUp);
      canvas.removeEventListener('touchstart', onDown);
      canvas.removeEventListener('touchmove',  onMove);
      canvas.removeEventListener('touchend',   onUp);
    };
  }, [isDraggable, gl.domElement]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!dragging.current) {
      autoY.current += 0.0035;
      vel.current.x *= 0.92;
      vel.current.y *= 0.92;
      manY.current  += vel.current.x;
      manX.current  += vel.current.y;
    }
    const g = groupRef.current;
    if (g) {
      g.rotation.y = autoY.current + manY.current;
      g.rotation.x = manX.current + Math.sin(t * 0.18) * 0.01;
      g.position.y = Math.sin(t * 0.38) * 0.055;
    }
  });

  return groupRef;
}
