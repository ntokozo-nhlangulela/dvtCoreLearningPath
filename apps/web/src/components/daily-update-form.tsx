"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createDailyUpdate } from "@/lib/daily-updates";
import { useRouter } from "next/navigation";

import {
  dailyUpdateSchema,
  DailyUpdateFormValues,
} from "@/lib/validation/daily-update-schema";
import { useState, useEffect } from "react";

export function DailyUpdateForm() {
  const {
  register,
  handleSubmit,
  reset,
  formState: { errors, isSubmitting },
} = useForm<DailyUpdateFormValues>({
  resolver: zodResolver(dailyUpdateSchema),
});

const [successMessage, setSuccessMessage] =
  useState<string | null>(null);
  useEffect(() => {
  if (!successMessage) {
    return;
  }

  const timeout = setTimeout(() => {
    setSuccessMessage(null);
  }, 3000);

  return () => clearTimeout(timeout);
}, [successMessage]);
const router = useRouter();
  const onSubmit = async (
  values: DailyUpdateFormValues
) => {
  try {
    await createDailyUpdate(values);

reset();

setSuccessMessage(
  "Daily update submitted successfully."
);

router.refresh();
  } catch (error) {
    console.error(error);

    setSuccessMessage(null);

    alert("Failed to create update");
  }
};

  return (
   <>
    {successMessage && (
      <div className="rounded-md border border-green-300 bg-green-50 p-3 text-green-700">
        {successMessage}
      </div>
    )}
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <div>
        <label>Completed Work</label>

        <textarea
          {...register("completedWork")}
          className="border w-full p-2"
        />

        {errors.completedWork && (
          <p>{errors.completedWork.message}</p>
        )}
      </div>

      <div>
        <label>Next Focus</label>

        <textarea
          {...register("nextFocus")}
          className="border w-full p-2"
        />

        {errors.nextFocus && (
          <p>{errors.nextFocus.message}</p>
        )}
      </div>

      <div>
        <label>Blockers</label>

        <textarea
          {...register("blockers")}
          className="border w-full p-2"
        />
      </div>

      <button
  type="submit"
  disabled={isSubmitting}
  className="border px-4 py-2 disabled:opacity-50 cursor-pointer"
>
  {isSubmitting
    ? "Submitting..."
    : "Submit"}
</button>
    </form>
    </>
  );
}