window.ARCH_DATA = {
  "cases": [
    {
      "id": "CASE_002",
      "type": "同题输出对照",
      "label": "三层住宅",
      "question": "哪一段，更接近「三层退台住宅」？",
      "title": "三层住宅，先数清楼层。",
      "brief": "首层架空车库 · 二层居住 · 三层退台露台 · 6 秒鸟瞰推进",
      "summary": "B 更接近三层与退台要求；A 出现额外楼层。",
      "rationale": "在已查看的关键帧中，A 呈现架空层加三层上部空间，共四层；B 可辨认为架空车库、居住层与退台层。这个判断只针对当前输出与题面，不代表模型排名。",
      "boundary": "同一 Case 文件夹下的两段输出；原始生成请求、完整参数及 B 的模型身份未留存。A/B 镜头与时长不同，不能按相同秒数推定同一空间位置。",
      "issues": [
        {
          "side": "A",
          "time": 2.5,
          "title": "楼层数量偏离任务",
          "observed": "A 可数出架空层 + 三个上部楼层，共四层；顶部没有题面要求的明显退台。",
          "expected": "三层：首层车库、二层居住、三层退台。",
          "rule": "建筑合理性 / 任务符合度",
          "rect": [
            39,
            16,
            43,
            70
          ],
          "kind": "偏差证据",
          "status": "本轮画面观察 · 待本人复核",
          "image": "assets/arch-eval/case_002-evidence-1.jpg"
        },
        {
          "side": "B",
          "time": 4.6,
          "title": "三层与退台关系可见",
          "observed": "B 的架空停车、上部居住层和缩进的顶层可以在同一帧辨认。柱网是否满足工程受力条件仍需图纸。",
          "expected": "退台与主体楼板对应，架空层柱网落地。",
          "rule": "建筑合理性",
          "rect": [
            28,
            12,
            51,
            75
          ],
          "kind": "对照证据",
          "status": "本轮画面观察 · 待本人复核",
          "image": "assets/arch-eval/case_002-evidence-2.jpg"
        },
        {
          "side": "A",
          "time": 4.9,
          "title": "视频实际时长不足 6 秒",
          "observed": "媒体容器时长为 5.04 秒，比题面要求的 6 秒短约 0.96 秒。不能因文件题名而忽略实际时长。",
          "expected": "生成 6 秒 45°鸟瞰推进镜头。",
          "rule": "任务符合度",
          "rect": [
            3,
            3,
            94,
            94
          ],
          "kind": "元数据证据",
          "status": "本轮画面观察 · 待本人复核",
          "image": "assets/arch-eval/case_002-evidence-3.jpg"
        }
      ],
      "prompt": "生成一栋三层现代住宅并制作6秒45°鸟瞰推进镜头。首层架空车库，二层居住空间，三层退台露台；架空层柱网必须连续落地，退台必须与主体楼板对应，车位尺度合理。镜头从建筑左前方45°高位缓慢下降并推进，前4秒展示整体体量，第4-6秒轻微向右平移突出退台。云层缓慢移动，树叶轻微摆动，车辆不移动；禁止柱子悬空、楼板穿插、车库尺寸失真。",
      "level": "L1",
      "videos": [
        {
          "side": "A",
          "src": "assets/arch-eval/case_002-a.mp4",
          "poster": "assets/arch-eval/case_002-a.jpg",
          "duration": 5.04,
          "width": 1920,
          "height": 1080,
          "fps": 24.0,
          "model": "待核实"
        },
        {
          "side": "B",
          "src": "assets/arch-eval/case_002-b.mp4",
          "poster": "assets/arch-eval/case_002-b.jpg",
          "duration": 6.06,
          "width": 1280,
          "height": 720,
          "fps": 24.0,
          "model": "待核实"
        }
      ]
    },
    {
      "id": "CASE_001",
      "type": "同题输出对照",
      "label": "社区文化中心",
      "question": "镜头完成了任务，还是只拍得好看？",
      "title": "建筑之外，还要检查运镜。",
      "brief": "两层文化中心 · 局部悬挑 · 3 秒后向右偏转 · 阴天软光",
      "summary": "先核查侧面展示，再讨论视觉偏好。",
      "rationale": "A 与 B 都呈现了两层文化建筑，但关键帧仍以正面为主。题面中的「第 3 秒右偏 15°」不能从这几帧精确量化。此处展示核查过程，暂不给出总分或胜者。",
      "boundary": "两段视频与迁移包自定义 Case 的上传文件逐字节一致，Prompt 也一致；数据库模型名称均为 Custom，没有该 Case 的已提交评分。",
      "issues": [
        {
          "side": "A",
          "time": 4.6,
          "title": "侧面展开程度需要复核",
          "observed": "4.60 秒仍接近正立面，侧立面信息有限。是否完成题面角度要求，需要结合完整运动轨迹核查。",
          "expected": "第 3 秒轻微向右偏转 15°展示侧面。",
          "rule": "视频稳定性 / 任务符合度",
          "rect": [
            19,
            20,
            66,
            61
          ],
          "kind": "核查点",
          "status": "本轮画面观察 · 待本人复核",
          "image": "assets/arch-eval/case_001-evidence-1.jpg"
        },
        {
          "side": "B",
          "time": 4.6,
          "title": "人物尺度与清晰度分开判断",
          "observed": "入口右侧人物在当前帧中轮廓模糊。单帧不足以认定时序变形，需回看前后帧。",
          "expected": "人物作尺度参照，自然缓慢行走。",
          "rule": "视觉表现 / 视频稳定性",
          "rect": [
            75,
            58,
            13,
            33
          ],
          "kind": "候选问题",
          "status": "本轮画面观察 · 待本人复核",
          "image": "assets/arch-eval/case_001-evidence-2.jpg"
        }
      ],
      "prompt": "生成一座现代极简社区文化中心，并同时完成5秒建筑动画。建筑为2层，高挑入口大厅，矩形主量体+局部悬挑体块；首层入口、二层窗带和悬挑边界清晰，人物仅作尺度参照。镜头从正面人视角以约2米/秒速度缓慢向前推进，在第3秒轻微向右偏转15°展示侧面；建筑主体、门窗、悬挑和地面位置全程保持不变。阴天软光，树木仅轻微摆动，人物仅自然缓慢行走，不新增车辆。要求结构、透视、尺度、镜头运动和建筑动画连续稳定。",
      "level": "L1",
      "videos": [
        {
          "side": "A",
          "src": "assets/arch-eval/case_001-a.mp4",
          "poster": "assets/arch-eval/case_001-a.jpg",
          "duration": 5.04,
          "width": 1920,
          "height": 1080,
          "fps": 24.0,
          "model": "待核实"
        },
        {
          "side": "B",
          "src": "assets/arch-eval/case_001-b.mp4",
          "poster": "assets/arch-eval/case_001-b.jpg",
          "duration": 5.05,
          "width": 1920,
          "height": 1080,
          "fps": 24.0,
          "model": "待核实"
        }
      ]
    },
    {
      "id": "CASE_012",
      "type": "生成版本对照",
      "label": "幕墙定向改色",
      "question": "只改幕墙颜色，建筑还在原位吗？",
      "title": "一次改色，不能重做一栋楼。",
      "brief": "浅灰 → 深灰幕墙 · 楼层、入口、遮阳与镜头保持不变",
      "summary": "改色之外，建筑高度和立面分格也发生了变化。",
      "rationale": "原版与改色版的起始全景中，建筑的宽高关系、可见水平楼层带和首层入口构成不同。先记录非目标改动，再讨论颜色是否到位。缺少原始会话日志，不能据此证明完整多轮 Agent 执行能力。",
      "boundary": "依据文件名和 Case 题面建立版本对应；未取得完整生成日志。两个镜头的推进速度、构图不一致，默认分别播放。",
      "issues": [
        {
          "side": "B",
          "time": 0.2,
          "title": "非目标区域被连带修改",
          "observed": "相较 A 的 0.20 秒起始帧，B 的建筑更宽扁、可见水平楼层带更少，入口构成也不同。可切换 A/B 起始帧核查。",
          "expected": "只把幕墙改为深灰；楼层、遮阳、入口和镜头不变。",
          "rule": "任务符合度 / 多轮修改观察",
          "rect": [
            8,
            22,
            84,
            68
          ],
          "kind": "偏差证据",
          "status": "本轮画面观察 · 待本人复核",
          "image": "assets/arch-eval/case_012-evidence-1.jpg"
        },
        {
          "side": "A",
          "time": 0.2,
          "title": "保留原版作为参照",
          "observed": "将原版首帧保留为改色任务的基线。比对颜色前，应先核查建筑轮廓、楼层带与入口。",
          "expected": "除指定颜色外，不出现建筑或动画漂移。",
          "rule": "任务符合度",
          "rect": [
            20,
            9,
            54,
            82
          ],
          "kind": "基线证据",
          "status": "本轮画面观察 · 待本人复核",
          "image": "assets/arch-eval/case_012-evidence-2.jpg"
        }
      ],
      "prompt": "第一轮生成现代办公楼：8层、浅灰幕墙、垂直遮阳构件、首层架空入口；生成6秒缓慢正面推进视频。第二轮仅把幕墙颜色改为深灰，保持楼层、遮阳、入口、场地和镜头路径完全不变，再重新生成同一镜头。对比两版，除指定颜色外不得出现任何建筑或动画漂移。",
      "level": "L1",
      "videos": [
        {
          "side": "A",
          "src": "assets/arch-eval/case_012-a.mp4",
          "poster": "assets/arch-eval/case_012-a.jpg",
          "duration": 6.08,
          "width": 1280,
          "height": 720,
          "fps": 24.0,
          "model": "待核实"
        },
        {
          "side": "B",
          "src": "assets/arch-eval/case_012-b.mp4",
          "poster": "assets/arch-eval/case_012-b.jpg",
          "duration": 6.08,
          "width": 1280,
          "height": 720,
          "fps": 24.0,
          "model": "待核实"
        }
      ]
    },
    {
      "id": "CASE_007",
      "type": "原图与输出核查",
      "label": "草图转空间",
      "question": "输出出错之前，输入条件成立吗？",
      "title": "评测，也要检查题目本身。",
      "brief": "平面 / 立面综合图 → 空间视频 · 输入适配性先行核查",
      "summary": "原输入是综合图纸；先核查它与题面的适配关系。",
      "rationale": "输入 drawing_1.png 同时含平面及多个立面，而题面要求 L 形住宅、中心庭院。输出出现多个房屋立面与剖开空间的并置。需要先裁出有效平面并确认 L 形和庭院约束，不能把输入适配问题全部归咎于模型。",
      "boundary": "原始图纸可回看。缺少生成请求记录；平面到立体的精确一致性尚未完成，暂不做保真评分。",
      "reference": "assets/arch-eval/case_007-reference.png",
      "issues": [
        {
          "side": "B",
          "time": 2.5,
          "title": "图纸多视图被并置为空间",
          "observed": "同一场景中可见多个房屋立面与剖开空间的组合，并非清晰的单栋住宅体量。应先核查生成输入是否包含多视图。",
          "expected": "L 形平面、中心庭院和两翼长度关系保持。",
          "rule": "输入适配性 / 建筑合理性",
          "rect": [
            3,
            5,
            91,
            89
          ],
          "kind": "输入诊断",
          "status": "本轮画面观察 · 待本人复核",
          "image": "assets/arch-eval/case_007-evidence-1.jpg"
        },
        {
          "side": "A",
          "time": 2.5,
          "title": "俯视画面仍呈图纸拼贴特征",
          "observed": "画面在同一矩形底板上并列展示多幅建筑视图。它能证明输出形态，不能证明忠实还原了 L 形平面。",
          "expected": "根据住宅平面草图生成鸟瞰与环绕视频。",
          "rule": "原设计一致性：暂不评分",
          "rect": [
            18,
            7,
            66,
            81
          ],
          "kind": "核查点",
          "status": "本轮画面观察 · 待本人复核",
          "image": "assets/arch-eval/case_007-evidence-2.jpg"
        }
      ],
      "prompt": "根据提供的住宅平面草图生成鸟瞰效果图，并进一步制作5秒从左上方缓慢绕向右前方的镜头。必须保留L形平面、中心庭院、两翼长度关系以及主入口位置；鸟瞰镜头不能把L形压缩成矩形。镜头运动中庭院始终位于两翼之间，建筑体量不得新增或消失；日光稳定，树木轻微摆动，禁止因视角变化产生空间关系错误。",
      "level": "L1",
      "videos": [
        {
          "side": "A",
          "src": "assets/arch-eval/case_007-a.mp4",
          "poster": "assets/arch-eval/case_007-a.jpg",
          "duration": 5.04,
          "width": 1920,
          "height": 1080,
          "fps": 24.0,
          "model": "待核实"
        },
        {
          "side": "B",
          "src": "assets/arch-eval/case_007-b.mp4",
          "poster": "assets/arch-eval/case_007-b.jpg",
          "duration": 5.04,
          "width": 1280,
          "height": 720,
          "fps": 24.0,
          "model": "待核实"
        }
      ]
    },
    {
      "id": "CASE_043",
      "type": "生成版本对照",
      "label": "夜景局部修改",
      "question": "灯光增加了，其他内容保留了吗？",
      "title": "把「不要改变」也变成检查项。",
      "brief": "原版 → 最终灯光版 · 不改高度 / 人车 / 天空 / 镜头",
      "summary": "灯光变化可见；否定约束需要逐项复核。",
      "rationale": "最终版中檐部与入口暖光可见，主体屋顶与阴云构图整体接近原版。但「没有新增人车」需要逐帧清点；相似的整体构图不足以证明所有否定指令均已满足。",
      "boundary": "文件名支持初始 / 最终版本关系；未收到完整中间轮次与会话记录。本页仅观察已提供的两段视频。",
      "issues": [
        {
          "side": "B",
          "time": 2.5,
          "title": "入口与檐部暖光可见",
          "observed": "相较原版可看到入口、柱脚与屋顶装饰的暖光变化。该帧支持灯光修改发生，不足以单独证明其余约束全部通过。",
          "expected": "最后仅增加少量夜景灯光。",
          "rule": "任务符合度",
          "rect": [
            24,
            26,
            35,
            55
          ],
          "kind": "修改证据",
          "status": "本轮画面观察 · 待本人复核",
          "image": "assets/arch-eval/case_043-evidence-1.jpg"
        },
        {
          "side": "A",
          "time": 2.5,
          "title": "保留人车与天空的原始参照",
          "observed": "原版中的人物、自行车与云层位置需要与最终版按相近空间节点复核；相同秒数不自动代表相同节点。",
          "expected": "不要增加人物、车辆，不修改天空与建筑高度。",
          "rule": "非目标内容保持",
          "rect": [
            1,
            2,
            96,
            94
          ],
          "kind": "基线证据",
          "status": "本轮画面观察 · 待本人复核",
          "image": "assets/arch-eval/case_043-evidence-2.jpg"
        }
      ],
      "prompt": "初始生成文化中心并制作6秒正面推进。连续执行：入口广场改浅色石材；不要改变建筑高度；不要增加人物；不要增加车辆；不要修改天空；最后仅增加少量夜景灯光。最终版本仍需保持原建筑体量、门窗、景观、天空和镜头路径。要求同时检验正向指令、多个否定指令、上下文保持和最后一步局部修改。",
      "level": "L4",
      "videos": [
        {
          "side": "A",
          "src": "assets/arch-eval/case_043-a.mp4",
          "poster": "assets/arch-eval/case_043-a.jpg",
          "duration": 6.08,
          "width": 1280,
          "height": 720,
          "fps": 24.0,
          "model": "待核实"
        },
        {
          "side": "B",
          "src": "assets/arch-eval/case_043-b.mp4",
          "poster": "assets/arch-eval/case_043-b.jpg",
          "duration": 6.08,
          "width": 1280,
          "height": 720,
          "fps": 24.0,
          "model": "待核实"
        }
      ]
    }
  ],
  "rubrics": [
    {
      "id": "0ad69358-7785-4f33-809c-64d1b7071f68",
      "name": "建筑视频 Rubric",
      "version": "1.0",
      "status": "frozen",
      "items": [
        {
          "dimension_key": "prompt_adherence",
          "name": "Prompt Adherence",
          "description": "How faithfully the video follows the prompt's subject, camera and motion.",
          "weight": 0.4,
          "score_anchors": "[{\"score\":1,\"description\":\"fails\"},{\"score\":2,\"description\":\"weak\"},{\"score\":3,\"description\":\"partial\"},{\"score\":4,\"description\":\"good\"},{\"score\":5,\"description\":\"excellent\"}]"
        },
        {
          "dimension_key": "spatial_consistency",
          "name": "Spatial Consistency",
          "description": "Stability of geometry, proportions and object identity across frames.",
          "weight": 0.3,
          "score_anchors": "[{\"score\":1,\"description\":\"fails\"},{\"score\":2,\"description\":\"weak\"},{\"score\":3,\"description\":\"partial\"},{\"score\":4,\"description\":\"good\"},{\"score\":5,\"description\":\"excellent\"}]"
        },
        {
          "dimension_key": "visual_quality",
          "name": "Visual Quality",
          "description": "Rendering quality: sharpness, lighting, noise and artifacts.",
          "weight": 0.3,
          "score_anchors": "[{\"score\":1,\"description\":\"fails\"},{\"score\":2,\"description\":\"weak\"},{\"score\":3,\"description\":\"partial\"},{\"score\":4,\"description\":\"good\"},{\"score\":5,\"description\":\"excellent\"}]"
        }
      ]
    },
    {
      "id": "52a072bf-df1a-4cfa-88d7-a36224d37503",
      "name": "建筑视频 Rubric",
      "version": "1.1",
      "status": "frozen",
      "items": [
        {
          "dimension_key": "prompt_adherence",
          "name": "建筑理解能力",
          "description": "* **建筑类型理解**：不同功能建筑（住宅、文化、商业等）的尺度感、体块关系与空间开阖。  * **空间关系理解**：室内外渗透、前中后景深度、庭院围合、架空与悬挑结构逻辑。  * **风格与语汇理解**：现代极简、新中式、参数化表皮等设计语言的精准呈现。  * **场景与物理逻辑理解**：日光/人工光照射下的环境反射、重力与力学支撑合理性。",
          "weight": 1.0,
          "score_anchors": "[{\"score\":1,\"description\":\"1\"},{\"score\":2,\"description\":\"2\"},{\"score\":3,\"description\":\"3\"},{\"score\":4,\"description\":\"4\"},{\"score\":5,\"description\":\"5\"}]"
        },
        {
          "dimension_key": "spatial_consistency",
          "name": "建筑视觉生成",
          "description": "* **结构完整性**：建筑主体体块清晰，节点收口合理。  * **材质表现**：清水混凝土质感、玻璃幕墙反射/透射、木格栅/金属板缝隙与质感呈现。  * **光影与氛围**：黄昏暮色、阴天漫射光、夜景照明的细腻程度与物理真实感。",
          "weight": 1.0,
          "score_anchors": "[{\"score\":1,\"description\":\"1\"},{\"score\":2,\"description\":\"2\"},{\"score\":3,\"description\":\"3\"},{\"score\":4,\"description\":\"4\"},{\"score\":5,\"description\":\"5\"}]"
        },
        {
          "dimension_key": "visual_quality",
          "name": "建筑动画能力",
          "description": "* **镜头运镜控制**：无人机环绕、平视推镜头、低角仰拍等运镜平滑度。  * **运动与时间连续性**：转场/漫游过程中建筑结构不发生漂移、变形或闪烁（Flicker）。  * **环境动态匹配**：云影移动、水面波纹、植物摇曳等与建筑关系的自然度。",
          "weight": 1.0,
          "score_anchors": "[{\"score\":1,\"description\":\"1\"},{\"score\":2,\"description\":\"2\"},{\"score\":3,\"description\":\"3\"},{\"score\":4,\"description\":\"4\"},{\"score\":5,\"description\":\"5\"}]"
        },
        {
          "dimension_key": "custom_mt6ox2rh",
          "name": "Agent 任务执行能力",
          "description": "* **目标拆解与规划**：能否将长文本复杂指令自动拆解为多步骤工作流（如草图->建模->渲染->动画）。  * **主动优化与补全**：提示词模糊时，能否主动补充合理的建筑配景与配图参数。  * **上下文保持（Memory）**：在复杂长链条操作中保持核心设计特征不丢失。",
          "weight": 1.0,
          "score_anchors": "[{\"score\":1,\"description\":\"\"},{\"score\":2,\"description\":\"\"},{\"score\":3,\"description\":\"\"},{\"score\":4,\"description\":\"\"},{\"score\":5,\"description\":\"\"}]"
        },
        {
          "dimension_key": "custom_mt6oxkct",
          "name": "多轮修改能力",
          "description": "* **局部精准调整**：指哪改哪（如“仅将主楼涂料换为外墙砖，其余保持不变”）。  * **原设计保持度**：在修改特定区域时，非修改区域（山体、天空、旁观建筑）的抗遗忘能力。  * **否定指令遵循**：对“不要...”类指令（如“不要在广场前加人物”）的响应精准度。",
          "weight": 1.0,
          "score_anchors": "[{\"score\":1,\"description\":\"\"},{\"score\":2,\"description\":\"\"},{\"score\":3,\"description\":\"\"},{\"score\":4,\"description\":\"\"},{\"score\":5,\"description\":\"\"}]"
        }
      ]
    },
    {
      "id": "fa1e2ecc-7111-439d-99c7-ca5da3a9910b",
      "name": "建筑视频 Rubric",
      "version": "1.2",
      "status": "frozen",
      "items": [
        {
          "dimension_key": "prompt_adherence",
          "name": "建筑理解能力",
          "description": "结构、尺度、空间完全稳定，5分；轻微局部偏差，4分；基本正确，但有明显的AI痕迹，3分；明显结构/尺度问题，2分；建筑理解失效/严重bad case，1分",
          "weight": 1.0,
          "score_anchors": "[{\"score\":1,\"description\":\"1\"},{\"score\":2,\"description\":\"2\"},{\"score\":3,\"description\":\"3\"},{\"score\":4,\"description\":\"4\"},{\"score\":5,\"description\":\"5\"}]"
        },
        {
          "dimension_key": "spatial_consistency",
          "name": "建筑视觉生成",
          "description": "* **结构完整性**：建筑主体体块清晰，节点收口合理。  * **材质表现**：清水混凝土质感、玻璃幕墙反射/透射、木格栅/金属板缝隙与质感呈现。  * **光影与氛围**：黄昏暮色、阴天漫射光、夜景照明的细腻程度与物理真实感。",
          "weight": 1.0,
          "score_anchors": "[{\"score\":1,\"description\":\"1\"},{\"score\":2,\"description\":\"2\"},{\"score\":3,\"description\":\"3\"},{\"score\":4,\"description\":\"4\"},{\"score\":5,\"description\":\"5\"}]"
        },
        {
          "dimension_key": "visual_quality",
          "name": "建筑动画能力",
          "description": "* **镜头运镜控制**：无人机环绕、平视推镜头、低角仰拍等运镜平滑度。  * **运动与时间连续性**：转场/漫游过程中建筑结构不发生漂移、变形或闪烁（Flicker）。  * **环境动态匹配**：云影移动、水面波纹、植物摇曳等与建筑关系的自然度。",
          "weight": 1.0,
          "score_anchors": "[{\"score\":1,\"description\":\"1\"},{\"score\":2,\"description\":\"2\"},{\"score\":3,\"description\":\"3\"},{\"score\":4,\"description\":\"4\"},{\"score\":5,\"description\":\"5\"}]"
        },
        {
          "dimension_key": "custom_mt6ox2rh",
          "name": "Agent 任务执行能力",
          "description": "* **目标拆解与规划**：能否将长文本复杂指令自动拆解为多步骤工作流（如草图->建模->渲染->动画）。  * **主动优化与补全**：提示词模糊时，能否主动补充合理的建筑配景与配图参数。  * **上下文保持（Memory）**：在复杂长链条操作中保持核心设计特征不丢失。",
          "weight": 1.0,
          "score_anchors": "[{\"score\":1,\"description\":\"\"},{\"score\":2,\"description\":\"\"},{\"score\":3,\"description\":\"\"},{\"score\":4,\"description\":\"\"},{\"score\":5,\"description\":\"\"}]"
        },
        {
          "dimension_key": "custom_mt6oxkct",
          "name": "多轮修改能力",
          "description": "* **局部精准调整**：指哪改哪（如“仅将主楼涂料换为外墙砖，其余保持不变”）。  * **原设计保持度**：在修改特定区域时，非修改区域（山体、天空、旁观建筑）的抗遗忘能力。  * **否定指令遵循**：对“不要...”类指令（如“不要在广场前加人物”）的响应精准度。",
          "weight": 1.0,
          "score_anchors": "[{\"score\":1,\"description\":\"\"},{\"score\":2,\"description\":\"\"},{\"score\":3,\"description\":\"\"},{\"score\":4,\"description\":\"\"},{\"score\":5,\"description\":\"\"}]"
        }
      ]
    },
    {
      "id": "d100dcb6-baec-497a-9706-9b52919a9ad8",
      "name": "建筑视频 Rubric",
      "version": "1.3",
      "status": "frozen",
      "items": [
        {
          "dimension_key": "prompt_adherence",
          "name": "建筑理解能力",
          "description": "结构、尺度、空间完全稳定，5分；轻微局部偏差，4分；基本正确，但有明显的AI痕迹，3分；明显结构/尺度问题，2分；建筑理解失效/严重bad case，1分",
          "weight": 1.0,
          "score_anchors": "[{\"score\":1,\"description\":\"1\"},{\"score\":2,\"description\":\"2\"},{\"score\":3,\"description\":\"3\"},{\"score\":4,\"description\":\"4\"},{\"score\":5,\"description\":\"5\"}]"
        },
        {
          "dimension_key": "spatial_consistency",
          "name": "建筑视觉生成",
          "description": "材质光影高级真实，5分；有轻微材质/光影瑕疵，4分；可用但质感普通，3分；材质/光影明显失真，2分；视觉生成严重失效，1分；",
          "weight": 1.0,
          "score_anchors": "[{\"score\":1,\"description\":\"1\"},{\"score\":2,\"description\":\"2\"},{\"score\":3,\"description\":\"3\"},{\"score\":4,\"description\":\"4\"},{\"score\":5,\"description\":\"5\"}]"
        },
        {
          "dimension_key": "visual_quality",
          "name": "建筑动画能力",
          "description": "* **镜头运镜控制**：无人机环绕、平视推镜头、低角仰拍等运镜平滑度。  * **运动与时间连续性**：转场/漫游过程中建筑结构不发生漂移、变形或闪烁（Flicker）。  * **环境动态匹配**：云影移动、水面波纹、植物摇曳等与建筑关系的自然度。",
          "weight": 1.0,
          "score_anchors": "[{\"score\":1,\"description\":\"1\"},{\"score\":2,\"description\":\"2\"},{\"score\":3,\"description\":\"3\"},{\"score\":4,\"description\":\"4\"},{\"score\":5,\"description\":\"5\"}]"
        },
        {
          "dimension_key": "custom_mt6ox2rh",
          "name": "Agent 任务执行能力",
          "description": "* **目标拆解与规划**：能否将长文本复杂指令自动拆解为多步骤工作流（如草图->建模->渲染->动画）。  * **主动优化与补全**：提示词模糊时，能否主动补充合理的建筑配景与配图参数。  * **上下文保持（Memory）**：在复杂长链条操作中保持核心设计特征不丢失。",
          "weight": 1.0,
          "score_anchors": "[{\"score\":1,\"description\":\"\"},{\"score\":2,\"description\":\"\"},{\"score\":3,\"description\":\"\"},{\"score\":4,\"description\":\"\"},{\"score\":5,\"description\":\"\"}]"
        },
        {
          "dimension_key": "custom_mt6oxkct",
          "name": "多轮修改能力",
          "description": "* **局部精准调整**：指哪改哪（如“仅将主楼涂料换为外墙砖，其余保持不变”）。  * **原设计保持度**：在修改特定区域时，非修改区域（山体、天空、旁观建筑）的抗遗忘能力。  * **否定指令遵循**：对“不要...”类指令（如“不要在广场前加人物”）的响应精准度。",
          "weight": 1.0,
          "score_anchors": "[{\"score\":1,\"description\":\"\"},{\"score\":2,\"description\":\"\"},{\"score\":3,\"description\":\"\"},{\"score\":4,\"description\":\"\"},{\"score\":5,\"description\":\"\"}]"
        }
      ]
    },
    {
      "id": "be279ad8-e4b2-4a78-ba6f-c47e9b14d431",
      "name": "建筑视频 Rubric",
      "version": "1.4",
      "status": "frozen",
      "items": [
        {
          "dimension_key": "prompt_adherence",
          "name": "建筑理解能力",
          "description": "结构、尺度、空间完全稳定，5分；轻微局部偏差，4分；基本正确，但有明显的AI痕迹，3分；明显结构/尺度问题，2分；建筑理解失效/严重bad case，1分",
          "weight": 1.0,
          "score_anchors": "[{\"score\":1,\"description\":\"1\"},{\"score\":2,\"description\":\"2\"},{\"score\":3,\"description\":\"3\"},{\"score\":4,\"description\":\"4\"},{\"score\":5,\"description\":\"5\"}]"
        },
        {
          "dimension_key": "spatial_consistency",
          "name": "建筑视觉生成",
          "description": "材质光影高级真实，5分；有轻微材质/光影瑕疵，4分；可用但质感普通，3分；材质/光影明显失真，2分；视觉生成严重失效，1分；",
          "weight": 1.0,
          "score_anchors": "[{\"score\":1,\"description\":\"1\"},{\"score\":2,\"description\":\"2\"},{\"score\":3,\"description\":\"3\"},{\"score\":4,\"description\":\"4\"},{\"score\":5,\"description\":\"5\"}]"
        },
        {
          "dimension_key": "visual_quality",
          "name": "建筑动画能力",
          "description": "运镜精准、时序稳定，5分；轻微抖动/速度变化，4分；镜头基本完成但稳定性一般，3分；运镜或连续性明显失控，2分；视频任务失败/严重崩坏，1分",
          "weight": 1.0,
          "score_anchors": "[{\"score\":1,\"description\":\"1\"},{\"score\":2,\"description\":\"2\"},{\"score\":3,\"description\":\"3\"},{\"score\":4,\"description\":\"4\"},{\"score\":5,\"description\":\"5\"}]"
        },
        {
          "dimension_key": "custom_mt6ox2rh",
          "name": "Agent 任务执行能力",
          "description": "* **目标拆解与规划**：能否将长文本复杂指令自动拆解为多步骤工作流（如草图->建模->渲染->动画）。  * **主动优化与补全**：提示词模糊时，能否主动补充合理的建筑配景与配图参数。  * **上下文保持（Memory）**：在复杂长链条操作中保持核心设计特征不丢失。",
          "weight": 1.0,
          "score_anchors": "[{\"score\":1,\"description\":\"\"},{\"score\":2,\"description\":\"\"},{\"score\":3,\"description\":\"\"},{\"score\":4,\"description\":\"\"},{\"score\":5,\"description\":\"\"}]"
        },
        {
          "dimension_key": "custom_mt6oxkct",
          "name": "多轮修改能力",
          "description": "* **局部精准调整**：指哪改哪（如“仅将主楼涂料换为外墙砖，其余保持不变”）。  * **原设计保持度**：在修改特定区域时，非修改区域（山体、天空、旁观建筑）的抗遗忘能力。  * **否定指令遵循**：对“不要...”类指令（如“不要在广场前加人物”）的响应精准度。",
          "weight": 1.0,
          "score_anchors": "[{\"score\":1,\"description\":\"\"},{\"score\":2,\"description\":\"\"},{\"score\":3,\"description\":\"\"},{\"score\":4,\"description\":\"\"},{\"score\":5,\"description\":\"\"}]"
        }
      ]
    },
    {
      "id": "b344edf6-8f8c-40f6-8dcd-d1a98aba9c3a",
      "name": "建筑视频 Rubric",
      "version": "1.5",
      "status": "frozen",
      "items": [
        {
          "dimension_key": "prompt_adherence",
          "name": "建筑理解能力",
          "description": "结构、尺度、空间完全稳定，5分；轻微局部偏差，4分；基本正确，但有明显的AI痕迹，3分；明显结构/尺度问题，2分；建筑理解失效/严重bad case，1分",
          "weight": 1.0,
          "score_anchors": "[{\"score\":1,\"description\":\"1\"},{\"score\":2,\"description\":\"2\"},{\"score\":3,\"description\":\"3\"},{\"score\":4,\"description\":\"4\"},{\"score\":5,\"description\":\"5\"}]"
        },
        {
          "dimension_key": "spatial_consistency",
          "name": "建筑视觉生成",
          "description": "材质光影高级真实，5分；有轻微材质/光影瑕疵，4分；可用但质感普通，3分；材质/光影明显失真，2分；视觉生成严重失效，1分；",
          "weight": 1.0,
          "score_anchors": "[{\"score\":1,\"description\":\"1\"},{\"score\":2,\"description\":\"2\"},{\"score\":3,\"description\":\"3\"},{\"score\":4,\"description\":\"4\"},{\"score\":5,\"description\":\"5\"}]"
        },
        {
          "dimension_key": "visual_quality",
          "name": "建筑动画能力",
          "description": "运镜精准、时序稳定，5分；轻微抖动/速度变化，4分；镜头基本完成但稳定性一般，3分；运镜或连续性明显失控，2分；视频任务失败/严重崩坏，1分",
          "weight": 1.0,
          "score_anchors": "[{\"score\":1,\"description\":\"1\"},{\"score\":2,\"description\":\"2\"},{\"score\":3,\"description\":\"3\"},{\"score\":4,\"description\":\"4\"},{\"score\":5,\"description\":\"5\"}]"
        },
        {
          "dimension_key": "custom_mt6ox2rh",
          "name": "Agent 任务执行能力",
          "description": "可自主完成复杂工作流，5分；少量人工介入，4分；需人工分布引导，3分；只能完成局部任务，2分；无法完成任务，1分",
          "weight": 1.0,
          "score_anchors": "[{\"score\":1,\"description\":\"\"},{\"score\":2,\"description\":\"\"},{\"score\":3,\"description\":\"\"},{\"score\":4,\"description\":\"\"},{\"score\":5,\"description\":\"\"}]"
        },
        {
          "dimension_key": "custom_mt6oxkct",
          "name": "多轮修改能力",
          "description": "* **局部精准调整**：指哪改哪（如“仅将主楼涂料换为外墙砖，其余保持不变”）。  * **原设计保持度**：在修改特定区域时，非修改区域（山体、天空、旁观建筑）的抗遗忘能力。  * **否定指令遵循**：对“不要...”类指令（如“不要在广场前加人物”）的响应精准度。",
          "weight": 1.0,
          "score_anchors": "[{\"score\":1,\"description\":\"\"},{\"score\":2,\"description\":\"\"},{\"score\":3,\"description\":\"\"},{\"score\":4,\"description\":\"\"},{\"score\":5,\"description\":\"\"}]"
        }
      ]
    },
    {
      "id": "ba8ffb01-9aae-4661-ac58-a78ca0ad38f2",
      "name": "建筑视频 Rubric",
      "version": "1.6",
      "status": "frozen",
      "items": [
        {
          "dimension_key": "prompt_adherence",
          "name": "建筑理解能力",
          "description": "结构、尺度、空间完全稳定，5分；轻微局部偏差，4分；基本正确，但有明显的AI痕迹，3分；明显结构/尺度问题，2分；建筑理解失效/严重bad case，1分",
          "weight": 1.0,
          "score_anchors": "[{\"score\":1,\"description\":\"1\"},{\"score\":2,\"description\":\"2\"},{\"score\":3,\"description\":\"3\"},{\"score\":4,\"description\":\"4\"},{\"score\":5,\"description\":\"5\"}]"
        },
        {
          "dimension_key": "spatial_consistency",
          "name": "建筑视觉生成",
          "description": "材质光影高级真实，5分；有轻微材质/光影瑕疵，4分；可用但质感普通，3分；材质/光影明显失真，2分；视觉生成严重失效，1分；",
          "weight": 1.0,
          "score_anchors": "[{\"score\":1,\"description\":\"1\"},{\"score\":2,\"description\":\"2\"},{\"score\":3,\"description\":\"3\"},{\"score\":4,\"description\":\"4\"},{\"score\":5,\"description\":\"5\"}]"
        },
        {
          "dimension_key": "visual_quality",
          "name": "建筑动画能力",
          "description": "运镜精准、时序稳定，5分；轻微抖动/速度变化，4分；镜头基本完成但稳定性一般，3分；运镜或连续性明显失控，2分；视频任务失败/严重崩坏，1分",
          "weight": 1.0,
          "score_anchors": "[{\"score\":1,\"description\":\"1\"},{\"score\":2,\"description\":\"2\"},{\"score\":3,\"description\":\"3\"},{\"score\":4,\"description\":\"4\"},{\"score\":5,\"description\":\"5\"}]"
        },
        {
          "dimension_key": "custom_mt6ox2rh",
          "name": "Agent 任务执行能力",
          "description": "可自主完成复杂工作流，5分；少量人工介入，4分；需人工分布引导，3分；只能完成局部任务，2分；无法完成任务，1分",
          "weight": 1.0,
          "score_anchors": "[{\"score\":1,\"description\":\"\"},{\"score\":2,\"description\":\"\"},{\"score\":3,\"description\":\"\"},{\"score\":4,\"description\":\"\"},{\"score\":5,\"description\":\"\"}]"
        },
        {
          "dimension_key": "custom_mt6oxkct",
          "name": "多轮修改能力",
          "description": "指哪改哪，几乎零遗忘，5分；目标准确，轻微误伤，4分；能改，但有明显连带变化，3分；大量遗忘/误修改，2分；修改失败/建筑重构，1",
          "weight": 1.0,
          "score_anchors": "[{\"score\":1,\"description\":\"\"},{\"score\":2,\"description\":\"\"},{\"score\":3,\"description\":\"\"},{\"score\":4,\"description\":\"\"},{\"score\":5,\"description\":\"\"}]"
        }
      ]
    },
    {
      "id": "3498eb72-f8b8-4402-81ea-e343f8caef35",
      "name": "建筑视频 Rubric",
      "version": "1.7",
      "status": "frozen",
      "items": [
        {
          "dimension_key": "prompt_adherence",
          "name": "建筑理解能力",
          "description": "结构、尺度、空间完全稳定，5分；轻微局部偏差，4分；基本正确，但有明显的AI痕迹，3分；明显结构/尺度问题，2分；建筑理解失效/严重bad case，1分",
          "weight": 1.0,
          "score_anchors": "[{\"score\":1,\"description\":\"1\"},{\"score\":2,\"description\":\"2\"},{\"score\":3,\"description\":\"3\"},{\"score\":4,\"description\":\"4\"},{\"score\":5,\"description\":\"5\"}]"
        },
        {
          "dimension_key": "spatial_consistency",
          "name": "建筑视觉生成",
          "description": "材质光影高级真实，5分；有轻微材质/光影瑕疵，4分；可用但质感普通，3分；材质/光影明显失真，2分；视觉生成严重失效，1分；",
          "weight": 1.0,
          "score_anchors": "[{\"score\":1,\"description\":\"1\"},{\"score\":2,\"description\":\"2\"},{\"score\":3,\"description\":\"3\"},{\"score\":4,\"description\":\"4\"},{\"score\":5,\"description\":\"5\"}]"
        },
        {
          "dimension_key": "visual_quality",
          "name": "建筑动画能力",
          "description": "运镜精准、时序稳定，5分；轻微抖动/速度变化，4分；镜头基本完成但稳定性一般，3分；运镜或连续性明显失控，2分；视频任务失败/严重崩坏，1分",
          "weight": 1.0,
          "score_anchors": "[{\"score\":1,\"description\":\"1\"},{\"score\":2,\"description\":\"2\"},{\"score\":3,\"description\":\"3\"},{\"score\":4,\"description\":\"4\"},{\"score\":5,\"description\":\"5\"}]"
        },
        {
          "dimension_key": "custom_mt6ox2rh",
          "name": "Agent 任务执行能力",
          "description": "可自主完成复杂工作流，5分；少量人工介入，4分；需人工分布引导，3分；只能完成局部任务，2分；无法完成任务，1分",
          "weight": 1.0,
          "score_anchors": "[{\"score\":1,\"description\":\"\"},{\"score\":2,\"description\":\"\"},{\"score\":3,\"description\":\"\"},{\"score\":4,\"description\":\"\"},{\"score\":5,\"description\":\"\"}]"
        },
        {
          "dimension_key": "custom_mt6oxkct",
          "name": "多轮修改能力",
          "description": "指哪改哪，几乎零遗忘，5分；目标准确，轻微误伤，4分；能改，但有明显连带变化，3分；大量遗忘/误修改，2分；修改失败/建筑重构，1",
          "weight": 1.0,
          "score_anchors": "[{\"score\":1,\"description\":\"\"},{\"score\":2,\"description\":\"\"},{\"score\":3,\"description\":\"\"},{\"score\":4,\"description\":\"\"},{\"score\":5,\"description\":\"\"}]"
        }
      ]
    }
  ],
  "selection": {
    "case_count": 5,
    "video_count": 10,
    "rule": "Two distinct real videos from the same case; curated subset only."
  }
};
