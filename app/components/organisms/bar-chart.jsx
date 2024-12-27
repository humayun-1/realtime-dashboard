"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts"

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
    ChartTooltipContent
} from "@/app/components/ui/chart"

const chartConfig = {
    quantity: {
        label: "Quantity",
        color: "#333",
    },
}

export function BarChartComponent({data}) {

    if(!data && !data?.length){
        return "Loading..."
    }

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>Inventory Bar Chart</CardTitle>
                <CardDescription>Showing inventory by Quantity</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart data={data}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="product"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value}
                        />
                        <YAxis />
                        <Tooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        <Legend />
                        <Bar dataKey="quantity" fill={chartConfig.quantity.color} radius={8} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing total inventory per product
                </div>
            </CardFooter>
        </Card>
    )
}
