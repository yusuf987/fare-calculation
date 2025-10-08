import { Journey } from './entities/Journey.js';
import { calculateTotalFare } from './services/FareCalculator.js';
import { readFileSync } from 'fs';

// Read from journeys.json in root directory
const journeyData = JSON.parse(readFileSync('journeys.json', 'utf-8'));

// Convert to Journey objects
const journeys = journeyData.map((data: any) => 
  new Journey(new Date(data.dateTime), data.fromZone, data.toZone)
);

// Calculate and display
const totalFare = calculateTotalFare(journeys);
console.log('Total fare:', totalFare);