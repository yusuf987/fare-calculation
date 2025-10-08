
export function isPeakTime(date: Date): boolean {
  const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const totalMinutes = hours * 60 + minutes;

  // WEEKDAYS (Monday to Friday)
  if (dayOfWeek >= 1 && dayOfWeek <= 5) {
    // Morning peak: 7:00 AM to 10:30 AM
    const isMorningPeak = totalMinutes >= 420 && totalMinutes <= 630;
    // Evening peak: 5:00 PM to 8:00 PM  
    const isEveningPeak = totalMinutes >= 1020 && totalMinutes <= 1200;
    
    return isMorningPeak || isEveningPeak;
  }
  // WEEKENDS (Saturday and Sunday)
  else {
    // Morning peak: 9:00 AM to 11:00 AM
    const isMorningPeak = totalMinutes >= 540 && totalMinutes <= 660;
    // Evening peak: 6:00 PM to 10:00 PM
    const isEveningPeak = totalMinutes >= 1080 && totalMinutes <= 1320;
    
    return isMorningPeak || isEveningPeak;
  }
}