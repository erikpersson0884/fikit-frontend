
export interface Group {
    id: string;
    name: string;
    year: number;
    people: Person[];
}

export interface Person {    
    id: string;
    name: string;
    nickname: string;
    post: string;
    description: string;
    url: string;
    imagePath: string;
}

export interface Post {
    id: string;
    title: string;
    description: string;
    imagePath: string;
}