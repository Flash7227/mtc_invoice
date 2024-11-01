"use client";
import { useState, useEffect } from "react";
import useFetchWrapper from "@/utils/fetchWrapper";
import SearchForm from "./searchForm";
import Invoices from "./invoices";
import Info from "./info";
import Subs from "./subs";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Page = () => {
  const { fetchWrapper } = useFetchWrapper();
  const [loading, setLoading] = useState(false);
  const [custInfo, setCustInfo] = useState({
    input: {},
    objects: [],
  });
  const [cust, setCust] = useState<any>();
  const [subs, setSubs] = useState();
  const [inv, setInv] = useState<any>();

  const handleSearch = async (values: any) => {
    if (values["type"] != "custId") {
      await getCustInfo(values, 1);
    } else {
      await getCust(values);
      await getSubs(values, 1);
    }
  };
  const getCustInfo = async (input: any, page = 1) => {
    const url = `/api/customer/info?type=${input["type"]}&id=${input["id"]}&page=${page}`;
    const response = await fetchWrapper(url);
    if (response["status"] == "success") {
      if (response["data"]["pagination"]["total"] > 1) {
        setCustInfo(response["data"]);
      } else if (response["data"]["pagination"]["total"] == 1) {
        setCustInfo({ input: input, objects: response["data"] });
        if (input["type"] == "taxId") {
          input["id"] = response["data"]["objects"][0]["custId"];
          input["type"] = "custId";
          await getSubs(input, 1);
        } else {
          input["id"] = response["data"]["objects"][0]["userId"];
          await getSubs(input, 1);
        }
        input["id"] = response["data"]["objects"][0]["custId"];
        input["type"] = "custId";
        await getCust(input);
      }
    }
  };

  const getCust = async (input: any) => {
    const url = `/api/customer?type=${input["type"]}&id=${input["id"]}`;
    const response = await fetchWrapper(url);
    if (response["status"] == "success") {
      setCust(response["data"]);
    }
  };
  const getSubs = async (input: any, page = 1) => {
    const url = `/api/customer/subs?type=${input["type"]}&id=${input["id"]}&page=${page}`;
    const response = await fetchWrapper(url);
    if (response["status"] == "success") {
      setSubs(response["data"]);
    }
  };
  return (
    <div>
      <Card>
        <CardContent>
          <SearchForm handleSearch={handleSearch} />
          <div className="mt-2">
            <Invoices

            />
          </div>
        </CardContent>
      </Card>
      <Card className="mt-4">
        <CardContent>
          <Tabs defaultValue="info" className="w-full">
            <TabsList>
              <TabsTrigger value="info">Хэрэглэгч</TabsTrigger>
              <TabsTrigger value="services">Үйлчилгээ</TabsTrigger>
            </TabsList>
            <TabsContent value="info">
              <Info data={cust} />
            </TabsContent>
            <TabsContent value="services">
              <Subs />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
