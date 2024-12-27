"use client"
import { AppSidebar } from "@/app/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/app/components/ui/breadcrumb"
import { Separator } from "@/app/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/app/components/ui/sidebar"
import { ChartNoAxesCombined, Circle, DollarSign, EyeIcon, Info, InfoIcon, PieChart } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { io } from "socket.io-client"
import { BarChartComponent } from "../components/organisms/bar-chart"
import Card from "../components/molecules/card"
import { URLs } from "../utils/constants"
import { PieChartComponent } from "../components/organisms/pie-chart"

import { Button } from "@/app/components/ui/button" 
import { Switch } from "@/app/components/ui/switch"
import { Tooltip, TooltipTrigger, TooltipProvider, TooltipContent } from "../components/ui/tooltip"

export default function Page() {

  const [stats, setStats] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [isConnected, setIsConnected] = useState(false)
  const [autoRefetch, setAutoRefetch] = useState(false)
  const [lastFetched, setLastFetched] = useState("")

  const socketRef = useRef(null);

  useEffect(() => {
    const socket = io(URLs.SOCKET, {
      withCredentials: true
    });

    socketRef.current = socket

    socket.on("connect", () => {
      console.log("Socket Connected");
      setIsConnected(true);
      socket.emit("get-stats", true);
      socket.emit("get-inventory", true);
    });

    setLastFetched(new Date())

    socket.on("stats", (data) => {
      console.log("STATS::", data);
      const modifiedData = [
        {
          title: "Total Sales",
          name: "totalSales",
          value: "$" + data.totalSales,
          icon: <DollarSign />
        },
        {
          title: "Total Views",
          name: "totalViews",
          value: data.totalViews,
          icon: <EyeIcon />
        },
        {
          title: "Total Revenue",
          name: "totalRevenue",
          value: "$" + data.totalRevenue,
          icon: <ChartNoAxesCombined />
        },
      ];
      setStats(modifiedData)
    });

    socket.on("inventory", (data) => {
      console.log("INVENTORY::",data);
      setInventory(data);
    });

  }, []);

  useEffect(() => {
    if (autoRefetch) {
      const interval = setInterval(() => {
        refetchData()
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [autoRefetch]);

  const refetchData = () => {
    if (socketRef.current) {
      socketRef.current.emit("get-stats", true);
      socketRef.current.emit("get-inventory", true);
      setLastFetched(new Date());
    }
  }

  return (
    (<SidebarProvider>
      <AppSidebar />
      <SidebarInset className="!min-h-[97.5vh] h-fit overflow-auto pb-4">
        <header className="flex md:flex-row flex-col min-h-16 mb-2 shrink-0 items-center gap-2 justify-between">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col gap-2 text-xs">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-2 cursor-pointer">
                      <Switch
                        checked={autoRefetch}
                        onCheckedChange={setAutoRefetch}
                      />
                      <div className="flex items-center gap-1">
                        <span className="text-sm">Auto Refetch</span>
                        <InfoIcon size={15} />
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="flex items-center gap-2">
                      <span>Last Fetched: {lastFetched.toLocaleString()}</span>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="flex items-center gap-2">
              <Button
                size="sm"
                className="text-sm"
                variant="outline"
              >
                <Circle
                  className={`h-4 w-4`}
                  color={`${isConnected ? "rgb(34 197 94)" : "rgb(239 68 68 )"}`}
                  title={isConnected ? "Connected" : "Disconnected"}
                />
                {isConnected ? "Connected" : "Disconnected"}
              </Button>
            </div>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 px-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            {
              stats?.map((item, index) => <Card key={index} data={item} />)
            }
          </div>
          <div className="md:grid flex flex-col md:grid-cols-5 min-h-[40vh] gap-4">
            <div className="col-span-3">
              <BarChartComponent data={inventory} />
            </div>
            <div className="col-span-2">
              <PieChartComponent data={inventory} />
            </div>
          </div>
          {/* <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" /> */}
        </div>
      </SidebarInset>
    </SidebarProvider>)
  );
}
