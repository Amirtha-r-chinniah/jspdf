import React from 'react';
import {
  FunnelChart, Bar,
  BarChart, XAxis, YAxis,
  ResponsiveContainer,
  Legend, Tooltip, Cell,
  Funnel, LabelList
} from 'recharts';
import { useState } from 'react';
import PDFGenerator from '../Helpers/PDFGenerator';
import { scaleOrdinal } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";

const colors = scaleOrdinal(schemeCategory10).range();

const getPath = (x, y, width, height) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3
    } 
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width
    }, ${y + height}
  Z`;
};

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

const PDF = () => {
  const [linestate, setLineState] = useState(null);
  const [svg, setSvg] = useState(null);
  function generatePDF() {
    PDFGenerator(linestate, TableData);
  }
  const svgToPng = (svg) => {
    return new Promise((resolve, reject) => {
      let canvas = document.createElement('canvas');
      var bBox = svg.getBBox();
      canvas.width = bBox.width + 150;
      canvas.height = bBox.height;
      let ctx = canvas.getContext('2d');
      ctx.fillStyle = "white";
      let xml = new XMLSerializer().serializeToString(svg);
      let dataUrl = 'data:image/svg+xml;utf8,' + encodeURIComponent(xml);
      let img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        let imageData = canvas.toDataURL('image/png', 1.0);
        setLineState(imageData)
      }
      img.onerror = () => reject();
      img.src = dataUrl;
    });
  };
  const convertChart = async (ref) => {
    if (ref && ref.container) {
      svg1 = ref.container.children[0];
      setSvg(svg1);
      pngData = await svgToPng(svg);
    }
  };
  const data = [

    {
      name: "Data Engineer",
      uv: 3000,
      pv: 1398,
      amt: 2210
    },
    {
      name: "Python Dev",
      uv: 2000,
      pv: 9800,
      amt: 2290
    },
    {
      name: "Frontend Dev",
      uv: 2780,
      pv: 3908,
      amt: 2000
    },
    {
      name: "Backend Dev",
      uv: 1890,
      pv: 4800,
      amt: 2181
    },
    {
      name: "ETL Master",
      uv: 2390,
      pv: 3800,
      amt: 2500
    },
    {
      name: "Management",
      uv: 3450,
      pv: 4300,
      amt: 2100
    }
  ];
  var TableData = {
    head: [['OccupationGroup', 'Postings', 'LQ', 'Employment(2020)', 'Employment Growth']],
    body: [['General Research', '65,890', 'NA', '88,361', '2.80 %'],
    ['Health and Medical Research', '55,859', 'NA', '170,976', '1.70 %'],
    ['Quality Assurance', '31,959', 'NA', '61,721', '-3.50 %	'],
    ['Clinical Laboratory Technologists and Technicians', '26,746', 'NA', '132,852', '0.10 %'],
    ['Biological Science', '13,676', 'NA', '41,820', '3.70 %'],
    ['K-12 Teaching', '12,904', 'NA', '241,452', '0.20 %'],
    ['Scientific Technicians', '9,270', 'NA', '80,640', '1.40 %'],
    ['Clinical Research', '7,806', 'NA', '12,191', '4.90 %']

    ],
    theme: 'grid',
    startY: 40
  };

  return (
    <>
    <h4>Access count of each programs</h4>
    <ResponsiveContainer width="60%" aspect={3}>
                <BarChart data={data} ref={ref => convertChart(ref)}>
                    <XAxis dataKey="name" />
                    <YAxis  ></YAxis>
                    <Tooltip />

                <Bar dataKey="uv" shape={<TriangleBar />} >
                {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % 20]} />
            ))}
                </Bar>
                
                </BarChart>
            </ResponsiveContainer>
      <button onClick={generatePDF}>Generate PDF</button>
    </>
  );
}
export default PDF