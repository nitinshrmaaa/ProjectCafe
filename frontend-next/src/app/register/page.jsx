import AuthLayout from "@/components/auth/AuthLayout";
import RegisterForm from "@/components/auth/RegisterForm";
import image from "@/assets/images/hero/hero7.jpg";

export const metadata = {
  title: "Create an Account",
  description:
    "Create a Brew Haven account to book tables faster and collect rewards on every cup.",
  alternates: { canonical: "/register" },
};

export default function RegisterPage() {
  return (
    <AuthLayout
      image={image}
      title="Join the house"
      subtitle="Book faster, save your favourite drinks and collect a free cup every tenth visit."
      quote="Every regular started with a first cup. This is yours."
    >
      <RegisterForm />
    </AuthLayout>
  );
}
