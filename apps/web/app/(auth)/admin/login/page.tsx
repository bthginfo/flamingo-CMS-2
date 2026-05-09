import { LoginForm } from "../../../../components/admin/LoginForm";

export default function AdminLoginPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#f6f5f2] p-5">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </main>
  );
}
