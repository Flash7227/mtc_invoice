import FormData from "./formData";
import { ScanText } from "lucide-react";

const Page = async () => {
    return (
        <div className="max-w-[380px] mx-auto h-screen flex flex-col justify-center -mt-6">
            <div className="flex flex-col items-center justify-center mb-6">
                <ScanText size={64} className="text-primary"/>
                <h5 className="text-primary font-semibold">{process.env.APP_NAME}</h5>
            </div>
            <FormData/>
        </div>
    );
}

export default Page;