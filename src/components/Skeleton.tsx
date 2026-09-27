import { motion } from "framer-motion";

/**
 * Skeleton base com shimmer
 */
function SkeletonBase({ className = "", style = {} }: { className?: string; style?: React.CSSProperties }) {
  return (
    <motion.div
      className={`relative overflow-hidden bg-white/5 rounded ${className}`}
      style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 75%)", backgroundSize: "200% 100%", ...style }}
      initial={false}
      animate={{ backgroundPosition: ["-200% 0", "200% 0"] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" style={{ transform: "translateX(-100%)" }} />
    </motion.div>
  );
}

/**
 * Skeleton de texto (linhas)
 */
interface TextSkeletonProps {
  lines?: number;
  className?: string;
  maxWidth?: string;
}

export function TextSkeleton({ lines = 3, className = "", maxWidth = "100%" }: TextSkeletonProps) {
  return (
    <div className={`${className} space-y-3`} style={{ maxWidth }}>
      {Array.from({ length: lines }, (_, i) => (
        <SkeletonBase
          key={i}
          className="h-4 rounded"
          style={{ width: i === lines - 1 ? "60%" : "100%" }}
        />
      ))}
    </div>
  );
}

/**
 * Skeleton de card (imagem + título + texto)
 */
export function CardSkeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`${className} rounded-2xl border border-white/10 bg-surface p-6 space-y-4`}>
      {/* Imagem placeholder */}
      <SkeletonBase className="aspect-[4/3] w-full rounded-xl" />

      {/* Título */}
      <SkeletonBase className="h-6 w-3/4 rounded" />

      {/* Texto */}
      <SkeletonBase className="h-4 w-full rounded" />
      <SkeletonBase className="h-4 w-5/6 rounded" />
    </div>
  );
}

/**
 * Skeleton do Hero (badge + título grande + descrição + botões)
 */
export function HeroSkeleton() {
  return (
    <div className="relative mx-auto w-full max-w-6xl px-5 pb-24 pt-32 sm:px-8 space-y-6">
      {/* Badge */}
      <SkeletonBase className="w-48 h-8 rounded-full" />

      {/* Título grande */}
      <SkeletonBase className="h-16 w-full rounded" />
      <SkeletonBase className="h-16 w-full rounded" />
      <SkeletonBase className="h-16 w-4/5 rounded" />

      {/* Subtítulo */}
      <SkeletonBase className="h-8 w-3/4 rounded" />

      {/* Descrição */}
      <SkeletonBase className="h-6 w-full rounded" />
      <SkeletonBase className="h-6 w-5/6 rounded" />

      {/* Botões */}
      <div className="flex flex-wrap gap-4">
        <SkeletonBase className="w-40 h-12 rounded-full" />
        <SkeletonBase className="w-40 h-12 rounded-full" />
      </div>
    </div>
  );
}

/**
 * Skeleton de seção (eyebrow + título + descrição)
 */
export function SectionSkeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`${className} space-y-4`}>
      <SkeletonBase className="w-32 h-5 rounded" />
      <SkeletonBase className="h-10 w-3/4 rounded" />
      <SkeletonBase className="h-6 w-1/2 rounded" />
    </div>
  );
}

/**
 * Skeleton de grid de cards
 */
export function GridSkeleton({ count = 6, columns = 3 }: { count?: number; columns?: number }) {
  return (
    <div className={`grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-${columns}`}>
      {Array.from({ length: count }, (_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

/**
 * Skeleton de formulário
 */
export function FormSkeleton() {
  return (
    <div className="rounded-2xl border border-white/10 bg-surface p-6 sm:p-8 space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <SkeletonBase className="h-5 w-24 rounded" />
          <SkeletonBase className="h-10 w-full rounded" />
        </div>
        <div className="space-y-2">
          <SkeletonBase className="h-5 w-24 rounded" />
          <SkeletonBase className="h-10 w-full rounded" />
        </div>
      </div>
      <div className="space-y-2">
        <SkeletonBase className="h-5 w-24 rounded" />
        <SkeletonBase className="h-24 w-full rounded" />
      </div>
      <SkeletonBase className="w-40 h-12 rounded-full mx-auto" />
    </div>
  );
}

/**
 * Skeleton de navegação (footer)
 */
export function NavSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }, (_, i) => (
        <SkeletonBase key={i} className="w-32 h-5 rounded" />
      ))}
    </div>
  );
}