import Image from "next/image"
import Link from "next/link"
import logo from "@/assets/logo.png"

const footerLinks = [
  {
    title: "Quick Links",
    links: [
      { name: "Home", href: "/" },
      { name: "Blog", href: "/blog" },
      { name: "Submit Course", href: "/submit" },
    ],
  },
  {
    title: "Other directories",
    links: [
      { name: "-", href: "/" },
      { name: "-", href: "/" },
      { name: "-", href: "/" },
    ],
  },
  {
    title: "--",
    links: [
      { name: "-", href: "/" },
      { name: "-", href: "/" },
      { name: "-", href: "/" },
    ],
  },
]

export function Footer() {
  return (
    <footer className="bg-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="flex flex-col items-start">
          <Image src={logo} alt="Logo" width={150} height={50} className="w-[150px] h-auto mb-4" />
          <p className="text-sm text-gray-600">© 2023 All Devops Courses. All rights reserved.</p>
        </div>
        {footerLinks.map((column) => (
          <div key={column.title}>
            <h3 className="font-semibold mb-4">{column.title}</h3>
            <ul className="space-y-2">
              {column.links.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-gray-600 hover:text-gray-900">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  )
}

