import logo from "@/assets/usbstock-logo.png.asset.json";
import { Link } from "@tanstack/react-router";

export function Logo({ className = "h-8" }: { className?: string }) {
  return (
    <Link to="/" aria-label="USB Stock — inicio" className="inline-flex shrink-0 items-center">
      <img src={logo.url} alt="USB Stock" width={1364} height={307} className={`${className} w-auto`} />
    </Link>
  );
}
