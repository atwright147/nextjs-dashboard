type Gender = 'Male' | 'Female';

export interface Safety {
  date: string;
  injuryLocation: string;
  gender: Gender;
  ageGroup: string;
  incidentType: string;
  daysLost: number;
  plant: string;
  reportType: string;
  shift: string;
  department: string;
  incidentCost: number;
  day: string;
  month: number;
  year: number;
}
