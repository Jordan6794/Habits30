export interface Habit {
    name: string;
    _id: string;
    colors: Array<string>;
    successCounter: number;
    failCounter: number;
    previousArrays: Array<Array<string>>
    shouldSwitchCollection: boolean
    didChange: boolean
}

