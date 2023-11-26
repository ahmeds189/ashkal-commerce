import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function useAuth() {
  const router = useRouter();

  async function signOut() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/logout`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (!res.ok) throw new Error();
      toast.success("signed out successfully");
      router.push("/sign-in");
      router.refresh();
    } catch (error) {
      toast.error("could't sign out,please try again");
    }
  }

  return { signOut };
}
