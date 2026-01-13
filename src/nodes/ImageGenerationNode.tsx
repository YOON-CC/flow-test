import { Handle, Position } from 'reactflow'
import type { NodeProps } from 'reactflow'

export const ImageGenerationNode = ({ data }: NodeProps) => {
  return (
    <>
      <div className="relative w-[300px]">
        <div className="relative w-fit rounded-2xl border border-gray-300 bg-white">
          {/* 프롬프트 입력 영역 */}
          <h1 className="pt-4 px-6">이미지 생성 정보 입력</h1>

          <div className="py-5 px-6">
            <textarea
              className="w-full h-64 bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-gray-300"
              placeholder="이미지 생성 프롬프트를 입력하세요..."
              defaultValue={data.prompt || "Industrial design of a premium sustainable tumbler, monolithic seamless cylindrical form, made of matte sand-blasted recycled stainless steel in muted sand beige color, 45-degree professional product photography, soft studio lighting, high-end minimalist aesthetic, 8k resolution, photorealistic."}
            />
          </div>
          
          {/* 이미지 썸네일 영역 */}
          <div className="px-6 pb-4">
            <div className="flex gap-3 flex-wrap">
              {data.images && data.images.length > 0 ? (
                data.images.map((_img: string, index: number) => (
                  <div key={index} className="relative w-20 h-20 bg-gray-100 rounded-lg border border-gray-200 overflow-hidden group">
                    <div className="w-full h-full bg-gradient-to-br from-orange-200 to-orange-300 flex items-center justify-center">
                      <span className="text-xs text-gray-600">Image {index + 1}</span>
                    </div>
                    <button className="absolute top-1 right-1 w-5 h-5 bg-gray-800 bg-opacity-70 text-white rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                      ×
                    </button>
                  </div>
                ))
              ) : (
                <>
                  <div className="relative w-6 h-6 bg-gradient-to-br from-orange-200 to-orange-300 rounded-lg border border-gray-200 overflow-hidden group">

                  </div>
                  <div className="relative w-6 h-6 bg-gray-200 rounded-lg border border-gray-200 overflow-hidden group">
 
                  </div>

                </>
              )}
            </div>
          </div>
          
          {/* 하단 버튼 영역 */}
          <div className="px-6 pb-5 flex items-center gap-3">
            <button className="w-10 h-10 bg-gray-100 border border-gray-200 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-all">
              <span className="text-lg">+</span>
            </button>
            <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 flex items-center gap-1 cursor-pointer hover:bg-gray-100 transition-all">
              <span>1개</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 4.5l3 3 3-3"/>
              </svg>
            </div>
            <button className="ml-auto px-6 py-2 bg-gray-800 text-white rounded-lg text-sm font-medium hover:bg-gray-900 transition-all">
              생성하기
            </button>
          </div>
          <Handle 
            type="target" 
            position={Position.Left} 
            style={{ left: -10 }}
            className="w-2.5 h-2.5 rounded-full border-2 border-white opacity-80 bg-gray-600 hover:bg-gray-700 hover:opacity-100 hover:scale-110 transition-all"
          />
          <Handle 
            type="source" 
            position={Position.Right} 
            style={{ right: -10 }}
            className="w-2.5 h-2.5 rounded-full border-2 border-white opacity-80 bg-gray-600 hover:bg-gray-700 hover:opacity-100 hover:scale-110 transition-all"
          />
        </div>
      </div>
    </>
  )
}
