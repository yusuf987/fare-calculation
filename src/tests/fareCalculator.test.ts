import { describe, it, expect } from 'vitest';
import { Journey } from '../entities/Journey.js';
import { calculateTotalFare } from '../services/FareCalculator.js';

describe('FareCalculator', () => {

  describe('Single journey fares', () => {
    it('should calculate peak fare for 1-1 journey', () => {
      const journey = new Journey(new Date('2024-01-15T08:30:00'), 1, 1);
      const fare = calculateTotalFare([journey]);
      expect(fare).toBe(30);
    });

    it('should calculate off-peak fare for 1-2 journey', () => {
      const journey = new Journey(new Date('2024-01-15T12:00:00'), 1, 2);
      const fare = calculateTotalFare([journey]);
      expect(fare).toBe(30);
    });

    it('should handle zone 2-1 same as 1-2', () => {
      const journey1 = new Journey(new Date('2024-01-15T08:30:00'), 1, 2);
      const journey2 = new Journey(new Date('2024-01-15T08:30:00'), 2, 1);
      const fare1 = calculateTotalFare([journey1]);
      const fare2 = calculateTotalFare([journey2]);
      expect(fare1).toBe(fare2);
    });
  });

  describe('Daily capping', () => {
    it('should apply daily cap for zone 1-2', () => {
      const journeys = [
        new Journey(new Date('2024-01-15T08:30:00'), 1, 2), 
        new Journey(new Date('2024-01-15T09:00:00'), 1, 2), 
        new Journey(new Date('2024-01-15T10:00:00'), 1, 2), 
        new Journey(new Date('2024-01-15T11:00:00'), 1, 2), 
      ];
      
      const fare = calculateTotalFare(journeys);
      expect(fare).toBe(120); 
    });

    it('should use farthest zone for daily cap', () => {
      const journeys = [
        new Journey(new Date('2024-01-15T08:00:00'), 1, 1), 
        new Journey(new Date('2024-01-15T09:00:00'), 1, 1), 
        new Journey(new Date('2024-01-15T10:00:00'), 1, 2), 
        new Journey(new Date('2024-01-15T11:00:00'), 1, 1), 
      ];
      
      const fare = calculateTotalFare(journeys);
      expect(fare).toBe(120); 
    });
  });

  describe('Weekly capping', () => {
    it('should apply weekly cap across multiple days', () => {
      const journeys = [
        // Monday
        new Journey(new Date('2024-01-15T08:00:00'), 1, 2),
        new Journey(new Date('2024-01-15T09:00:00'), 1, 2),
        new Journey(new Date('2024-01-15T10:00:00'), 1, 2),
        new Journey(new Date('2024-01-15T17:00:00'), 1, 2),
        new Journey(new Date('2024-01-15T18:00:00'), 1, 2),
        
        // Tuesday
        new Journey(new Date('2024-01-16T08:00:00'), 1, 2),
        new Journey(new Date('2024-01-16T09:00:00'), 1, 2),
        new Journey(new Date('2024-01-16T10:00:00'), 1, 2),
        new Journey(new Date('2024-01-16T17:00:00'), 1, 2),
        new Journey(new Date('2024-01-16T18:00:00'), 1, 2),
        
        // Wednesday
        new Journey(new Date('2024-01-17T08:00:00'), 1, 2),
        new Journey(new Date('2024-01-17T09:00:00'), 1, 2),
        new Journey(new Date('2024-01-17T10:00:00'), 1, 2),
        new Journey(new Date('2024-01-17T17:00:00'), 1, 2),
        new Journey(new Date('2024-01-17T18:00:00'), 1, 2),
        
        // Thursday
        new Journey(new Date('2024-01-18T08:00:00'), 1, 2),
        new Journey(new Date('2024-01-18T09:00:00'), 1, 2),
        new Journey(new Date('2024-01-18T10:00:00'), 1, 2),
        new Journey(new Date('2024-01-18T17:00:00'), 1, 2),
        new Journey(new Date('2024-01-18T18:00:00'), 1, 2),
        
        // Friday
        new Journey(new Date('2024-01-19T08:00:00'), 1, 2),
        new Journey(new Date('2024-01-19T09:00:00'), 1, 2),
        new Journey(new Date('2024-01-19T10:00:00'), 1, 2),
        new Journey(new Date('2024-01-19T17:00:00'), 1, 2),
        new Journey(new Date('2024-01-19T18:00:00'), 1, 2),
        
        // Saturday
        new Journey(new Date('2024-01-20T10:00:00'), 1, 2),
      ];
      
      const fare = calculateTotalFare(journeys);
      expect(fare).toBe(600);
    });
  });

  describe('Edge cases', () => {
    it('should return 0 for empty journey list', () => {
      const fare = calculateTotalFare([]);
      expect(fare).toBe(0);
    });

    it('should handle weekend peak hours correctly', () => {
      const saturdayPeak = new Journey(new Date('2024-01-13T10:00:00'), 1, 2); // Saturday 10:00
      const sundayOffPeak = new Journey(new Date('2024-01-14T12:00:00'), 1, 2); // Sunday 12:00
      
      const peakFare = calculateTotalFare([saturdayPeak]);
      const offPeakFare = calculateTotalFare([sundayOffPeak]);
      
      expect(peakFare).toBe(35);
      expect(offPeakFare).toBe(30);
    });
  });
});