"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
const accountLinks = [
  { href: "/my-account", label: "Dashboard" },
  { href: "/my-account-orders", label: "Đơn hàng" },
  { href: "/my-account-address", label: "Địa chỉ" },
  { href: "/my-account-edit", label: "Thông tin tài khoản" },
  { href: "/my-account-wishlist", label: "Yêu thích" },
];

export default function DashboardNav() {
  const pathname = usePathname();
  return (
    <ul className="my-account-nav">
      {accountLinks.map((link, index) => (
        <li key={index}>
          <Link
            href={link.href}
            className={`my-account-nav-item ${
              pathname == link.href ? "active" : ""
            }`}
          >
            {link.label}
          </Link>
        </li>
      ))}
      <li>
        <Link href={`/login`} className="my-account-nav-item">
          Logout
        </Link>
      </li>
    </ul>
  );
}
