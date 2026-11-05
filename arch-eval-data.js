window.ARCH_DATA = {
  "cases": [
    {
      "id": "CASE_009",
      "label": "现代住宅 · 日景推进",
      "type": "任务规划",
      "brief": "约 5 秒缓慢推近两层平屋顶住宅，保留入口与前庭的整体关系。",
      "prompt": "从文字需求出发，确定现代住宅的体块、材料与场地关系，生成日景主视图，检查建筑关系后制作约 5 秒的推进镜头。",
      "checks": [
        "两层、平屋顶，浅灰石材与木格栅可辨。",
        "入口、台阶和前庭在推进中保持清楚。",
        "只允许镜头轻推与树叶轻动，门窗和屋檐等构件保持连续。"
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
      ],
      "slug": "residence"
    },
    {
      "id": "CASE_040",
      "label": "滨水文化建筑 · 黄昏",
      "type": "材质与光影",
      "brief": "约 7 秒展示滨水建筑的黄昏材质、室内暖光和水面倒影，镜头推进后稳定停留。",
      "prompt": "生成滨水文化建筑的黄昏画面与约 7 秒镜头。低位沿滨水步道推进，向右环绕展示建筑与水面的关系，最后稳定停留。",
      "checks": [
        "浅色石材与玻璃有明确区分，玻璃可见天空和水面的反射，湿润石材反光增强。",
        "室内暖光保留细节，水面缓波连续，倒影与岸上建筑相对应。",
        "约 4 秒低位推进并向右转换约 15°，随后约 3 秒稳定停留。"
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
      ],
      "slug": "waterfront"
    },
    {
      "id": "CASE_049",
      "label": "竞赛汇报 · 主视轻推",
      "type": "专业交付",
      "brief": "约 5 秒从主视角轻推，交代两期体量、中央绿楔与入口位置。",
      "prompt": "从同一概念形成 16:9 主视图、入口节点图和黄昏图，各配约 5 秒动画。本组检查竞赛主视镜头的全局构图与缓慢推进。",
      "checks": [
        "画面保持宽幅全局构图，两侧体量、中央绿楔与入口关系清楚。",
        "保留斜向屋面与水平条带，主视、入口、黄昏三个镜头可认出同一方案。",
        "镜头轻推时仍保留主体与中央空间，构图连续。"
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
      ],
      "slug": "competition-main"
    },
    {
      "id": "CASE_049_DETAIL",
      "label": "竞赛汇报 · 入口节点",
      "type": "专业交付",
      "brief": "约 5 秒推近入口，交代门洞、屋面和立面材料的交接。",
      "prompt": "沿用主视方案的建筑形象，形成入口节点画面。用约 5 秒向入口缓推，展示门洞、立面条带、屋面和材料交接。",
      "checks": [
        "镜头由入口区域缓慢推进，能看清门洞和相邻构件的连接。",
        "水平条带、屋面和玻璃延续主视方案，材料交接清楚。",
        "推进过程保持构件稳定，画面重点逐步落到入口节点。"
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
      ],
      "slug": "competition-entry"
    },
    {
      "id": "CASE_049_DUSK",
      "label": "竞赛汇报 · 黄昏环绕",
      "type": "专业交付",
      "brief": "约 5 秒轻环绕，在黄昏光线中延续主视与入口镜头的建筑形象。",
      "prompt": "在统一建筑形象与材料语言下表现黄昏场景。用约 5 秒轻环绕展示两侧体量、中央空间、室内暖光和天空的关系。",
      "checks": [
        "双侧体量、中央空间、屋面与水平条带延续前两个镜头。",
        "天空、室内灯光和外立面有可辨层次。",
        "轻环绕带来侧向视角变化，主体保持稳定。"
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
      ],
      "slug": "competition-dusk"
    }
  ]
};
