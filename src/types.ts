
export interface Group {
    id: string;
    name: string;
    year: number;
    people: Person[];
}

export interface Person {    
    id: string;
    name: string;
    nick: string;
    post: string;
    description: string;
    link: string;
    imageFileName: string;
}

export interface Post {
    id: string;
    title: string;
    description: string;
    imageFileName: string;
}

export interface RecipeT {
    name: string;
    ingredients: Ingredient[];
    instructions?: Instruction[];
}

export interface Ingredient {
    name: string;
    weight: number;
    unit: string;
    density: number;
    packageSize: number | typeof NaN;
}

export interface Instruction {
    step:number;
    description: string;
}