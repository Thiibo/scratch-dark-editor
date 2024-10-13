type StringKeyValueObject = {[name: string]: string}
type Theme = {
    path: string,
    id: string,
    name: string,
    content: string
}

type UserConfigDropdownSetting = {
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
type UserConfigColorSetting = {
    title: string,
    type: "color",
    default: string
}

type UserConfigSettings = {
    [key: string]: UserConfigDropdownSetting | UserConfigColorSetting
}
