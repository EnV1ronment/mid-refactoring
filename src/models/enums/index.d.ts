type enums<T> = Array<T & {title: string, value: string}>;
type defaultEnums = enums<{}>;