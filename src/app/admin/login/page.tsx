export default async function AdminLogin({
  searchParams,
}: {
  searchParams?: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  return (
    <main className="grid min-h-screen place-items-center bg-slate-100 px-4">
      <form action="/api/admin/login" method="post" className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <p className="font-bold text-emerald-700">Owner Area</p>
          <h1 className="text-2xl font-black">Login Dashboard</h1>
          <p className="mt-2 text-sm text-slate-600">Default seed: owner@laptopku.local / riki02</p>
        </div>
        {params?.error && <p className="mb-4 rounded-lg bg-rose-50 p-3 text-sm font-semibold text-rose-700">Email atau password salah.</p>}
        <div className="grid gap-3">
          <input className="form-field" type="email" name="email" defaultValue="owner@laptopku.local" required />
          <input className="form-field" type="password" name="password" defaultValue="riki02" required />
          <button className="btn-primary" type="submit">
            Masuk
          </button>
        </div>
      </form>
    </main>
  );
}
