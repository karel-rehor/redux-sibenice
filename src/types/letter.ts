export interface letter{
    char: number,
    lit: string,
    altChars: number[],
    used: boolean
}

export interface letterArrayFromString{
    (source: string) : letter[]
}

export interface letterArrayGetter{
    () : letter[]
}

export interface letterGetter{
    () : letter
}
