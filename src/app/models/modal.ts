import { Person } from "./person";

export interface Modal {
    modal: string;
    button: string;
    person?: Person;
}
