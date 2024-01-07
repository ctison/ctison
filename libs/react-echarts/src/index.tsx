import * as echarts from 'echarts';
import React from 'react';

export interface EChartProps {
  // EChart init
  theme?: Parameters<typeof echarts.init>[1];
  initOpts?: Parameters<typeof echarts.init>[2];

  // EChart post initialization options
  options: echarts.EChartsOption;
  setOptions?: echarts.SetOptionOpts;
}

export const EChart: React.FC<EChartProps> = (props) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const echartsInstance = React.useRef<echarts.ECharts>();

  React.useEffect(() => {
    echartsInstance.current = echarts.init(
      ref.current!,
      props.theme,
      props.initOpts,
    );
  }, []);

  React.useEffect(() => {
    echartsInstance.current?.clear();
    echartsInstance.current?.setOption(props.options, props.setOptions);
  }, [props.options, props.setOptions]);

  return <div ref={ref} />;
};
