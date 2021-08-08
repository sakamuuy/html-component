export declare namespace nyaan {
  type Properties<T extends keyof HTMLElementTagNameMap> = {
    [K in keyof HTMLElementTagNameMap[T]]?: HTMLElementTagNameMap[T][K]
  }

  export type HTMLObj<T extends keyof HTMLElementTagNameMap> = {
    tagName: keyof HTMLElementTagNameMap
    attributes: Properties<T>
    children: Array<HTMLObj<keyof HTMLElementTagNameMap>>
    content: string[]
    isRoot: boolean
  }
}
