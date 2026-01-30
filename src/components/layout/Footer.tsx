export function Footer() {
  return (
    <footer className="border-t border-f1-graphite bg-f1-black py-8">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row md:gap-8">
        <div className="flex flex-col items-center gap-2 md:items-start">
          <p className="text-center text-sm leading-loose text-f1-steel md:text-left">
            &copy; 2026 F1Insight. All rights reserved.
          </p>
        </div>
        <div className="flex gap-4">
          <a
            href="#"
            className="text-sm font-medium text-f1-steel hover:text-f1-white"
          >
            Terms
          </a>
          <a
            href="#"
            className="text-sm font-medium text-f1-steel hover:text-f1-white"
          >
            Privacy
          </a>
        </div>
      </div>
    </footer>
  )
}
