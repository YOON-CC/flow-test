import { useCallback, useState, useRef, useEffect } from 'react'
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Background,
  BackgroundVariant,
  ReactFlowProvider,
  useReactFlow,
} from 'reactflow'
import type { Node, Edge, Connection, NodeProps } from 'reactflow'
import 'reactflow/dist/style.css'
import { ResearchNode } from './nodes/ResearchNode'
import { DesignNode } from './nodes/DesignNode'
import { ImageGenerationNode } from './nodes/ImageGenerationNode'
import { ImageResultNode } from './nodes/ImageResultNode'
import { SkeletonNode } from './nodes/SkeletonNode'
import { nodeTemplates, type NodeTemplateType } from './nodes/nodeTemplates'

const nodeTypes = {
  research: (props: NodeProps) => <ResearchNode {...props} id={props.id} />,
  design: (props: NodeProps) => <DesignNode {...props} id={props.id} />,
  imageGeneration: (props: NodeProps) => <ImageGenerationNode {...props} id={props.id} />,
  imageResult: (props: NodeProps) => <ImageResultNode {...props} id={props.id} />,
  skeleton: (props: NodeProps) => <SkeletonNode {...props} id={props.id} />,
}

const initialNodes: Node[] = []

const initialEdges: Edge[] = []

function FlowContent() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [isGenerating, setIsGenerating] = useState(false)
  const timeoutRefs = useRef<ReturnType<typeof setTimeout>[]>([])
  const { fitView } = useReactFlow()

  // 노드가 변경될 때마다 fitView 호출
  useEffect(() => {
    if (nodes.length > 0) {
      setTimeout(() => {
        fitView({ padding: 0.2, duration: 300 })
      }, 100)
    }
  }, [nodes.length, fitView])

  const onConnect = useCallback(
    (params: Connection) => {
      const newEdge = {
        ...params,
        style: { stroke: '#a78bfa', strokeWidth: 2 },
        animated: false,
      }
      setEdges((eds) => addEdge(newEdge, eds))
    },
    [setEdges]
  )

  const handleAddNode = useCallback((templateType: NodeTemplateType) => {
    const template = nodeTemplates.find(t => t.type === templateType)
    if (!template) return

    // 노드 타입에 따른 x 좌표 설정
    const xPositions: Record<NodeTemplateType, number> = {
      research: 100,
      design: 1000,
      imageGeneration: 1900,
      imageResult: 2300,
    }

    // 같은 타입의 노드 개수 확인하여 y 좌표 조정
    const sameTypeNodes = nodes.filter(node => node.type === templateType)
    const baseY = (window.innerHeight / 2) - 200
    const yOffset = sameTypeNodes.length * 800 // 각 노드마다 400px씩 아래로

    const position = {
      x: xPositions[templateType] || (window.innerWidth / 2) - 335,
      y: baseY + yOffset,
    }
    
    const newNode = template.createNode(position)
    setNodes((nds) => {
      const updatedNodes = [...nds, newNode]
      // 노드 추가 후 fitView 호출
      setTimeout(() => {
        fitView({ padding: 0.2, duration: 300 })
      }, 50)
      return updatedNodes
    })
    return newNode.id
  }, [setNodes, nodes, fitView])

  const handleAgentClick = useCallback(() => {
    if (isGenerating) return
    
    setIsGenerating(true)
    const nodeSequence: NodeTemplateType[] = ['research', 'design', 'imageGeneration', 'imageResult']
    const nodeLabels = {
      research: '리서치 생성 중...',
      design: '디자인 생성 중...',
      imageGeneration: '이미지 생성 중...',
      imageResult: '결과 생성 중...',
    }
    
    const xPositions: Record<NodeTemplateType, number> = {
      research: 100,
      design: 1000,
      imageGeneration: 1900,
      imageResult: 2300,
    }
    
    const baseY = (window.innerHeight / 2) - 200
    let previousNodeId: string | null = null
    let previousNodeData: any = null
    let skeletonNodeId: string | null = null

    nodeSequence.forEach((nodeType, index) => {
      const timeout = setTimeout(() => {
        // 스켈레톤 노드 제거
        if (skeletonNodeId) {
          setNodes((nds) => nds.filter(n => n.id !== skeletonNodeId))
        }

        // 실제 노드 생성
        const template = nodeTemplates.find(t => t.type === nodeType)
        if (!template) return

        const position = {
          x: xPositions[nodeType],
          y: baseY,
        }
        
        let newNode = template.createNode(position)
        
        // 이전 노드 데이터를 기반으로 새 노드 데이터 업데이트
        if (previousNodeData && previousNodeId) {
          // 노드 타입별 데이터 전달 로직
          if (nodeType === 'design' && previousNodeData.type === 'research') {
            // 리서치 → 디자인: 리서치 결과를 디자인에 반영
            const researchItems = previousNodeData.data.items || []
            const insights = researchItems.find((item: string) => item.includes('인사이트'))
            const keywords = researchItems.find((item: string) => item.includes('키워드'))
            
            newNode.data = {
              ...newNode.data,
              title: '리서치 기반 디자인 매핑',
              items: [
                insights || '인사이트: 리서치 결과를 기반으로 한 디자인 방향성',
                '디자인 방향: 단일 소재 중심의 정직한 표현',
                keywords || '관련 키워드: 단일 소재(Mono-material), 정직한, 심리스 (Seamless)',
              ],
            }
            
          } else if (nodeType === 'imageGeneration' && previousNodeData.type === 'design') {
            // 디자인 → 이미지 생성: 디자인 결과를 프롬프트로 변환
            const designItems = previousNodeData.data.items || []
            const designText = designItems.map((item: string | { label: string; text: string }) => {
              if (typeof item === 'string') {
                return item.split(':')[1]?.trim() || item
              }
              return (item as { label: string; text: string }).text || (item as { label: string; text: string }).label
            }).join(', ')
            
            const enhancedPrompt = `Industrial design of a premium sustainable product, ${designText}, monolithic seamless form, matte finish, professional product photography, soft studio lighting, high-end minimalist aesthetic, 8k resolution, photorealistic.`
            
            newNode.data = {
              ...newNode.data,
              prompt: enhancedPrompt,
            }
            
          } else if (nodeType === 'imageResult' && previousNodeData.type === 'imageGeneration') {
            // 이미지 생성 → 결과: 생성된 이미지 정보를 결과에 반영
            const prompt = previousNodeData.data.prompt || ''
            const generationDate = new Date().toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
            
            newNode.data = {
              ...newNode.data,
              title: '디자인 결과',
              prompt: prompt,
              generationDate: generationDate,
              imageUrl: `https://picsum.photos/320/400?random=${Date.now()}`, // 더미 이미지 URL
            }
          }
        }
        
        setNodes((nds) => {
          const updatedNodes = [...nds, newNode]
          // 노드 추가 후 fitView 호출
          setTimeout(() => {
            fitView({ padding: 0.2, duration: 300 })
          }, 50)
          return updatedNodes
        })

        // 이전 노드와 연결
        if (previousNodeId) {
          const newEdge: Edge = {
            id: `edge-${previousNodeId}-${newNode.id}`,
            source: previousNodeId,
            target: newNode.id,
            style: { stroke: '#a78bfa', strokeWidth: 2 },
            animated: false,
          }
          setEdges((eds) => [...eds, newEdge])
        }

        // 이전 노드 정보 업데이트
        previousNodeId = newNode.id
        previousNodeData = {
          id: newNode.id,
          type: nodeType,
          data: newNode.data,
        }

        // 다음 노드가 있으면 스켈레톤 노드 생성
        if (index < nodeSequence.length - 1) {
          const nextNodeType = nodeSequence[index + 1]
          const skeletonPosition = {
            x: xPositions[nextNodeType],
            y: baseY,
          }
          
          skeletonNodeId = `skeleton-${Date.now()}`
          const skeletonNode: Node = {
            id: skeletonNodeId,
            type: 'skeleton',
            position: skeletonPosition,
            data: { label: nodeLabels[nextNodeType] },
            style: { width: 360 },
          }
          setNodes((nds) => [...nds, skeletonNode])
        } else {
          // 마지막 노드 생성 완료
          setIsGenerating(false)
          // 최종 fitView 호출
          setTimeout(() => {
            fitView({ padding: 0.2, duration: 300 })
          }, 100)
        }
      }, (index + 1) * 2000) // 2초 간격

      timeoutRefs.current.push(timeout)
    })
  }, [isGenerating, setNodes, setEdges, fitView])

  return (
    <>
      <div className="flex-1 relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          minZoom={0.1}
          maxZoom={2}
          defaultEdgeOptions={{
            style: { stroke: '#a78bfa', strokeWidth: 2 },
            animated: false,
          }}
        >
          <Background variant={BackgroundVariant.Dots} gap={20} size={1} />
        </ReactFlow>
      </div>
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-10">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 px-4 py-3">
          <div className="flex items-center gap-4">
            {/* 왼쪽: 에이전트 버튼 */}
            <button 
              onClick={handleAgentClick}
              disabled={isGenerating}
              className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-b from-blue-500 to-blue-600 text-white rounded-lg font-medium transition-all ${
                isGenerating 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:from-blue-600 hover:to-blue-700'
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 2L9.5 6H14L10.5 8.5L12 13L8 10.5L4 13L5.5 8.5L2 6H6.5L8 2Z" fill="white"/>
                <path d="M6 4L6.5 5.5H4L5.5 7L5 8.5L8 7L11 8.5L10.5 7L12 5.5H9.5L10 4L8 5.5L6 4Z" fill="white" opacity="0.8"/>
              </svg>
              <span>{isGenerating ? '생성 중...' : '에이전트'}</span>
            </button>
            
            {/* 중간: 노드 추가 버튼들 */}
            <div className="flex items-center gap-2">
              {nodeTemplates.map((template) => (
                <button
                  key={template.type}
                  onClick={() => handleAddNode(template.type)}
                  className="flex items-center gap-1.5 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-100 hover:border-gray-300 transition-all"
                  title={template.label}
                >
                  <span className="text-base">{template.icon}</span>
                  <span>{template.label}</span>
        </button>
              ))}
            </div>
            
          </div>
        </div>
      </div>
    </>
  )
}

function App() {
  return (
    <div className="w-full h-screen bg-gray-100 flex flex-col">
      <ReactFlowProvider>
        <FlowContent />
      </ReactFlowProvider>
    </div>
  )
}

export default App
