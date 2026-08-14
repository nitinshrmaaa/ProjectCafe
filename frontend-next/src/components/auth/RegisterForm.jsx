"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaArrowRight } from "react-icons/fa";
import Field from "../ui/Field";
import Button from "../ui/Button";
import { Spinner } from "../ui/Loader";
import { register } from "../../services/auth";
import { isValidEmail } from "../../utils/helpers";

function RegisterForm() {
  const router = useRouter();

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const update = (field) => (event) => {
    setValues((current) => ({ ...current, [field]: event.target.value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const submit = async (event) => {
    event.preventDefault();

    const found = {};

    if (values.name.trim().length < 2) found.name = "Please tell us your name.";
    if (!isValidEmail(values.email)) found.email = "Enter a valid email address.";
    if (values.password.length < 6)
      found.password = "Use at least six characters.";
    if (values.password !== values.confirm)
      found.confirm = "Those passwords do not match.";

    setErrors(found);

    if (Object.keys(found).length) return;

    setLoading(true);

    try {
      await register(values);

      router.push("/reserve");
    } catch (error) {
      setErrors({ form: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={submit} noValidate className="mt-10 space-y-5">
        <Field
          label="Full name"
          value={values.name}
          onChange={update("name")}
          error={errors.name}
          placeholder="Jane Doe"
          autoComplete="name"
        />

        <Field
          label="Email"
          type="email"
          value={values.email}
          onChange={update("email")}
          error={errors.email}
          placeholder="jane@example.com"
          autoComplete="email"
        />

        <Field
          label="Password"
          type="password"
          value={values.password}
          onChange={update("password")}
          error={errors.password}
          placeholder="••••••••"
          autoComplete="new-password"
        />

        <Field
          label="Confirm password"
          type="password"
          value={values.confirm}
          onChange={update("confirm")}
          error={errors.confirm}
          placeholder="••••••••"
          autoComplete="new-password"
        />

        {errors.form && (
          <p role="alert" className="text-sm text-red-300">
            {errors.form}
          </p>
        )}

        <Button type="submit" size="lg" className="w-full" disabled={loading}>
          {loading ? (
            <>
              <Spinner className="h-4 w-4" />
              Creating account…
            </>
          ) : (
            <>
              Create account
              <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </>
          )}
        </Button>
      </form>

      <p className="mt-8 text-center text-white/45">
        Already have an account?{" "}
        <Link href="/login" className="text-gold-400 hover:text-gold-300">
          Sign in
        </Link>
      </p>
    </>
  );
}

export default RegisterForm;
