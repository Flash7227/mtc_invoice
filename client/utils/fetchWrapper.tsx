import { getCookies } from "cookies-next";
import { useToast } from "@/hooks/use-toast";

const useFetchWrapper = () => {
  const { toast } = useToast();

  const fetchWrapper = async (url: string, options: any = {method: "GET"}) => {
    const cookie = getCookies();
    options.headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + cookie["INVOICE_TOKEN"],
    };

    try {
      const response = await fetch(url, options);
      if (response.status === 401) {
        // Redirect to login if unauthorized
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return null;
      }
      const json = await response.json();
      if (json["desc"]) {
        toast({
          variant: json["status"],
          title: "Мэдээлэл",
          description: json["desc"],
        });
      }
      return json;
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    } finally {
    }
  };

  return { fetchWrapper };
};
export default useFetchWrapper;
