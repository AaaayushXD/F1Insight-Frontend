export interface MRData {
  MRData: {
    xmlns: string
    series: string
    url: string
    limit: string
    offset: string
    total: string
    RaceTable?: {
      season: string
      Races: Race[]
    }
    DriverTable?: {
      season: string
      Drivers: Driver[]
    }
    ConstructorTable?: {
      season: string
      Constructors: Constructor[]
    }
    CircuitTable?: {
      season: string
      circuitId?: string
      Circuits: Circuit[]
    }
    StandingsTable?: {
      season: string
      StandingsLists: StandingsList[]
    }
  }
}

export interface Race {
  season: string
  round: string
  url: string
  raceName: string
  Circuit: Circuit
  date: string
  time: string
  FirstPractice?: Session
  SecondPractice?: Session
  ThirdPractice?: Session
  Qualifying?: Session
  Sprint?: Session
  Results?: RaceResult[]
}

export interface Session {
  date: string
  time: string
}

export interface Circuit {
  circuitId: string
  url: string
  circuitName: string
  Location: Location
}

export interface Location {
  lat: string
  long: string
  locality: string
  country: string
}

export interface Driver {
  driverId: string
  permanentNumber: string
  code: string
  url: string
  givenName: string
  familyName: string
  dateOfBirth: string
  nationality: string
}

export interface Constructor {
  constructorId: string
  url: string
  name: string
  nationality: string
}

export interface RaceResult {
  number: string
  position: string
  positionText: string
  points: string
  Driver: Driver
  Constructor: Constructor
  grid: string
  laps: string
  status: string
  Time?: {
    millis: string
    time: string
  }
  FastestLap?: {
    rank: string
    lap: string
    Time: {
      time: string
    }
    AverageSpeed: {
      units: string
      speed: string
    }
  }
}

export interface StandingsList {
  season: string
  round: string
  DriverStandings?: DriverStanding[]
  ConstructorStandings?: ConstructorStanding[]
}

export interface DriverStanding {
  position: string
  positionText: string
  points: string
  wins: string
  Driver: Driver
  Constructors: Constructor[]
}

export interface ConstructorStanding {
  position: string
  positionText: string
  points: string
  wins: string
  Constructor: Constructor
}
