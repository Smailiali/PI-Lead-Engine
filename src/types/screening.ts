export type CaseViability = 'Strong' | 'Moderate' | 'Weak'
export type CaseUrgency = 'High' | 'Medium' | 'Low'

export interface AIScreeningResult {
  score: number        // 1-10
  caseType: string     // "Motor Vehicle Accident", "Slip and Fall", etc.
  viability: CaseViability
  valueRange: string   // "$50K-$150K", "$150K-$500K", etc.
  urgency: CaseUrgency
  redFlags: string[]   // array of concerns
  recommendation: string
}
