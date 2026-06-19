export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 items-center justify-center bg-blue-50 px-4 py-12">
      <div className="w-full max-w-md overflow-hidden rounded-xl bg-white shadow-lg">
        <div className="bg-blue-700 px-8 py-6 text-white">
          <h1 className="text-2xl font-bold">AR Bank Limited</h1>
          <p className="mt-1 text-sm text-blue-100">Online Banking Made Simple</p>
        </div>
        <div className="px-8 py-8">
          <h2 className="mb-1 text-xl font-semibold text-gray-900">{title}</h2>
          <p className="mb-6 text-sm text-gray-500">{subtitle}</p>
          {children}
        </div>
      </div>
    </div>
  );
}
