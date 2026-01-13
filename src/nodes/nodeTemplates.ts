import type { Node } from 'reactflow'

export type NodeTemplateType = 'research' | 'design' | 'imageGeneration' | 'imageResult'

export interface NodeTemplate {
  type: NodeTemplateType
  label: string
  icon: string
  createNode: (position: { x: number; y: number }, id?: string) => Node
}

export const nodeTemplates: NodeTemplate[] = [
  {
    type: 'research',
    label: '리서치',
    icon: '📊',
    createNode: (position, id) => ({
      id: id || `research-${Date.now()}`,
      type: 'research',
      data: {
        title: '개요',
        items: [
          '인사이트: 사용자들은 친환경을 \'장식\'이 아닌 소재의 \'정직함\'에서 느낍니다.',
          '문제 정의: 복합 소재의 사용은 재활용을 방해하며 시각적 노이즈를 발생시킵니다.',
          '관련 키워드: 단일 소재(Mono-material), 정직한, 심리스 (Seamless)',
        ],
      },
      position,
      style: { width: 360 },
    }),
  },
  {
    type: 'design',
    label: '디자인',
    icon: '🎨',
    createNode: (position, id) => ({
      id: id || `design-${Date.now()}`,
      type: 'design',
      data: {
        title: '리서치 근거',
        items: [
          '인사이트: 사용자들은 친환경을 \'장식\'이 아닌 소재의 \'정직함\'에서 느낍니다.',
          '문제 정의: 복합 소재의 사용은 재활용을 방해하며 시각적 노이즈를 발생시킵니다.',
          '관련 키워드: 단일 소재(Mono-material), 정직한, 심리스 (Seamless)',
        ],
      },
      position,
      style: { width: 360 },
    }),
  },
  {
    type: 'imageGeneration',
    label: '이미지 생성',
    icon: '🖼️',
    createNode: (position, id) => ({
      id: id || `image-${Date.now()}`,
      type: 'imageGeneration',
      data: {
        prompt: 'Industrial design of a premium sustainable tumbler, monolithic seamless cylindrical form, made of matte sand-blasted recycled stainless steel in muted sand beige color, 45-degree professional product photography, soft studio lighting, high-end minimalist aesthetic, 8k resolution, photorealistic.',
        images: [],
      },
      position,
      style: { width: 360 },
    }),
  },
  {
    type: 'imageResult',
    label: '이미지 결과',
    icon: '✨',
    createNode: (position, id) => ({
      id: id || `image-result-${Date.now()}`,
      type: 'imageResult',
      data: {
        title: '디자인 결과',
        prompt: 'Industrial design of a premium bladeless desk fan, "The Breathing Column" concept, slim vertical cylindrical form with a brushed aluminum finish, minimalist control interface on top, soft ambient lighting, professional product photography, studio lighting, high-end minimalist aesthetic, 8k resolution, photorealistic.',
        generationDate: '2025년 12월 29일',
        lastUpdated: '30분 전',
        imageUrl: null,
      },
      position,
      style: { width: 360 },
    }),
  },
]
