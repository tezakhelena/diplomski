import { NotificationDescriptions, SelectOption } from "./generic-types"

export const razloziObustave: SelectOption[] = [
    { value: "Nekoliko prijava profila", label: "Nekoliko prijava profila" },
    { value: "Kršenja pravila platforme", label: "Kršenja pravila platforme" },
    { value: "Sigurnosni problemi", label: "Sigurnosni problemi" }
]

export const gender: SelectOption[] = [
    { value: "Ž", label: "Ženka" },
    { value: "M", label: "Mužjak" },
]

export const maturity: SelectOption[] = [
    { value: "O", label: "Odrasli" },
    { value: "M", label: "Mladunče" }
]

export const notifikacijeTypes: NotificationDescriptions[] = [
    { value: 1, label: "Notifikacije za nove komentare na Vašim oglasima", description: "Primajte obavijesti o svakom novom komentaru koji drugi korisnici ostave na vašim oglasima." },
    { value: 2, label: "Notifikacije za oglase koji se podudaraju s Vašim oglasima", description: "Primajte obavijesti o oglasima drugih korisnika koji se podudaraju s vašim oglasima, kako biste lakše pronašli relevantne prilike ili povezali slične objave. Pretraživanje se odvija prema suprotnoj kategoriji životinje, spolu, zrelosti i vrsti životinje." },
    { value: 3, label: "Notifikacije za izgubljene/pronađene ljubimce u Vašem području", description: "Primajte obavijesti o izgubljenim ili pronađenim ljubimcima u vašem području." }
]

export type SortDirection = "ASC" | "DESC";

export const sortOptionsSelect: {
    value: SortDirection;
    label: string;
}[] = [
        { value: "DESC", label: "Najnoviji prvo" },
        { value: "ASC", label: "Najstariji prvo" },
    ];