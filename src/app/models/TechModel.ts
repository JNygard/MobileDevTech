export interface TechModel2 {
  id: number;
  catId: number;
  difficulty: number;
  popularity: number;
  name: string;
  releaseYear: number;
  webSite: string;
  video: string;
  shortIntro: string;
  description: string;
}

export interface TechModel {
  id: number;
  sectId: number;
  catId: number;
  title: string;
  releaseYear: number;
  documentation: string;
  webSite: string;
  license: string;
  languages: string;
  developmentPlatforms: string;
  targetPlatforms: string;
  developer: string;
  price: string;
  pros: string;
  cons: string;
  learnMore: string;
  video: string;
  shortIntro: string;
  description: string;
}

export namespace TechModel {
  export enum Filter {
    SHOW_ALL = 'all',
    SHOW_UNAVAILABLE = 'available',
    SHOW_AVAILABLE = 'unavailable'
  }
}
