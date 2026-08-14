import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";
import image from "@/assets/images/hero/hero4.jpg";

export const metadata = {
  title: "Sign In",
  description: "Sign in to manage your Brew Haven reservations and rewards.",
  alternates: { canonical: "/login" },
};

export default function LoginPage() {
  return (
    <AuthLayout
      image={image}
      title="Welcome back"
      subtitle="Sign in to see your reservations, saved drinks and rewards."
      quote="The best cup of coffee is the one waiting for you at a table you booked."
    >
      <LoginForm />
    </AuthLayout>
  );
}
