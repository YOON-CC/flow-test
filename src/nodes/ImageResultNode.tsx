import { Handle, Position } from 'reactflow'
import type { NodeProps } from 'reactflow'

export const ImageResultNode = ({ data }: NodeProps) => {
  const prompt = data.prompt || "Industrial design of a premium bladeless desk fan, \"The Breathing Column\" concept, slim vertical cylindrical form with a brushed aluminum finish, minimalist control interface on top, soft ambient lighting, professional product photography, studio lighting, high-end minimalist aesthetic, 8k resolution, photorealistic."
  const generationDate = data.generationDate || "9999년 99월 99일"
  const title = data.title || "결과"

  return (
    <>
      <div className="relative w-[800px]">
        <div className="relative w-fit rounded-2xl bg-none ">
          {/* 헤더 */}
          <div className="py-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900 rounded-md bg-[#F0F0F1] border border-[#E0E0E0] px-4 py-2">{title}</h3>
            <button className="w-8 h-8 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-all">
              <span className="text-lg leading-none">+</span>
            </button>
          </div>

          {/* 메인 콘텐츠 - 2열 레이아웃 */}
          <div className="p-6 bg-[#F0F0F1] rounded-md border border-[#E0E0E0]">
            <div className="flex gap-6">
              {/* 왼쪽: 이미지 */}
              <div className="shrink-0">
                <div className="w-[320px] h-[350px] bg-gray-100 rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                  {data.imageUrl ? (
                    <img 
                      src={data.imageUrl} 
                      alt="Generated" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                      <div className="text-center">
                        <svg className="w-16 h-16 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-xs text-gray-500">이미지 미리보기</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* 오른쪽: 이미지 상세 설명 */}
              <div className="flex-1 min-w-0">
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                  <h4 className="text-base font-bold text-gray-900 mb-4">이미지 상세 설명</h4>
                  

                  {/* 생성 정보 */}
                  <div className="mb-4">
                    <h5 className="text-sm font-semibold text-gray-700 mb-3">생성 정보</h5>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>생성 일시: {generationDate}</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>사용된 프롬프트 (디자인 매핑 영역에서 생성된 프롬프트를 그대로 활용한 케이스)</span>
                      </li>
                    </ul>
                  </div>

                  {/* 프롬프트 텍스트 */}
                  <div className="mt-4">
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <p className="text-sm text-gray-700 leading-relaxed line-clamp-6">
                        {prompt}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Handle 
            type="target" 
            position={Position.Left} 
            style={{ left: -10 }}
            className="w-2.5 h-2.5 rounded-full border-2 border-white opacity-80 bg-gray-600 hover:bg-gray-700 hover:opacity-100 hover:scale-110 transition-all"
          />

        </div>
      </div>
    </>
  )
}
