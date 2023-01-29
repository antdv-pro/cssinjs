import { shallowRef, watchEffect } from 'vue'
import type { ComputedRef } from 'vue'
export declare type ComputedGetter<T> = (...args: any[]) => T
export default function eagerComputed<T>(fn: ComputedGetter<T>) {
  const result = shallowRef<T>()
  watchEffect(
    () => {
      result.value = fn()
      console.log('watchEffect', result)
    },
    {
      flush: 'sync', // needed so updates are immediate.
    },
  )

  return result as any as ComputedRef<T>
}