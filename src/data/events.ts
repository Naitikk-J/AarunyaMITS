
export interface Event {
  id: string;
  title: string;
  description: string;
  building: string;
  date: string;
  time: string;
  status: 'upcoming' | 'featured' | 'registration' | 'past';
  tags: string[];
  image: string;
}

export const events: Event[] = [
  {
    id: 'event-1',
    title: 'Opening Ceremony',
    description: 'Kick off Aarunya 2024 with a grand opening ceremony featuring special guests and performances.',
    building: 'Main_Stage',
    date: '2024-10-26',
    time: '10:00 AM',
    status: 'featured',
    tags: ['LIVE', 'SHOW', 'MAIN EVENT'],
    image: '/events/opening-ceremony.jpg',
  },
  {
    id: 'event-2',
    title: "Hackathon 'Codefest'",
    description: 'A 24-hour hackathon where you can build innovative solutions and win exciting prizes.',
    building: 'Tech_Park',
    date: '2024-10-26',
    time: '12:00 PM',
    status: 'registration',
    tags: ['TECH', 'BUILD', 'COMPETITION'],
    image: '/events/hackathon.jpg',
  },
  {
    id: 'event-3',
    title: 'Live Concert ft. [Artist Name]',
    description: 'An electrifying live concert by a surprise artist that will make you dance the night away.',
    building: 'Main_Stage',
    date: '2024-10-27',
    time: '08:00 PM',
    status: 'upcoming',
    tags: ['LIVE', 'MUSIC', 'SHOW'],
    image: '/events/concert.jpg',
  },
  {
    id: 'event-4',
    title: 'AI & Machine Learning Workshop',
    description: 'A hands-on workshop on the latest AI and Machine Learning technologies, led by industry experts.',
    building: 'Tech_Park',
    date: '2024-10-27',
    time: '02:00 PM',
    status: 'registration',
    tags: ['TECH', 'WORKSHOP', 'LEARN'],
    image: '/events/ai-workshop.jpg',
  },
  {
    id: 'event-5',
    title: 'Street Dance Battle',
    description: 'Witness the best dancers from around the country battle it out for the ultimate title.',
    building: 'Cultural_Plaza',
    date: '2024-10-26',
    time: '04:00 PM',
    status: 'upcoming',
    tags: ['CULTURAL', 'DANCE', 'COMPETITION'],
    image: '/events/dance-battle.jpg',
  },
  {
    id: 'event-6',
    title: 'Indie Film Showcase',
    description: 'A showcase of the best independent films from emerging filmmakers.',
    building: 'Cultural_Plaza',
    date: '2024-10-27',
    time: '11:00 AM',
    status: 'upcoming',
    tags: ['CULTURAL', 'FILM', 'ART'],
    image: '/events/film-showcase.jpg',
  },
];
