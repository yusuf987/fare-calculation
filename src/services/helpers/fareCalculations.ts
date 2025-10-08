import { Journey } from '../../entities/Journey.js';
import { FARE_RULES, CAPPING_RULES } from '../../constants/fareRules.js';
import { isPeakTime } from './timeCalculations.js';


export function calculateSingleJourneyFare(journey: Journey): number {
  const zoneKey = journey.getZoneKey();
  
  const fareRule = FARE_RULES[zoneKey];
  if (!fareRule) {
    throw new Error(`ERROR: No fare rule found for zone ${zoneKey}`);
  }
  
  if (isPeakTime(journey.dateTime)) {
    return fareRule.peak;
  } else {
    return fareRule.offPeak;
  }
}


export function getDailyCap(zone: string): number {
  const cap = CAPPING_RULES.daily[zone];
  if (cap === undefined) {
    throw new Error(`ERROR: No daily cap found for zone ${zone}`);
  }
  return cap;
}


export function getWeeklyCap(zone: string): number {
  const cap = CAPPING_RULES.weekly[zone];
  if (cap === undefined) {
    throw new Error(`ERROR: No weekly cap found for zone ${zone}`);
  }
  return cap;
}