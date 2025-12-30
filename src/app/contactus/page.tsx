"use client";

import { FormEvent, useState, useRef } from "react";
import styles from "./contact.module.css";

interface FormData {
  name: string;
  email: string;
  company?: string;
  interest: string;
  message: string;
}

interface Toast {
  id: string;
  type: "success" | "error";
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    interest: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (type: "success" | "error", message: string) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) return false;
    if (!formData.email.trim()) return false;
    if (!formData.interest) return false;
    if (!formData.message.trim()) return false;
    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setFormData({
        name: "",
        email: "",
        company: "",
        interest: "",
        message: "",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const messageRef = useRef<HTMLTextAreaElement | null>(null);

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="contact-grid">
          <div>
            <div className="hero-box">
              <video
                className="video-element"
                src="/videos/INTRO.mp4"
                autoPlay
                muted
                loop
                playsInline
              />
            </div>
          </div>

          <div className="contact-panel">
            <h1 className="contact-title">Get in touch</h1>
            <p className="contact-sub">
              Take the first step and get in touch with us today
            </p>

            <form onSubmit={handleSubmit} className="contact-form">
              <input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="your name"
              />
              <input
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="email"
              />
              <textarea
                ref={messageRef}
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="your message"
              />
              <select
                className={styles.contactSelect}
                name="interest"
                value={formData.interest}
                onChange={handleInputChange}
              >
                <option value="">Select a service</option>
                <option value="strategy">Social Strategy</option>
                <option value="content">Content Creation</option>
                <option value="advertising">Paid Advertising</option>
                <option value="full">Full Management</option>
                <option value="other">Other</option>
              </select>
              <button className="contact-submit" disabled={isSubmitting}>
                {isSubmitting ? "sending..." : "submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
