import type { ImgHTMLAttributes } from "react";

export function ProtectedImage({
  className,
  alt = "",
  draggable,
  onContextMenu,
  onDragStart,
  ...props
}: ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img
      {...props}
      alt={alt}
      draggable={draggable ?? false}
      onContextMenu={(e) => {
        onContextMenu?.(e);
        e.preventDefault();
      }}
      onDragStart={(e) => {
        onDragStart?.(e);
        e.preventDefault();
      }}
      className={`select-none [-webkit-touch-callout:none] [-webkit-user-drag:none] ${className ?? ""}`}
    />
  );
}
