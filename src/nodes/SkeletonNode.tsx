import { Handle, Position } from 'reactflow'
import type { NodeProps } from 'reactflow'

export const SkeletonNode = ({ data }: NodeProps) => {
  const label = data?.label || '생성 중...'
  
  return (
    <>
      <div className="relative w-[670px]">
        <div className="relative w-fit rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 animate-pulse">
          <div className="py-5 px-6">
            <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="text-sm text-gray-500 font-medium">{label}</div>
          </div>
          <Handle 
            type="target" 
            position={Position.Left} 
            style={{ left: -10 }}
            className="w-2.5 h-2.5 rounded-full border-2 border-white opacity-80 bg-gray-400"
          />
          <Handle 
            type="source" 
            position={Position.Right} 
            style={{ right: -10 }}
            className="w-2.5 h-2.5 rounded-full border-2 border-white opacity-80 bg-gray-400"
          />
        </div>
      </div>
    </>
  )
}
