export interface AboutPillar {
  icon: string;
  title: string;
  description: string;
}

export interface AboutData {
  _comment?: string;
  title: string;
  subtitle: string;
  paragraphs: string[];
  pillars: AboutPillar[];
}
