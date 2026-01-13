import { Handle, Position } from 'reactflow'
import type { NodeProps } from 'reactflow'

export const DesignNode = ({ data }: NodeProps) => {
  return (
    <>
      <div className="w-[670px] flex justify-between items-center mb-3 pb-3">
        <div className="text-sm font-semibold text-gray-900 bg-yellow-100 py-3 px-5 rounded-lg border border-yellow-500">
          본질적 순환(Essential Loop)을 위한 CMF 중심 매핑
        </div>
        <div className="flex gap-1">
          <button className="py-1.5 px-3 bg-white border border-gray-200 rounded-md text-xs text-gray-700 cursor-pointer transition-all duration-200 font-medium hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900">
            디자인매핑
          </button>
          <button className="py-1.5 px-3 bg-white border border-gray-200 rounded-md text-xs text-gray-700 cursor-pointer transition-all duration-200 font-medium hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900">
            이미지 생성하기
          </button>
        </div>
      </div>
      <div className="relative w-[670px]">
        <div className="relative w-fit rounded-2xl border border-yellow-300">
          <div className="py-5 px-6 rounded-t-2xl bg-yellow-50">
            <div className="text-base font-bold leading-tight tracking-tight text-gray-900">{data.title}</div>
            {data.subtitle && <div className="text-xs text-gray-500 font-normal mt-1">{data.subtitle}</div>}
          </div>
          <div className="py-5 px-6 rounded-b-2xl bg-yellow-50">
            <div className="grid grid-cols-2 gap-3">
              {data.items?.map((item: string | { label: string; text: string }, index: number) => {
                const label = typeof item === 'string' ? item.split(':')[0] : item.label;
                const text = typeof item === 'string' ? item.split(':').slice(1).join(':').trim() : item.text;
                return (
                  <div key={index} className="bg-gray-100 p-4 rounded-md h-fit">
                    <span className="font-bold text-gray-900 mb-1.5 text-sm block">{label}:</span>
                    <div className="bg-white p-4 rounded-md mt-2 w-[270px] h-[300px]">
                      {text && <span className="font-normal text-gray-700 flex-1 text-sm leading-relaxed"> {text}</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <Handle 
            type="target" 
            position={Position.Left} 
            style={{ left: -10 }}
            className="w-2.5 h-2.5 rounded-full border-2 border-white opacity-80 bg-purple-600 hover:bg-purple-500 hover:opacity-100 hover:scale-110 transition-all"
          />
          <Handle 
            type="source" 
            position={Position.Right} 
            style={{ right: -10 }}
            className="w-2.5 h-2.5 rounded-full border-2 border-white opacity-80 bg-purple-600 hover:bg-purple-500 hover:opacity-100 hover:scale-110 transition-all"
          />
        </div>
      </div>
    </>
  )
}
