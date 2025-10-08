import { Journey } from '../entities/Journey.js';
import {
  calculateSingleJourneyFare,
  groupJourneysByDay,
  findFarthestZone,
  getDailyCap,
  getWeeklyCap
} from './helpers/index.js';


export function calculateTotalFare(journeys: Journey[]): number {
  console.log('🚇 Starting fare calculation for', journeys.length, 'journeys');
  
  // If no journeys, no charge!
  if (journeys.length === 0) {
    console.log('No journeys found, returning 0');
    return 0;
  }

  // Group journeys by day
  console.log('📅 Grouping journeys by day...');
  const journeysByDay = groupJourneysByDay(journeys);
  const dayKeys = Object.keys(journeysByDay);
  console.log('Found', dayKeys.length, 'days with journeys');

  // Calculate fare for each day
  const dailyResults = [];
  
  for (const dayKey of dayKeys) {
    console.log('\n--- Processing day:', dayKey, '---');
    
    const daysJourneys = journeysByDay[dayKey] ?? [];
    console.log('This day has', daysJourneys.length, 'journeys');
    
    // Calculate total fare for this day (without cap)
    let dailyFareBeforeCap = 0;
    for (const journey of daysJourneys) {
      const journeyFare = calculateSingleJourneyFare(journey);
      dailyFareBeforeCap += journeyFare;
    }
    console.log('Daily fare before cap:', dailyFareBeforeCap);
    
    // Find the farthest zone traveled this day
    const farthestZoneThisDay = findFarthestZone(daysJourneys);
    console.log('Farthest zone today:', farthestZoneThisDay);
    
    // Get the daily cap for that zone
    const dailyCap = getDailyCap(farthestZoneThisDay);
    console.log('Daily cap for', farthestZoneThisDay + ':', dailyCap);
    
    // Apply daily cap - don't charge more than the cap
    const finalDailyFare = Math.min(dailyFareBeforeCap, dailyCap);
    console.log('Final daily fare after cap:', finalDailyFare);
    
    // Save the result for this day
    dailyResults.push({
      fare: finalDailyFare,
      zone: farthestZoneThisDay,
      day: dayKey
    });
  }

  // Calculate weekly total and apply weekly cap
  console.log('\n=== CALCULATING WEEKLY TOTAL ===');
  
  // Add up all daily fares
  let weeklyTotalBeforeCap = 0;
  for (const day of dailyResults) {
    weeklyTotalBeforeCap += day.fare;
  }
  console.log('Weekly total before cap:', weeklyTotalBeforeCap);

  // Find the farthest zone traveled during the entire week
  let farthestZoneThisWeek = '1-1'; 
  for (const day of dailyResults) {
    if (day.zone === '1-2') {
      farthestZoneThisWeek = '1-2'; 
      break; 
    } else if (day.zone === '2-2' && farthestZoneThisWeek !== '1-2') {
      farthestZoneThisWeek = '2-2'; 
    }
  }
  console.log('Farthest zone this week:', farthestZoneThisWeek);
  
  // Get the weekly cap for that zone
  const weeklyCap = getWeeklyCap(farthestZoneThisWeek);
  console.log('Weekly cap for', farthestZoneThisWeek + ':', weeklyCap);

  // Apply weekly cap - don't charge more than the weekly cap
  const finalWeeklyFare = Math.min(weeklyTotalBeforeCap, weeklyCap);
  console.log('Final weekly fare:', finalWeeklyFare);

  return finalWeeklyFare;
}

export const FareCalculator = {
  calculateTotalFare
};