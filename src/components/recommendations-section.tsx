"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Wand2, Loader2, AlertCircle, Sparkles } from "lucide-react"

import type { AirQualityData } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { getRecommendations } from "@/app/actions"

interface RecommendationsSectionProps {
  airQualityData: AirQualityData
}

const formSchema = z.object({
  location: z.string().min(2, { message: "Location must be at least 2 characters." }),
  interests: z.string().min(2, { message: "Interests must be at least 2 characters." }),
})

export function RecommendationsSection({ airQualityData }: RecommendationsSectionProps) {
  const [recommendations, setRecommendations] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: "Indoors",
      interests: "General health, fitness",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setError(null)
    setRecommendations([])

    const result = await getRecommendations({
      airQualityData,
      userPreferences: values,
    })

    if (result.success && result.data) {
      setRecommendations(result.data.recommendations)
    } else {
      setError(result.error || "An unknown error occurred.")
    }
    setIsLoading(false)
  }

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 />
          Personalized Recommendations
        </CardTitle>
        <CardDescription>
          Get AI-powered tips to improve your air quality based on your environment and interests.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Location (e.g., Home Office, City Center)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Indoors" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="interests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Interests (e.g., Fitness, Pets, Children)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., General health, fitness" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                Generate Tips
              </Button>
            </form>
          </Form>

          <div className="bg-muted/50 rounded-lg p-4 min-h-[200px] flex flex-col">
            {isLoading && (
              <div className="m-auto text-center text-muted-foreground">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                <p>Generating recommendations...</p>
              </div>
            )}
            {error && (
              <div className="m-auto text-center text-destructive">
                <AlertCircle className="h-8 w-8 mx-auto mb-2" />
                <p>{error}</p>
              </div>
            )}
            {!isLoading && !error && recommendations.length > 0 && (
              <ul className="space-y-3">
                {recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm">
                    <Sparkles className="h-4 w-4 mt-1 shrink-0 text-primary" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            )}
            {!isLoading && !error && recommendations.length === 0 && (
                 <div className="m-auto text-center text-muted-foreground">
                    <p>Your personalized tips will appear here.</p>
                 </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
