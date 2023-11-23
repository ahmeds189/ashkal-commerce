export default function ErrorMessage({ message }: { message?: string }) {
  return (
    <div className="flex h-4 items-center text-sm text-red-500">{message}</div>
  );
}
