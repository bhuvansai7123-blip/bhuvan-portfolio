"use client";
import { useState, useTransition } from "react";
import { sendMessage } from "@/app/actions/contact";

export default function ContactForm() {
  const [status, setStatus] = useState<{ ok: boolean; error?: string } | null>(null);
  const [pending, startTransition] = useTransition();

  return (
    <form
      className="card p-6 space-y-3"
      action={(formData) => {
        startTransition(async () => {
          const res = await sendMessage(formData);
          setStatus(res);
          if (res.ok) (document.getElementById("contact-form") as HTMLFormElement)?.reset();
        });
      }}
      id="contact-form"
    >
      <div><label>Name</label><input required name="name" /></div>
      <div><label>Email</label><input required type="email" name="email" /></div>
      <div><label>Subject</label><input name="subject" /></div>
      <div><label>Message</label><textarea required name="message" rows={4} /></div>
      <button disabled={pending} className="btn-primary w-full text-sm">{pending ? "Sending…" : "Send Message"}</button>
      {status && (
        <p className={`text-xs ${status.ok ? "text-emerald-300" : "text-red-300"}`}>
          {status.ok ? "Message sent — thank you!" : status.error}
        </p>
      )}
    </form>
  );
}