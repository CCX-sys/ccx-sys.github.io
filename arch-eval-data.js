window.ARCH_DATA = {
  "cases": [
    {
      "id": "CASE_009",
      "label": "现代住宅 · 日景推进",
      "type": "L1 · 任务规划",
      "brief": "两层平屋顶住宅，保留完整前庭，完成约 5 秒的缓慢推进。",
      "prompt": "从文字需求出发，确定现代住宅的体块、材料与场地关系，生成日景主视图，检查建筑关系后制作约 5 秒的推进镜头。",
      "checks": [
        "两层、平屋顶、浅灰石材与木格栅，入口前庭完整。",
        "镜头缓慢推进，树叶轻动，建筑构件保持一致。",
        "依次完成需求理解、建筑出图、关系检查和动画交付。"
      ],
      "videos": [
        {
          "side": "A",
          "model": "可灵",
          "src": "assets/arch-eval/video-20261105/residence-a.mp4",
          "poster": "assets/arch-eval/video-20261105/residence-a.jpg",
          "width": 1278,
          "height": 720,
          "duration": 5.04,
          "fps": 24.0
        },
        {
          "side": "B",
          "model": "Lovart",
          "src": "assets/arch-eval/video-20261105/residence-b.mp4",
          "poster": "assets/arch-eval/video-20261105/residence-b.jpg",
          "width": 1280,
          "height": 720,
          "duration": 5.04,
          "fps": 24.0
        }
      ]
    },
    {
      "id": "CASE_040",
      "label": "滨水文化建筑 · 黄昏",
      "type": "L3 · 材质与光影",
      "brief": "约 7 秒的滨水镜头，检查石材、玻璃、暖光、倒影和运镜节奏。",
      "prompt": "生成滨水文化建筑的黄昏画面与约 7 秒镜头。低位沿滨水步道推进，向右环绕展示建筑与水面的关系，最后稳定停留。",
      "checks": [
        "浅色石材与大面积玻璃，玻璃反映天空和水面，湿润石材有更明显的反射。",
        "室内暖光透出并保留细节，水面缓波连续，倒影位置与建筑对应。",
        "前 4 秒低位推进，向右约 15°转换视角，后 3 秒稳定停留。"
      ],
      "videos": [
        {
          "side": "A",
          "model": "可灵",
          "src": "assets/arch-eval/video-20261105/waterfront-a.mp4",
          "poster": "assets/arch-eval/video-20261105/waterfront-a.jpg",
          "width": 1280,
          "height": 720,
          "duration": 7.04,
          "fps": 24.0
        },
        {
          "side": "B",
          "model": "Lovart",
          "src": "assets/arch-eval/video-20261105/waterfront-b.mp4",
          "poster": "assets/arch-eval/video-20261105/waterfront-b.jpg",
          "width": 1280,
          "height": 720,
          "duration": 7.1,
          "fps": 24.0
        }
      ]
    },
    {
      "id": "CASE_049",
      "label": "竞赛汇报 · 主视轻推",
      "type": "L4 · 专业交付",
      "brief": "约 5 秒主视轻推，交代两期体量、中央绿楔和主入口。",
      "prompt": "从同一概念形成 16:9 主视图、入口节点图和黄昏图，各配约 5 秒动画。本组检查竞赛主视镜头的全局构图与缓慢推进。",
      "checks": [
        "双侧体量、中央绿楔、斜向屋面和水平立面条带可辨。",
        "镜头从主视角轻推，整体形态、入口位置和材料保持一致。",
        "主视、入口与黄昏镜头延续同一建筑语言。"
      ],
      "videos": [
        {
          "side": "A",
          "model": "可灵",
          "src": "assets/arch-eval/video-20261105/competition-main-a.mp4",
          "poster": "assets/arch-eval/video-20261105/competition-main-a.jpg",
          "width": 1280,
          "height": 720,
          "duration": 5.04,
          "fps": 24.0
        },
        {
          "side": "B",
          "model": "Lovart",
          "src": "assets/arch-eval/video-20261105/competition-main-b.mp4",
          "poster": "assets/arch-eval/video-20261105/competition-main-b.jpg",
          "width": 1280,
          "height": 720,
          "duration": 5.09,
          "fps": 24.0
        }
      ]
    },
    {
      "id": "CASE_049_DETAIL",
      "label": "竞赛汇报 · 入口节点",
      "type": "L4 · 专业交付",
      "brief": "约 5 秒细节推进，突出入口构造与材料交接。",
      "prompt": "沿用主视方案的建筑形象，形成入口节点画面。用约 5 秒向入口缓推，展示门洞、立面条带、屋面和材料交接。",
      "checks": [
        "入口和相邻构件清楚，推进后能看见具体构造关系。",
        "水平条带、玻璃和屋面保持连续，材料与同组主视镜头相符。",
        "镜头推进服务于入口节点，主体保持稳定。"
      ],
      "videos": [
        {
          "side": "A",
          "model": "可灵",
          "src": "assets/arch-eval/video-20261105/competition-entry-a.mp4",
          "poster": "assets/arch-eval/video-20261105/competition-entry-a.jpg",
          "width": 1280,
          "height": 720,
          "duration": 5.04,
          "fps": 24.0
        },
        {
          "side": "B",
          "model": "Lovart",
          "src": "assets/arch-eval/video-20261105/competition-entry-b.mp4",
          "poster": "assets/arch-eval/video-20261105/competition-entry-b.jpg",
          "width": 1280,
          "height": 720,
          "duration": 5.09,
          "fps": 24.0
        }
      ]
    },
    {
      "id": "CASE_049_DUSK",
      "label": "竞赛汇报 · 黄昏环绕",
      "type": "L4 · 专业交付",
      "brief": "约 5 秒轻环绕，突出黄昏光环境并保持同组建筑形象。",
      "prompt": "在统一建筑形象与材料语言下表现黄昏场景。用约 5 秒轻环绕展示两侧体量、中央空间、室内暖光和天空的关系。",
      "checks": [
        "保留与主视、入口镜头一致的体量、屋面、立面条带和主要构件。",
        "室内光线与黄昏天空有清楚层次，立面仍有可辨细节。",
        "轻环绕带来可辨的视角变化，主体与中央空间保持稳定。"
      ],
      "videos": [
        {
          "side": "A",
          "model": "可灵",
          "src": "assets/arch-eval/video-20261105/competition-dusk-a.mp4",
          "poster": "assets/arch-eval/video-20261105/competition-dusk-a.jpg",
          "width": 1280,
          "height": 720,
          "duration": 5.04,
          "fps": 24.0
        },
        {
          "side": "B",
          "model": "Lovart",
          "src": "assets/arch-eval/video-20261105/competition-dusk-b.mp4",
          "poster": "assets/arch-eval/video-20261105/competition-dusk-b.jpg",
          "width": 1280,
          "height": 720,
          "duration": 5.09,
          "fps": 24.0
        }
      ]
    }
  ]
};
