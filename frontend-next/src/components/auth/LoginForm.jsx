"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaArrowRight, FaEye, FaEyeSlash } from "react-icons/fa";
import Field from "../ui/Field";
import Button from "../ui/Button";
import { Spinner } from "../ui/Loader";
import { login } from "../../services/auth";
import { isValidEmail } from "../../utils/helpers";

function LoginForm() {
  const router = useRouter();

  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const update = (field) => (event) => {
    setValues((current) => ({ ...current, [field]: event.target.value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const submit = async (event) => {
    event.preventDefault();

    const found = {};

    if (!isValidEmail(values.email)) found.email = "Enter a valid email address.";
    if (values.password.length < 6)
      found.password = "Passwords are at least six characters.";

    setErrors(found);

    if (Object.keys(found).length) return;

    setLoading(true);

    try {
      await login(values);

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
          label="Email"
          type="email"
          value={values.email}
          onChange={update("email")}
          error={errors.email}
          placeholder="jane@example.com"
          autoComplete="email"
        />

        <div className="relative">
          <Field
            label="Password"
            type={showPassword ? "text" : "password"}
            value={values.password}
            onChange={update("password")}
            error={errors.password}
            placeholder="••••••••"
            autoComplete="current-password"
          />

          <button
            type="button"
            onClick={() => setShowPassword((value) => !value)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-5 top-11 text-white/40 transition-colors hover:text-gold-300"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {errors.form && (
          <p role="alert" className="text-sm text-red-300">
            {errors.form}
          </p>
        )}

        <Button type="submit" size="lg" className="w-full" disabled={loading}>
          {loading ? (
            <>
              <Spinner className="h-4 w-4" />
              Signing in…
            </>
          ) : (
            <>
              Sign in
              <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </>
          )}
        </Button>
      </form>

      <p className="mt-8 text-center text-white/45">
        New here?{" "}
        <Link href="/register" className="text-gold-400 hover:text-gold-300">
          Create an account
        </Link>
      </p>
    </>
  );
}

export default LoginForm;
