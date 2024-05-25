import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div style={{width: '100vw', display: 'flex', justifyContent: 'center'}}>
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
    </div>
  )
}
