"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { company } from "@/data/company";
import { services } from "@/data/services";
import { solutions } from "@/data/solutions";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Check, Spinner } from "@/components/ui/icons";
import { easeBrand } from "@/lib/motion";
import { cn } from "@/lib/utils";

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  location: string;
  requirement: string;
  message: string;
};

type Errors = Partial<Record<keyof FormState, string>>;
type Status = "idle" | "submitting" | "success" | "error" | "fallback";

const initialState: FormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  location: "",
  requirement: "",
  message: "",
};

const requirementOptions = [
  ...solutions.map((solution) => solution.name),
  ...services.map((service) => service.name),
  "Other requirement",
];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const phonePattern = /^[+()\d][\d\s()-]{7,}$/;

function validate(values: FormState): Errors {
  const errors: Errors = {};
  if (values.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!emailPattern.test(values.email.trim())) errors.email = "Please enter a valid email address.";
  if (!phonePattern.test(values.phone.trim()))
    errors.phone = "Please enter a phone number we can reach you on.";
  if (!values.requirement) errors.requirement = "Please choose what your enquiry is about.";
  if (values.message.trim().length < 15)
    errors.message = "Please add a little more detail — at least 15 characters.";
  return errors;
}

const fieldBase =
  "w-full rounded-[3px] border bg-white px-4 py-3 text-sm text-navy-900 transition-colors duration-300 placeholder:text-ink-muted/60 focus:border-brand-500 focus:outline-none";

function Label({ htmlFor, children, optional }: { htmlFor: string; children: string; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block text-sm font-semibold text-navy-900">
      {children}
      {optional ? <span className="ml-1.5 font-normal text-ink-muted">(optional)</span> : null}
    </label>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-2 flex items-start gap-1.5 text-xs font-medium text-red-700">
      <span aria-hidden>!</span>
      {message}
    </p>
  );
}

export function ContactForm() {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const reduceMotion = useReducedMotion();
  // Bots fill hidden fields and submit instantly; both are cheap signals.
  const honeypot = useRef("");
  const mountedAt = useRef(0);

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  const mailtoHref = useMemo(() => {
    const subject = `Website enquiry — ${values.requirement || "General"}`;
    const body = [
      `Name: ${values.name}`,
      values.company && `Company: ${values.company}`,
      `Email: ${values.email}`,
      `Phone: ${values.phone}`,
      values.location && `Location: ${values.location}`,
      `Requirement: ${values.requirement}`,
      "",
      values.message,
    ]
      .filter(Boolean)
      .join("\n");

    return `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [values]);

  const update = (key: keyof FormState) => (event: { target: { value: string } }) => {
    setValues((prev) => ({ ...prev, [key]: event.target.value }));
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (honeypot.current || Date.now() - mountedAt.current < 2500) {
      setStatus("error");
      return;
    }

    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      const firstKey = Object.keys(nextErrors)[0];
      document.getElementById(firstKey)?.focus();
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          website: honeypot.current,
        }),
      });

      if (!response.ok) throw new Error("Submit failed");
      setStatus("success");
      setValues(initialState);
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: easeBrand }}
        className="rounded-[4px] border border-leaf-600/30 bg-leaf-100/60 p-8 sm:p-10"
        role="status"
      >
        <span className="flex size-12 items-center justify-center rounded-full bg-leaf-600 text-white">
          <Check className="size-6" />
        </span>
        <h3 className="mt-6 text-2xl font-semibold tracking-tight text-navy-900">
          Enquiry received
        </h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-navy-800">
          Thank you — your details have reached our team. We will get back to you on the phone
          number or email you provided. For anything urgent, call{" "}
          <a href={`tel:${company.phones[1].tel}`} className="font-semibold underline">
            {company.phones[1].value}
          </a>
          .
        </p>
        <Button
          variant="outline"
          size="sm"
          className="mt-7"
          onClick={() => setStatus("idle")}
        >
          Send another enquiry
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-6 sm:grid-cols-2">
      {/* Honeypot — hidden from users and assistive tech, visible to bots. */}
      <div className="hidden" aria-hidden>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          onChange={(event) => {
            honeypot.current = event.target.value;
          }}
        />
      </div>

      <div>
        <Label htmlFor="name">Name</Label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          value={values.name}
          onChange={update("name")}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={cn(fieldBase, errors.name ? "border-red-500" : "border-sand-200")}
          placeholder="Your full name"
        />
        <FieldError id="name-error" message={errors.name} />
      </div>

      <div>
        <Label htmlFor="company" optional>
          Company
        </Label>
        <input
          id="company"
          name="company"
          type="text"
          autoComplete="organization"
          value={values.company}
          onChange={update("company")}
          className={cn(fieldBase, "border-sand-200")}
          placeholder="Organisation or project name"
        />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={update("email")}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={cn(fieldBase, errors.email ? "border-red-500" : "border-sand-200")}
          placeholder="you@company.com"
        />
        <FieldError id="email-error" message={errors.email} />
      </div>

      <div>
        <Label htmlFor="phone">Phone</Label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          value={values.phone}
          onChange={update("phone")}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? "phone-error" : undefined}
          className={cn(fieldBase, errors.phone ? "border-red-500" : "border-sand-200")}
          placeholder="+91 00000 00000"
        />
        <FieldError id="phone-error" message={errors.phone} />
      </div>

      <div>
        <Label htmlFor="location" optional>
          Site location
        </Label>
        <input
          id="location"
          name="location"
          type="text"
          value={values.location}
          onChange={update("location")}
          className={cn(fieldBase, "border-sand-200")}
          placeholder="City or project site"
        />
      </div>

      <div>
        <Label htmlFor="requirement">Requirement</Label>
        <select
          id="requirement"
          name="requirement"
          value={values.requirement}
          onChange={update("requirement")}
          aria-invalid={Boolean(errors.requirement)}
          aria-describedby={errors.requirement ? "requirement-error" : undefined}
          className={cn(
            fieldBase,
            "appearance-none bg-[length:0.7rem] bg-[right_1rem_center] bg-no-repeat pr-10",
            errors.requirement ? "border-red-500" : "border-sand-200",
          )}
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12'%3E%3Cpath d='M2 4.5 6 8.5l4-4' fill='none' stroke='%23536470' stroke-width='1.6' stroke-linecap='round'/%3E%3C/svg%3E\")",
          }}
        >
          <option value="">Select a solution or service</option>
          {requirementOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <FieldError id="requirement-error" message={errors.requirement} />
      </div>

      <div className="sm:col-span-2">
        <Label htmlFor="message">Your requirement</Label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={values.message}
          onChange={update("message")}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : "message-hint"}
          className={cn(fieldBase, "resize-y", errors.message ? "border-red-500" : "border-sand-200")}
          placeholder="Daily load, water quality, site type, and what you need the treated water for."
        />
        {errors.message ? (
          <FieldError id="message-error" message={errors.message} />
        ) : (
          <p id="message-hint" className="mt-2 text-xs text-ink-muted">
            The more detail you give, the more useful our first response will be.
          </p>
        )}
      </div>

      <AnimatePresence>
        {status === "error" || status === "fallback" ? (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={cn(
              "rounded-[3px] border p-5 text-sm sm:col-span-2",
              status === "fallback"
                ? "border-brand-500/40 bg-brand-50 text-navy-900"
                : "border-red-500/40 bg-red-50 text-red-900",
            )}
            role="alert"
          >
            {status === "fallback" ? (
              <>
                <p className="font-semibold">Online submissions are not connected yet</p>
                <p className="mt-2 leading-relaxed">
                  Your enquiry has been prepared as an email instead — send it and it will reach our
                  team directly.
                </p>
                <a
                  href={mailtoHref}
                  className="mt-4 inline-flex items-center gap-2 rounded-[3px] bg-navy-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
                >
                  Open email with my details
                  <ArrowRight className="size-4" />
                </a>
              </>
            ) : (
              <>
                <p className="font-semibold">We couldn&rsquo;t send that</p>
                <p className="mt-2 leading-relaxed">
                  Please try again, or reach us on{" "}
                  <a href={`tel:${company.phones[1].tel}`} className="font-semibold underline">
                    {company.phones[1].value}
                  </a>{" "}
                  or{" "}
                  <a href={`mailto:${company.email}`} className="font-semibold underline">
                    {company.email}
                  </a>
                  .
                </p>
              </>
            )}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <Button
          type="submit"
          size="lg"
          variant="accent"
          disabled={status === "submitting"}
          withArrow={status !== "submitting"}
          className="w-full sm:w-auto"
        >
          {status === "submitting" ? (
            <span className="flex items-center gap-2">
              <Spinner className="size-4" />
              Sending
            </span>
          ) : (
            "Send enquiry"
          )}
        </Button>
        <p className="text-xs leading-relaxed text-ink-muted sm:max-w-xs">
          We use your details only to respond to this enquiry.
        </p>
      </div>
    </form>
  );
}
