export const gtag = (...args: any[]) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag(...args)
  }
}
