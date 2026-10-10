import { useState } from "react";
import type { ImgHTMLAttributes } from "react";

export function ProtectedImage({
  className = "size-full",
  imgClassName = "object-cover",
  skeleton = true,
  alt = "",
  draggable,
  onContextMenu,
  onDragStart,
  onLoad,
  onError,
  ...props
}: ImgHTMLAttributes<HTMLImageElement> & {
  imgClassName?: string;
  skeleton?: boolean;
}) {
  const [ready, setReady] = useState(false);

  return (
    <span className={`relative block ${className}`}>
      {skeleton && !ready && (
        <span aria-hidden="true" className="skeleton absolute inset-0" />
      )}
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
        onLoad={(e) => {
          onLoad?.(e);
          setReady(true);
        }}
        onError={(e) => {
          onError?.(e);
          setReady(true);
        }}
        className={`relative block size-full select-none transition-opacity duration-300 [-webkit-touch-callout:none] [-webkit-user-drag:none] ${
          ready ? "opacity-100" : "opacity-0"
        } ${imgClassName}`}
      />
    </span>
  );
}
