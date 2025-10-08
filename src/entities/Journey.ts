export function Journey(dateTime: Date, fromZone: number, toZone: number) {
  if (!dateTime || !(dateTime instanceof Date) || isNaN(dateTime.getTime())) {
    throw new Error('Invalid dateTime provided');
  }
  if (typeof fromZone !== 'number' || fromZone < 1 || fromZone > 2) {
    throw new Error('Invalid fromZone provided');
  }
  if (typeof toZone !== 'number' || toZone < 1 || toZone > 2) {
    throw new Error('Invalid toZone provided');
  }

  return {
    dateTime,
    fromZone, 
    toZone,
    
    getZoneKey(): string {
      const min = Math.min(this.fromZone, this.toZone);
      const max = Math.max(this.fromZone, this.toZone);
      return `${min}-${max}`;
    }
  };
}

export type Journey = ReturnType<typeof Journey>;