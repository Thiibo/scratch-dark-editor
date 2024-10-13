type StringKeyValueObject = {[name: string]: string}
type Theme = {
    path: string,
    id: string,
    name: string,
    content: string
}

type UserConfigDropdownSettings = {
    [id: string]: {
        title: string,
        type: "dropdown" | "image",
        options: {
            [id: string]: {
                title: string,
                content: string
            }
        },
        default: string
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
