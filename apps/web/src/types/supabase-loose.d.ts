declare module "@/utils/supabase/server" {
  export function createClient(): Promise<any>;
}

declare module "@/utils/supabase/client" {
  export function createClient(): any;
}

export {};
