
export const FARE_RULES = {
  '1-1': { peak: 30, offPeak: 25 },   
  '1-2': { peak: 35, offPeak: 30 },  
  '2-2': { peak: 25, offPeak: 20 }   
};

export const CAPPING_RULES = {
  daily: {
    '1-1': 100,  
    '1-2': 120,  
    '2-2': 80    
  },
  weekly: {
    '1-1': 500, 
    '1-2': 600,    
    '2-2': 400  
  }
};