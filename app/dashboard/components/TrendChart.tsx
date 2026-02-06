
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AnalysisRecord } from "@/lib/storage"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts"

interface TrendChartProps {
    data: AnalysisRecord[]
}

export function TrendChart({ data }: TrendChartProps) {
    // Transform data for chart
    // Sort by date ascending
    const sortedData = [...data].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())

    const chartData = sortedData.map(item => ({
        date: new Date(item.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
        score: item.riskScore,
        title: item.projectTitle
    }))

    if (chartData.length < 2) {
        return (
            <Card className="col-span-4">
                <CardHeader>
                    <CardTitle>Risk Trends</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center text-muted-foreground">
                    Need at least 2 analysis records to show trends.
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="col-span-4">
            <CardHeader>
                <CardTitle>Risk Level Trend (Last Projects)</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                            <XAxis
                                dataKey="date"
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                domain={[0, 100]}
                            />
                            <Tooltip
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                labelStyle={{ color: '#666' }}
                            />
                            <Area
                                type="monotone"
                                dataKey="score"
                                stroke="#8884d8"
                                fillOpacity={1}
                                fill="url(#colorScore)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}
