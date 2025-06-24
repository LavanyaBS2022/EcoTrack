"use server";

import {
  generateAirQualityRecommendations,
  type AirQualityRecommendationsInput,
} from "@/ai/flows/generate-air-quality-recommendations";

export async function getRecommendations(input: AirQualityRecommendationsInput) {
  try {
    const result = await generateAirQualityRecommendations(input);
    if (!result || !result.recommendations) {
      return { success: false, error: "Received an invalid response from the AI." };
    }
    return { success: true, data: result };
  } catch (error) {
    console.error("Error generating recommendations:", error);
    return { success: false, error: "Failed to generate recommendations. Please try again later." };
  }
}
