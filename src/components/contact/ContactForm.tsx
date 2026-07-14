"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  projectType: z.string().optional(),
  date: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(10),
});

type FormData = z.infer<typeof schema>;

type Props = {
  labels: {
    name: string;
    email: string;
    phone: string;
    projectType: string;
    date: string;
    budget: string;
    message: string;
    submit: string;
    sending: string;
    successTitle: string;
    successBody: string;
    error: string;
    required: string;
  };
  types: Record<string, string>;
};

const fieldClass =
  "w-full bg-transparent border-0 border-b border-border-strong text-fg py-3 text-[0.95rem] transition-colors focus:outline-none focus:border-accent placeholder:text-fg-subtle";

export function ContactForm({ labels, types }: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("fail");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <div>
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="border border-accent/30 bg-accent-soft p-10 md:p-12"
          >
            <p className="font-serif text-3xl text-fg mb-3">{labels.successTitle}</p>
            <p className="text-fg-muted">{labels.successBody}</p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-8 text-[11px] tracking-[0.18em] uppercase text-accent hover:text-fg transition-colors"
            >
              ←
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="grid sm:grid-cols-2 gap-6">
              <Field label={labels.name} error={errors.name && labels.required}>
                <input className={fieldClass} {...register("name")} autoComplete="name" />
              </Field>
              <Field label={labels.email} error={errors.email && labels.required}>
                <input
                  className={fieldClass}
                  type="email"
                  {...register("email")}
                  autoComplete="email"
                />
              </Field>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <Field label={labels.phone}>
                <input className={fieldClass} type="tel" {...register("phone")} autoComplete="tel" />
              </Field>
              <Field label={labels.projectType}>
                <select
                  className={cn(fieldClass, "bg-bg")}
                  {...register("projectType")}
                  defaultValue=""
                >
                  <option value="" disabled>
                    —
                  </option>
                  {Object.entries(types).map(([k, v]) => (
                    <option key={k} value={k}>
                      {v}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <Field label={labels.date}>
                <input className={fieldClass} type="date" {...register("date")} />
              </Field>
              <Field label={labels.budget}>
                <input className={fieldClass} {...register("budget")} placeholder="e.g. 5–10jt" />
              </Field>
            </div>

            <Field label={labels.message} error={errors.message && labels.required}>
              <textarea
                className={cn(fieldClass, "min-h-[140px] resize-y")}
                {...register("message")}
                rows={5}
              />
            </Field>

            {status === "error" && (
              <p className="text-danger text-sm" role="alert">
                {labels.error}
              </p>
            )}

            <MagneticButton type="submit" disabled={status === "loading"}>
              {status === "loading" ? labels.sending : labels.submit}
            </MagneticButton>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  label,
  children,
  error,
}: {
  label: string;
  children: React.ReactNode;
  error?: string | false;
}) {
  return (
    <label className="block">
      <span className="block text-[10px] tracking-[0.2em] uppercase text-fg-subtle mb-2">
        {label}
      </span>
      {children}
      {error && (
        <span className="mt-1 block text-xs text-danger" role="alert">
          {error}
        </span>
      )}
    </label>
  );
}
