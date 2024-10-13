type StringKeyValueObject = {[name: string]: string}
type Theme = {
    path: string,
    id: string,
    name: string,
    content: string
}

type UserConfigDropdownOptions = {
    [id: string]: {
        title: string,
        content: string
    }
}
type UserConfigDropdownSettings<T = UserConfigDropdownOptions> = {
    [id: string]: {
        title: string,
        type: "dropdown" | "image",
        options: T,
        default: keyof T
    }
}
type UserConfigColorSettings = {
    [id: string]: {
        title: string,
        type: "color",
        default: string
    }
}

type UserConfigSettings = UserConfigDropdownSettings | UserConfigColorSettings
