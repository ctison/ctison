'use client';

import { Box, Title } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import React, { useEffect } from 'react';
import {
  Background,
  BackgroundVariant,
  Controls,
  Edge,
  Node,
  Position,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';

let initialNodes: Node[] = [
  {
    id: 'app-web',
    position: { x: 0, y: 0 },
    data: { label: 'Web App' },
  },
  {
    id: 'app-desktop',
    position: { x: 200, y: 0 },
    data: { label: 'Desktop App' },
  },
  {
    id: 'app-mobile',
    position: { x: 400, y: 0 },
    data: { label: 'Mobile App' },
  },
  {
    id: 'api',
    position: { x: 200, y: 100 },
    data: { label: 'API' },
  },
  {
    id: 'queue',
    position: { x: 0, y: 200 },
    data: { label: 'Queue' },
    sourcePosition: Position.Right,
  },
  {
    id: 'microservice',
    position: { x: 200, y: 200 },
    data: { label: 'Microservice' },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: 'database',
    position: { x: 400, y: 150 },
    data: { label: 'Database' },
    type: 'output',
    targetPosition: Position.Left,
  },
];
const initialEdges: Edge[] = [
  { id: 'app-desktop->api', source: 'app-desktop', target: 'api' },
  { id: 'app-mobile->api', source: 'app-mobile', target: 'api' },
  { id: 'app-web->api', source: 'app-web', target: 'api' },
  { id: 'api->queue', source: 'api', target: 'queue' },
  { id: 'api->database', source: 'api', target: 'database' },
  { id: 'queue->microservice', source: 'queue', target: 'microservice' },
  { id: 'microservice->database', source: 'microservice', target: 'database' },
];

export const FavoriteStack: React.FC = () => {
  return (
    <ReactFlowProvider>
      <FavoriteStackInner />
    </ReactFlowProvider>
  );
};

const FavoriteStackInner: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const { fitView } = useReactFlow();
  const { width: viewportWidth, height: viewportHeight } = useViewportSize();

  useEffect(() => {
    if (viewportWidth && viewportHeight) {
      fitView();
    }
  }, [fitView, viewportWidth, viewportHeight]);

  return (
    <Box py='xl' className='print-hide'>
      <Title order={2} ta='center' mb='xl'>
        Favorite Stack
      </Title>
      <Box h='500px'>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          defaultEdgeOptions={{ animated: true }}
          zoomOnScroll={false}
          preventScrolling={false}
          fitView
          proOptions={{ hideAttribution: true }}
        >
          <Controls />
          <Background variant={BackgroundVariant.Cross} gap={12} size={3} />
        </ReactFlow>
      </Box>
    </Box>
  );
};
