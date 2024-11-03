"use client"
import { useState, useEffect } from "react";
import { getCookie } from 'cookies-next';
import useFetchWrapper from "@/utils/fetchWrapper";
import { useLoading } from "@/app/LoadingContext";
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SearchBar from "./searchBar";
import { Cust, Subs, CustPick } from "./_custInfo";
import Invoices from "./invoices";
import NewInvoice from "./newInvoice";

const Page = () => {
    const { toast } = useToast();
    const { fetchWrapper } = useFetchWrapper();
    const { isLoading } = useLoading();
    const [userMenu, setUserMenu] = useState<any>();
    const [banks, setBanks] = useState<any>();
    const [custInfo, setCustInfo] = useState({
        input: {},
        objects: [],
    });
    const [cust, setCust] = useState<any>();
    const [subs, setSubs] = useState();
    const [inv, setInv] = useState<any>();
    const [newInvoiceState, setNewInvoiceState] = useState();
    const [detailState, setDetailState] = useState();
    const [deleteState, setDeleteState] = useState();
    const [paymentState, setPaymentState] = useState();

    useEffect(() => {
        const getBanks = async () => {
            const url = `/api/base/banks`;
            const response = await fetchWrapper(url);
            if (response["success"]) {
                setBanks(response["data"]);
            }
        };
        const getUserMenu = () => {
            const cookie_menu = getCookie('INVOICE_MENU') || "";
            setUserMenu(JSON.parse(cookie_menu));
        }
        getUserMenu();
        getBanks();
    }, []);

    const handleSearch = (values: any) => {
        if (values["type"] != "custId") {
            getCustInfo(values);
        } else {
            getCust(values);
            getSubs(values);
        }
    }
    const getCustInfo = async (input: any, page = 1) => {
        const url = `/api/cust/info?type=${input["type"]}&id=${input["id"]}&page=${page}`;
        const response = await fetchWrapper(url);
        if (response["success"]) {
            if (response["data"]["pagination"]["total"] > 1) {
                setCustInfo(response["data"]);
            } else if (response["data"]["pagination"]["total"] == 1) {
                setCustInfo({ input: input, objects: response["data"] });
                input["id"] = response["data"]["objects"][0]["custId"];
                input["type"] = "custId";
                await getCust(input);
                if (input["type"] == "userId") {
                    input["id"] = response["data"]["objects"][0]["userId"];
                }
                await getSubs(input, 1);
            }
        }
    }
    const getCust = async (input: any) => {
        const url = `/api/cust?type=${input["type"]}&id=${input["id"]}`;
        const response = await fetchWrapper(url);
        if (response["success"]) {
            setCust(response["data"]);
        }
    };
    const getSubs = async (input: any, page = 1) => {
        const url = `/api/cust/subs?type=${input["type"]}&id=${input["id"]}&page=${page}`;
        const response = await fetchWrapper(url);
        if (response["success"]) {
            setSubs(response["data"]);
        }
    };
    const changeSubsPage = async (page: number) => {
        const input = {
            type: "custId",
            id: cust["custId"],
        };
        getSubs(input, page);
    };
    const handleCustPickClose = (reload = false) => {
        setCustInfo({ objects: [], input: {} });
    };
    const changeCustPickPage = async (page: number) => {
        const input = custInfo["input"];
        await getCustInfo(input, page);
    };
    const handleCustPick = async (selected: any) => {
        const filtered = custInfo["objects"].filter(
            (d: any) => d == selected
        );
        setCustInfo({ objects: filtered, input: custInfo["input"] });
        const input = {
            type: "custId",
            id: filtered[0]["custId"],
        };
        await getCust(input);
        await getSubs(input, 1);
    };
    const handleAction = async (action: string) => {
        if (cust) {
            if (action == "newInvoice") {
                setNewInvoiceState(cust['custId']);
            }
        } else {
            toast({
                title: "Мэдээлэл",
                variant: "warning",
                description: "Хэрэглэгч сонгоогүй байна.",
            });
        }
    }
    const handleNewInvoiceClose = () => {
        setNewInvoiceState(undefined);
    }

    return (
        <div>
            <div className="flex justify-between">
                <SearchBar handleSearch={handleSearch} isLoading={isLoading} />
                <Button type="button" disabled={isLoading} onClick={() => handleAction("newInvoice")}>
                    Шинэ нэхэмжлэл
                </Button>
            </div>
            <Card className="mt-4">
                <CardContent>
                    <Invoices />
                </CardContent>
            </Card>
            <Card className="mt-4">
                <CardContent>
                    <Tabs defaultValue="cust">
                        <TabsList>
                            <TabsTrigger value="cust">Хэрэглэгч</TabsTrigger>
                            <TabsTrigger value="subs">Бүтээгдэхүүн</TabsTrigger>
                        </TabsList>
                        <TabsContent value="cust"><Cust data={cust} /></TabsContent>
                        <TabsContent value="subs">
                            <Subs data={subs} changePage={changeSubsPage}
                                loading={isLoading} />
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
            {custInfo["objects"].length > 1 && (
                <CustPick
                    data={custInfo}
                    handleCustPickClose={handleCustPickClose}
                    handleCustPick={handleCustPick}
                    changePage={changeCustPickPage}
                    isLoading={isLoading}
                />
            )}
            {newInvoiceState && (
                <NewInvoice
                    custId={cust.custId}
                    handleNewInvoiceClose={handleNewInvoiceClose}
                />
            )}
        </div>
    );
}

export default Page;