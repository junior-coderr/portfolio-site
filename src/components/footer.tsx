export function Footer({ className = "" }: { className?: string }) {
  return (
    <footer className={`border-t py-6 md:py-0 ${className}`}>
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row m-auto">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left mx-auto">
          All Rights Reserved @2025<br />
        </p>
      </div>
    </footer>
  );
}