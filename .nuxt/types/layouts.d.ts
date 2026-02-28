import type { ComputedRef, MaybeRef } from 'vue'
export type LayoutKey = string
declare module "../../node_modules/.pnpm/nuxt@3.13.0_@parcel+watcher@2.5.1_db0@0.3.4_ioredis@5.8.2_magicast@0.5.1_rollup@4.53.3__0df823d7d16462a0ba1e8885697e9aa8/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: MaybeRef<LayoutKey | false> | ComputedRef<LayoutKey | false>
  }
}