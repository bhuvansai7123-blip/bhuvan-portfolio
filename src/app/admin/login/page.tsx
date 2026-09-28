import Link from "next/link";
import { login } from "@/app/actions/auth";

export default function LoginPage({ searchParams }: { searchParams: { error?: string } }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-5">
      <form action={login} className="card p-8 w-full max-w-sm space-y-4">
        <h1 className="text-xl font-bold">Admin Login</h1>
        <div><label>Email</label><input required type="email" name="email" /></div>
        <div><label>Password</label><input required type="password" name="password" /></div>
        {searchParams.error && <p className="text-xs text-red-300">{searchParams.error}</p>}
        <button className="btn-primary w-full text-sm">Sign In</button>
        <Link href="/" className="block text-center text-xs text-muted hover:text-ink">← Back to website</Link>
      </form>
    </div>
  );
}