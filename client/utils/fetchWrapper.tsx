import { getCookies } from "cookies-next";
import { useToast } from "@/hooks/use-toast";
import { useLoading } from "@/app/LoadingContext";

const useFetchWrapper = () => {
  const { setIsLoading } = useLoading();
  const { toast } = useToast();

  const fetchWrapper = async (url: string, options: any = { method: "GET" }) => {
    const cookie = getCookies();
    options.headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + cookie["INVOICE_TOKEN"],
    };

    try {
      setIsLoading(true);
      const response = await fetch(url, options);
      if (response.status === 401) {
        // Redirect to login if unauthorized
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return null;
      }
      const json = await response.json();
      if (json["message"]) {
        toast({
          variant: json["success"] ? "success" : "warning",
          title: "Мэдээлэл",
          description: json["message"],
        });
      }
      return json;
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchWrapper };
};
export default useFetchWrapper;
