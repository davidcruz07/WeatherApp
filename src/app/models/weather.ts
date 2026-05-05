export interface CurrentWeather {
  name: string;            
  main: {
    temp: number;           
    feels_like: number;     
    humidity: number;   
  };
  weather: {
    description: string;    
    icon: string;          
  }[];
  sys:{
    country: string;     
  }
}

export interface Forecast {
  list: ForecastItem[];
}

export interface ForecastItem {
  dt_txt: string;          
  main: {
    temp: number;
  };
  weather: {
    icon: string;
    description: string;
  }[];
}

export interface WeatherState {
  loading: boolean;
  error: string | null;
  current: CurrentWeather | null;
  forecast: ForecastItem[] | null;
  history: string[];
}