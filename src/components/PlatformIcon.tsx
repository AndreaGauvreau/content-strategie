"use client";
import {
  FaLinkedin,
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaXTwitter,
  FaThreads,
} from "react-icons/fa6";
export default function PlatformIcon({ name }: { name: string }) {
  const p = (name || "").toLowerCase();
  if (p.includes("linkedin")) return <FaLinkedin />;
  if (p.includes("instagram")) return <FaInstagram />;
  if (p.includes("tiktok")) return <FaTiktok />;
  if (p.includes("youtube") || p.includes("shorts")) return <FaYoutube />;
  if (p === "x" || p.includes("twitter")) return <FaXTwitter />;
  if (p.includes("threads")) return <FaThreads />;
  return <span>★</span>;
}
