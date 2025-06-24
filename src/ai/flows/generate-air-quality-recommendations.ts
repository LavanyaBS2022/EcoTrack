'use server';
/**
 * @fileOverview Provides personalized recommendations to improve air quality based on current conditions and user preferences.
 *
 * - generateAirQualityRecommendations - A function that generates air quality recommendations.
 * - AirQualityRecommendationsInput - The input type for the generateAirQualityRecommendations function.
 * - AirQualityRecommendationsOutput - The return type for the generateAirQualityRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AirQualityRecommendationsInputSchema = z.object({
  airQualityData: z.object({
    pm25: z.number().describe('Particulate Matter 2.5 concentration in μg/m³'),
    pm10: z.number().describe('Particulate Matter 10 concentration in μg/m³'),
    co2: z.number().describe('Carbon Dioxide concentration in ppm'),
    temperature: z.number().describe('Temperature in Celsius'),
    humidity: z.number().describe('Relative Humidity in %'),
  }).describe('Current air quality data'),
  userPreferences: z.object({
    location: z.string().describe('User location'),
    interests: z.string().describe('User interests'),
  }).describe('User preferences'),
});
export type AirQualityRecommendationsInput = z.infer<typeof AirQualityRecommendationsInputSchema>;

const AirQualityRecommendationsOutputSchema = z.object({
  recommendations: z.array(
    z.string().describe('A recommendation to improve air quality')
  ).describe('List of personalized recommendations to improve air quality'),
});
export type AirQualityRecommendationsOutput = z.infer<typeof AirQualityRecommendationsOutputSchema>;

export async function generateAirQualityRecommendations(input: AirQualityRecommendationsInput): Promise<AirQualityRecommendationsOutput> {
  return generateAirQualityRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'airQualityRecommendationsPrompt',
  model: 'googleai/gemini-2.0-flash',
  input: {schema: AirQualityRecommendationsInputSchema},
  output: {schema: AirQualityRecommendationsOutputSchema},
  prompt: `You are an expert in environmental science, specializing in air quality improvement.

  Based on the current air quality data and user preferences, provide personalized recommendations to improve air quality.

  Current Air Quality Data:
  PM2.5: {{{airQualityData.pm25}}} μg/m³
  PM10: {{{airQualityData.pm10}}} μg/m³
  CO2: {{{airQualityData.co2}}} ppm
  Temperature: {{{airQualityData.temperature}}} °C
  Humidity: {{{airQualityData.humidity}}} %

  User Preferences:
  Location: {{{userPreferences.location}}}
  Interests: {{{userPreferences.interests}}}

  Recommendations:`, // Ensure the prompt ends with the key of the desired output
});

const generateAirQualityRecommendationsFlow = ai.defineFlow(
  {
    name: 'generateAirQualityRecommendationsFlow',
    inputSchema: AirQualityRecommendationsInputSchema,
    outputSchema: AirQualityRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error("The AI failed to generate valid recommendations. The response may have been blocked or did not match the required format.");
    }
    return output;
  }
);