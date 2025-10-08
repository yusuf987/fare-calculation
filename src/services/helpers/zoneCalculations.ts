import { Journey } from '../../entities/Journey.js';

export function groupJourneysByDay(journeys: Journey[]): Record<string, Journey[]> {
  const groups: Record<string, Journey[]> = {};

  for (const journey of journeys) {
    
    const dateString = journey.dateTime.toISOString().split('T')[0];
    
    // Create array for this date if it doesn't exist
    if (!groups[dateString]) {
      groups[dateString] = [];
    }
    
    // Add journey to this date's group
    groups[dateString].push(journey);
  }

  return groups;
}


export function findFarthestZone(journeys: Journey[]): string {
  let hasZone1To2 = false;
  let hasZone2To2 = false;

  // Check what zones were traveled
  for (const journey of journeys) {
    const zone = journey.getZoneKey();
    
    if (zone === '1-2') {
      hasZone1To2 = true;
    } else if (zone === '2-2') {
      hasZone2To2 = true;
    }
  }

  if (hasZone1To2) {
    return '1-2';
  } else if (hasZone2To2) {
    return '2-2';
  } else {
    return '1-1';
  }
}