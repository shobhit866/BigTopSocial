"use client"
import { usePathname } from "next/navigation"
import React, { useEffect } from "react"

export default function HeaderVideo({ children }: { children?: React.ReactNode }) {
  const pathname = usePathname()

  // If we're on the home page, render the full header video
  if (pathname === "/") {
    return (
      <>
        <video
          className="header-video"
          src="/videos/Banner-Video.mp4"
          autoPlay
          muted
          loop
          playsInline
          poster="/videos/header-poster.jpg"
        />
        {children}
      </>
    )
  }

  // For all non-root pages, reserve a poster space and remove the default header overlay
  useEffect(() => {
    if (typeof document === "undefined") return
    if (pathname !== "/") {
      document.body.classList.add("page-header-placeholder")
    } else {
      document.body.classList.remove("page-header-placeholder")
    }
    return () => {
      document.body.classList.remove("page-header-placeholder")
    }
  }, [pathname])

  // Render a reserved poster space (empty) and the overlay children on non-root pages
  return (
    <>
      {children}
    </>
  )
}
