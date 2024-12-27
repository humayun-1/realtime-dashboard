"use client"

import { TrendingUp } from "lucide-react"
import { Pie, PieChart } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/app/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/app/components/ui/chart"

const getChartData = (inventory) =>
    Object.entries(inventory.reduce((totals, { warehouse, quantity }) => {
        totals[warehouse] = (totals[warehouse] || 0) + quantity;
        return totals;
    }, {})).map(([warehouse, quantity]) => ({
        warehouse,
        quantity,
        fill: warehouse === "Warehouse A" ? "var(--color-warehouseA)" : "var(--color-warehouseB)",
    }));

const chartConfig = {
    warehouseA: {
        label: "Warehouse A: ",
        color: "hsl(var(--chart-1))",
    },
    warehouseB: {
        label: "Warehouse B: ",
        color: "hsl(var(--chart-2))",
    },
}

export function PieChartComponent({ data }) {

    const chartData = getChartData(data)

    if (!chartData && !chartData?.length) {
        return "Loading..."
    }

    return (
        <Card className="flex flex-col h-full">
            <CardHeader className="items-center pb-0">
                <CardTitle>Warehouse Inventory Distribution</CardTitle>
                <CardDescription>Total product distribution across warehouses</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0 flex items-center">
                <ChartContainer
                    config={chartConfig}
                    className="h-full aspect-square mx-auto min-h-[300px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="quantity"
                            nameKey="warehouse"
                            innerRadius={110}
                            outerRadius={150}
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing total inventory distribution across warehouses
                </div>
            </CardFooter>
        </Card>
    )
}
